import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CandidateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder

    ) { 
          this.candidate = data.candidate 
          this.isEdit=data.isEdit;

          this.form = this.formBuilder.group({
            name: [data.candidate.name, Validators.required],
            email: [data.candidate.email, [Validators.required, Validators.email]],
            phone: [data.candidate.phone, [Validators.required]]
          });
  }

  onSave(): void {
    if (this.form.valid) {
      this.save.emit(this.candidate);
      console.log(this.candidate);
      this.dialogRef.close();
    } else {
      // handle invalid form
      console.log('Form is invalid');
    }
  }

}
