import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { ProductModel } from 'src/app/shared/Models/ProductModel';
import { IProducts } from 'src/app/shared/Models/iproducts';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() _itemFromParent?: IProducts;
  addItemstoBasket() {
    if (this._itemFromParent)
      this.basketservice.addItemToBasket(this._itemFromParent);
  }
  
  constructor(private basketservice: BasketService) {}
}
