import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-agentrecordspage',
  templateUrl: './agentrecordspage.component.html',
  styleUrls: ['./agentrecordspage.component.css']
})
export class AgentrecordspageComponent implements OnInit {

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
	public activations = ''
	public msisdn = localStorage.getItem('UserNumber');
	public MSISDNSeries=''
	public agentType=localStorage.getItem('agentType')
  public agentName = localStorage.getItem("username")
	//Alerts bar charts variables
	public alertsTypeData: number[] = [0, 0, 0];
	public alertChartLabels: string[] = ['Successful', 'Pending', 'Failed'];
	public chartType = "pie";
	public chartColors = [{ backgroundColor: ['#3FB618', '#FF7518', '#FF0039'] }];
	public legend = true;
	public fromDateStr = '';
	public toDateStr = '';
	
	constructor(private alertService: AlertService, private _sanitizer: DomSanitizer, private router: Router, private http: HttpClient) { }

	ngOnInit() {
console.log(this.utype)
		console.log(localStorage.getItem('login'));
		if(localStorage.getItem('login')!='success'){
			this.router.navigate(['/']);
		}
		
			this.getRecords('').subscribe((data: any[]) => {
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
		
		


		/*this.alertService.getAlerts().subscribe((data: any[]) => {
			this.alerts = data;

						
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
		})*/
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
		let vPhoto;
		if(alert.verifiedPhoto!=null){
			vPhoto= alert.verifiedPhoto_url;
		vPhoto = vPhoto.replaceAll('\'','');
		}
		//this.imagePath2 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+vPhoto);
		//this.imagePath1 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.eKYCPhoto_url);
		//this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.originalPhoto_url);
		if(alert.verifiedPhoto_url!=null){
			this.imagePath2 = alert.verifiedPhoto_url;
			this.imagePath2=this.imagePath2.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
		}
		if(alert.eKYCPhoto_url!=null){
			this.imagePath1 = alert.eKYCPhoto_url;
			this.imagePath1=this.imagePath1.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
		}
		if(alert.originalPhoto_url!=null){
			this.imagePath = alert.originalPhoto_url;
			this.imagePath=this.imagePath.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')	
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
		 
		 this.http.get('https://ekyc.chili.mu:9443/api/fetchByDate?applicationDate='+date)
		 .subscribe(response => {
            console.log(response);
			let str = JSON.stringify(response); 
      		let json = JSON.parse(str);
			console.log(json.data);
			this.alerts = json.data;
			
			this.isLoading = false;
			return json.data;
            
        }, error =>{
			this.isLoading = false;
			this.errorMsg = 'Data not found. Please choose another date.';
		});

		//return this.alertService.getAlerts();
		return JSON.parse(json);
	  }

	  public gotoActivation(alert:any){
		console.log('**************',alert);
		localStorage.setItem("datafromDashboard",JSON.stringify(alert));
		//this.activation.setAlert(alert);
	    this.router.navigate(['/activation']);
	  }

	  public gotoManage(data){
		localStorage.setItem("UserType",data)
		this.router.navigate(['/manage'])
		console.log(data);
	  }

	  public gotoPrefixManage(){
		this.router.navigate(['/prefixSeries'])
	  }
	  public refresh(){
		window.location.reload();
	  }

	  
	
	}


