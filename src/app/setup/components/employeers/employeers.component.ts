import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { EmployeerService } from '../../services/employeer/employeer.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from '../../services/company/company.service';
import { EmployeerFormComponent } from '../../forms/employeer-form/employeer-form.component';
import { DepartmentService } from '../../services/department/department.service';
import { SalaryService } from '../../services/salary/salary.service';
import { forkJoin } from 'rxjs';
import { Employeer } from '../../models/employeer.model';


@Component({
  selector: 'app-employeers',
  templateUrl: './employeers.component.html',
  styleUrls: ['./employeers.component.css']
})
export class EmployeersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'designation','company','department','salary','actions'];
  dataSource!: MatTableDataSource<Employeer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeerService: EmployeerService,public dialog: MatDialog,private salaryService:SalaryService,private dept:DepartmentService, private companyService:CompanyService) { }

  ngOnInit() {
    this.getEmployeers();
  }

  getEmployeers() {
    forkJoin([
      this.employeerService.getEmployeers(),
      this.dept.getDepartments(),
      this.salaryService.getSalaries()
    ]).subscribe(
      ([employeers, departments, salaries]) => {
        employeers.forEach(employeer => {
          const dept = departments.find(department => department.id === employeer.deptId);
          employeer.department = dept;
          this.companyService.getCompany(employeer.department.companyId).subscribe(res=>{
            const company = res.find((company:any) => company.id === dept.companyId);
            employeer.department.company = company;
          })
          const salary = salaries.find(salary => salary.id === employeer.salaryId);
          employeer.salary = salary;
        });
        this.dataSource = new MatTableDataSource<Employeer>(employeers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const dataStr = JSON.stringify(data).toLowerCase();
          const searchTerm = filter.trim().toLowerCase();
          return dataStr.indexOf(searchTerm) !== -1;
        };
        console.log(employeers);
      },
      error => {
        console.log(error);
      }
    );
  }
  

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeerFormComponent, {
      // width: '250px'
      data: { employeer: {} }
    });

    dialogRef.componentInstance.save.subscribe(candidate => {
      this.employeerService.addEmployeer(candidate).subscribe(res=>{
        console.log('Added');
        this.getEmployeers();
      },err=>{
        console.log(err);
        
      })
     
    });
  }



  openEditDialog(employeer: any): void {
    
    const dialogRef = this.dialog.open(EmployeerFormComponent, {
      data: {   
        employeer:employeer,
        isEdit: !!employeer 
      }
    });
  
    

   dialogRef.componentInstance.save.subscribe(updatedEmployeer => {
    console.log(updatedEmployeer);
    
    this.employeerService.updateEmployeer(updatedEmployeer).subscribe(res => {
      console.log('Updated');
      this.getEmployeers();

  }, err => {
    console.log(err);
  });
});

  }
  
  deleteData(employeer:any){
    if (confirm(`Are you sure you want to delete ${employeer.name}?`)) {
      this.employeerService.deleteEmployeer(employeer.id).subscribe(res => {
        // Remove the deleted employeer from the dataSource
        const index = this.dataSource.data.indexOf(employeer);
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
  
 