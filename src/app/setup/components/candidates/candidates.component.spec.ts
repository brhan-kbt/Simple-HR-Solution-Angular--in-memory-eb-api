import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CandidateFormComponent } from '../../forms/candidate-form/candidate-form.component';
import { CandidateService } from '../../services/candidate/candidate.service';
import { CandidatesComponent, Candidate } from './candidates.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('CandidatesComponent', () => {
  let component: CandidatesComponent;
  let fixture: ComponentFixture<CandidatesComponent>;
  let candidateServiceSpy: jasmine.SpyObj<CandidateService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    candidateServiceSpy = jasmine.createSpyObj('CandidateService', ['getCandidates', 'addCandidate', 'updateCandidate', 'deleteCandidate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatPaginatorModule, MatSortModule,MatInputModule,MatFormFieldModule,BrowserAnimationsModule],
      declarations: [CandidatesComponent],
      providers: [
        { provide: CandidateService, useValue: candidateServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch candidates on init', () => {
    const candidates: Candidate[] = [
      {id:1, name: 'Alice', email: 'alice@example.com', phone: '1234567890' },
      {id:2, name: 'Bob', email: 'bob@example.com', phone: '2345678901' }
    ];
    candidateServiceSpy.getCandidates.and.returnValue(of(candidates));
    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(candidates);
  });
  it('should filter candidates by name', () => {
    const candidates: Candidate[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', phone: '1234567890' },
      { id: 2, name: 'Bob', email: 'bob@example.com', phone: '2345678901' }
    ];
  
    candidateServiceSpy.getCandidates.and.returnValue(of(candidates));
    fixture.detectChanges();
  
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Bob';
    input.dispatchEvent(new Event('input'));
  
    fixture.detectChanges();
  
    expect(component.dataSource.filteredData.length).toEqual(2);
    expect(component.dataSource.filteredData[1].name).toEqual('Bob');
  });
  
  

  it('should add a candidate', () => {
    const candidates: Candidate[] = [ { id: 1, name: 'Alice', email: 'alice@example.com', phone: '1234567890' }];
    candidateServiceSpy.getCandidates.and.returnValue(of(candidates));
    candidateServiceSpy.addCandidate.and.returnValue(of({}));
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.add')).nativeElement;
    button.click();

    expect(dialogSpy.open).toHaveBeenCalledWith(CandidateFormComponent, jasmine.any(Object));
    // expect(candidateServiceSpy.addCandidate).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(1);

  });


  // it('should update a candidate', () => {
  //   const candidates: Candidate[] = [
  //     { id: 1, name: 'Alice', email: 'alice@example.com', phone: '1234567890' },
  //     { id: 2, name: 'Bob', email: 'bob@example.com', phone:'2345678901' }
  //   ];
  //   candidateServiceSpy.getCandidates.and.returnValue(of(candidates));
  //   candidateServiceSpy.updateCandidate.and.returnValue(of({}));
  //   fixture.detectChanges();
   
  //   const editButton = fixture.debugElement.query(By.css('button.edit')).nativeElement;

  //   console.log('Hellllo',editButton);
    
  //   if (editButton) {
  //     editButton.click();
  //   } else {
  //     fail('Edit button not found');
  //   }
    
  //   expect(dialogSpy.open).toHaveBeenCalledWith(CandidateFormComponent, jasmine.any(Object));
    
  //   const updatedCandidate: Candidate = { id: 1, name: 'Updated Alice', email: 'updatedalice@example.com', phone: '0987654321' };
  //   component.openEditDialog(updatedCandidate)
    
  //   expect(candidateServiceSpy.updateCandidate).toHaveBeenCalledWith(updatedCandidate);
  //   expect(component.dataSource.data[0]).toEqual(updatedCandidate);
  // });
  
  // it('should delete a candidate', () => {
  //   const candidates: Candidate[] = [
  //     { id: 1, name: 'Alice', email: 'alice@example.com', phone: '1234567890' },
  //     { id: 2, name: 'Bob', email: 'bob@example.com', phone: '2345678901' }
  //   ];
  //   candidateServiceSpy.getCandidates.and.returnValue(of(candidates));
  //   candidateServiceSpy.deleteCandidate.and.returnValue(of({}));
  //   fixture.detectChanges();
  
  //   const deleteButton = fixture.debugElement.query(By.css('button.delete'));
  //   deleteButton.triggerEventHandler('click', null);
  
  //   expect(candidateServiceSpy.deleteCandidate).toHaveBeenCalledWith(1);
  //   expect(component.dataSource.data.length).toBe(1);
  // });
  
  });
