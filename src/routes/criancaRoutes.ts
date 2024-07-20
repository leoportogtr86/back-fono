import { Router } from 'express';
import {
  getAllCriancasHandler,
  getCriancaByIdHandler,
  createCriancaHandler,
  updateCriancaHandler,
  deleteCriancaHandler,
} from '../controllers/criancaController';
import { validateCrianca } from '../middlewares/criancaValidation';
import { handleValidation } from '../middlewares/handleValidation';
import { verifyTokenHandler } from '../middlewares/authMiddleware';

const criancaRouter = Router();

criancaRouter.get('/criancas', verifyTokenHandler, getAllCriancasHandler);
criancaRouter.get('/criancas/:id', verifyTokenHandler, getCriancaByIdHandler);
criancaRouter.post(
  '/criancas',
  validateCrianca,
  handleValidation,
  verifyTokenHandler,
  createCriancaHandler,
);
criancaRouter.put(
  '/criancas/:id',
  validateCrianca,
  handleValidation,
  verifyTokenHandler,
  updateCriancaHandler,
);
criancaRouter.delete('/criancas/:id', verifyTokenHandler, deleteCriancaHandler);

export default criancaRouter;
