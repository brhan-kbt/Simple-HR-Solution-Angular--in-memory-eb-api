import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../../services/company/company.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent {
  @Input() isEdit = false;
  @Input() department: any = {
    name: '',
    companyId: '',
  };
  companies:any;
  
  @Output() save = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<DepartmentFormComponent>,
    private companyService:CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { 
    this.department = data.department;
    this.isEdit=data.isEdit;
    
    companyService.getCompanies().subscribe(res=>{
      this.companies=res;
    })
  

  }

  onSave(): void {
    this.save.emit(this.department);
    console.log(this.department);
    this.dialogRef.close();
  }
}
