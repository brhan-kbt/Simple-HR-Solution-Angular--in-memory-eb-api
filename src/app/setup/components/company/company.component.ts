import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyFormComponent } from '../../forms/company-form/company-form.component';
import { CompanyService } from '../../services/company/company.service';

export interface Company {
  name:string;
  location:string;

}
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  displayedColumns: string[] = ['id', 'name','location','actions'];
  dataSource!: MatTableDataSource<Company>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private companyService: CompanyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCompanies();
  }
  companyies: any[] = [];
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Company>(data);
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
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      // width: '250px'
      data: { company: {} }
    });

    dialogRef.componentInstance.save.subscribe((department:any) => {
      this.companyService.addCompany(department).subscribe(res=>{
        console.log('Added');
        this.getCompanies();
        
      },err=>{
        console.log(err);
        
      })
     
    });
  }


  openEditDialog(company: any): void {
    
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      // width: '500px',
      data: {   
        company:company,
        isEdit: !!company }
    });
  
    

   dialogRef.componentInstance.save.subscribe((updateCompany: any) => {
    this.companyService.updateCompany(updateCompany).subscribe(res => {
      console.log('Updated');
      this.getCompanies();
  }, err => {
    console.log(err);
  });
});

  }
  
  deleteData(company:any){
    if (confirm(`Are you sure you want to delete ${company.name}?`)) {
      this.companyService.deleteCompany(company.id).subscribe(res => {
        // Remove the deleted company from the dataSource
        const index = this.dataSource.data.indexOf(company);
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

  
