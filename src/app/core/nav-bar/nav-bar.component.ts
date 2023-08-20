import { Component } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/Models/ibasket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  basketId: string | null;
  public basket?: Observable<IBasket | null>;
  cartCounter: number = 0;
  constructor(private basketService: BasketService) {
    this.basketId = localStorage.getItem('basket_id');
    this.getCountForCart();
    this.basket = this.basketService.basket$;
  }

  getCountForCart() {
    this.basket = this.basketService.basket$;
  }
}
