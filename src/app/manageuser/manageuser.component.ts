import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {


public userlist=[];
public modal=''
public serachdata=''
public completedetails:any=[]

  constructor(private http: HttpClient,private router:Router) { }
  ngOnInit() {
    this.getUserlist()
    if(localStorage.getItem('login')!='success'){
			this.router.navigate(['/']);
		}
    
  }
  public UserType=localStorage.getItem('UserType');



 getUserlist(){

 const headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
  headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

  this.http.get("https://ekyc.chili.mu:9443/api/agentDealerGet/"+localStorage.getItem("UserType")).subscribe(data=>{
			let response:any = data;
			console.log(response.data);
      this.userlist = response.data
      console.log(this.userlist)
		  },
      error=>{
        alert("Please Try After Sometime")
        }
		  )
		   
		  }


 

  submitManageForm(val){
    console.log(val)
  }
openModal(){
  this.router.navigate(['/addnewuser'])

}

}
