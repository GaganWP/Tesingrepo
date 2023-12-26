import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-contingency',
  templateUrl: './contingency.component.html',
  styleUrls: ['./contingency.component.css']
})
export class ContingencyComponent implements OnInit {

	public alerts: any[] = []; //List of alerts
	public detailAlert; //Current detail alert
	public searchString = '';
	public currentPage = 1;
	public imagePath;
	public imagePath1;
	public imagePath2;
	public dateStr = '';
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
	public fromDateStr = '';
	public toDateStr = '';
	docPath: any;
	docpath2: any;
	
	constructor(private alertService: AlertService, private _sanitizer: DomSanitizer, private router: Router, private http: HttpClient) { }

	ngOnInit() {
console.log(this.utype)
		console.log(localStorage.getItem('login'));
		if(localStorage.getItem('login')!='success'){
			this.router.navigate(['/']);
		}
		
			this.getAllRecords().subscribe((data: any[]) => {
				this.alerts = data;
				console.log('********',data);
							
				//Loads data for charts based on severity
				let severityCount: number[] = [0, 0, 0]
				data.forEach(value => {
					switch (value.Status) {
						case "Successful": {
							severityCount[0] += 1;
							break;
						}
						case "Pending": {
							severityCount[1] += 1;
							break;
						}
						case "Failed": {
							severityCount[2] += 1;
							break;
						}
						default: {
							console.log("Encountered different status: ", value.Severity);
						}
					}
				});
				this.alertsTypeData = severityCount;
			})
		
		


		
	}

	/**
	 * @name openDetails
	 * @desc Opens side panel with alert information
	 * @param alert Alert to open details on the side
	 */
	openDetails(alert) {
		console.log('*****',alert["Date Of Birth"]);
		this.detailAlert = alert;
		console.log(alert)
		console.log("===>",this.detailAlert)

		let vPhoto;
		

		if(alert.image.kycPhotoUrl!=null){
			this.imagePath2 = alert.image.kycPhotoUrl;
			this.imagePath2=this.imagePath2.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
		  }
		  if(alert.image.originalPhotoUrl!=null){
			this.imagePath1 = alert.image.originalPhotoUrl;
			this.imagePath1=this.imagePath1.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
		  }
			  
		  if(alert.image.verifiedPhotoUrl!=null){
			this.imagePath = alert.image.verifiedPhotoUrl;
			this.imagePath=this.imagePath.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')  
		  }
			  
		  if(alert.document!=null){
	  
			if(alert.document.length>0)
			{
			  if(alert.documentDetailList[0].docImage_url!=null){
				this.docPath = alert.documentDetailList[0].docImage_url;
				this.docPath = this.docPath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
			  }
			
			  if(alert.documentDetailList[1].docImage_url!=null ){
			  this.docpath2 = alert.documentDetailList[1].docImage_url;
			  this.docpath2 = this.docpath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
			}
			   }
			   else{
				if(alert.document.document4Url!=null){
				  this.docPath = alert.document.document4Url;
				  this.docPath = this.docPath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
				}
			   }
			}
		
	}

	public getRecordsRange(toDateStr: string, fromDateStr: string){
		this.errorMsg = '';
		this.isLoading = true;
		console.log(this.dateStr);
		 let json = '{"ApplicationId": 24956,"FullName": "","Nationality": "Mauritius","UserType": "TOURIST","DocumentType": "Passport","DocumentId": "S68123658","Date Of Birth": "03-06-1982","Gender": "Male","OriginalPhoto": "","eKYCPhoto": "Base64","SIMDetails": {"MSISDN": "218961229","IMSI": "223712381231293","Status": "Activated"},"ApplicationDate": "2017-03-18 07:41:10","ApplicationMode": "Self","Status": "Successful"}';
		 
		 const format = 'dd/MM/yyyy';
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
		 
		 this.http.get('https://ekyc.chili.mu:9443/api/fetchByDateRange?applicationDate1='+date1+'&applicationDate2='+date2)
		 .subscribe(response => {
            console.log(response);
			let str = JSON.stringify(response); 
      		let json = JSON.parse(str);
			  
			console.log(json.data);
			this.alerts = json;
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

	public getRecords(dateStr: string) {
		this.errorMsg = '';
		this.isLoading = true;
		console.log(this.dateStr);
		 let json = '{"ApplicationId": 24956,"FullName": "","Nationality": "Mauritius","UserType": "TOURIST","DocumentType": "Passport","DocumentId": "S68123658","Date Of Birth": "03-06-1982","Gender": "Male","OriginalPhoto": "","eKYCPhoto": "Base64","SIMDetails": {"MSISDN": "218961229","IMSI": "223712381231293","Status": "Activated"},"ApplicationDate": "2017-03-18 07:41:10","ApplicationMode": "Self","Status": "Successful"}';
		 
		 const format = 'dd/MM/yyyy';
		 let myDate =  new Date();
		 const locale = 'en-US';
		 let formattedDate;
		 if(this.dateStr!=''){
		  formattedDate = formatDate(this.dateStr, format, locale);
		 }else{
			formattedDate = formatDate(myDate, format, locale);
		 }
		 let date = formattedDate.replaceAll('/','-');
		 
		 this.http.get('https://ekyc.chili.mu:9443/api/contingencySuccessDate?date='+date)
		 .subscribe(response => {
            console.log(response);
			let str = JSON.stringify(response); 
      		let json = JSON.parse(str);
			  
			console.log(json);
			this.alerts = json;
			this.activations=(this.alerts).length
			  console.log(this.activations)
			this.isLoading = false;
			return json;
            
        }, error =>{
			this.isLoading = false;
			this.errorMsg = 'Data not found. Please choose another date.';
		});

		//return this.alertService.getAlerts();
		return JSON.parse(json);
	  }

	  public getAllRecords() {
		this.errorMsg = '';
		this.isLoading = true;
		console.log(this.dateStr);
		 let json = '{"ApplicationId": 24956,"FullName": "","Nationality": "Mauritius","UserType": "TOURIST","DocumentType": "Passport","DocumentId": "S68123658","Date Of Birth": "03-06-1982","Gender": "Male","OriginalPhoto": "","eKYCPhoto": "Base64","SIMDetails": {"MSISDN": "218961229","IMSI": "223712381231293","Status": "Activated"},"ApplicationDate": "2017-03-18 07:41:10","ApplicationMode": "Self","Status": "Successful"}';
		 
		 const format = 'dd/MM/yyyy';
		 let myDate =  new Date();
		 const locale = 'en-US';
		 let formattedDate;
		 if(this.dateStr!=''){
		  formattedDate = formatDate(this.dateStr, format, locale);
		 }else{
			formattedDate = formatDate(myDate, format, locale);
		 }
		 let date = formattedDate.replaceAll('/','-');
		 
		 this.http.get('https://ekyc.chili.mu:9443/api/allcontingencySuccess')
		 .subscribe(response => {
            console.log(response);
			let str = JSON.stringify(response); 
      		let json = JSON.parse(str);
			  
			console.log(json);
			this.alerts = json;
			this.activations=(this.alerts).length
			  console.log(this.activations)
			this.isLoading = false;
			return json;
            
        }, error =>{
			this.isLoading = false;
			this.errorMsg = 'Data not found. Please choose another date.';
		});

		//return this.alertService.getAlerts();
		return JSON.parse(json);
	  }
	  public refresh(){
		window.location.reload();
	  }
	

	  public gotoActivation(alert:any){
		console.log('**************',alert);
		localStorage.setItem("datafromDashboard",JSON.stringify(alert));
		//this.activation.setAlert(alert);
	    this.router.navigate(['/continingencyactivation']);
	  }

	  public exportTableToExcel(): void {
		const downloadLink = document.createElement('a');
		const dataType = 'application/vnd.ms-excel';
		const table = document.getElementById('applications-table');
		const tableHTML = table!.outerHTML.replace(/ /g, '%20');
		const filename = 'contingency-applications.xls';
		document.body.appendChild(downloadLink);
		downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
		downloadLink.download = filename;
		downloadLink.click();
	  }
}
