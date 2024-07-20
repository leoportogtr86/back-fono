import {Request, Response} from 'express';
import {
    getAllFonoaudiologos,
    getFonoaudiologoById,
    createFonoaudiologo,
    updateFonoaudiologo,
    deleteFonoaudiologo
} from '../services/fonoaudiologoService';

export const getAllFonoaudiologosHandler = async (req: Request, res: Response) => {
    const fonoaudiologos = await getAllFonoaudiologos();
    res.json(fonoaudiologos);
};

export const getFonoaudiologoByIdHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const fonoaudiologo = await getFonoaudiologoById(Number(id));
    res.json(fonoaudiologo);
};

export const createFonoaudiologoHandler = async (req: Request, res: Response) => {
    const {nome, email, senha} = req.body;
    const newFonoaudiologo = await createFonoaudiologo({nome, email, senha});
    res.json(newFonoaudiologo);
};

export const updateFonoaudiologoHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {nome, email, senha} = req.body;
    const updatedFonoaudiologo = await updateFonoaudiologo(Number(id), {nome, email, senha});
    res.json(updatedFonoaudiologo);
};

export const deleteFonoaudiologoHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const deletedFonoaudiologo = await deleteFonoaudiologo(Number(id));
    res.json(deletedFonoaudiologo);
};
