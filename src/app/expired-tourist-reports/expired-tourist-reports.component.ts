import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-expired-tourist-reports',
  templateUrl: './expired-tourist-reports.component.html',
  styleUrls: ['./expired-tourist-reports.component.css']
})
export class ExpiredTouristReportsComponent implements OnInit {
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
	//Alerts bar charts variables
	public alertsTypeData: number[] = [0, 0, 0];
	public alertChartLabels: string[] = ['Successful', 'Pending', 'Failed'];
	public chartType = "pie";
	public chartColors = [{ backgroundColor: ['#3FB618', '#FF7518', '#FF0039'] }];
	public legend = true;
	public count:any
	// public tourist= [
	// 	{
	// 		"passportNum": "0123456788",
	// 		"nationalityCode": "CHE",
	// 		"otherNames": "SANDRA",
	// 		"surname": "KAPPELER",
	// 		"gender": "F",
	// 		"dateIssued": "18/12/2022",
	// 		"dateExpired": "18/01/2023",
	// 		"dateOfBirth": "27/04/1996",
	// 		"activeStatus": "INACTIVE VISA/PERMIT",
	// 		"cancelReason": "cancelReason",
	// 		"pmUid": "pmuid"
	// 	}
	// ]
  constructor(private alertService: AlertService, private _sanitizer: DomSanitizer, private router: Router, private http: HttpClient) { }


  ngOnInit() {
    this.getRecords()
  }
  public refresh(){
	window.location.reload();
  }

  public getRecords(){
    this.errorMsg = '';
		this.isLoading = true;
    
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Headers','Origin, x-requested-with, authorization, content-type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE');

		 this.http.get('https://ekyc.chili.mu:9443/api/touristExpiry',{ headers: headers}).subscribe((result:any)=>{
      let response = result
      this.alerts=result[0].tourist
    //   console.log(this.alerts)
	console.log(result[0].tourist)

	//   this.count = this.alerts.length

			this.isLoading = false;

     },error =>{
			this.isLoading = false;
			this.errorMsg = 'Data not found. Please choose another date.';
		});

  }
  public exportTableToExcel(): void {
	const downloadLink = document.createElement('a');
	const dataType = 'application/vnd.ms-excel';
	const table = document.getElementById('applications-table');
	const tableHTML = table!.outerHTML.replace(/ /g, '%20');
	const filename = 'Expired-Tourist-applications.xls';
	document.body.appendChild(downloadLink);
	downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
	downloadLink.download = filename;
	downloadLink.click();
  }

}
