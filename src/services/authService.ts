import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {IFonoaudiologo, ICreateFonoaudiologoData} from '../interfaces';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const register = async (data: ICreateFonoaudiologoData, email: any, senha: any): Promise<IFonoaudiologo> => {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const user = await prisma.fonoaudiologo.create({
        data: {
            nome: data.nome,
            email: data.email,
            senha: hashedPassword,
        },
    });
    return user;
};

export const login = async (email: string, senha: string): Promise<{ user: IFonoaudiologo, token: string }> => {
    const user = await prisma.fonoaudiologo.findUnique({where: {email}});
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '1h'});
    return {user, token};
};

export const verifyToken = (token: string): IFonoaudiologo => {
    try {
        return jwt.verify(token, JWT_SECRET) as IFonoaudiologo;
    } catch (error) {
        throw new Error('Invalid token');
    }
};
