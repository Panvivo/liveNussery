import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
		HttpClientModule,
		FormsModule
	],
    declarations: [LoginComponent],
	providers: [LoginService]
})
export class LoginModule {}
