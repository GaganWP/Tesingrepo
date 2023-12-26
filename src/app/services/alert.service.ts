import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient, private router: Router ) {}

  /**
   * @name getAlerts
   * @desc Retrieves alerts from local json file.
   */
  public getAlerts() {
    return this.http.get('./assets/alerts.json');
  }

  public isValidLogin(userName: String, password: String): boolean {

    this.http.get('./assets/users.json').subscribe((response) => {
      
      let str = JSON.stringify(response); 
      let json = JSON.parse(str);

      json.forEach(element => {
        console.log('************',element);
        if(element.userName == userName && element.password == password){
          console.log('logged in');
        localStorage.setItem('login','success');
        localStorage.setItem('user','admin');
        localStorage.setItem('fullName',element.fullName);
        localStorage.setItem('utype',element.type);
        localStorage.setItem('activations',element.activations);
        localStorage.setItem('msisdn',element.msisdn);
        this.router.navigate(['/dashboard']);
        return true;
        }
      });
      
   /*   if(json.userName == userName && json.password == password){
        console.log('logged in');
        localStorage.setItem('login','success');
        localStorage.setItem('user','admin');
        this.router.navigate(['/dashboard']);
        return true;
      } */
      
    });
    
    return false;
  }

  public validateUser(userName, pwd){
    this.http.get('./assets/users.json').subscribe((response) => {
      console.log('**********');
      let str = JSON.stringify(response); 
      let json = JSON.parse(str);
      json.forEach(element => {
        console.log('************',element);
        if(element.userName == userName && element.password == pwd){
          console.log('logged in');
          this.router.navigate(['/dashboard']);
        }
      });
      
      
      
    });
      
         
  }

  }

