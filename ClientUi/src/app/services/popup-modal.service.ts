import { Injectable } from '@angular/core';
import { of, observable, Subject } from 'rxjs';
import { ApiUirls } from '../apiUrls';

@Injectable({
  providedIn: 'root'
})
export class PopupModalService {
  header = ""
  url = " "
  dataType = 1
  modalState = 0;
  constructor() { }
  private subject = new Subject<any>();

  toggleModal(x: number) {
    this.modalState = 1;
    this.dataType = x;
    if (x) {
      this.header = "Add new Student"
      this.url = ApiUirls.AddStudent

    }
    else {
      this.header = "Add new product"
      this.url = "product"

    }
    this.subject.next()
  }
  getState() {
    return this.subject.asObservable()
  }
}
