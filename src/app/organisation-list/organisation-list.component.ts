import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.css']
})
export class OrganisationListComponent implements OnInit {

  orglist:any=[]
  serachdata=''
  authimg:any=''
  incorporationimg:any=''
  addessimg:any=''
  firstname=''
  lastName=''
  TotalOrganisations:any
  constructor(private http: HttpClient,private router:Router) { }


  ngOnInit() {
    this.getAllOrganisations()
    if(localStorage.getItem('login')!='success'){
			this.router.navigate(['/']);
		}
  }

  getAllOrganisations(){
    const headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
  headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');
  
  this.http.get("https://ekyc.chili.mu:9443/api/organisationRecords")
  .subscribe(
    data=>{
            let response:any = data;
            console.log(data);
            this.orglist= data
            console.log("Total Organisations->",this.orglist.length)
            this.TotalOrganisations = this.orglist.length
            if(this.orglist.document!=null){
                this.authimg = this.orglist.document.document13Url
            }
            if(this.orglist.admin!=null){
              this.firstname = this.orglist.admin.firstName;
           }
          

          },error=>{
                    alert("Please Try After Sometime")
                    }
    )

    }
    showOrgDetails(value){
      localStorage.setItem('orgdetails',JSON.stringify(value))
      // console.log('====>',localStorage.getItem('orgdetails'))
        this.router.navigate(['/organisationDetails'])
    }

    CreatenewOrganisation(){
      this.router.navigate(['/createorganisation'])
    }




}
