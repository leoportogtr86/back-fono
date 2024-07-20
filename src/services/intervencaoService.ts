import { PrismaClient } from '@prisma/client';
import {
  IIntervencao,
  ICreateIntervencaoData,
  IUpdateIntervencaoData,
} from '../interfaces';

const prisma = new PrismaClient();

export const createIntervencao = async (
  data: ICreateIntervencaoData,
  fonoaudiologoId: number,
): Promise<IIntervencao> => {
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

  return await prisma.intervencao.create({
    data: {
      ...data,
      data_intervencao: new Date(data.data_intervencao), // Converte a string ISO 8601 para um objeto Date
      fonoaudiologoId: fonoaudiologoId, // Usa o ID do fonoaudiólogo logado
      data_criacao: new Date(), // Define a data de criação como a data e hora atual
    },
  });
};

export const getIntervencaoById = async (
  id: number,
  fonoaudiologoId: number,
): Promise<IIntervencao | null> => {
  // Verifica se a intervenção está associada a uma criança sob a responsabilidade do fonoaudiólogo logado
  const intervencao = await prisma.intervencao.findFirst({
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
  return intervencao;
};

export const getAllIntervencoes = async (
  fonoaudiologoId: number,
): Promise<IIntervencao[]> => {
  return await prisma.intervencao.findMany({
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

export const updateIntervencao = async (
  id: number,
  data: IUpdateIntervencaoData,
  fonoaudiologoId: number,
): Promise<IIntervencao | null> => {
  // Verifica se a intervenção está associada a uma criança sob a responsabilidade do fonoaudiólogo logado
  const intervencao = await prisma.intervencao.findFirst({
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
  if (!intervencao) {
    throw new Error('A intervenção não pertence ao fonoaudiólogo logado.');
  }

  return await prisma.intervencao.update({
    where: { id },
    data: {
      ...data,
      data_intervencao: data.data_intervencao
        ? new Date(data.data_intervencao)
        : undefined,
    },
  });
};

export const deleteIntervencao = async (
  id: number,
  fonoaudiologoId: number,
): Promise<IIntervencao | null> => {
  // Verifica se a intervenção está associada a uma criança sob a responsabilidade do fonoaudiólogo logado
  const intervencao = await prisma.intervencao.findFirst({
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
  if (!intervencao) {
    throw new Error('A intervenção não pertence ao fonoaudiólogo logado.');
  }

  return await prisma.intervencao.delete({
    where: { id },
  });
};
