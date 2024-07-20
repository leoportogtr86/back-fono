import {PrismaClient} from '@prisma/client';
import {IAvaliacao, ICreateAvaliacaoData, IUpdateAvaliacaoData} from '../interfaces';

const prisma = new PrismaClient();

export const createAvaliacao = async (data: ICreateAvaliacaoData, fonoaudiologoId: number): Promise<IAvaliacao> => {
    return await prisma.avaliacao.create({
        data: {
            ...data,
            data_avaliacao: new Date(data.data_avaliacao), // Converte a string ISO 8601 para um objeto Date
            fonoaudiologoId: fonoaudiologoId, // Usa o ID do fonoaudiólogo logado
            data_criacao: new Date() // Define a data de criação como a data e hora atual
        }
    });
};

export const getAvaliacaoById = async (id: number, fonoaudiologoId: number): Promise<IAvaliacao | null> => {
    return await prisma.avaliacao.findFirst({
        where: {
            id: id,
            fonoaudiologoId: fonoaudiologoId // Verifica se a avaliação pertence ao fonoaudiólogo logado
        }
    });
};

export const getAllAvaliacoes = async (fonoaudiologoId: number): Promise<IAvaliacao[]> => {
    return await prisma.avaliacao.findMany({
        where: {
            fonoaudiologoId: fonoaudiologoId // Obtém todas as avaliações do fonoaudiólogo logado
        }
    });
};

export const updateAvaliacao = async (id: number, data: IUpdateAvaliacaoData, fonoaudiologoId: number): Promise<IAvaliacao | null> => {
    const updatedAvaliacao = await prisma.avaliacao.updateMany({
        where: {
            id: id,
            fonoaudiologoId: fonoaudiologoId // Verifica se a avaliação pertence ao fonoaudiólogo logado
        },
        data: {
            ...data,
            data_avaliacao: data.data_avaliacao ? new Date(data.data_avaliacao) : undefined // Converte a string ISO 8601 para um objeto Date
        }
    });

    if (updatedAvaliacao.count > 0) {
        return getAvaliacaoById(id, fonoaudiologoId);
    }

    return null;
};

export const deleteAvaliacao = async (id: number, fonoaudiologoId: number): Promise<IAvaliacao | null> => {
    const avaliacaoToDelete = await getAvaliacaoById(id, fonoaudiologoId);
    if (!avaliacaoToDelete) {
        return null;
    }

    await prisma.avaliacao.deleteMany({
        where: {
            id: id,
            fonoaudiologoId: fonoaudiologoId // Verifica se a avaliação pertence ao fonoaudiólogo logado
        }
    });

    return avaliacaoToDelete;
};
