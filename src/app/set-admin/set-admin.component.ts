import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-set-admin',
  templateUrl: './set-admin.component.html',
  styleUrls: ['./set-admin.component.css']
})
export class SetAdminComponent implements OnInit {
  msisdnListarray: any[];

  constructor(private http: HttpClient,private router:Router) { }

  token=''
  acctid=localStorage.getItem('getacctId')
  password=localStorage.getItem('getorgpin')
  msisdn:any
  
  ngOnInit() {
    this.msisdnList(this.acctid)
  }

  setAdmin(value){
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

    let formData = new FormData();
    formData.append('username',this.acctid);
    formData.append('acctId',this.acctid);
    formData.append('msisdn',value);
    formData.append('password',this.password);
    formData.append('token',this.token);

    this.http.post('https://ekyc.chili.mu:9443/api/set/organisation/admin',formData).subscribe((data:any)=>{
      let response = data;
        alert("Admin Set SuccessFully")
        
        // updateMSISDN()
    },error=>{
      console.log("Errormsg===>",error.error.status)
      let x = error.error.status
      if(x==404 || x == "FAILED"){
        alert("Please Enter valid Admin Token")
      }

      else{
        alert("Please Try After Sometime")
      }
    })
  }



  updateMSISDN(){
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

    this.http.get('https://ekyc.chili.mu:9443/api/organisation/admin/employee/organisation/msisdn/status/update/'
    +this.token+"/"+localStorage.getItem('getorgTKN')+"/"+this.msisdn+'/taken').subscribe((data:any)=>{
      alert("Admin Set SuccessFully")

    },error=>{
       console.log("Errormsg===>",error.error.status)
      let x = error.error.status
       if(x==404){
        alert("Please Enter valid Admin Token")
      }
      else{
        alert("Please Try After Sometime")
      }

    })


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

}
