import {PrismaClient} from '@prisma/client';
import {ICreateCriancaData, IUpdateCriancaData, ICrianca} from '../interfaces';

const prisma = new PrismaClient();

export const createCrianca = async (data: ICreateCriancaData, fonoaudiologoId: number): Promise<ICrianca> => {
    return await prisma.crianca.create({
        data: {
            ...data,
            data_nascimento: new Date(data.data_nascimento), // Converte a string ISO 8601 para um objeto Date
            fonoaudiologo_responsavelId: fonoaudiologoId, // Usa o ID do fonoaudiólogo logado
            data_criacao: new Date() // Define a data de criação como a data e hora atual
        }
    });
};

export const getCriancaById = async (id: number, fonoaudiologoId: number): Promise<ICrianca | null> => {
    return await prisma.crianca.findFirst({
        where: {
            id: id,
            fonoaudiologo_responsavelId: fonoaudiologoId // Verifica se a criança pertence ao fonoaudiólogo logado
        }
    });
};

export const getAllCriancas = async (fonoaudiologoId: number): Promise<ICrianca[]> => {
    return await prisma.crianca.findMany({
        where: {
            fonoaudiologo_responsavelId: fonoaudiologoId // Obtém todas as crianças do fonoaudiólogo logado
        }
    });
};

export const updateCrianca = async (id: number, data: IUpdateCriancaData, fonoaudiologoId: number): Promise<ICrianca | null> => {
    const updatedCrianca = await prisma.crianca.updateMany({
        where: {
            id: id,
            fonoaudiologo_responsavelId: fonoaudiologoId // Verifica se a criança pertence ao fonoaudiólogo logado
        },
        data: {
            ...data,
            data_nascimento: data.data_nascimento ? new Date(data.data_nascimento) : undefined // Converte a string ISO 8601 para um objeto Date
        }
    });

    if (updatedCrianca.count > 0) {
        return getCriancaById(id, fonoaudiologoId);
    }

    return null;
};

export const deleteCrianca = async (id: number, fonoaudiologoId: number): Promise<ICrianca | null> => {
    const criancaToDelete = await getCriancaById(id, fonoaudiologoId);
    if (!criancaToDelete) {
        return null;
    }

    await prisma.crianca.deleteMany({
        where: {
            id: id,
            fonoaudiologo_responsavelId: fonoaudiologoId // Verifica se a criança pertence ao fonoaudiólogo logado
        }
    });

    return criancaToDelete;
};
