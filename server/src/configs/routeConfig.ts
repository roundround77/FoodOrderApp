import { Application } from 'express';
import { AuthRouter } from '../routers/auth.router';
import { RestaurantRouter } from '../routers/restaurant.router';
import { OrderRouter } from '../routers/order.router';
import { ProductRouter } from '../routers/product.router';
import { UserRouter } from '../routers/user.router';

export class RouteConfig {
  init(app: Application) {
    app.use('/auth', new AuthRouter().addRoot());
    app.use('/api/users', new UserRouter().addRoot());
    app.use('/api/products', new ProductRouter().addRoot());
    app.use('/api/orders', new OrderRouter().addRoot());
    app.use('/api/restaurants', new RestaurantRouter().addRoot());
  }
}
