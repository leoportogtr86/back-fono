import { Request } from 'express';

export interface IFonoaudiologo {
  id: number;
  nome: string;
  email: string;
  senha: string;
  data_criacao: Date;
}

export interface ICrianca {
  id: number;
  nome: string;
  data_nascimento: Date;
  responsavel_nome: string;
  responsavel_contato: string;
  fonoaudiologo_responsavelId: number;
  data_criacao: Date;
}

export interface IAvaliacao {
  id: number;
  criancaId: number;
  fonoaudiologoId: number;
  data_avaliacao: Date;
  descricao: string;
  resultado: string;
  data_criacao: Date;
}

export interface IIntervencao {
  id: number;
  criancaId: number;
  fonoaudiologoId: number;
  data_intervencao: Date;
  descricao: string;
  resultados_obtidos: string;
  data_criacao: Date;
}

export interface ICreateCriancaData {
  nome: string;
  data_nascimento: string;
  responsavel_nome: string;
  responsavel_contato: string;
}

export interface IUpdateCriancaData {
  nome?: string;
  data_nascimento?: string;
  responsavel_nome?: string;
  responsavel_contato?: string;
}

export interface ICreateAvaliacaoData {
  criancaId: number;
  data_avaliacao: string;
  descricao: string;
  resultado: string;
}

export interface IUpdateAvaliacaoData {
  data_avaliacao?: string;
  descricao?: string;
  resultado?: string;
}

export interface ICreateIntervencaoData {
  criancaId: number;
  data_intervencao: string;
  descricao: string;
  resultados_obtidos: string;
}

export interface IUpdateIntervencaoData {
  data_intervencao?: string;
  descricao?: string;
  resultados_obtidos?: string;
}

export interface ICreateFonoaudiologoData {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IFonoaudiologo;
}
