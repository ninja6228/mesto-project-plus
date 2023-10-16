import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Unauthorized } from '../errors/index';

interface IRequest extends Request {
  user?: string | JwtPayload;
}

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Требуется авторизация'));
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'secretKey');
  } catch (err) {
    return next(new Unauthorized('Требуется авторизация'));
  }
  req.user = payload;
  return next();
};
