import { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
    res.send('Lista de usuários');
};

export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(`Usuário com ID: ${id}`);
};

export const createUser = (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
    res.send('Usuário criado');
};

export const updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    res.send(`Usuário com ID: ${id} atualizado`);
};

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(`Usuário com ID: ${id} deletado`);
};
