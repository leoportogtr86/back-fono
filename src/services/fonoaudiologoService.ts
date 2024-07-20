import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getAllFonoaudiologos = async () => {
    return await prisma.fonoaudiologo.findMany();
};

export const getFonoaudiologoById = async (id: number) => {
    return await prisma.fonoaudiologo.findUnique({where: {id}});
};

export const createFonoaudiologo = async (data: { nome: string; email: string; senha: string }) => {
    return await prisma.fonoaudiologo.create({data});
};

export const updateFonoaudiologo = async (id: number, data: { nome?: string; email?: string; senha?: string }) => {
    return await prisma.fonoaudiologo.update({where: {id}, data});
};

export const deleteFonoaudiologo = async (id: number) => {
    return await prisma.fonoaudiologo.delete({where: {id}});
};
