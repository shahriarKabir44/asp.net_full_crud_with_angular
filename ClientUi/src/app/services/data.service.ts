import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUirls } from '../apiUrls';
import { PopupModalService } from './popup-modal.service';
import { DataHolderService } from './data-holder.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private modalService: PopupModalService,
    private dataStorage: DataHolderService
  ) { }
  addNewData(data: any, url: string): Observable<any> {
    return this.http
      .post<any>(url, data).pipe(map(resp => {
        if (this.modalService.dataType) this.dataStorage.students.push(resp);
        return resp;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  getAllDisciplines() {
    return this.http.get<any>(ApiUirls.GetAllDisciplines).pipe(map(resp => {
      return resp;
    }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
