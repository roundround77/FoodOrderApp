import { Document, Schema, model } from 'mongoose';
import { STATUS_PRODUCT } from '../common/constants';
import { IProduct } from '../interfaces/product/product.interface';

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
  {
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    name: { type: String, required: false },
    image: { type: String, required: false },
    price: { type: Number, required: false },
    description: { type: String, required: false },
    status: { type: Number, enum: STATUS_PRODUCT, required: false },
    isDelete: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = model<IProductModel>('Product', ProductSchema);

export default ProductModel;
