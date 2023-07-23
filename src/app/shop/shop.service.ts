import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/ipagination';
import { IProducts } from '../shared/Models/iproducts';
import { ProductModel } from '../shared/Models/ProductModel';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  Products: IProducts[] = [];
  baseUrl: string = 'https://localhost:7136/api/';

  constructor(private http: HttpClient) {}
  getAllProducts(
    brandId?: number,
    typeId?: number
  ): Observable<IPagination | null> {
    let params = new HttpParams();

    if (brandId) params.append('BrandId', brandId.toString());

    if (typeId) params.append('ProductTypeId', typeId.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(map((p) => p.body || null));
  }

  private productMapper(productsServer: IPagination): ProductModel[] {
    return productsServer.data.map((ele) => ({
      productName: ele.productName,
      description: ele.description,
      price: ele.price,
      pictureUrl: ele.pictureUrl,
      productBrandName: ele.productBrandName,
      productTypeName: ele.productTypeName,
    }));
  }
  getAllProductBrands<IProductBrand>() {
    return this.http
      .get<IProductBrand>(this.baseUrl + 'Products/ProductBrand')
      .pipe(map((ele) => ele));
  }
  getAllProductTypes<IProductTypes>() {
    return this.http
      .get<IProductTypes>(this.baseUrl + 'Products/ProductTypes')
      .pipe(map((ele) => ele));
  }
}
