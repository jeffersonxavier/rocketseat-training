import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string,
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken || authToken.split(' ').length < 2 ||  authToken.split(' ')[0] !== 'Bearer') {
    return response.status(401).json({ errorCode: 'token.invalid' });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ errorCode: 'token.expired' });
  }
}
