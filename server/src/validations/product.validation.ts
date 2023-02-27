import Joi from 'joi';
import { STATUS_PRODUCT } from '../common/constants';
import { IProduct } from '../interfaces/product/product.interface';
import { JoiObj } from './custom.validation';

export const schemaProduct = Joi.object<IProduct, true>({
  restaurant: JoiObj.string().objectId(),
  name: Joi.string(),
  image: Joi.string().optional(),
  price: Joi.number().min(0),
  description: Joi.string(),
  status: Joi.number().valid(...Object.values(STATUS_PRODUCT)),
  isDelete: Joi.boolean().optional(),
});
