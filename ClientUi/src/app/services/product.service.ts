import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUirls } from '../apiUrls';
import { DataHolderService } from './data-holder.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private dataHolder: DataHolderService
  ) { }
  getAllOfStudent( ): Observable<any> {
    return this.http
      .get<any>(ApiUirls.GetProductsOf + this.dataHolder.selectedStudentID).pipe(map(resp => {
        this.dataHolder.productsOfCurrentSudent = resp;

        return resp;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
  insertProduct(product: any) {
    return this.http
      .post<any>(ApiUirls.InsertProduct, product).pipe(map(resp => {
        this.dataHolder.productsOfCurrentSudent.push(resp);

        return resp;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }

   
   
}
