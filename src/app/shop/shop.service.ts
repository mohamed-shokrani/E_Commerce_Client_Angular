import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/ipagination';
import { IProducts } from '../shared/Models/iproducts';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  Products: IProducts[] = [];
  baseUrl: string = 'https://localhost:7136/api/';
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get<IPagination>(this.baseUrl + 'products?pageSiz=50');
  }
}
