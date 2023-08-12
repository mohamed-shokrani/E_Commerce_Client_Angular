import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/shared/Models/ProductModel';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() _itemFromParent!: ProductModel;

  constructor() {}
}
