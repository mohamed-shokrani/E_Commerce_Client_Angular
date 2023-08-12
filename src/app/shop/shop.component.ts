import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IProducts } from '../shared/Models/iproducts';
import { ShopService } from './shop.service';
import { ProductModel } from '../shared/Models/ProductModel';
import { Observable, delay, map } from 'rxjs';
import { IProductBrand } from '../shared/Models/iproduct-brand';
import { IPagination } from '../shared/Models/ipagination';
import { IProductTypes } from '../shared/Models/iproduct-types';
import { shopParams } from '../shared/Models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  flag: boolean = false;
  Products?: IProducts[] | null;
  brands?: IProductBrand[];
  types?: IProductTypes[];
  priceAsc: string = 'priceAsc';
  priceDsc: string = 'priceDesc';
  sortByName: string = '';

  totalCount: number = 0;
  sizeNo: number = 0;
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;

  shopParams = new shopParams();
  selectedSortByPrice: string = '';
  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;

    this.getProducts();
  }
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new shopParams();
  }
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    return this.shopService.getProducts(this.shopParams).subscribe(
      (res) => {
        this.Products = res?.data;

        if (res?.count) {
          this.totalCount = res?.count;
        } else this.totalCount = 0;
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
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;

    this.getProducts();
  }

  onTypeIdSelected(typeId: number) {
    this.shopParams.productTypeId = typeId;
    this.shopParams.pageNumber = 1;

    this.getProducts();
  }
  onSortSelected() {
    this.shopParams.sort = this.selectedSortByPrice;
    this.getProducts();
  }
  private productsWithoutFilters() {
    this.shopParams.brandId = 0;
    this.shopParams.productTypeId = 0;
    this.selectedSortByPrice = '';

    return this.shopService.getProducts().subscribe(
      (res) => {
        this.Products = res?.data;
      },
      (err) => {}
    );
  }

  resetProducts() {
    this.flag = true;
    this.shopParams.pageNumber = 1;
    this.productsWithoutFilters();
    this.getProducts();
    this.flag = false;
  }
  onPageChanged(event: any) {
    if (this.shopParams.pageNumber != event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
}
