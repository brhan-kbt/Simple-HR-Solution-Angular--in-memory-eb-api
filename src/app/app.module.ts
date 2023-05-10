import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppCommonModule } from './app.common.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './setup/components/dashboard/dashboard.component';
import { CandidatesComponent } from './setup/components/candidates/candidates.component';
import { EmployeersComponent } from './setup/components/employeers/employeers.component';
import { SalaryComponent } from './setup/components/salary/salary.component';
import { DepartmentComponent } from './setup/components/department/department.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CandidateFormComponent } from './setup/forms/candidate-form/candidate-form.component';
import { InMemoryApiServiceService } from './setup/services/in-memory-api.service/in-memory-api.service.service';
import { EmployeerFormComponent } from './setup/forms/employeer-form/employeer-form.component';
import { DepartmentFormComponent } from './setup/forms/department-form/department-form.component';
import { SalaryFormComponent } from './setup/forms/salary-form/salary-form.component';
import { CompanyFormComponent } from './setup/forms/company-form/company-form.component';
import { CompanyComponent } from './setup/components/company/company.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    AppComponent,
    DashboardComponent,
    CandidatesComponent,
    EmployeersComponent,
    SalaryComponent,
    DepartmentComponent,
    CandidateFormComponent,
    EmployeerFormComponent,
    DepartmentFormComponent,
    SalaryFormComponent,
    CompanyFormComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppCommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryApiServiceService),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
