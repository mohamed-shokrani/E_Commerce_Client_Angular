import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/ipagination';
import { IProducts } from '../shared/Models/iproducts';
import { ProductModel } from '../shared/Models/ProductModel';
import { Observable, map } from 'rxjs';
import { IProductBrand } from '../shared/Models/iproduct-brand';
import { IProductTypes } from '../shared/Models/iproduct-types';
import { shopParams } from '../shared/Models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  Products: IProducts[] = [];
  baseUrl: string = 'https://localhost:7136/api/';

  constructor(private http: HttpClient) {}
  getProducts(shopParams?: shopParams) {
    let params = new HttpParams();

    if (shopParams?.brandId)
      params = params.append('brandId', shopParams.brandId.toString());
    if (shopParams?.productTypeId)
      params = params.append(
        'productTypeId',
        shopParams.productTypeId.toString()
      );

    if (shopParams?.sort) params = params.append('sort', shopParams.sort);
    if (shopParams?.pageSize)
      params = params.append('pageSize', shopParams.pageSize.toString());

    if (shopParams?.pageNumber)
      params = params.append('indexPage', shopParams?.pageNumber.toString());

    if (shopParams?.search) {
      console.log('search params');

      params = params.append('search', shopParams?.search.toString());
    }
    console.log(params);

    return (
      this.http
        .get<IPagination>(this.baseUrl + 'products', {
          observe: 'response',
          params,
        }) // what we are doing is that we are observing the response
        // this is gonna get the http response instead of the body of the response
        // so we need to project these data into our actual response
        .pipe(
          map((res) => {
            console.log(res.body);
            return res.body;
          })
        ) // manipulate the observable to get what we need the body
    );
  }
  getBrands() {
    return this.http.get<IProductBrand[]>(
      this.baseUrl + 'Products/ProductBrand'
    );
  }

  getTypes() {
    return this.http.get<IProductTypes[]>(
      this.baseUrl + 'Products/ProductTypes'
    );
  }

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
