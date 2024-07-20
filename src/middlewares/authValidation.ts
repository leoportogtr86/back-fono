import { body } from 'express-validator';

export const validateRegister = [
  body('nome')
    .isString()
    .withMessage('Nome é obrigatório e deve ser uma string.'),
  body('email')
    .isEmail()
    .withMessage('Email é obrigatório e deve ser um email válido.'),
  body('senha')
    .isLength({ min: 6 })
    .withMessage('Senha é obrigatória e deve ter pelo menos 6 caracteres.'),
];
