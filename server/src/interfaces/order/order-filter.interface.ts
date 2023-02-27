import { ORDER_STATUS, SORT_BY } from '../../common/constants';
import { Pagination } from '../pagtination.interface';

export interface OrderFilter extends Pagination {
  from?: Date;
  to?: Date;
  orderStatus?: ORDER_STATUS;
  userId?: string;
  productId?: string;
  sortBy?: SORT_BY;
}
