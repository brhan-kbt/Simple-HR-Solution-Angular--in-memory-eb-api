import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { DepartmentService } from '../../services/department/department.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from '../../services/company/company.service';
import { forkJoin } from 'rxjs';
import { DepartmentFormComponent } from '../../forms/department-form/department-form.component';

export interface Department {
  name: string;
  companyId:string;
  company?:Company;

}

export interface Company {
  id: number;
  name: string;
  address: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'company','actions'];
  dataSource!: MatTableDataSource<Department>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private departmentService: DepartmentService,private companyService:CompanyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getDepartments();
  }
  departments: any[] = [];
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filterValue:", filterValue);

    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("dataSource:", this.dataSource);

  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDepartments() {
    forkJoin([
      this.departmentService.getDepartments(),
      this.companyService.getCompanies(),
    ]).subscribe(
      ([departments, companies]) => {
        departments.forEach(department => {
          const company = companies.find(company => company.id === department.companyId);
          department.company = company;
        
        });
        this.dataSource = new MatTableDataSource<Department>(departments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(departments);
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DepartmentFormComponent, {
      // width: '250px'
      data: { department: {} }
    });

    dialogRef.componentInstance.save.subscribe((department:any) => {
      this.departmentService.addDepartment(department).subscribe(res=>{
        console.log('Added');
        this.getDepartments();
        
      },err=>{
        console.log(err);
        
      })
     
    });
  }


  openEditDialog(department: any): void {
    
    const dialogRef = this.dialog.open(DepartmentFormComponent, {
      // width: '500px',
      data: {   
        department:department,
        isEdit: !!department }
    });
  
    

   dialogRef.componentInstance.save.subscribe((updateDepartment: any) => {
    this.departmentService.updateDepartment(updateDepartment).subscribe(res => {
      console.log('Updated');
      this.getDepartments();
  }, err => {
    console.log(err);
  });
});

  }
  
  deleteData(department:any){
    if (confirm(`Are you sure you want to delete ${department.name}?`)) {
      this.departmentService.deleteDepartment(department.id).subscribe(res => {
        // Remove the deleted department from the dataSource
        const index = this.dataSource.data.indexOf(department);
        this.dataSource.data.splice(index, 1);
        // Refresh the dataSource
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        console.log(err);
      });
  }
}
  
}

  
