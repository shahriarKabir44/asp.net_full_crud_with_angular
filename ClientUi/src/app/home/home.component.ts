import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DataHolderService } from '../services/data-holder.service';
import { ProductService } from '../services/product.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private studentData: StudentService,
    public dataStorage: DataHolderService,
    public productService: ProductService,
    private cartService: CartService
  ) { }

  studentList: any[] = []
  ngOnInit(): void {
    this.studentData.getAll()
      .subscribe(data => {
        this.studentList = data
        this.dataStorage.students = data
        console.log(this.dataStorage.students)
      })
  }
  showDetails(x: any) {
    this.cartService.getProductsAddedToCart(x).subscribe(res => {
      this.studentData.getStudent(x).subscribe(data => {
        this.dataStorage.currentStudent = data
        this.dataStorage.selectedStudentID = x

        this.productService.getAllOfStudent().subscribe(resp => { })
      })
    })

  }
}
