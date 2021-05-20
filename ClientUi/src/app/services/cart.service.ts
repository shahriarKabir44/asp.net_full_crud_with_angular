import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUirls } from '../apiUrls';
import { DataHolderService } from './data-holder.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private dataHolder: DataHolderService
  ) { }

  getCustomersOf(id:number) {
    return this.http
      .get<any>(ApiUirls.GetCustomersOfProduct + id).pipe(map(resp => {
        this.dataHolder.currentlyViewingCustomers=resp

        return resp;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
  getProductsAddedToCart(studentId: number) {
    return this.http
      .get<any>(ApiUirls.GetProductsAddedToCart + studentId).pipe(map(resp => {
        this.dataHolder.currentlyViewingSubscribedProducts = resp

        return resp;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
