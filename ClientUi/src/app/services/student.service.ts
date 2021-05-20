import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUirls } from '../apiUrls';
import { DataHolderService } from './data-holder.service';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient,
    private dataHolder: DataHolderService
  ) { }
  getAll(): Observable<any> {
    return this.http
      .get<any>(ApiUirls.GetAllStudents).pipe(map(resp => {
        this.dataHolder.students = resp;

        return resp;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
  getStudent(id: number) {
    return this.http
      .get<any>(ApiUirls.GetStudentById + id).pipe(map(resp => {
        this.dataHolder.selectedStudentID = resp.ID;
        this.dataHolder.currentStudent = resp
        return resp;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
  update(student: any) {
    return this.http
      .post<any>(ApiUirls.UpdateStudent, student).pipe(map(resp => {
        for (let n = 0; n < this.dataHolder.students.length; n++) {
          if (this.dataHolder.students[n].ID == resp.ID) {
            this.dataHolder.students[n] = resp;
            break;
          }
        }

        return resp;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  delete() {
    return this.http
      .get<any>(ApiUirls.DeleteStudent + this.dataHolder.selectedStudentID).pipe(map(resp => {
        if (resp) {

          var index = 0;
          var temp = []
          for (let n = 0; n < this.dataHolder.students.length; n++) {

            if (this.dataHolder.students[n].ID != this.dataHolder.selectedStudentID) {
              temp.push(this.dataHolder.students[n])
            }
          }
          this.dataHolder.students = temp;
          this.dataHolder.selectedStudentID = 0;

          this.dataHolder.currentStudent = null;
        }

        return resp;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
