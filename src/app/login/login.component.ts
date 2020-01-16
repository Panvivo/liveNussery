import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    formValue = {};
	constructor(public router: Router, private loginService: LoginService) {}
    ngOnInit() {}
    onLoggedin() {
		this.loginService.login(this.formValue).subscribe(data => {
			if(data['error']==undefined){
				console.log(data['accessToken']);
				localStorage.setItem('isLoggedin', 'true');
				localStorage.setItem('accessToken', data['accessToken']);
				localStorage.setItem('firstName', data['firstName']);
				localStorage.setItem('lastName', data['lastName']);
				localStorage.setItem('userID', data['userID']);
				this.router.navigate(['/dashboard']);
			} else {
				console.log(data['error']);
			}
		});		
    }
}
