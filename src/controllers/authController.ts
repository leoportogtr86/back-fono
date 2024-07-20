import { Request, Response, NextFunction } from 'express';
import { register, login, verifyToken } from '../services/authService';

export const registerHandler = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
    try {
        const user = await register(nome, email, senha);
        res.status(201).json(user);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({ error: error.message });
    }
};

export const loginHandler = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
        const { user, token } = await login(email, senha);
        res.json({ user, token });
    } catch (error) {
        // @ts-ignore
        res.status(401).json({ error: error.message });
    }
};

export const verifyTokenHandler = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    try {
        const decoded = verifyToken(token);
        // @ts-ignore
        req.user = decoded; // Adiciona as informações do usuário logado ao objeto req
        next();
    } catch (error) {
        // @ts-ignore
        res.status(401).json({ error: error.message });
    }
};
