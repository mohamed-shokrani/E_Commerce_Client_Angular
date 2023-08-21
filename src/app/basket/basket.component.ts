import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable, Subscription, map } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/Models/ibasket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  @ViewChild('quantityItem', { static: false }) quantityItem!: ElementRef;
  emptyCart: boolean = true;
  basket?: IBasketItem[];
  baskets$?: Observable<IBasket | null>;
  constructor(private basketService: BasketService) {
    this.baskets$ = this.basketService.basket$;
  }
  ngOnInit(): void {
    this.loadBasket();
  }
  loadBasket() {
    console.log(this.quantityItem?.nativeElement.value);
  }
  deceraseItemBasket(item: IBasketItem) {
    console.log('deceraseItemBasket');

    this.basketService.decreaseItemQuantity(item);
  }
  inceraseItemBasket(item: IBasketItem) {
    console.log('inceraseItemBasket');

    this.basketService.increaseItemQuantity(item);
  }
  removeItemFromBasket(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }
  deleteCart() {
    let bas = localStorage.getItem('basket_id');
    if (bas) {
      this.basketService.deleteCart(bas);
    }
  }
  checkCart() {
    this.basketService.basket$.pipe(map((ele) => (this.basket = ele?.items)));
    if (this.basket?.length) {
      if (this.basket?.length > 0) {
        this.emptyCart = false;
      }
    } else this.emptyCart = true;
  }
}
