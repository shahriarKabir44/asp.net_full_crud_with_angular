import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; @Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  state = 0;

}
