import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent {
  @Input() isEdit = false;
  @Input() company: any = {
    amount: '',
  };
  
  @Output() save = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<CompanyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { 
    this.company = data.company;
    this.isEdit=data.isEdit
  

  }

  onSave(): void {
    this.save.emit(this.company);
    console.log(this.company);
    this.dialogRef.close();
  }
}
