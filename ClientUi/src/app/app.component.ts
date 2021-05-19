import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { PopupModalService } from './services/popup-modal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    public popupModal: PopupModalService,
    public loader: LoaderService
  ) { }
  ngOnInit() {


  }
  ngAfterViewInit() {
  }
  toggle() {
    this.popupModal.toggleModal(1)
  }

}
