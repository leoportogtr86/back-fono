import { body } from 'express-validator';

export const validateIntervencao = [
  body('criancaId')
    .isInt()
    .withMessage('ID da criança é obrigatório e deve ser um número inteiro.'),
  body('data_intervencao')
    .isISO8601()
    .withMessage(
      'Data da intervenção é obrigatória e deve estar no formato ISO 8601.',
    ),
  body('descricao')
    .isString()
    .withMessage('Descrição é obrigatória e deve ser uma string.'),
  body('resultados_obtidos')
    .isString()
    .withMessage('Resultados obtidos são obrigatórios e devem ser uma string.'),
];
