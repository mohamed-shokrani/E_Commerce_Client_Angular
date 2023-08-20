import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string;
  items: IBasketItem[];
}
export interface IBasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}
// we want when we create a new basket we want to give it a unique identifier
export class Basket implements IBasket {
  id = uuidv4();
  items: IBasketItem[] = []; //new Array();
}
