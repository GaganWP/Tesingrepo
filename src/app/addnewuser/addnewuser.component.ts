import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.css']
})
export class AddnewuserComponent implements OnInit {
  public UserType=localStorage.getItem('UserType');

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('login')!='success'){
			this.router.navigate(['/']);
		}
  }
  ManageForm = new FormGroup({
    name:new FormControl(''),
    msisdn:new FormControl(''),
    businessName:new FormControl(''),
    nid:new FormControl(''),
    type:new FormControl(this.UserType),
    userName:new FormControl(''),
    password:new FormControl('')
 })

 ManageFormSubmit(value){
  console.log(value)

  // API integration takesplace here
  const headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
  headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

  let request = {
    'agentName':value.name,
    'msisdn' :value.msisdn,
    'businessName' :value.businessName,
    'agentId' :value.nid,
    'type' :value.type,
     'userName':value.userName,
     'password':value.password
  }
  console.log(request);

  this.http.post("https://ekyc.chili.mu:9443/api/saveAgent",request,{ headers: headers})
  .subscribe(data=>{
    let reaponse:any=data;
      console.log(reaponse.status);
    if (reaponse.status == "SUCCESSFUL"){
    alert("Submitted Sucessfully")
    this.router.navigate(['/manage'])
  }
  if (reaponse.status == "FAILED"){
        alert("Operation Failed")
      }
    },
    error =>{
      alert("Please Try later")
    }

    )
 }

}
