import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './shared/Models/ipagination';
import { IProducts } from './shared/Models/iproducts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  Products: IProducts[] = []; //= new Array(); // = []; //= [];
  constructor(private http: HttpClient) {}

  //ng oniit is the best place to call the API
  ngOnInit(): void {
    // this.http.get<IPagination>('https://localhost:7136/api/Products').subscribe(
    //   (res: IPagination) => {
    //     console.log(res);
    //     this.Products = res.data;
    //     console.log(this.Products);
    //     console.log(typeof this.Products);
    //   },
    //   (error) => console.log(error)
    // );
  }
}
