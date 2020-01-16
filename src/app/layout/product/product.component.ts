import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';
import { Global } from '../../../global.component';
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    validationError = {};
	formValue = {"categoryID":'', productDesctiption: {"English":'<p>Product Description</p>',"Bengali":'<p>পণ্যের বর্ণনা</p>',"Hindi":'<p>उत्पाद वर्णन</p>'}};
	records : any;
	recordsCategory : any;
	submittingForm = false;
	modalReference: any;
	header = '';
	newStatus = 0; 
	productID = 0;
	activateLanguagePanel = false;
	alertArray = [];
	
	constructor(public modalService: NgbModal, public productService: ProductService, public categoryService: CategoryService, public router: Router) {}

    ngOnInit() {		
		this.list();	
		this.listCategory();
	};
	
	public backToListing(){
		this.activateLanguagePanel = false;
	}
	
	open(content, id, type, sendStatus=0) {
		this.modalReference = this.modalService.open(content);
		this.submittingForm = false;
		if(type=='changeStatus'){
			if(sendStatus==1){
				this.header = "Are you sure you want to in-activate this product?";
			} else {
				this.header = "Are you sure you want to activate this product?";
			}
			this.newStatus = sendStatus;			
			this.productID = id;			
		} else if(type=='delete'){
			this.header = "Are you sure you want to delete this product?";		
			this.productID = id;			
		} else if(type=='edit'){		
			this.formValue = JSON.parse(JSON.stringify(id));		
			if(this.formValue['productDesctiption']==undefined){
				this.formValue['productDesctiption'] = {"English":'<p>Product Description</p>',"Bengali":'<p>পণ্যের বর্ণনা</p>',"Hindi":'<p>उत्पाद वर्णन</p>'};		
			}				
			if(this.formValue['onSale']==1){
				this.formValue['onSale'] = true;
			} else {
				this.formValue['onSale'] = false;
			}
			if(this.formValue['isFeatured']==1){
				this.formValue['isFeatured'] = true;
			} else {
				this.formValue['isFeatured'] = false;
			}			
		} else if(type=='add'){			
			this.formValue = {"categoryID":'', productDesctiption: {"English":'<p>Product Description</p>',"Bengali":'<p>পণ্যের বর্ণনা</p>',"Hindi":'<p>उत्पाद वर्णन</p>'}};
			this.formValue["productName"] = "";			
		} 
	}
	
	
	
	public changeStatus(){
		this.submittingForm = true;		
		this.productService.changeStatus({"productID":this.productID, "active": this.newStatus}).subscribe(data => {			
			if(data['error']==undefined && data['success']!=undefined){				
				this.submittingForm = false;	
				this.modalReference.close();
				this.list();	
				Global.showMessage(data['success'], 'success', this);
			} else {
				this.modalReference.close();
				Global.logout(this);
			}
		});			
	}
	
	
	public delete(){
		this.submittingForm = true;		
		this.productService.delete({"productID":this.productID}).subscribe(data => {		
			this.submittingForm = false;
			if(data['error']==undefined && data['success']!=undefined){		
				Global.showMessage(data['success'], 'success', this);
				this.modalReference.close();
				this.list();				
			} else if(data['systemError']!=undefined){
				Global.showMessage(data['systemError'], 'error', this);
				this.modalReference.close();
			} else {
				this.modalReference.close();
				Global.logout(this);
			}
		});			
	}
	
	
	
	
	public list(){
		this.productService.getRecords().subscribe(data => {
			if(data['error']==undefined){
				this.records = data;
				this.records = data['item'];
				
				if(this.recordsCategory!=undefined){
					this.productToCategory();
				}			
			} else {
				Global.logout(this);
			}
		});
	}
	
	

	public productToCategory(){
		for(var i=0; i<this.records.length; i++){
			for(var j=0; j<this.recordsCategory.length; j++){
				if(this.recordsCategory[j]['categoryID'] == this.records[i]['categoryID']){
					this.records[i]['categoryLocation']	=  this.recordsCategory[j]['location'];
					break;
				}				
			}
		}
	}
	
	
	
	
	public listCategory(){
		this.categoryService.getRecords().subscribe(data => {
			if(data['error']==undefined){
				this.recordsCategory = data;
				this.recordsCategory = data['item'];				
				for(var i=0; i<this.recordsCategory.length; i++){
					this.recordsCategory[i]['location'] = this.getCategoryLocation(this.recordsCategory[i]['parentCategoryID']) + this.recordsCategory[i]['categoryName'];					
				}
				if(this.records!=undefined){
					this.productToCategory();
				}				
			} else {
				Global.logout(this);
			}
		});
	}
	
	
	public getCategoryLocation(parentCategoryID){
		if(parentCategoryID==''){
			return '';
		} else {
			for(var i=0; i<this.recordsCategory.length; i++){
				if(this.recordsCategory[i]['categoryID'] == parentCategoryID){
					if(this.recordsCategory[i]['parentCategoryID']==''){
						return this.recordsCategory[i]['categoryName']+" => ";
					} else {
						return this.getCategoryLocation(this.recordsCategory[i]['parentCategoryID']) + this.recordsCategory[i]['categoryName']+" => ";
					}
					break;
				}
			}
		}
	}
	
	public add(){
		Global.formValidation(this, 'addProduct');
		if (Object.keys(this.validationError).length) {
			return;
		}
		this.submittingForm = true;
		this.productService.addRecord(this.formValue).subscribe(data => {			
			if(data['error']==undefined && data['success']!=undefined){				
				this.submittingForm = false;	
				this.modalReference.close();
				this.list();
				Global.showMessage(data['success'], 'success', this);				
			} else {
				this.modalReference.close();
				Global.logout(this);
			}
		});			
	}
	
	
	public update(){	
		Global.formValidation(this, 'addProduct');
		if (Object.keys(this.validationError).length) {
			return;
		}
		this.submittingForm = true;	
		this.productService.update(this.formValue).subscribe(data => {			
			if(data['error']==undefined && data['success']!=undefined){				
				this.submittingForm = false;	
				this.modalReference.close();
				this.list();
				this.activateLanguagePanel = true;
				Global.showMessage(data['success'], 'success', this);				
			} else if(data['action']!=undefined && data['action']=='logout'){
				this.modalReference.close();
				Global.logout(this);
			} else {
				this.modalReference.close();
				Global.showMessage(data['error'], 'error', this);
			}
		});	
	}
}
