import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent {
  @Input() isEdit = false;
  @Input() company: Company = {
    name: '',
    location: '',
  };
  form: FormGroup;

  
  @Output() save = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<CompanyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder

    ) { 
    this.company = data.company;
    this.isEdit=data.isEdit
  
    this.form = this.formBuilder.group({
      name: [data.company.name, Validators.required],
      location: [data.company.location, Validators.required],
    });

  }

  onSave(): void {
    if (this.form.valid) {
      this.save.emit(this.company);
      console.log(this.company);
      this.dialogRef.close();
    } else {
      // handle invalid form
      console.log('Form is invalid');
    }
  }
}
