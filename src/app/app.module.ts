import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AlertPageComponent } from './alert-page/alert-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TablePipe } from './services/table.pipe';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ngx-bootstrap/pagination';
//import {LoginComponent} from './login/login.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActivationComponent } from './activation/activation.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DownloadpdfComponent } from './downloadpdf/downloadpdf.component';
import { AddprefixSeriesComponent } from './addprefix-series/addprefix-series.component';
import { AgentrecordspageComponent } from './agentrecordspage/agentrecordspage.component';

import { AddnewuserComponent } from './addnewuser/addnewuser.component';
import { SearchPipe } from './search.pipe';
import { DealerrecordsComponent } from './dealerrecords/dealerrecords.component';
import { CitizenReportComponent } from './citizen-report/citizen-report.component';
import { TouristReportComponent } from './tourist-report/tourist-report.component';
import { ResidentReportsComponent } from './resident-reports/resident-reports.component';
import { VerifiedcustomerreportComponent } from './verifiedcustomerreport/verifiedcustomerreport.component';
import { NonVerifiedcustomerreportComponent } from './non-verifiedcustomerreport/non-verifiedcustomerreport.component';
import { DocumentMissingCustomerReportComponent } from './document-missing-customer-report/document-missing-customer-report.component';
import { ContingencyComponent } from './contingency/contingency.component';
import { OtpComponent } from './otp/otp.component';
import { IctaComponent } from './icta/icta.component';
import { OrganisationListComponent } from './organisation-list/organisation-list.component';
import { OrganisationDetailsComponent } from './organisation-details/organisation-details.component';
import { CreateOrganisationComponent } from './create-organisation/create-organisation.component';
import { FilterfororganisationPipe } from './filterfororganisation.pipe';
import { SetAdminComponent } from './set-admin/set-admin.component';
import { ChangeAdminComponent } from './change-admin/change-admin.component';
import { AssignmsisdnComponent } from './assignmsisdn/assignmsisdn.component';
import { ExpiredTouristReportsComponent } from './expired-tourist-reports/expired-tourist-reports.component';
import { ContingencyActivationComponent } from './contingency-activation/contingency-activation.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeePipe } from './employee.pipe';
import { SimlostreportComponent } from './simlostreport/simlostreport.component';









@NgModule({
  declarations: [
    AppComponent,
    AlertPageComponent,
    NavbarComponent,
    TablePipe,
    LoginComponent,
    HomeComponent,
    ActivationComponent,
    ManageuserComponent,
    DownloadpdfComponent,
    AddprefixSeriesComponent,
    AgentrecordspageComponent,
    
    AddnewuserComponent,
    SearchPipe,
    DealerrecordsComponent,
    CitizenReportComponent,
    TouristReportComponent,
    ResidentReportsComponent,
    VerifiedcustomerreportComponent,
    NonVerifiedcustomerreportComponent,
    DocumentMissingCustomerReportComponent,
    ContingencyComponent,
    OtpComponent,
    IctaComponent,
    OrganisationListComponent,
    OrganisationDetailsComponent,
    CreateOrganisationComponent,
    FilterfororganisationPipe,
    SetAdminComponent,
    ChangeAdminComponent,
    AssignmsisdnComponent,
    ExpiredTouristReportsComponent,
    ContingencyActivationComponent,
    EmployeelistComponent,
    EmployeePipe,
    SimlostreportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    PaginationModule.forRoot(),
    RouterModule.forRoot([
      
      { path: 'dashboard', component: AlertPageComponent },
      { path: 'home', component: HomeComponent},
      { path: 'activation', component: ActivationComponent},
      { path: '', component: LoginComponent},
      { path:'manage',component:ManageuserComponent},
      { path:'downloadpdf', component:DownloadpdfComponent},
      { path: 'prefixSeries',component:AddprefixSeriesComponent},
      { path: 'agentrecords', component:AgentrecordspageComponent},
      
      { path:'addnewuser',component:AddnewuserComponent},
      { path:'dearlerboard', component:DealerrecordsComponent},
      { path:'citizenReports', component:CitizenReportComponent},
      { path:'residentReports',component:ResidentReportsComponent},
      { path:'touristReports',component:TouristReportComponent},
      { path:'verifiedReports', component:VerifiedcustomerreportComponent},
      { path:'nonverifiedReports',component:NonVerifiedcustomerreportComponent},
      { path:'documentMissingReports',component:DocumentMissingCustomerReportComponent},
      { path:'contingencyReports',component:ContingencyComponent},
      { path:'otpCheck',component:OtpComponent},
      { path:'ictaCheck',component:IctaComponent},
      { path:'organisationlist', component:OrganisationListComponent},
      { path:'organisationDetails',component:OrganisationDetailsComponent},
      { path:'createorganisation',component:CreateOrganisationComponent},
      { path: 'setAdmin', component:SetAdminComponent},
      { path: 'changeAdmin', component:ChangeAdminComponent},
      { path: 'assignmsisdn', component:AssignmsisdnComponent},
      { path: 'expiredTourist', component:ExpiredTouristReportsComponent},
      { path:'continingencyactivation', component:ContingencyActivationComponent},
      { path:'lostsim', component:SimlostreportComponent}


    ], {
      useHash: true,
    })
    
    // ----------------------------------------------------------------------------- [ local lib ]
    
  ],
  
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
