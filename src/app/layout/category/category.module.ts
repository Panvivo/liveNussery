import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './category.service';


@NgModule({
    imports: [CommonModule, CategoryRoutingModule, NgbModule.forRoot(), FormsModule],
    declarations: [CategoryComponent],
	providers: [CategoryService]
})
export class CategoryModule {}
