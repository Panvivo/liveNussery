import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VariationRoutingModule } from './variation-routing.module';
import { VariationComponent } from './variation.component';
import { FormsModule } from '@angular/forms';
import { VariationService } from './variation.service';


@NgModule({
    imports: [CommonModule, VariationRoutingModule, NgbModule.forRoot(), FormsModule],
    declarations: [VariationComponent],
	providers: [VariationService]
})
export class VariationModule {}
