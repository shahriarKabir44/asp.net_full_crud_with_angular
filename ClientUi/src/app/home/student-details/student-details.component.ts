import { Component, OnInit } from '@angular/core';
import { DataHolderService } from 'src/app/services/data-holder.service';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { ProductDetailsPopUpService } from '../../services/product-details-pop-up.service';
import { ProductService } from '../../services/product.service';
import { StudentService } from '../../services/student.service';
import { ProductModel } from '../../Models/ProductModel'

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(
    public dataHolderService: DataHolderService,
    private dataService: DataService,
    private studentDataService: StudentService,
    private productService: ProductService,
    private cartService: CartService,
    private productDetailsModalService: ProductDetailsPopUpService
  ) { }

  ngOnInit(): void {
    console.log(this.dataHolderService.currentStudent)

  }
  cliseSideBar() {
    this.dataHolderService.selectedStudentID = 0
    this.dataHolderService.currentStudent = null
  }
  isOnUpdateMode = 0
  disciplines: any[] = [];

  update() {
    this.isOnUpdateMode = 1;
    this.dataService.getAllDisciplines().subscribe(data => { this.disciplines = data; });

  }
  confirmUpdate() {
    var toUpdate = {
      Name: this.dataHolderService.currentStudent?.Name,
      Id: this.dataHolderService.currentStudent?.ID,
      Email: this.dataHolderService.currentStudent?.Email,
      DisciplineId: this.dataHolderService.currentStudent?.DisciplineID
    }
    this.studentDataService.update(toUpdate).subscribe(resp => {
      this.dataHolderService.currentStudent = resp;
      this.cancelUpdate()
    })
  }
  cancelUpdate() {
    this.isOnUpdateMode = 0;
  }
  isOndeleteMode = 0
  delete() {
    this.isOndeleteMode = 1;
  }
  cancelDelete() {
    this.isOndeleteMode = 0;
  }
  newProduct = {
    OwnerId: 0,
    Name: ""
  }
  confirmAddNew() {
    this.newProduct.OwnerId = this.dataHolderService.selectedStudentID
    this.productService.insertProduct(this.newProduct).subscribe(resp => {

      this.newProduct.Name = ""
    })
  }

  confirmDelete() {
    this.studentDataService.delete().subscribe(res => {
      this.isOndeleteMode = 0;
    })
  }
  isOnInsertMode = 0
  insertMode() {
    this.isOnInsertMode = 1;
  }
  cancelInsertMode() {
    this.isOnInsertMode = 0
  }
  showDetails(prod: any) {

    this.cartService.getCustomersOf(prod.ID).subscribe(res => {
      this.dataHolderService.currentlyViewingProduct = {
      
        ProductID: prod.ID,
        OwnerID: prod.Owner,
        ProductName: prod.Name,
        OwnerName: this.dataHolderService.currentStudent?.Name
      }
     })
  }
  showSubscribedProductDetails(prod: any) {
    this.cartService.getCustomersOf(prod.ProductID).subscribe(res => {
      this.dataHolderService.currentlyViewingProduct = {
        ProductID: prod.ProductID,
        OwnerID: prod.OwnerId,
        ProductName: prod.ProductName,
        OwnerName: prod.OwnerName
      }
     })
  }
}
