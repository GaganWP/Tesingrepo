import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-icta',
  templateUrl: './icta.component.html',
  styleUrls: ['./icta.component.css']
})
export class IctaComponent implements OnInit {

  
  public UserType=localStorage.getItem('UserType');
  public country;
  public dateStr;

  public passportNum;
  public correlationId;
  public nicNum;
  public firstName;
  public lastName;
  public maidenName;
  public dateOfBirth;
  public gender;
  public photograph;
  

  constructor(private http: HttpClient,private router:Router,private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(localStorage.getItem('login')!='success'){
			this.router.navigate(['/']);
		}
  }
  ManageForm = new FormGroup({
    
    id:new FormControl(''),
    userType:new FormControl(this.UserType),
    dateOfBirth:new FormControl(''),
    gender:new FormControl(''),
    nationalityCode: new FormControl(''),
 })

 ManageFormSubmit(value){
  console.log('***********',value)

  // API integration takesplace here
  const headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
  headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

  
  if(value.id != null && JSON.stringify(value.id).length < 13){
    this.passportCheck(value.id, value.dateOfBirth, value.gender, value.userType, value.nationalityCode);
  }else{
    this.nidCheck(value.id, value.dateOfBirth, value.gender, value.userType);
  }

 
 }


 nidCheck(nid,dob,gender,type):void{
  const headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
  headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

  const format = 'dd/MM/yyyy';
		 let myDate =  new Date();
		 const locale = 'en-US';
		 let formattedDate;
		 if(this.dateStr!=''){
		  formattedDate = formatDate(dob, format, locale);
		 }else{
			formattedDate = formatDate(myDate, format, locale);
		 }

  let data = {
    "nicNum": nid,
    "dateOfBirth": formattedDate,
    "gender": gender,
    "userType": type
    
    
};
this.http.post("https://ekyc.chili.mu:9443/sim",data,{ headers: headers}).subscribe(data=>{
    let reaponse:any=data;
      console.log(reaponse.status);
    if (reaponse.status == "200"){

        alert("ICTA Record Found");
        this.nicNum = reaponse.nicNum;
        this.firstName = reaponse.firstName;
        this.maidenName = reaponse.maidenName;
        this.lastName = reaponse.lastName;
        this.dateOfBirth = reaponse.dateOfBirth;
        this.photograph = reaponse.photograph;
        this.gender = reaponse.gender;

        this.photograph = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+this.photograph);
    
     }
  if (reaponse.status == "400"){
        alert("ICTA Error")
      }
    },error =>{
      alert("Something Went Wrong")
    }

    )

 }

 passportCheck(passport, dob, gender, type, cc):void{

  const headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
  headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

  const format = 'dd/MM/yyyy';
		 let myDate =  new Date();
		 const locale = 'en-US';
		 let formattedDate;
		 if(this.dateStr!=''){
		  formattedDate = formatDate(dob, format, locale);
		 }else{
			formattedDate = formatDate(myDate, format, locale);
		 }
     //formattedDate = formattedDate.replaceAll('/','-');

  let data = {
    'passportNumber': passport,
    'dateOfBirth': formattedDate,
    'gender': gender,
    'userType': type,
    'nationalityCode': cc
    
};
this.http.post("https://ekyc.chili.mu:9443/passport",data,{ headers: headers}).subscribe(data=>{
    let reaponse:any=data;
      console.log(reaponse.status);
    if (reaponse.status == "400"){
      alert("ICTA Error");
    //this.router.navigate(['/manage'])
    }if (reaponse.status == "200"){
      alert("ICTA Record Found");
    }
  if (reaponse.status == "FAILED"){
        alert("Operation Failed")
      }
    },error =>{
      alert("Something Went Wrong")
    }

    )

 }




}
