import Joi from 'joi';
import { IOrder } from '../interfaces/order/order.interface';
import { JoiObj } from './custom.validation';

const schemaProduct = Joi.object({
  productId: JoiObj.string().objectId(),
  amount: Joi.number().min(0),
});

export const schemaOrder = Joi.object<IOrder, true>({
  products: Joi.array().min(1).items(schemaProduct),
  userId: Joi.string().optional(),
  orderStatus: Joi.string().optional(),
});
