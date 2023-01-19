import { Router } from 'express';
import { verifyToken } from '../auth/auth.middleware';
import {
  CreateTodoRequest,
  DeleteTodoRequest,
  UpdateTodoRequest,
} from './todo.request';
import { createTodo, deleteTodo, getTodos, updateTodo } from './todo.service';

export const TodoRouter = Router();

TodoRouter.get('/', async (_req, res, next) => {
  try {
    res.send(await getTodos());
  } catch (err) {
    next(err);
  }
});

TodoRouter.post('/', verifyToken, async (req: CreateTodoRequest, res, next) => {
  try {
    res.send(await createTodo(req.body.todo, res.locals.user));
  } catch (err) {
    next(err);
  }
});

TodoRouter.patch(
  '/:id',
  verifyToken,
  async (req: UpdateTodoRequest, res, next) => {
    try {
      res.send(await updateTodo(+req.params.id, req.body.todo, res.locals.user));
    } catch (err) {
      next(err);
    }
  }
);

TodoRouter.delete(
  '/:id',
  verifyToken,
  async (req: DeleteTodoRequest, res, next) => {
    try {
      res.send(await deleteTodo(+req.params.id, res.locals.user));
    } catch (err) {
      next(err);
    }
  }
);
