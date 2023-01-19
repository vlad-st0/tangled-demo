import { Router } from 'express';

import { LoginRequest, RefreshRequest, RegisterRequest } from './auth.request';
import { login, refresh, register } from './auth.service';

export const AuthRouter = Router();

AuthRouter.post('/login', async (req: LoginRequest, res, next) => {
  try {
    res.send(await login(req.body.email, req.body.password));
  } catch (err) {
    next(err);
  }
});

AuthRouter.post('/register', async (req: RegisterRequest, res, next) => {
  try {
    res.send(
      await register(req.body.email, req.body.password, req.body.username)
    );
  } catch (err) {
    next(err);
  }
});

AuthRouter.post('/refresh', async (req: RefreshRequest, res, next) => {
  try {
    res.send(await refresh(req.body.refreshToken));
  } catch (err) {
    next(err);
  }
});
