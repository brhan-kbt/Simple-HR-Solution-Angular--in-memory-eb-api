import { Component } from '@angular/core';
import { CandidateService } from '../../services/candidate/candidate.service';
import { CompanyService } from '../../services/company/company.service';
import { DepartmentService } from '../../services/department/department.service';
import { EmployeerService } from '../../services/employeer/employeer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dept:number=0;
  candidate:number=0;
  employeer:number=0;
  company:number=0;

  constructor(private departmentService: DepartmentService,private companyService:CompanyService,private employeerService: EmployeerService,private candidateService:CandidateService,) {
    departmentService.getDepartments().subscribe(res=>{
      this.dept=res.length;
    })
    candidateService.getCandidates().subscribe(res=>{
      this.candidate=res.length;
    })
    companyService.getCompanies().subscribe(res=>{
      this.company=res.length;
    })
    employeerService.getEmployeers().subscribe(res=>{
      this.employeer=res.length;
    })
   }

}
