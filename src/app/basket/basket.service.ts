import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/envioronments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/Models/ibasket';
import { IProducts } from '../shared/Models/iproducts';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();
  constructor(private http: HttpClient) {}
  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
        console.log(basket);
      },
    });
  }
  getBasketItems(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id);
  }
  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe(
      (res: Basket) => {
        this.basketSource.next(res);
      },
      (err) => {}
    );
  }
  getCurrentBaseketValue() {
    return this.basketSource.value;
  }
  addItemToBasket(item: IProducts, quantity = 1) {
    const itemToadd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    const basket = this.getCurrentBaseketValue() ?? this.createnewBasket();
    basket.items = this.addOrUpdateItems(basket.items, itemToadd, quantity);
    this.setBasket(basket);
  }
  private addOrUpdateItems(
    items: IBasketItem[],
    itemToadd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items.findIndex((i) => i.id === itemToadd.id);
    if (index === -1) {
      itemToadd.quantity = quantity;
      items.push(itemToadd);
    } else {
      items[index].quantity += quantity;
    }
    // console.log('itemToadd');
    // console.log(itemToadd.id);
    // console.log('items');
    // console.log(items);

    return items;
  }
  private mapProductItemToBasketItem(item: IProducts, quantity: number) {
    return {
      id: item.productId,
      productName: item.productName,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: 0,
      type: item.productTypeName,
      brand: item.productBrandName,
    };
  }
  private createnewBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
}
