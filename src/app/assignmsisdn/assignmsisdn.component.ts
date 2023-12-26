import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignmsisdn',
  templateUrl: './assignmsisdn.component.html',
  styleUrls: ['./assignmsisdn.component.css']
})
export class AssignmsisdnComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router) { }

  msisdnlist=[]
  MSISDN1:any
  MSISDN2:any
  MSISDN3:any
  MSISDN4:any
  MSISDN5:any

  ngOnInit() {
  }

  MSISDNassignForm = new FormGroup({

    MSISDN1 : new FormControl(),
    MSISDN2 : new FormControl(),
    MSISDN3 : new FormControl(),
    MSISDN4 : new FormControl(),
    MSISDN5 : new FormControl(),
  }
  )

  MSISDNassignFormSubmit(value){

    console.log(value)
    this.MSISDN1 = value.MSISDN1
    this.MSISDN2 = value.MSISDN2
    this.MSISDN3 = value.MSISDN3
    this.MSISDN4 = value.MSISDN4
    this.MSISDN5 = value.MSISDN5

    this.msisdnlist.push("230"+this.MSISDN1)
    this.msisdnlist.push("230"+this.MSISDN2)
    this.msisdnlist.push("230"+this.MSISDN3)
    this.msisdnlist.push("230"+this.MSISDN4)
    this.msisdnlist.push("230"+this.MSISDN5)


      console.log(this.msisdnlist)
      const headers = new HttpHeaders();
       headers.append('Access-Control-Allow-Origin', '*');
       headers.append('content-type','application/json');
       headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
       headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');
       let request={
          'acctId':localStorage.getItem("getacctId"),
          'msisdns':this.msisdnlist
        }
          console.log("====>",request)
   this.http.post("https://ekyc.chili.mu:9443/api/organisation/list/msisdns",request,{headers:headers}).subscribe(result=>{
    let reaponse:any=result;
      console.log(reaponse.status);
      alert('MSISDN Assigned Successfully')
        this.msisdnlist=[]
   },error =>{
    alert("Please try after Sometime")
  })
          

  }

  

}
