import { Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';
import { IFonoaudiologo, AuthenticatedRequest } from '../interfaces';

export const verifyTokenHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  try {
    const decoded = verifyToken(token) as IFonoaudiologo;
    req.user = decoded; // Adiciona as informações do usuário logado ao objeto req
    next();
  } catch (error) {
    // @ts-ignore
    res.status(401).json({ error: error.message });
  }
};
