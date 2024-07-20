import {PrismaClient} from '@prisma/client';
import {IIntervencao, ICreateIntervencaoData, IUpdateIntervencaoData} from '../interfaces';

const prisma = new PrismaClient();

export const createIntervencao = async (data: ICreateIntervencaoData, fonoaudiologoId: number): Promise<IIntervencao> => {
    return await prisma.intervencao.create({
        data: {
            ...data,
            data_intervencao: new Date(data.data_intervencao), // Converte a string ISO 8601 para um objeto Date
            fonoaudiologoId: fonoaudiologoId, // Usa o ID do fonoaudiólogo logado
            data_criacao: new Date() // Define a data de criação como a data e hora atual
        }
    });
};

export const getIntervencaoById = async (id: number, fonoaudiologoId: number): Promise<IIntervencao | null> => {
    return await prisma.intervencao.findFirst({
        where: {
            id: id,
            fonoaudiologoId: fonoaudiologoId // Verifica se a intervenção pertence ao fonoaudiólogo logado
        }
    });
};

export const getAllIntervencoes = async (fonoaudiologoId: number): Promise<IIntervencao[]> => {
    return await prisma.intervencao.findMany({
        where: {
            fonoaudiologoId: fonoaudiologoId // Obtém todas as intervenções do fonoaudiólogo logado
        }
    });
};

export const updateIntervencao = async (id: number, data: IUpdateIntervencaoData, fonoaudiologoId: number): Promise<IIntervencao | null> => {
    const updatedIntervencao = await prisma.intervencao.updateMany({
        where: {
            id: id,
            fonoaudiologoId: fonoaudiologoId // Verifica se a intervenção pertence ao fonoaudiólogo logado
        },
        data: {
            ...data,
            data_intervencao: data.data_intervencao ? new Date(data.data_intervencao) : undefined // Converte a string ISO 8601 para um objeto Date
        }
    });

    if (updatedIntervencao.count > 0) {
        return getIntervencaoById(id, fonoaudiologoId);
    }

    return null;
};

export const deleteIntervencao = async (id: number, fonoaudiologoId: number): Promise<IIntervencao | null> => {
    const intervencaoToDelete = await getIntervencaoById(id, fonoaudiologoId);
    if (!intervencaoToDelete) {
        return null;
    }

    await prisma.intervencao.deleteMany({
        where: {
            id: id,
            fonoaudiologoId: fonoaudiologoId // Verifica se a intervenção pertence ao fonoaudiólogo logado
        }
    });

    return intervencaoToDelete;
};
