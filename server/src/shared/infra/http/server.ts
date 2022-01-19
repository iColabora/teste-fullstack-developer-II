import 'reflect-metadata';
import 'dotenv/config';

import cluster from 'cluster';
import os from 'os';

import App, { logger } from './app';

const { server } = new App();

if (cluster.isPrimary && process.env.NODE_ENV !== 'development') {
  logger.info(`Primary starting on ${process.env.APP_PORT}`);

  cluster.setupPrimary({
    exec: './dist/shared/infra/http/server.js',
  });

  for (let i = 0; i < os.cpus().length; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    logger.info(`worker ${worker.process.pid} stopped working`);
    cluster.fork();
  });
} else {
  server.listen(process.env.APP_PORT, () => {
    logger.info(`Worker starting on ${process.env.APP_PORT}`);
  });
}
