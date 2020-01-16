import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class DashboardService {
	myheader: any;	
	constructor(public http:HttpClient) {
		this.myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		
		
	}
	
	login(formValue){ 
		return this.http.post('http://localhost/liveNussery/login.php', formValue, {headers: this.myheader});
	}

}
