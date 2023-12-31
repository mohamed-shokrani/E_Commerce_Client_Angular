import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IProducts } from 'src/app/shared/Models/iproducts';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  product?: IProducts;
  quantityy: number = 1;
  quantity: number = 1;

  str: string = 'hi';

  productId?: number;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private basketservice: BasketService
  ) {
    this.breadcrumbService.set('@productDetails', ' ');
    this.route.paramMap.subscribe((params) => {
      let date = params;
      this.productId = Number(date.get('id'));
      console.log(); // Print the parameter to the console.
    });
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    if (this.productId) {
      this.loadProduct(this.productId);
    }
  }
  addItemtoBasket() {
    if (this.product)
      this.basketservice.addItemToBasket(this.product, this.quantityy);
  }
  increaseItemtoBasket() {
    this.quantityy++;
  }
  decreaseItemtoBasket() {
    this.quantityy--;
  }
  loadProduct(id: number) {
    this.shopService.getProductById(id).subscribe(
      (pro) => {
        this.product = pro;
        this.breadcrumbService.set(
          '@productDetails',
          this.product?.productName
        );
      },
      (erro) => {
        console.log(erro);
      }
    );
  }
}
