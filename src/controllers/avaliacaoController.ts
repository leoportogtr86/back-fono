import { Request, Response } from 'express';
import { createAvaliacao, getAvaliacaoById, getAllAvaliacoes, updateAvaliacao, deleteAvaliacao } from '../services/avaliacaoService';
import {ICreateAvaliacaoData, IUpdateAvaliacaoData, AuthenticatedRequest, IAvaliacao} from '../interfaces';

export const createAvaliacaoHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { criancaId, data_avaliacao, descricao, resultado }: ICreateAvaliacaoData = req.body;
    const fonoaudiologoId = req.user!.id;
    try {
        const newAvaliacao: IAvaliacao = await createAvaliacao({ criancaId, data_avaliacao, descricao, resultado }, fonoaudiologoId);
        res.status(201).json(newAvaliacao);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getAvaliacaoByIdHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const fonoaudiologoId = req.user!.id;
    try {
        const avaliacao = await getAvaliacaoById(Number(id), fonoaudiologoId);
        if (!avaliacao) {
            return res.status(404).json({ error: 'Avaliação não encontrada ou não pertence ao fonoaudiólogo logado' });
        }
        res.json(avaliacao);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getAllAvaliacoesHandler = async (req: AuthenticatedRequest, res: Response) => {
    const fonoaudiologoId = req.user!.id;
    try {
        const avaliacoes = await getAllAvaliacoes(fonoaudiologoId);
        res.json(avaliacoes);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updateAvaliacaoHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { data_avaliacao, descricao, resultado }: IUpdateAvaliacaoData = req.body;
    const fonoaudiologoId = req.user!.id;
    try {
        const updatedAvaliacao = await updateAvaliacao(Number(id), { data_avaliacao, descricao, resultado }, fonoaudiologoId);
        if (!updatedAvaliacao) {
            return res.status(404).json({ error: 'Avaliação não encontrada ou não pertence ao fonoaudiólogo logado' });
        }
        res.json(updatedAvaliacao);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteAvaliacaoHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const fonoaudiologoId = req.user!.id;
    try {
        const deletedAvaliacao = await deleteAvaliacao(Number(id), fonoaudiologoId);
        if (!deletedAvaliacao) {
            return res.status(404).json({ error: 'Avaliação não encontrada ou não pertence ao fonoaudiólogo logado' });
        }
        res.json(deletedAvaliacao);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};
