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
}
