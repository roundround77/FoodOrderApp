import { SORT_BY } from '../../common/constants';
import { Pagination } from '../pagtination.interface';

export interface ProductFilter extends Pagination {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SORT_BY;
  restaurant?: string;
  status?: number;
}
