import { IProducts } from './iproducts';

export interface IPagination {
  pageIndex: number;

  count: number;
  pageSize: number;
  data: IProducts[];
}
