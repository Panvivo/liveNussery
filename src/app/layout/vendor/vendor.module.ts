import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { FormsModule } from '@angular/forms';
import { VendorService } from './vendor.service';


@NgModule({
    imports: [CommonModule, VendorRoutingModule, NgbModule.forRoot(), FormsModule],
    declarations: [VendorComponent],
	providers: [VendorService]
})
export class VendorModule {}
