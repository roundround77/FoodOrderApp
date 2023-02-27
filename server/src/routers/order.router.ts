import { HTTP_METHOD, ROLE } from '../common/constants';
import { BaseRouter } from './basic.router';
import { OrderController } from '../controllers/order.controller';
import { auth } from '../middlewares/authorization.middleware';
import { validation } from '../middlewares/validation.middleware';
import { schemaOrder } from '../validations/order.validation';
import { schemaOrderFilter } from '../validations/filter-order.validation';

export class OrderRouter extends BaseRouter {
  private orderController = new OrderController();

  constructor() {
    super();
    this.init();
  }

  init() {
    this.route({
      method: HTTP_METHOD.GET,
      url: '/',
      action: this.orderController.getAll,
      middleware: [auth([ROLE.ADMIN, ROLE.USER]), validation.query(schemaOrderFilter)],
    });
    this.route({
      method: HTTP_METHOD.GET,
      url: '/:id',
      action: this.orderController.getById,
      middleware: [auth([ROLE.ADMIN, ROLE.USER])],
    });
    this.route({
      method: HTTP_METHOD.GET,
      url: '/my-order',
      action: this.orderController.getByUser,
      middleware: [auth([])],
    });
    this.route({
      method: HTTP_METHOD.POST,
      url: '/',
      action: this.orderController.create,
      middleware: [auth([]), validation.body(schemaOrder, 'required')],
    });
    this.route({
      method: HTTP_METHOD.PUT,
      url: '/:id',
      action: this.orderController.updateById,
      middleware: [auth([]), validation.body(schemaOrder)],
    });
    this.route({
      method: HTTP_METHOD.DELETE,
      url: '/:id',
      action: this.orderController.deleteById,
      middleware: [auth([])],
    });
  }
}
