import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-salary-form',
  templateUrl: './salary-form.component.html',
  styleUrls: ['./salary-form.component.css']
})
export class SalaryFormComponent {
  @Input() isEdit = false;
  @Input() salary: any = {
    amount: '',
  };
  
  @Output() save = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<SalaryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { 
    this.salary = data.salary;
    this.isEdit=data.isEdit;
  

  }

  onSave(): void {
    this.save.emit(this.salary);
    console.log(this.salary);
    this.dialogRef.close();
  }
}
