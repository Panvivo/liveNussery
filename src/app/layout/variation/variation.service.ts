import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../../../global.component';


@Injectable()
export class VariationService {
	myheader: any;	
	constructor(public http:HttpClient) {
		this.myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		
		
	}
	
	getRecords(){ 
		var formValue = {};
		formValue['auth'] = {};
		formValue['auth']['accessToken'] = localStorage.getItem('accessToken');
		formValue['auth']['userID'] = localStorage.getItem('userID');
		
		
		return this.http.post(Global.getServerPath+'variation/list.php', formValue, {headers: this.myheader});
	}

	addRecord(formValue){
		formValue['auth'] = {};
		formValue['auth']['accessToken'] = localStorage.getItem('accessToken');
		formValue['auth']['userID'] = localStorage.getItem('userID');
		
		return this.http.post(Global.getServerPath+'variation/add.php', formValue, {headers: this.myheader});
	}
	
	
	changeStatus(formValue){
		formValue['auth'] = {};
		formValue['auth']['accessToken'] = localStorage.getItem('accessToken');
		formValue['auth']['userID'] = localStorage.getItem('userID');
		
		return this.http.post(Global.getServerPath+'variation/change-status.php', formValue, {headers: this.myheader});
	}
	
	delete(formValue){
		formValue['auth'] = {};
		formValue['auth']['accessToken'] = localStorage.getItem('accessToken');
		formValue['auth']['userID'] = localStorage.getItem('userID');
		
		return this.http.post(Global.getServerPath+'variation/delete.php', formValue, {headers: this.myheader});
	}
	
	update(formValue){
		formValue['auth'] = {};
		formValue['auth']['accessToken'] = localStorage.getItem('accessToken');
		formValue['auth']['userID'] = localStorage.getItem('userID');
		
		return this.http.post(Global.getServerPath+'variation/update.php', formValue, {headers: this.myheader});
	}
}
