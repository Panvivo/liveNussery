import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';
import { CKEditorModule } from 'ckeditor4-angular';


@NgModule({
    imports: [CommonModule, ProductRoutingModule, NgbModule.forRoot(), FormsModule, CKEditorModule],
    declarations: [ProductComponent],
	providers: [ProductService, CategoryService]
})
export class ProductModule {}
