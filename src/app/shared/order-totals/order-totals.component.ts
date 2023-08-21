import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotal } from '../Models/ibasket-total';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from '../Models/ibasket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss'],
})
export class OrderTotalsComponent {
  basketTotals$?: Observable<IBasketTotal | null>;
  constructor(private basketService: BasketService) {
    this.basketTotals$ = basketService.totalBasket$;
  }
}
