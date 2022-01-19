import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { createServer, Server as HttpServer } from 'http';

import { errors } from 'celebrate';
import { Logger } from 'tslog';
import 'express-async-errors';

import '@shared/container';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';

import routes from '../routes';

export const logger = new Logger({
  prefix: ['[Server]'],
  displayFilePath: 'hidden',
  displayFunctionName: false,
  minLevel: process.env.NODE_ENV === 'development' ? 'silly' : 'error',
});

class App {
  public app: Express;

  public server: HttpServer;

  constructor() {
    this.app = express();

    this.init();

    this.server = createServer(this.app);
  }

  async init(): Promise<void> {
    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(
      express.json({
        limit: '100mb',
        type: ['application/json', 'text/plain'],
      })
    );
    this.app.disable('x-powered-by');
  }

  routes(): void {
    this.app.use(routes);
  }

  errors(): void {
    this.app.use(errors());
    this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      logger.error(err);

      if (err instanceof AppError) {
        const response: Record<string, any> = {
          status: 'error',
          message: err.message,
        };
        if (err.code) response.code = err.code;
        if (err.params) response.params = err.params;
        return res.status(err.statusCode).json(response);
      }

      if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      }

      throw err;
    });
  }
}

export default App;
