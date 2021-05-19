import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { PopupModalService } from 'src/app/services/popup-modal.service';
@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
	ngOnDestroy() {
	}
	clickEventSubscription: Subscription;
	@ViewChild('modalData', { static: true }) modalRoot: ElementRef = new ElementRef('modalData');

	properties: any[] = []
	disciplines: any[] = []
	closeModal: string = "";
	data: any = {}
	ngOnInit() {
		this.dataService.getAllDisciplines().subscribe(data => { this.disciplines = data; console.log(this.disciplines) });
	}
	ngAfterViewInit() {

	}

	constructor(
		private modalService: NgbModal,
		public toggleModal: PopupModalService,
		private dataService: DataService
	) {
		this.clickEventSubscription = this.toggleModal.getState().subscribe(data => {
			this.triggerModal(this.modalRoot)
		})
	}

	triggerModal(content: any) {
		console.log(content)
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
		}, (res) => {
			this.toggleModal.modalState = 0;
		});
	}


	addNew() {
		console.log(this.data)
    this.dataService.addNewData(this.data, this.toggleModal.url).subscribe(resp => {
       
		})
	}



}
