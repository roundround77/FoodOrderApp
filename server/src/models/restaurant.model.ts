import { Document, Schema, model } from 'mongoose';
import { IRestaurant } from '../interfaces/restaurant/restaurant.interface';

export interface IRestaurantModel extends IRestaurant, Document {}

const RestaurantSchema: Schema = new Schema<IRestaurant>(
  {
    name: { type: String, required: false },
    image: { type: String, required: false },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RestaurantModel = model<IRestaurantModel>('Restaurant', RestaurantSchema);

export default RestaurantModel;
