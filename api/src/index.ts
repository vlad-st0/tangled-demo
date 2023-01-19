import { config } from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { TodoRouter } from './modules/todo/todo.router';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { AuthRouter } from './modules/auth/auth.router';
import { globalErrorHandler } from './utils/global.error-handler';

config();
const server = express();

export const DI = {} as {
  orm: MikroORM<MySqlDriver>;
};

(async () => {
  DI.orm = await MikroORM.init<MySqlDriver>();

  server.use(cors(), json(), (_req, _res, next) =>
    RequestContext.create(DI.orm.em, next)
  );

  server.use('/auth', AuthRouter);
  server.use('/todo', TodoRouter);
  server.use((_req, res) => res.status(404).json({ message: 'Not found :(' }));

  if (process.env.ENV != 'dev') server.use(globalErrorHandler);

  server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
})();
