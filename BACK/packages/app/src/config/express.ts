import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';

import { cors } from './cors';
import { diContainer } from './di-container';

const server = express();

server.use(cors);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

useContainer(diContainer);

server.get('/', (req: Request, res: Response) => {
  res.status(200).send('smock-router');
});

useExpressServer(server, {
  validation: true,
  classTransformer: true,
});

export { server };
