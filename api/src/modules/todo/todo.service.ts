import { DI } from '../..';
import { Todo } from '../../entities/todo';
import { User } from '../../entities/user';
import { Error403 } from '../../utils/error';
import { TodoDto } from './todo.request';

export const getTodos = async () => {
  return { todos: await DI.orm.em.find(Todo, {}) };
};

export const createTodo = async (data: TodoDto, user: User) => {
  const todo = new Todo();
  todo.title = data.title;
  todo.note = data.note;
  todo.user = user;
  todo.completed = data.completed ?? false;
  todo.priority = data.priority ?? false;
  await DI.orm.em.persistAndFlush(todo);
  return { todo };
};

export const updateTodo = async (id: number, data: TodoDto, user: User) => {
  const todo = await DI.orm.em.findOneOrFail(Todo, id, { populate: ['user'] });
  if (user.id != todo.user.id) throw new Error403();
  todo.title = data.title;
  todo.note = data.note;
  todo.completed = data.completed ?? false;
  todo.priority = data.priority ?? false;
  await DI.orm.em.persistAndFlush(todo);
  return { todo };
};

export const deleteTodo = async (id: number, user: User) => {
  const todo = await DI.orm.em.findOneOrFail(Todo, id, { populate: ['user'] });
  if (user.id != todo.user.id) throw new Error403();
  await DI.orm.em.removeAndFlush(todo);
  return { message: 'removed' };
};
