import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent {
  @Input() isEdit = false;
  @Input() candidate: any = {
    name: '',
    email: '',
    phone: ''
  };
  
  @Output() save = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<CandidateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { 
    this.candidate = data.candidate;
    this.isEdit=data.isEdit;

  }

  onSave(): void {
    this.save.emit(this.candidate);
    console.log(this.candidate);
    this.dialogRef.close();
  }
}
