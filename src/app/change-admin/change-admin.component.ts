import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-admin',
  templateUrl: './change-admin.component.html',
  styleUrls: ['./change-admin.component.css']
})
export class ChangeAdminComponent implements OnInit {

  oldtAdminToken:any
  newAdminToken:any
  constructor(private http: HttpClient,private router:Router) { }


  ngOnInit() {
  }
  changeAdmin(){
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

    this.http.get('https://ekyc.chili.mu:9443/api/update/organisation/admin/'+this.oldtAdminToken+"/"+this.newAdminToken).subscribe((data:any)=>{
      let response = data
            alert("Admin Change Successfully")
    },error=>{
      console.log("Errormsg===>",error.error.status)
      let x = error.error.status
      if(x==404 || x=="FAILED"){
        alert("Please Enter valid Admin Tokens")
      }
     
      else{
        alert("Please Try After Sometime")
      }
    })


  }

}
