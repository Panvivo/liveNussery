import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { VendorService } from './vendor.service';
import { Global } from '../../../global.component';
@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
    validationError = {};
	formValue = {"parentVendorID":""};
	records:any;
	submittingForm = false;
	modalReference: any;
	header = '';
	newStatus = 0; 
	vendorID = 0;
	
	alertArray = [];
	
	constructor(public modalService: NgbModal, public vendorService: VendorService, public router: Router) {}

    ngOnInit() {		
		this.list();				
	};
	
	
	
	open(content, id, type, sendStatus=0) {
		this.modalReference = this.modalService.open(content);
		this.submittingForm = false;
		if(type=='changeStatus'){
			if(sendStatus==1){
				this.header = "Are you sure you want to suspend this vendor?";
			} else {
				this.header = "Are you sure you want to give access this vendor?";
			}
			this.newStatus = sendStatus;			
			this.vendorID = id;			
		} else if(type=='edit'){			
			this.formValue = id;	
		} else if(type=='add'){			
			this.formValue = {"parentVendorID":""};
			this.formValue["vendorName"] = "";
		} 
	}
	
	
	
	public changeStatus(){
		this.submittingForm = true;		
		this.vendorService.changeStatus({"vendorID":this.vendorID, "active": this.newStatus}).subscribe(data => {			
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
		this.vendorService.delete({"vendorID":this.vendorID}).subscribe(data => {		
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
	
	
	public getLocation(parentVendorID){
		if(parentVendorID==''){
			return '';
		} else {
			for(var i=0; i<this.records.length; i++){
				if(this.records[i]['vendorID'] == parentVendorID){
					if(this.records[i]['parentVendorID']==''){
						return this.records[i]['vendorName']+" => ";
					} else {
						return this.getLocation(this.records[i]['parentVendorID']) + this.records[i]['vendorName']+" => ";
					}
					break;
				}
			}
		}
	}
	
	public list(){
		this.vendorService.getRecords().subscribe(data => {
			if(data['error']==undefined){
				this.records = data;
				this.records = data['item'];				
				for(var i=0; i<this.records.length; i++){
					this.records[i]['location'] = this.getLocation(this.records[i]['parentVendorID']) + this.records[i]['vendorName'];
				}			
			} else {
				Global.logout(this);
			}
		});
	}
	
	
	
	
	public add(){
		
		Global.formValidation(this, 'addVendor');
		if (Object.keys(this.validationError).length) {
			return;
		}
		this.submittingForm = true;
		this.vendorService.addRecord(this.formValue).subscribe(data => {			
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
		Global.formValidation(this, 'addVendor');
		if (Object.keys(this.validationError).length) {
			return;
		}
		this.submittingForm = true;
		let submit = {};
		submit['vendorID'] = this.formValue['vendorID'];
		submit['parentVendorID'] = this.formValue['parentVendorID'];
		submit['vendorName'] = this.formValue['vendorName'];
		this.vendorService.update(submit).subscribe(data => {			
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
