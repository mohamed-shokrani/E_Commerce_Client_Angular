import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShopComponent, ProductItemComponent],
  imports: [CommonModule, FormsModule],
  exports: [ShopComponent],
})
export class ShopModule {}
