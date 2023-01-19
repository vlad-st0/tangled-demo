import { Request } from 'express';

export interface TodoDto {
  title: string;
  note?: string;
  completed?: boolean;
  priority?: boolean;
}

export interface CreateTodoRequest extends Request {
  body: {
    todo: TodoDto;
  };
}

export interface UpdateTodoRequest extends CreateTodoRequest {
  params: {
    id: string;
  };
}

export interface DeleteTodoRequest extends Request {
  params: {
    id: string;
  };
}
