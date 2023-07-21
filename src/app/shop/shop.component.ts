import { Component, OnInit } from '@angular/core';
import { IProducts } from '../shared/Models/iproducts';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  Products: IProducts[] = [];

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.shopService.getAllProducts().subscribe(
      (res) => {
        this.Products = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
