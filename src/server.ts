import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response } from 'express';
import http from 'http';
import { ENV } from '@config/env';
import { setupSwagger } from '@config/swagger';
import { AppDataSource } from '@database/data-source';
import routes from './routes';
import { errorHandler } from '@middlewares/error-handler';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = ENV.PORT;

  app.use(cors());
  app.use(express.json());

  app.get('/livez', (req, res) => {
    res.status(200).send('Live');
  });

  app.get('/readyz', (req, res) => {
    const dbReady = AppDataSource.isInitialized;
    if (dbReady) {
      res.status(200).send('Ready');
    } else {
      res.status(500).send('Not Ready');
    }
  });

  app.use(routes);
  setupSwagger(app);

  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello Service!(v 0.1.1)');
  });

  app.use(errorHandler);

  const server = http.createServer(app);

  AppDataSource.initialize()
    .then(async () => {
      console.log('[Database] Connected.');
    })
    .catch((err) => {
      console.error('[Database] Connection failed:', err);
    });

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
