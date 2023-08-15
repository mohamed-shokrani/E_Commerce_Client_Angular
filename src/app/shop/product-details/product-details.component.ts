import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/Models/iproducts';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product?: IProducts;
  productId?: number;
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.set('@productDetails', ' ');
    this.route.paramMap.subscribe((params) => {
      let date = params;
      this.productId = Number(date.get('id'));
      console.log(); // Print the parameter to the console.
    });
  }
  ngOnInit(): void {
    if (this.productId) {
      this.loadProduct(this.productId);
    }
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
