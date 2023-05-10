import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './setup/components/candidates/candidates.component';
import { CompanyComponent } from './setup/components/company/company.component';
import { DashboardComponent } from './setup/components/dashboard/dashboard.component';
import { DepartmentComponent } from './setup/components/department/department.component';
import { EmployeersComponent } from './setup/components/employeers/employeers.component';
import { SalaryComponent } from './setup/components/salary/salary.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    path:'candidates',
    component:CandidatesComponent
  },
  {
    path:'dept',
    component:DepartmentComponent,
  },
  {
    path:'employeers',
    component:EmployeersComponent
  },
  {
    path:'salary',
    component:SalaryComponent
  },
  {
    path:'company',
    component:CompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
