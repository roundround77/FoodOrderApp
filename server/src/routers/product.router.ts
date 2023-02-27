import { HTTP_METHOD, ROLE } from '../common/constants';
import { BaseRouter } from './basic.router';
import { ProductController } from '../controllers/product.controller';
import { uploadDiskStorage } from '../middlewares/upload.middleware';
import { auth } from '../middlewares/authorization.middleware';
import { validation } from '../middlewares/validation.middleware';
import { schemaProduct } from '../validations/product.validation';
import { schemaProductFilter } from '../validations/filter-product.validation';

export class ProductRouter extends BaseRouter {
  private productController = new ProductController();

  constructor() {
    super();
    this.init();
  }

  init() {
    this.route({
      method: HTTP_METHOD.GET,
      url: '/',
      action: this.productController.getAll,
      middleware: [validation.query(schemaProductFilter)],
    });
    this.route({ method: HTTP_METHOD.GET, url: '/:id', action: this.productController.getById, middleware: [] });
    this.route({
      method: HTTP_METHOD.POST,
      url: '/',
      action: this.productController.create,
      middleware: [auth([ROLE.ADMIN]), uploadDiskStorage.single('image'), validation.body(schemaProduct, 'required')],
    });
    this.route({
      method: HTTP_METHOD.PUT,
      url: '/:id',
      action: this.productController.updateById,
      middleware: [auth([ROLE.ADMIN]), uploadDiskStorage.single('image'), validation.body(schemaProduct)],
    });
    this.route({
      method: HTTP_METHOD.DELETE,
      url: '/:id',
      action: this.productController.deleteById,
      middleware: [auth([ROLE.ADMIN])],
    });
  }
}
