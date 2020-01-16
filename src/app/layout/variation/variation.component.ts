import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { VariationService } from './variation.service';
import { Global } from '../../../global.component';
@Component({
    selector: 'app-variation',
    templateUrl: './variation.component.html',
    styleUrls: ['./variation.component.scss']
})
export class VariationComponent implements OnInit {
    validationError = {};
	formValue = {"parentVariationID":""};
	records:any;
	submittingForm = false;
	modalReference: any;
	header = '';
	newStatus = 0; 
	variationID = 0;
	
	alertArray = [];
	
	constructor(public modalService: NgbModal, public variationService: VariationService, public router: Router) {}

    ngOnInit() {		
		this.list();				
	};
	
	
	
	open(content, id, type, sendStatus=0) {
		this.modalReference = this.modalService.open(content);
		this.submittingForm = false;
		if(type=='changeStatus'){
			if(sendStatus==1){
				this.header = "Are you sure you want to in-activate this variation?";
			} else {
				this.header = "Are you sure you want to activate this variation?";
			}
			this.newStatus = sendStatus;			
			this.variationID = id;			
		} else if(type=='delete'){
			this.header = "Are you sure you want to delete this variation?";		
			this.variationID = id;			
		} else if(type=='edit'){			
			this.formValue = id;	
		} else if(type=='add'){			
			this.formValue = {"parentVariationID":""};
			this.formValue["variationName"] = "";
		} 
	}
	
	
	
	public changeStatus(){
		this.submittingForm = true;		
		this.variationService.changeStatus({"variationID":this.variationID, "active": this.newStatus}).subscribe(data => {			
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
		this.variationService.delete({"variationID":this.variationID}).subscribe(data => {		
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
	
	
	public getLocation(parentVariationID){
		if(parentVariationID==''){
			return '';
		} else {
			for(var i=0; i<this.records.length; i++){
				if(this.records[i]['variationID'] == parentVariationID){
					if(this.records[i]['parentVariationID']==''){
						return this.records[i]['variationName']+" => ";
					} else {
						return this.getLocation(this.records[i]['parentVariationID']) + this.records[i]['variationName']+" => ";
					}
					break;
				}
			}
		}
	}
	
	public list(){
		this.variationService.getRecords().subscribe(data => {
			if(data['error']==undefined){
				this.records = data;
				this.records = data['item'];				
				for(var i=0; i<this.records.length; i++){
					this.records[i]['location'] = this.getLocation(this.records[i]['parentVariationID']) + this.records[i]['variationName'];
				}			
			} else {
				Global.logout(this);
			}
		});
	}
	
	
	
	
	public add(){
		
		Global.formValidation(this, 'addVariation');
		if (Object.keys(this.validationError).length) {
			return;
		}
		this.submittingForm = true;
		this.variationService.addRecord(this.formValue).subscribe(data => {			
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
		Global.formValidation(this, 'addVariation');
		if (Object.keys(this.validationError).length) {
			return;
		}
		this.submittingForm = true;
		let submit = {};
		submit['variationID'] = this.formValue['variationID'];
		submit['parentVariationID'] = this.formValue['parentVariationID'];
		submit['variationName'] = this.formValue['variationName'];
		this.variationService.update(submit).subscribe(data => {			
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
