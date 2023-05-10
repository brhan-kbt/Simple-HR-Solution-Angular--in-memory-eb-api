import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../../services/company/company.service';
import { DepartmentService } from '../../services/department/department.service';
import { SalaryService } from '../../services/salary/salary.service';

@Component({
  selector: 'app-employeer-form',
  templateUrl: './employeer-form.component.html',
  styleUrls: ['./employeer-form.component.css']
})
export class EmployeerFormComponent {
  @Input() isEdit = false;
  @Input() employeer: any = {
    name: '',
    designation: '',
    deptId: '',
    salaryId: '',
  };

  department:any;
  salaries:any;
  
  @Output() save = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<EmployeerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private departmetService:DepartmentService,
    private salaryService:SalaryService,


    ) { 
    this.employeer = data.employeer;
    this.isEdit=data.isEdit;
    departmetService.getDepartments().subscribe(res=>{
      this.department=res;
    })

    salaryService.getSalaries().subscribe(res=>{
      this.salaries=res;
    })
  

  }

  onSave(): void {
    this.save.emit(this.employeer);
    console.log(this.employeer);
    this.dialogRef.close();
  }
}
