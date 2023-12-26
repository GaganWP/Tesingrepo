import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addprefix-series',
  templateUrl: './addprefix-series.component.html',
  styleUrls: ['./addprefix-series.component.css']
})
export class AddprefixSeriesComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router ) { }

  ngOnInit() {
    if(localStorage.getItem('login')!='success'){
			this.router.navigate(['/']);
		}
  }

  addSeries(data){
    console.log(data)
    const headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
  headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

  let request={
    'msisdnPrefix':data,
    'msisdnLength':"8-digit"
  }

 this.http.post("https://ekyc.chili.mu:9443/api/specialMsisdnPost",request,{ headers: headers}).subscribe(result=>{
    let reaponse:any=result;
      console.log(reaponse.status);
    if (reaponse.status == "SUCCESSFUL"){
    alert(`+${data} Series has been Activated`)
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
