import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { SalaryService } from '../../services/salary/salary.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SalaryFormComponent } from '../../forms/salary-form/salary-form.component';


export interface Salary {
  amount:number;

}

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'amount','actions'];
  dataSource!: MatTableDataSource<Salary>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salaryService: SalaryService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getDepartments();
  }
  departments: any[] = [];
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDepartments() {
    this.salaryService.getSalaries().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Salary>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
        
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SalaryFormComponent, {
      // width: '250px'
      data: { salary: {} }
    });

    dialogRef.componentInstance.save.subscribe((department:any) => {
      this.salaryService.addSalary(department).subscribe(res=>{
        console.log('Added');
        this.getDepartments();
        
      },err=>{
        console.log(err);
        
      })
     
    });
  }


  openEditDialog(salary: any): void {
    
    const dialogRef = this.dialog.open(SalaryFormComponent, {
      // width: '500px',
      data: {   
        salary:salary,
        isEdit: !!salary }
    });
  
    

   dialogRef.componentInstance.save.subscribe((updateDepartment: any) => {
    this.salaryService.updateSalary(updateDepartment).subscribe(res => {
      console.log('Updated');
      this.getDepartments();
  }, err => {
    console.log(err);
  });
});

  }
  
  deleteData(department:any){
    if (confirm(`Are you sure you want to delete ${department.name}?`)) {
      this.salaryService.deleteSalary(department.id).subscribe(res => {
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

  
