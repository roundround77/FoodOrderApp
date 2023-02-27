import Joi from 'joi';
import { IRestaurant } from '../interfaces/restaurant/restaurant.interface';

export const schemaRestaurant = Joi.object<IRestaurant, true>({
  name: Joi.string(),
  image: Joi.string().optional(),
  description: Joi.string().optional(),
});
