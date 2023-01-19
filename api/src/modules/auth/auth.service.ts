import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { DI } from '../..';
import { User } from '../../entities/user';

const generateJwt = (email: string, type: string, duration: string) => {
  return sign({ email: email, type: type }, process.env.JWT_SECRET!, {
    expiresIn: duration,
  });
};

const generateAccessToken = (email: string) => {
  return generateJwt(email, 'access', '12h');
};

const generateRefreshToken = (email: string) => {
  return generateJwt(email, 'refresh', '7d');
};

export const register = async (
  email: string,
  password: string,
  username: string
) => {
  if (await DI.orm.em.findOne(User, { email: email })) {
    return { status: 'user already registered' };
  }

  const user = new User();
  user.email = email;
  user.username = username;
  user.password = await hash(password, 10);
  DI.orm.em.persist(user);
  await DI.orm.em.flush();

  return {
    accessToken: generateAccessToken(email),
    refreshToken: generateRefreshToken(email),
    user: user,
  };
};

export const login = async (email: string, password: string) => {
  const user = await DI.orm.em.findOne(User, { email: email });
  if (!user || !(await compare(password, user.password))) {
    throw new Error('email or password wrong');
  }

  return {
    accessToken: generateAccessToken(email),
    refreshToken: generateRefreshToken(email),
    user: user,
  };
};

export const refresh = async (refreshToken: string) => {
  const jwtPayload: any = verify(refreshToken, process.env.JWT_SECRET!);
  const user = await DI.orm.em.findOne(User, { email: jwtPayload.email });
  if (!user || jwtPayload.type !== 'refresh') {
    throw new Error(':(');
  }

  return {
    accessToken: generateAccessToken(jwtPayload.email),
  };
};
