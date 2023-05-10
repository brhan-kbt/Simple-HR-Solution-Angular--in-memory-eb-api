import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form:FormGroup;
  
  @Output() save = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<EmployeerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private departmetService:DepartmentService,
    private salaryService:SalaryService,
    private formBuilder:FormBuilder


    ) { 
    this.employeer = data.employeer;
    this.isEdit=data.isEdit;
    departmetService.getDepartments().subscribe(res=>{
      this.department=res;
    })

    salaryService.getSalaries().subscribe(res=>{
      this.salaries=res;
    })

    this.form = this.formBuilder.group({
      name: [data.employeer.name, Validators.required],
      designation: [data.employeer.designation, [Validators.required]],
      deptId: [data.employeer.deptId, [Validators.required]],
      salaryId: [data.employeer.salaryId, [Validators.required]]
    });
  

  }

  onSave(): void {
    if (this.form.valid) {
      this.save.emit(this.employeer);
      console.log(this.employeer);
      this.dialogRef.close();
    } else {
      // handle invalid form
      console.log('Form is invalid');
    }
  }
}
