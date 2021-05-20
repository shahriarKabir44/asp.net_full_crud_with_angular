import { Injectable } from '@angular/core';
import { of, observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductDetailsPopUpService {
  private subject = new Subject<any>();
  constructor() { }
  toggleModal() {
    this.subject.next()
  }
  getState() {
    return this.subject.asObservable()
  }
}
