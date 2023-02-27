import Joi from 'joi';
import { SORT_BY, STATUS_PRODUCT } from '../common/constants';
import { ProductFilter } from '../interfaces/product/product-filter.interface';
import { JoiObj } from './custom.validation';

export const schemaProductFilter = Joi.object<ProductFilter, true>().keys({
  name: Joi.string(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  sortBy: Joi.number().valid(...Object.values(SORT_BY)),
  restaurant: JoiObj.string().objectId(),
  status: Joi.number().valid(...Object.values(STATUS_PRODUCT)),
  page: Joi.number().min(0),
  limit: Joi.number().min(0),
});
