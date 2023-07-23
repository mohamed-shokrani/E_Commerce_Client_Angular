import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProducts } from '../shared/Models/iproducts';
import { ShopService } from './shop.service';
import { ProductModel } from '../shared/Models/ProductModel';
import { Observable, map } from 'rxjs';
import { IProductBrand } from '../shared/Models/iproduct-brand';
import { IPagination } from '../shared/Models/ipagination';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnChanges {
  brandIdSelected: number = 0;
  typeIdSelected: number = 0;

  Products$: Observable<IProducts[] | null>;

  ProductBrands$: Observable<IProductBrand[]>; //= [];
  ProductTypes$: Observable<IProductBrand[]>; //= [];

  constructor(private shopService: ShopService) {
    this.Products$ = this.getAllpro();
    this.ProductBrands$ = this.shopService.getAllProductBrands();
    this.ProductTypes$ = this.shopService.getAllProductTypes();
  }
  ngOnInit(): void {
    return;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('from changes');
  }

  getAllpro() {
    console.log('show');
    console.log(
      `this.brandIdSelected ${this.brandIdSelected}typeIdSelected ${this.typeIdSelected} `
    );

    return this.shopService
      .getAllProducts(this.brandIdSelected, this.typeIdSelected)
      .pipe(map((ele) => ele?.data ?? null));
  }

  onBrandIdSelected(brandId: number) {
    this.brandIdSelected = brandId;

    this.Products$ = this.getAllpro();
  }

  onTypeIdSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.Products$ = this.getAllpro();
  }
}
