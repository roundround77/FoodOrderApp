import { ORDER_STATUS } from '../../common/constants';
import { IProduct } from '../product/product.interface';

interface Product {
  productId?: IProduct;
  amount?: number;
}

export interface IOrder {
  products?: Product[];
  userId?: string;
  orderStatus?: ORDER_STATUS;
}
