import { Document, Schema, model } from 'mongoose';
import { ORDER_STATUS } from '../common/constants';
import { IOrder } from '../interfaces/order/order.interface';

export interface IOrderModel extends IOrder, Document {}

const OrderSchema: Schema = new Schema(
  {
    products: [
      {
        _id: false,
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        amount: { type: Number, required: false },
      },
    ],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    orderStatus: { type: Number, enum: ORDER_STATUS, default: ORDER_STATUS.PENDDING },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrderModel = model<IOrderModel>('Order', OrderSchema);

export default OrderModel;
