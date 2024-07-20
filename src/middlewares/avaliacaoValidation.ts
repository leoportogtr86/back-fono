import { body } from 'express-validator';

export const validateAvaliacao = [
    body('criancaId').isInt().withMessage('ID da criança é obrigatório e deve ser um número inteiro.'),
    body('data_avaliacao').isISO8601().withMessage('Data da avaliação é obrigatória e deve estar no formato ISO 8601.'),
    body('descricao').isString().withMessage('Descrição é obrigatória e deve ser uma string.'),
    body('resultado').isString().withMessage('Resultado é obrigatório e deve ser uma string.'),
];
