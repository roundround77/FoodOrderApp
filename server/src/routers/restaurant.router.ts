import { HTTP_METHOD, ROLE } from '../common/constants';
import { BaseRouter } from './basic.router';
import { RestaurantController } from '../controllers/restaurant.controller';
import { uploadDiskStorage } from '../middlewares/upload.middleware';
import { auth } from '../middlewares/authorization.middleware';
import { validation } from '../middlewares/validation.middleware';
import { schemaRestaurant } from '../validations/restaurant.validation';

export class RestaurantRouter extends BaseRouter {
  private restaurantController = new RestaurantController();

  constructor() {
    super();
    this.init();
  }

  init() {
    this.route({ method: HTTP_METHOD.GET, url: '/', action: this.restaurantController.getAll, middleware: [] });
    this.route({ method: HTTP_METHOD.GET, url: '/:id', action: this.restaurantController.getById, middleware: [] });
    this.route({
      method: HTTP_METHOD.POST,
      url: '/',
      action: this.restaurantController.create,
      middleware: [
        auth([ROLE.ADMIN]),
        uploadDiskStorage.single('image'),
        validation.body(schemaRestaurant, 'required'),
      ],
    });
    this.route({
      method: HTTP_METHOD.PUT,
      url: '/:id',
      action: this.restaurantController.updateById,
      middleware: [auth([ROLE.ADMIN]), uploadDiskStorage.single('image'), validation.body(schemaRestaurant)],
    });
    this.route({
      method: HTTP_METHOD.DELETE,
      url: '/:id',
      action: this.restaurantController.deleteById,
      middleware: [auth([ROLE.ADMIN])],
    });
  }
}
