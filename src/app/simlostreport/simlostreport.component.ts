import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-simlostreport',
  templateUrl: './simlostreport.component.html',
  styleUrls: ['./simlostreport.component.css']
})
export class SimlostreportComponent implements OnInit {

  public caseType = localStorage.getItem("caseType")
  public alerts: any[] = []; //List of alerts
	
	public detailAlert; //Current detail alert
	public searchString = '';
	public currentPage = 1;
	public imagePath;
	public imagePath1;
	public imagePath2;
	public dateStr = '';
	public fromDateStr = '';
	public toDateStr = '';
	public isLoading = true;
	public errorMsg = '';
	public fullName = localStorage.getItem('BusinessName');
	public utype = localStorage.getItem('agentType');
	public activations:any
	public msisdn = localStorage.getItem('UserNumber');
	public MSISDNSeries=''
	public agentType=localStorage.getItem('agentType')
	//Alerts bar charts variables
	public alertsTypeData: number[] = [0, 0, 0];
	public alertChartLabels: string[] = ['Successful', 'Pending', 'Failed'];
	public chartType = "pie";
	public chartColors = [{ backgroundColor: ['#3FB618', '#FF7518', '#FF0039'] }];
	public legend = true;
	div1:boolean=false;
	public statsBtntxt = 'Show Daily Stats';

	public activationCount = 0;
	public verifiedCount = 0;
	public newUsersVerified = 0;
	public oldUsersVerified = 0;
	public noDocuments = 0;
	public failedIctaError = 0;
	public totalContingencyVerified = 0;
	public residentsVerified = 0;
	public citizenVerified = 0;
	public touristVerified = 0;
	public newUsersRegistered = 0;
	public oldUsersRegistered = 0;
  docPath: any;
  docpath2: any;
	
	constructor(private alertService: AlertService, private _sanitizer: DomSanitizer, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getRecords()
	}
/**
	 * @name openDetails
	 * @desc Opens side panel with alert information
	 * @param alert Alert to open details on the side
	 */
openDetails(alert) {
  // console.log('*****',alert["Date Of Birth"]);
  this.detailAlert = alert;
  console.log(alert)
  
  if(alert.image.verifiedPhotoUrl!=null){
    this.imagePath2 = alert.image.verifiedPhotoUrl;
    this.imagePath2=this.imagePath2.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
    this.imagePath2=this.imagePath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
    console.log("img2",this.imagePath2)

  }
  if(alert.image.kycPhotoUrl!=null){
    this.imagePath1 = alert.image.kycPhotoUrl;
    this.imagePath1=this.imagePath1.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
    this.imagePath1=this.imagePath1.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
    console.log("img1",this.imagePath1)

  }
  if(alert.image.originalPhotoUrl!=null){
    this.imagePath = alert.image.originalPhotoUrl;
    this.imagePath=this.imagePath.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')	
    this.imagePath=this.imagePath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
    console.log("img",this.imagePath)

  }
  if(alert.document!=null){
	  
      if(alert.document.document20Url!=null){
      this.docPath = alert.document.document20Url;
      this.docPath = this.docPath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
      console.log("---->", alert.document.document20Url)
      }
      if(alert.document.document19Url!=null){
        this.docPath = alert.document.document19Url;
        this.docPath = this.docPath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
        console.log("---->", alert.document.document20Url)
        }

   

    }
  
}
public getRecordsRange(toDateStr: string, fromDateStr: string){
  this.errorMsg = '';
  this.isLoading = true;
  console.log(this.dateStr);
   let json = '{"ApplicationId": 24956,"FullName": "","Nationality": "Mauritius","UserType": "TOURIST","DocumentType": "Passport","DocumentId": "S68123658","Date Of Birth": "03-06-1982","Gender": "Male","OriginalPhoto": "","eKYCPhoto": "Base64","SIMDetails": {"MSISDN": "218961229","IMSI": "223712381231293","Status": "Activated"},"ApplicationDate": "2017-03-18 07:41:10","ApplicationMode": "Self","Status": "Successful"}';
   
   const format = 'yyyy/MM/dd';
   let myDate =  new Date();
   const locale = 'en-US';
   let formattedDate, formattedDate1;
   if(this.fromDateStr!='' && this.toDateStr!=''){
    formattedDate = formatDate(this.fromDateStr, format, locale);
    formattedDate1 = formatDate(this.toDateStr, format, locale);
   }else{
    formattedDate = formatDate(myDate, format, locale);
   }
   let date1 = formattedDate.replaceAll('/','-');
   let date2 = formattedDate1.replaceAll('/','-');
   
   this.http.get('https://ekyc.chili.mu:9443/api/sim/lost/damage/dateRange?from='+date1+'&to='+date2)
   .subscribe(response => {
          console.log(response);
    let str = JSON.stringify(response); 
        let json = JSON.parse(str);
      
    console.log(json.data);
    this.alerts = json.data;
    //this.activations=(this.alerts).length
    //  console.log(this.activations)
    this.isLoading = false;
    return json.data;
          
      }, error =>{
    this.isLoading = false;
    this.errorMsg = 'Data not found. Please choose another date.';
  });

  //return this.alertService.getAlerts();
  return JSON.parse(json);

}

public getRecords() {
 
  this.errorMsg = '';
  this.isLoading = true;
  console.log(this.dateStr);
 
   this.http.get('https://ekyc.chili.mu:9443/api/sim/lost/damage/case/'+this.caseType)
   .subscribe((response:any) => {
          console.log(response.data);
          this.alerts = response.data
    // let str = JSON.stringify(response); 
    //     let json = JSON.parse(str);
      
    // console.log(json.data);
    // this.alerts = json.data;
    // this.activations=(this.alerts).length
    //   console.log(this.activations)
    this.isLoading = false; 
    // return json.data;
          
      }, error =>{
    this.isLoading = false;
    this.errorMsg = 'Data not found. Please choose another date.';
  });

 
  
  }
  public refresh(){
		window.location.reload();
	  }
  public exportTableToExcel(): void {
		const downloadLink = document.createElement('a');
		const dataType = 'application/vnd.ms-excel';
		const table = document.getElementById('applications-table');
		const tableHTML = table!.outerHTML.replace(/ /g, '%20');
		const filename = 'SimLost-report.xls';
		document.body.appendChild(downloadLink);
		downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
		downloadLink.download = filename;
		downloadLink.click();
	  }

}
