// Adicione a importação para ICrianca
import { PrismaClient } from '@prisma/client';
import {
  IAvaliacao,
  ICreateAvaliacaoData,
  IUpdateAvaliacaoData,
} from '../interfaces';

const prisma = new PrismaClient();

export const createAvaliacao = async (
  data: ICreateAvaliacaoData,
  fonoaudiologoId: number,
): Promise<IAvaliacao> => {
  // Verifica se a criança está sob a responsabilidade do fonoaudiólogo logado
  const crianca = await prisma.crianca.findFirst({
    where: {
      id: data.criancaId,
      fonoaudiologo_responsavelId: fonoaudiologoId,
    },
  });
  if (!crianca) {
    throw new Error(
      'A criança não está sob a responsabilidade do fonoaudiólogo logado.',
    );
  }

  return await prisma.avaliacao.create({
    data: {
      ...data,
      data_avaliacao: new Date(data.data_avaliacao),
      fonoaudiologoId: fonoaudiologoId,
      data_criacao: new Date(),
    },
  });
};

export const getAvaliacaoById = async (
  id: number,
  fonoaudiologoId: number,
): Promise<IAvaliacao | null> => {
  // Verifica se a avaliação está associada a uma criança sob a responsabilidade do fonoaudiólogo logado
  const avaliacao = await prisma.avaliacao.findFirst({
    where: {
      id: id,
      Crianca: {
        fonoaudiologo_responsavelId: fonoaudiologoId,
      },
    },
    include: {
      Crianca: true,
    },
  });
  return avaliacao;
};

export const getAllAvaliacoes = async (
  fonoaudiologoId: number,
): Promise<IAvaliacao[]> => {
  return await prisma.avaliacao.findMany({
    where: {
      Crianca: {
        fonoaudiologo_responsavelId: fonoaudiologoId,
      },
    },
    include: {
      Crianca: true,
    },
  });
};

export const updateAvaliacao = async (
  id: number,
  data: IUpdateAvaliacaoData,
  fonoaudiologoId: number,
): Promise<IAvaliacao | null> => {
  // Verifica se a avaliação está associada a uma criança sob a responsabilidade do fonoaudiólogo logado
  const avaliacao = await prisma.avaliacao.findFirst({
    where: {
      id: id,
      Crianca: {
        fonoaudiologo_responsavelId: fonoaudiologoId,
      },
    },
    include: {
      Crianca: true,
    },
  });
  if (!avaliacao) {
    throw new Error('A avaliação não pertence ao fonoaudiólogo logado.');
  }

  return await prisma.avaliacao.update({
    where: { id },
    data: {
      ...data,
      data_avaliacao: data.data_avaliacao
        ? new Date(data.data_avaliacao)
        : undefined,
    },
  });
};

export const deleteAvaliacao = async (
  id: number,
  fonoaudiologoId: number,
): Promise<IAvaliacao | null> => {
  // Verifica se a avaliação está associada a uma criança sob a responsabilidade do fonoaudiólogo logado
  const avaliacao = await prisma.avaliacao.findFirst({
    where: {
      id: id,
      Crianca: {
        fonoaudiologo_responsavelId: fonoaudiologoId,
      },
    },
    include: {
      Crianca: true,
    },
  });
  if (!avaliacao) {
    throw new Error('A avaliação não pertence ao fonoaudiólogo logado.');
  }

  return await prisma.avaliacao.delete({
    where: { id },
  });
};
