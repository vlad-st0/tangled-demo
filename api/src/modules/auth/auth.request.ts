import { Request } from 'express';

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    username: string;
  };
}

export interface RefreshRequest extends Request {
  body: {
    refreshToken: string;
  };
}
