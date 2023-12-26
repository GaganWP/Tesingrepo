import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-organisation',
  templateUrl: './create-organisation.component.html',
  styleUrls: ['./create-organisation.component.css']
})
export class CreateOrganisationComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router) { }

BRNumber:any=''
AccountId :any
orgname:any
vatNumber:any
organisationContactNumber:any
organisationEmail:any
organisationName:any
organisationAddress:any
adminToken:any
  ngOnInit() {
  }
    createorgForm = new FormGroup({
    organisationName :new FormControl(),
    organisationAddress:new FormControl(),
    vat : new FormControl(),
    brn: new FormControl(''),
    adminToken :new FormControl(),
    orgContact:new FormControl(),
    orgEmail :new FormControl(),
    orgType :new FormControl('corporate'),
  })

  generateAcctid(){
    this.AccountId =  Math.floor(1000 + Math.random() * 9000);
    console.log(this.AccountId);

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');
    
    this.http.get('https://ekyc.chili.mu:9443/api/check/acctid/'+this.AccountId).subscribe((data:any)=>{
      let response = data;
      console.log(response.data)
      if(response.status=='SUCCESSFUL')
      {
        
        //call processOrganisation API here.
        this.processOrganisation()
      }
    },error=>{
      this.generateAcctid()
    })

  }

  checkBRN(){
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');
    
    this.http.get('https://ekyc.chili.mu:9443/api/check/brn/'+this.BRNumber).subscribe((data:any)=>{
      let response = data;
      console.log(response.status)
      if(response.status=='SUCCESSFUL')
      {
        this.generateAcctid()
      }
    },error=>{
      // alert("This BRN is Already Registered with other Organisation")
      console.log(error.error.status)
      let x= error.error.status
      if(x==404){
        alert("Please Enter valid Admin Token")
      }
      else if(x=="FAILED"){
        alert("This BRN is already registered with other Organisation")
      }
      else{
        alert("Please Try After Sometime")
      }
    }
    )
  }
  createorgFormSubmit(value){
  this.BRNumber = value.brn
  this.vatNumber = value.vat
  this.organisationAddress = value.organisationAddress
  this.organisationContactNumber = value.orgContact
  this.organisationEmail = value.orgEmail
  this.organisationName = value.organisationName
  // this.adminToken = value.adminToken
  // console.log(value)
  this.checkBRN()
  }

  processOrganisation(){
    if(this.organisationName == null || this.organisationAddress==null || this.vatNumber == null || this.organisationContactNumber == null
      || this.organisationEmail == null  ){
      alert ("Please Enter Manditory Fields")
    }
    
    else{
      const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

    let formData = new FormData();
        formData.append('organisationName',this.organisationName);
        formData.append('organisationAddress',this.organisationAddress);
        formData.append('vat',this.vatNumber);
        formData.append('brn',this.BRNumber);        
        formData.append('adminToken','');
        formData.append('orgContact',this.organisationContactNumber);
        formData.append('orgEmail',this.organisationEmail);
        formData.append('acctId',this.AccountId);
        formData.append('orgType','corporate')

        this.http.post('https://ekyc.chili.mu:9443/api/processOrganisation',formData).subscribe((data:any)=>
        {let response = data;
          if(response.status=='SUCCESSFUL')
          {
            alert("Registrated Successfully")
            this.router.navigate(["/organisationlist"])
          }
        },error=>{
          alert('Registration Failed')
        })
      }
  }

}
