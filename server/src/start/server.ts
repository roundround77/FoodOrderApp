import express, { Application } from 'express';
import logger from 'morgan';
import appConfig from '../configs/appConfig';
import { RouteConfig } from '../configs/routeConfig';
import errorMiddleware from '../middlewares/errorHandler.middlewares';
import path from 'path';
import cors from 'cors';
export class Server {
  private app = express();
  private middleware = [
    logger('dev'), // common, dev,
    express.urlencoded({ extended: true }),
    express.json(),
    express.static(path.join(path.resolve(), 'public')),
  ];
  private routerConfig = new RouteConfig();

  private initializeStatic() {
    this.middleware.forEach((m) => {
      this.app.use(m);
    });

    this.app.get('/check-server', (req, res) => res.json({ success: true }));
  }

  private initializeApiRouters() {
    this.app.use(cors({ origin: getCorsOrigins(), credentials: true }));
    this.routerConfig.init(this.app);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  start() {
    this.initializeStatic();
    this.initializeApiRouters();
    this.initializeErrorHandling();
    this.app.get('/*', (req, res) => {
      res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
    });
    this.app.listen(appConfig.env.port, () => console.log(`Server started on port: ${appConfig.env.port}`));
  }
}

function getCorsOrigins() {
  const origins = process.env.CORS_ORIGINS;
  if (!origins) return '*';

  return origins.split(',').map((origin) => origin.trim());
}
