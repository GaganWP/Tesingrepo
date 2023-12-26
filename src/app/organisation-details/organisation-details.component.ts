import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.css']
})
export class OrganisationDetailsComponent implements OnInit {
  organisationDetails:any=JSON.parse(localStorage.getItem('orgdetails'))
  acctid=''
  firstname=''
  lastName=''
  Authimg=''
  Incorpoimg = ''
  Utilityimg = ''
  Authimg2:any
  Authimg3:any
  msisdnListarray=[];
  employeeList=[];
  searchString:any
  imagePath2: any;
  imagePath1: any;
  imagePath: any;
  detailAlert=[];
  constructor(private router:Router,private http: HttpClient) { }
  ngOnInit() {
    this.call()
  }
  call(){
    console.log(this.organisationDetails)
  if(this.organisationDetails.admin!=null){
     this.firstname = this.organisationDetails.admin.firstName;
     this.lastName = this.organisationDetails.admin.lastName
  }
  if(this.organisationDetails.document!=null){
    this.Incorpoimg = this.organisationDetails.document.document9Url;
    this.Utilityimg = this.organisationDetails.document.document12Url;
    this.Authimg = this.organisationDetails.document.document13Url;
    this.Authimg2 = this.organisationDetails.document.document16Url;
    this.Authimg3 = this.organisationDetails.document.document17Url;
 }
    
    this.acctid = this.organisationDetails.acctId
    
    this.msisdnList(this.acctid)
    this.EmployeeList(this.acctid)

  }
  setAdmin(acctid,orgpin,orgToken){
    this.router.navigate(['/setAdmin'])
    localStorage.setItem("getacctId",acctid)
    localStorage.setItem("getorgpin",orgpin)
    localStorage.setItem("getorgTKN",orgToken)


  }
  changeAdmin(){
    this.router.navigate(['/changeAdmin'])
  }
  assignMSISDN(value){
    this.router.navigate(['/assignmsisdn'])
    localStorage.setItem("getacctId",value)
  }
  msisdnList(acctid){
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

    this.http.get("https://ekyc.chili.mu:9443/api/organisation/msisdns/"+acctid)
    .subscribe(
      (data:any)=>{
              let response:any = data;
            console.log(data.data)
              // pass msisdnlist into this.msisdnList Array
              this.msisdnListarray =[]
              this.msisdnListarray = response.data
              console.log("MSISDNLIst",this.msisdnListarray)

            },error=>{
                      alert("Please Try After Sometime")
                      }
      )  


  }

  EmployeeList(acctid){
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

    this.http.get("https://ekyc.chili.mu:9443/api/organisation/employees/"+acctid)
    .subscribe(
      (data:any)=>{
              let response:any = data;
              
            console.log(data.data)
              // pass msisdnlist into this.msisdnList Array
              this.employeeList =[]
              this.employeeList = response.data
              
             

            },error=>{
                      // alert("Please Try After Sometime")
                      }
      )  

  }

  // openDetails(alert) {
	// 	console.log('*****',alert["Date Of Birth"]);
	// 	this.detailAlert = alert;
	// 	console.log(alert)
	// 	let vPhoto;
	// 	if(alert.verifiedPhoto!=null){
	// 	 vPhoto = alert.verifiedPhoto;
	// 		vPhoto = vPhoto.replaceAll('\'','');
	// 	}
	// 	// this.imagePath2 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+vPhoto);
	// 	// this.imagePath1 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.eKYCPhoto);
	// 	// this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.OriginalPhoto);
	// 	if(alert.verifiedPhoto_url!=null){
	// 		this.imagePath2 = alert.verifiedPhoto_url;
	// 		this.imagePath2=this.imagePath2.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
	// 		this.imagePath2=this.imagePath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
	// 	}
	// 	if(alert.eKYCPhoto_url!=null){
	// 		this.imagePath1 = alert.eKYCPhoto_url;
	// 		this.imagePath1=this.imagePath1.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
	// 		this.imagePath1=this.imagePath1.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
	// 	}
	// 	if(alert.originalPhoto_url!=null){
	// 		this.imagePath = alert.originalPhoto_url;
	// 		this.imagePath=this.imagePath.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')	
	// 		this.imagePath=this.imagePath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
	// 	}
		
	// }

}
