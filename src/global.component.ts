/* eslint-disable */
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Validation } from './validation.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';



declare var require: any;

@Injectable()


export class Global {
	public static limitPerPage = 25;
	public static apifilename = environment['apiConfigFile'];
	public static getServerPath = 'http://localhost/liveNussery/server/';

	public static logout(childClass) {
		localStorage.removeItem('isLoggedin');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('firstName');
		localStorage.removeItem('lastName');
		localStorage.removeItem('userID');
		childClass.router.navigate(['/login']);
	}

	public static showMessage(text, type, mainObj){
		var eachAlert = {};
		eachAlert['type'] = type;
		eachAlert['msg'] = text;
		eachAlert['alertID'] = new Date().getTime();
		
		mainObj.alertArray.push(eachAlert);
		setTimeout(()=>{
			Global.closeAlert(eachAlert['alertID'],mainObj);
		},5000);
	}
	
	public static closeAlert(alertID, mainObj){
		var newAlertArray = [];
		for(let i=0; i<mainObj.alertArray.length; i++){
			if(mainObj.alertArray[i]['alertID'] != alertID){
				newAlertArray.push(mainObj.alertArray[i]);
			}
		}
		mainObj.alertArray = newAlertArray;
	}
	
	
	public static formValidation(childClass, validation) {
		validation = Validation.validationjson[validation];
		childClass.validationError = {};
		var eachValidField = Object.keys(validation);
		for (var j = 0; j < eachValidField.length; j++) {
			var val = childClass['formValue'][eachValidField[j]];
			var allValidation = validation[eachValidField[j]];
			var keyValidation = Object.keys(allValidation);
			var errorKey = eachValidField[j];
			for (var i = 0; i < keyValidation.length && childClass.validationError[errorKey] == undefined; i++) {
				var msg = allValidation[keyValidation[i]]['msg'];
				switch (keyValidation[i]) {
					case "required":
						if (val == undefined || val == '' || val == 'undefined' || val.trim() == '') {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "email":
						var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
						if (val != undefined && val != '' && !regexp.test(val)) {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "min":
						if (val != undefined && val != '' && val.length < allValidation[keyValidation[i]]['count']) {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "max":
						if (val != undefined && val != '' && val.length > allValidation[keyValidation[i]]['count']) {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "nonEmail":
						var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
						if (val != undefined && val != '' && regexp.test(val)) {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "alphaCSNumericSymbol":
						var patternCapital = /[A-Z]/g;
						var patternSmall = /[a-z]/g;
						var patternNumber = /[0-9]/g;
						var patternSymbol = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/@#]/g;
						if (val != undefined && val != '' && val.match(patternCapital) == null) {
							childClass.validationError[errorKey] = msg;
						} else if (val != undefined && val != '' && val.match(patternSmall) == null) {
							childClass.validationError[errorKey] = msg;
						} else if (val != undefined && val != '' && val.match(patternNumber) == null) {
							childClass.validationError[errorKey] = msg;
						} else if (val != undefined && val != '' && val.match(patternSymbol) == null) {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "alphaNumericOnly":
						var letters = /^[0-9a-zA-Z]+$/;
						if(!val.match(letters)) {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "oneKeyRequired":
						if (val == undefined || !Object.keys(val).length) {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "greaterThan":
						if (val != undefined && childClass.formValue[allValidation[keyValidation[i]]['field']] != undefined && childClass.formValue[allValidation[keyValidation[i]]['field']] > val) {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "positiveInteger":
						if (val != undefined && val < 0) {
							childClass.validationError[errorKey] = msg;
						}
						break;
					case "positiveIntegerOnly":
						if ((val != undefined && val < 1) || parseInt(val)!=val) {
							childClass.validationError[errorKey] = msg;
						}
						break;


					default: childClass.validationError[errorKey] = "UI error " + keyValidation[i] + " validation not defined";
				}

			}

		}
	}



}
