import { Injectable } from '@angular/core';
import { StudentModel } from '../Models/StudentModel';

@Injectable({
  providedIn: 'root'
})
export class DataHolderService {
  students: StudentModel[] = []
  selectedStudentID = 0;
  productsOfCurrentSudent: any[]=[];
  currentStudent: StudentModel | null = null
  currentlyViewingProduct: any = null;
  currentlyViewingCustomers: any[] = []

  currentlyViewingSubscribedProducts:any[]=[]
  constructor() { }
}
