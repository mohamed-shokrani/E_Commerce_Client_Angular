import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/envioronments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/Models/ibasket';
import { IProducts } from '../shared/Models/iproducts';
import { IBasketTotal } from '../shared/Models/ibasket-total';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  private basketTotalSource = new BehaviorSubject<IBasketTotal | null>(null);
  totalBasket$ = this.basketTotalSource.asObservable();

  basket$ = this.basketSource.asObservable();
  constructor(private http: HttpClient) {}
  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
        console.log(basket);

        this.calculateTotals();
        // console.log(basket);
      },
    });
  }
  getBasketItems(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id);
  }
  setBasket(basket: IBasket) {
    // let observer = {
    //   next: (res: Basket) => {
    //     this.basketSource.next(res);
    //   },
    // };
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe({
      next: (res: Basket) => {
        this.basketSource.next(res);
        console.log('re');

        console.log(res);

        this.calculateTotals();
      },
    });
  }
  increaseItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBaseketValue();
    let findItemIndex = basket?.items.findIndex((x) => x.id === item.id);

    if (typeof findItemIndex === 'number' && findItemIndex >= 0) {
      if (basket?.items[findItemIndex].quantity) {
        basket.items[findItemIndex].quantity++;
        this.setBasket(basket);
      }
    }
  }
  decreaseItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBaseketValue();
    const findItemIndex = basket?.items.findIndex((x) => x.id === item.id);
    if (typeof findItemIndex === 'number' && findItemIndex >= 0) {
      if (basket?.items[findItemIndex].quantity) {
        if (basket?.items[findItemIndex].quantity > 1) {
          basket.items[findItemIndex].quantity--;
          this.setBasket(basket);
        } else {
          this.removeItemFromBasket(item);
        }
      }
    }
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBaseketValue();
    if (basket?.items.some((x) => x.id === item.id)) {
      basket.items = basket.items.filter((x) => x.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket) {
    this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(
      () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteCart(str: string) {
    this.http.delete(this.baseUrl + 'basket?id=' + str).subscribe(
      () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem(str);
      },
      (err) => {
        console.log(err);
      }
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
  private calculateTotals() {
    let items = this.basket$.pipe(map((ele) => ele?.items));
    let basketItem = this.getCurrentBaseketValue();
    // let subtotal = 0;
    const subtotal = basketItem?.items.reduce(
      (a, b) => b.quantity * b.price + a,
      0
    );
    // basketItem?.items.map((ele) => (subtotal += ele.quantity * ele.price));

    const shipping = 0;
    let total = 0;
    if (typeof subtotal === 'number') total = subtotal + shipping;

    if (subtotal) this.basketTotalSource.next({ shipping, total, subtotal });
  }
}
