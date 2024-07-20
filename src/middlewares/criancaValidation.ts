import { body } from 'express-validator';

export const validateCrianca = [
    body('nome').isString().withMessage('Nome é obrigatório e deve ser uma string.'),
    body('data_nascimento').isISO8601().withMessage('Data de nascimento é obrigatória e deve estar no formato ISO 8601.'),
    body('responsavel_nome').isString().withMessage('Nome do responsável é obrigatório e deve ser uma string.'),
    body('responsavel_contato').isString().withMessage('Contato do responsável é obrigatório e deve ser uma string.'),
    body('fonoaudiologo_responsavelId').isInt().withMessage('ID do fonoaudiólogo responsável é obrigatório e deve ser um inteiro.'),
];
