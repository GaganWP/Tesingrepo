import { Component, OnInit, NgZone, NgModuleFactoryLoader } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';






@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
    
    public userName = '';
    public password = '';
    public errorMsg = "";
    public loginApi="https://ekyc.chili.mu:9443/api/agentLogin";
    public isLoggedin :any = false;
    

    constructor(private router: Router, private ngZone: NgZone, private readonly loader: NgModuleFactoryLoader, private alert: AlertService,
        private http: HttpClient) {
        localStorage.clear();
    }
    
    gotoHome(){
        
    //     if(this.userName!='' && this.password!=''){
    //     if(!this.alert.isValidLogin(this.userName, this.password))
    //     {
    //         this.errorMsg = 'Unknown User - Please validate your access credentials.';
    //     }
    // }
    console.log(this.userName)
    console.log(this.password)  

    if(this.userName=="callcenter" && this.password=="mtml@cc321")
    {
        localStorage.setItem('login',"success")
        this.router.navigate(['/dearlerboard'])
    }
    else if(this.userName=="callcenter2" && this.password=="callcenter234"){
      localStorage.setItem('login',"success")
        this.router.navigate(['/dearlerboard'])
    }
    else if(this.userName=="callcenter3" && this.password=="callcenter345"){
      localStorage.setItem('login',"success")
        this.router.navigate(['/dearlerboard'])
    } 
    else if(this.userName=="callcenter4" && this.password=="callcenter456"){
      localStorage.setItem('login',"success")
        this.router.navigate(['/dearlerboard'])
    } 
    else if(this.userName=="callcenter5" && this.password=="callcenter567"){
      localStorage.setItem('login',"success")
        this.router.navigate(['/dearlerboard'])
    } 
    else if(this.userName=="callcenter6" && this.password=="callcenter678"){
      localStorage.setItem('login',"success")
        this.router.navigate(['/dearlerboard'])
    }

    else if(this.userName=="admin" && this.password=="@mtml$777"){
      localStorage.setItem('login',"success");
      this.router.navigate(['/dashboard']);
    }
    else{
      const headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('content-type','application/json');
      headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
      headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');
  
      let request = {
        'userName':this.userName,
        'password' :this.password
        
      }
      this.http.post(this.loginApi, request,{ headers: headers}).subscribe(data=>{
        let response:any = data;
        console.log(response);
        if (response.status == "SUCCESSFUL"){
          console.log(response.status);
          localStorage.setItem('login',"success");
          localStorage.setItem('username',this.userName);
          console.log(response.data.msisdn);
          localStorage.setItem("agentType",response.data.agentType);
          localStorage.setItem('AgentNumber',response.data.msisdn);
          localStorage.setItem("BusinessName",response.data.agentName);
          let agentType=localStorage.getItem('agentType')
              this.router.navigate(['/agentrecords'])
            
  
        console.log("UserName is"+localStorage.getItem("username"));
        console.log("loginvalue is"+localStorage.getItem("loginvalue"));
      //   window.onpopstate = function (e) { window.history.forward(); }
  
        }
        if (response.status == "FAILED"){
          alert("Invalid UserName or Password")
        }
      },
      error =>{
          console.log(error.error.data)
        alert(error.error.data)
      }
      )
     
    }
    
             
	}

    ngOnInit(): void {
        localStorage.clear();
    }

}