import { Injectable } from '@angular/core';
import { StudentModel } from '../Models/StudentModel';

@Injectable({
  providedIn: 'root'
})
export class DataHolderService {
  students: StudentModel[] = []
  selectedStudentID = 0;
  currentStudent: StudentModel|null = null
  constructor() { }
}
