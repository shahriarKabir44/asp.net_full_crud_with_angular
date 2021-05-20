import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { CartService } from '../../services/cart.service';
import { DataHolderService } from '../../services/data-holder.service';
import { ProductDetailsPopUpService } from '../../services/product-details-pop-up.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('modalData', { static: true }) modalRoot: ElementRef = new ElementRef('modalData');
  constructor(
    private modalService: NgbModal,
    public toggleModal: ProductDetailsPopUpService,
    private dataService: DataService,
    public dataHolderService: DataHolderService,
    private cartService: CartService
  ) {

  }
  currentProduct: any = {

  }
  triggerModal(content: any) {
    console.log(content)
    this.modalService.open(content, { size: 'lg' }).result.then((res) => {
    }, (res) => {
      this.dataHolderService.currentlyViewingProduct=null
    });
  }
  isOnDeleteMode = 0
  isOnEditMode = 0;
  customers:any[]=[]
  ngOnInit(): void {
    this.cartService.getCustomersOf(this.dataHolderService.currentlyViewingProduct.ProductID)
      .subscribe(resp => {
        this.customers = this.dataHolderService.currentlyViewingCustomers
        this.currentProduct = this.dataHolderService.currentlyViewingProduct
        this.triggerModal(this.modalRoot)
      })

  }

}
