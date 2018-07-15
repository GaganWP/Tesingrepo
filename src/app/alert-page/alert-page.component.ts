import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
	selector: 'app-alert-page',
	templateUrl: './alert-page.component.html',
	styleUrls: ['./alert-page.component.css']
})
export class AlertPageComponent implements OnInit {

	public alerts: any[] = []; //List of alerts
	public detailAlert; //Current detail alert
	public searchString = '';
	public currentPage = 1;

	//Alerts bar charts variables
	public alertsTypeData: number[] = [0, 0, 0];
	public alertChartLabels: string[] = ['Low', 'Medium', 'High'];
	public chartType = "pie";
	public chartColors = [{ backgroundColor: ['#3FB618', '#FF7518', '#FF0039'] }];
	public legend = true;


	constructor(private alertService: AlertService) { }

	ngOnInit() {
		this.alertService.getAlerts().subscribe((data: any[]) => {
			this.alerts = data;
			
			//Loads data for charts based on severity
			let severityCount: number[] = [0, 0, 0]
			data.forEach(value => {
				switch (value.Severity) {
					case "Low": {
						severityCount[0] += 1;
						break;
					}
					case "Medium": {
						severityCount[1] += 1;
						break;
					}
					case "High": {
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
		this.detailAlert = alert;
	}

}
