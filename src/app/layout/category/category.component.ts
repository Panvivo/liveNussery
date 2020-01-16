import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';
import { Global } from '../../../global.component';
@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    validationError = {};
	formValue = {"parentCategoryID":""};
	records:any;
	submittingForm = false;
	modalReference: any;
	header = '';
	newStatus = 0; 
	categoryID = 0;
	
	alertArray = [];
	
	constructor(public modalService: NgbModal, public categoryService: CategoryService, public router: Router) {}

    ngOnInit() {		
		this.list();				
	};
	
	
	
	open(content, id, type, sendStatus=0) {
		this.modalReference = this.modalService.open(content);
		this.submittingForm = false;
		if(type=='changeStatus'){
			if(sendStatus==1){
				this.header = "Are you sure you want to in-activate this category?";
			} else {
				this.header = "Are you sure you want to activate this category?";
			}
			this.newStatus = sendStatus;			
			this.categoryID = id;			
		} else if(type=='delete'){
			this.header = "Are you sure you want to delete this category?";		
			this.categoryID = id;			
		} else if(type=='edit'){			
			this.formValue = id;	
		} else if(type=='add'){			
			this.formValue = {"parentCategoryID":""};
			this.formValue["categoryName"] = "";
		} 
	}
	
	
	
	public changeStatus(){
		this.submittingForm = true;		
		this.categoryService.changeStatus({"categoryID":this.categoryID, "active": this.newStatus}).subscribe(data => {			
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
		this.categoryService.delete({"categoryID":this.categoryID}).subscribe(data => {		
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
	
	
	public getLocation(parentCategoryID){
		if(parentCategoryID==''){
			return '';
		} else {
			for(var i=0; i<this.records.length; i++){
				if(this.records[i]['categoryID'] == parentCategoryID){
					if(this.records[i]['parentCategoryID']==''){
						return this.records[i]['categoryName']+" => ";
					} else {
						return this.getLocation(this.records[i]['parentCategoryID']) + this.records[i]['categoryName']+" => ";
					}
					break;
				}
			}
		}
	}
	
	public list(){
		this.categoryService.getRecords().subscribe(data => {
			if(data['error']==undefined){
				this.records = data;
				this.records = data['item'];				
				for(var i=0; i<this.records.length; i++){
					this.records[i]['location'] = this.getLocation(this.records[i]['parentCategoryID']) + this.records[i]['categoryName'];
				}			
			} else {
				Global.logout(this);
			}
		});
	}
	
	
	
	
	public add(){
		
		Global.formValidation(this, 'addCategory');
		if (Object.keys(this.validationError).length) {
			return;
		}
		this.submittingForm = true;
		this.categoryService.addRecord(this.formValue).subscribe(data => {			
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
		Global.formValidation(this, 'addCategory');
		if (Object.keys(this.validationError).length) {
			return;
		}
		this.submittingForm = true;
		let submit = {};
		submit['categoryID'] = this.formValue['categoryID'];
		submit['parentCategoryID'] = this.formValue['parentCategoryID'];
		submit['categoryName'] = this.formValue['categoryName'];
		this.categoryService.update(submit).subscribe(data => {			
			if(data['error']==undefined && data['success']!=undefined){				
				this.submittingForm = false;	
				this.modalReference.close();
				this.list();
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
