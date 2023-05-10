import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateFormComponent } from '../../forms/candidate-form/candidate-form.component';
import { CandidateService } from '../../services/candidate/candidate.service';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Candidate {
  id:number;
  name: string;
  email: string;
  phone:string;
}

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email','phone','actions'];
  dataSource!: MatTableDataSource<Candidate>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private candidateService: CandidateService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getCandidates();
  }

  candidates: any[] = [];


  openDialog(): void {
    const dialogRef = this.dialog.open(CandidateFormComponent, {
      // width: '250px'
      data: { candidate: {} }
    });

    dialogRef.componentInstance.save.subscribe(candidate => {
      this.candidateService.addCandidate(candidate).subscribe(res=>{
        console.log('Added');
        console.log(this.getCandidates());
        // // Refresh the dataSource
       this.dataSource = new MatTableDataSource(this.dataSource.data);
       this.dataSource.paginator = this.paginator;
        
      },err=>{
        console.log(err);
        
      })
     
    });
  }

  getCandidates() {
    this.candidateService.getCandidates().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Candidate>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
        
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openEditDialog(candidate: any): void {
    
    const dialogRef = this.dialog.open(CandidateFormComponent, {
      // width: '500px',
      data: {   
        candidate:candidate,
        isEdit: !!candidate }
    });
  
    

   dialogRef.componentInstance.save.subscribe(updatedCandidate => {
    this.candidateService.updateCandidate(updatedCandidate).subscribe(res => {
      console.log('Updated');
      // Update the candidate in the dataSource
      // const index = this.dataSource.data.findIndex(c => c.id === updatedCandidate.id);
      // this.dataSource.data[index] = updatedCandidate;
      // // Refresh the dataSource
       this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
  }, err => {
    console.log(err);
  });
});

  }
  
  deleteData(candidate:any){
    if (confirm(`Are you sure you want to delete ${candidate.name}?`)) {
      this.candidateService.deleteCandidate(candidate.id).subscribe(res => {
        // Remove the deleted candidate from the dataSource
        const index = this.dataSource.data.indexOf(candidate);
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
