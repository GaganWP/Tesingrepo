import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient ) {}

  /**
   * @name getAlerts
   * @desc Retrieves alerts from local json file.
   */
  public getAlerts() {
    return this.http.get('./assets/alerts.json');
  }
}
