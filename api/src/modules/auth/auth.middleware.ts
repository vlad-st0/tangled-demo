import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { DI } from '../..';
import { User } from '../../entities/user';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: 'Missing auth header' });
    return;
  }

  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = verify(token, process.env.JWT_SECRET!) as any;
    const user = await DI.orm.em.fork().findOneOrFail(User, {
      email: decoded.email,
    });
    res.locals.user = user;
    next();
  } catch (err) {
    res.status(401).send({ message: 'Invalid token' });
    return;
  }
};
