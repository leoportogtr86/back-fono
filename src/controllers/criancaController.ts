import {Request, Response} from 'express';
import {createCrianca, getCriancaById, getAllCriancas, updateCrianca, deleteCrianca} from '../services/criancaService';
import {ICreateCriancaData, IUpdateCriancaData} from '../interfaces';

export const createCriancaHandler = async (req: Request, res: Response) => {
    const {nome, data_nascimento, responsavel_nome, responsavel_contato}: ICreateCriancaData = req.body;
    // @ts-ignore
    const fonoaudiologoId = req.user.id; // Obtém o ID do fonoaudiólogo logado
    try {
        const newCrianca = await createCrianca({
            nome,
            data_nascimento,
            responsavel_nome,
            responsavel_contato
        }, fonoaudiologoId);
        res.status(201).json(newCrianca);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({error: error.message});
    }
};

export const getCriancaByIdHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    // @ts-ignore
    const fonoaudiologoId = req.user.id; // Obtém o ID do fonoaudiólogo logado
    try {
        const crianca = await getCriancaById(Number(id), fonoaudiologoId);
        if (!crianca) {
            return res.status(404).json({error: 'Criança não encontrada ou não pertence ao fonoaudiólogo logado'});
        }
        res.json(crianca);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({error: error.message});
    }
};

export const getAllCriancasHandler = async (req: Request, res: Response) => {
    // @ts-ignore
    const fonoaudiologoId = req.user.id; // Obtém o ID do fonoaudiólogo logado
    try {
        const criancas = await getAllCriancas(fonoaudiologoId);
        res.json(criancas);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({error: error.message});
    }
};

export const updateCriancaHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {nome, data_nascimento, responsavel_nome, responsavel_contato}: IUpdateCriancaData = req.body;
    // @ts-ignore
    const fonoaudiologoId = req.user.id; // Obtém o ID do fonoaudiólogo logado
    try {
        const updatedCrianca = await updateCrianca(Number(id), {
            nome,
            data_nascimento,
            responsavel_nome,
            responsavel_contato
        }, fonoaudiologoId);
        if (!updatedCrianca) {
            return res.status(404).json({error: 'Criança não encontrada ou não pertence ao fonoaudiólogo logado'});
        }
        res.json(updatedCrianca);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({error: error.message});
    }
};

export const deleteCriancaHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    // @ts-ignore
    const fonoaudiologoId = req.user.id; // Obtém o ID do fonoaudiólogo logado
    try {
        const deletedCrianca = await deleteCrianca(Number(id), fonoaudiologoId);
        if (!deletedCrianca) {
            return res.status(404).json({error: 'Criança não encontrada ou não pertence ao fonoaudiólogo logado'});
        }
        res.json(deletedCrianca);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({error: error.message});
    }
};
