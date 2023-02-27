import Joi from 'joi';
import { ORDER_STATUS, SORT_BY } from '../common/constants';
import { OrderFilter } from '../interfaces/order/order-filter.interface';
import { JoiObj } from './custom.validation';

export const schemaOrderFilter = Joi.object<OrderFilter, true>().keys({
  sortBy: Joi.number().valid(...Object.values(SORT_BY)),
  orderStatus: Joi.number().valid(...Object.values(ORDER_STATUS)),
  userId: JoiObj.string().objectId(),
  productId: JoiObj.string().objectId(),
  from: Joi.date(),
  to: Joi.date(),
  page: Joi.number().min(0),
  limit: Joi.number().min(0),
});
