import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProducts } from '../shared/Models/iproducts';
import { ShopService } from './shop.service';
import { ProductModel } from '../shared/Models/ProductModel';
import { Observable, map } from 'rxjs';
import { IProductBrand } from '../shared/Models/iproduct-brand';
import { IPagination } from '../shared/Models/ipagination';
import { IProductTypes } from '../shared/Models/iproduct-types';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  brandIdSelected: number = 0;
  typeIdSelected: number = 0;
  Products?: IProducts[] | null;
  brands?: IProductBrand[];
  types?: IProductTypes[];
  priceAsc: string = 'priceAsc';
  priceDsc: string = 'priceDsc';
  selectedSortByPrice: string = '';

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    return this.shopService
      .getProducts(
        this.brandIdSelected,
        this.typeIdSelected,
        this.selectedSortByPrice
      )
      .subscribe(
        (res) => {
          this.Products = res?.data;
        },
        (err) => {}
      );
  }

  getTypes() {
    return this.shopService.getTypes().subscribe(
      (res) => (this.types = [{ id: 0, name: 'All' }, ...res]),
      (err) => {}
    );
  }

  getBrands() {
    return this.shopService.getBrands().subscribe(
      (res) => (this.brands = [{ id: 0, name: 'All' }, ...res]),
      (err) => {}
    );
  }

  onBrandIdSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeIdSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }
  private productsWithouFilters() {
    return this.shopService.getProducts().subscribe(
      (res) => {
        this.Products = res?.data;
      },
      (err) => {}
    );
  }

  resetProducts() {
    return this.productsWithouFilters();
  }
}
