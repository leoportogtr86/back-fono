import { Response } from 'express';
import {
  createIntervencao,
  getIntervencaoById,
  getAllIntervencoes,
  updateIntervencao,
  deleteIntervencao,
} from '../services/intervencaoService';
import {
  ICreateIntervencaoData,
  IUpdateIntervencaoData,
  AuthenticatedRequest,
  IIntervencao,
} from '../interfaces';

export const createIntervencaoHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const {
    criancaId,
    data_intervencao,
    descricao,
    resultados_obtidos,
  }: ICreateIntervencaoData = req.body;
  const fonoaudiologoId = req.user!.id; // Obtém o ID do fonoaudiólogo logado
  try {
    const newIntervencao: IIntervencao = await createIntervencao(
      { criancaId, data_intervencao, descricao, resultados_obtidos },
      fonoaudiologoId,
    );
    res.status(201).json(newIntervencao);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getIntervencaoByIdHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { id } = req.params;
  const fonoaudiologoId = req.user!.id; // Obtém o ID do fonoaudiólogo logado
  try {
    const intervencao = await getIntervencaoById(Number(id), fonoaudiologoId);
    if (!intervencao) {
      return res
        .status(404)
        .json({
          error:
            'Intervenção não encontrada ou não pertence ao fonoaudiólogo logado',
        });
    }
    res.json(intervencao);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllIntervencoesHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const fonoaudiologoId = req.user!.id; // Obtém o ID do fonoaudiólogo logado
  try {
    const intervencoes = await getAllIntervencoes(fonoaudiologoId);
    res.json(intervencoes);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateIntervencaoHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { id } = req.params;
  const {
    data_intervencao,
    descricao,
    resultados_obtidos,
  }: IUpdateIntervencaoData = req.body;
  const fonoaudiologoId = req.user!.id; // Obtém o ID do fonoaudiólogo logado
  try {
    const updatedIntervencao = await updateIntervencao(
      Number(id),
      { data_intervencao, descricao, resultados_obtidos },
      fonoaudiologoId,
    );
    if (!updatedIntervencao) {
      return res
        .status(404)
        .json({
          error:
            'Intervenção não encontrada ou não pertence ao fonoaudiólogo logado',
        });
    }
    res.json(updatedIntervencao);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteIntervencaoHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { id } = req.params;
  const fonoaudiologoId = req.user!.id; // Obtém o ID do fonoaudiólogo logado
  try {
    const deletedIntervencao = await deleteIntervencao(
      Number(id),
      fonoaudiologoId,
    );
    if (!deletedIntervencao) {
      return res
        .status(404)
        .json({
          error:
            'Intervenção não encontrada ou não pertence ao fonoaudiólogo logado',
        });
    }
    res.json(deletedIntervencao);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
