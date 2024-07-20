import { Router } from 'express';
import {
  getAllAvaliacoesHandler,
  getAvaliacaoByIdHandler,
  createAvaliacaoHandler,
  updateAvaliacaoHandler,
  deleteAvaliacaoHandler,
} from '../controllers/avaliacaoController';
import { validateAvaliacao } from '../middlewares/avaliacaoValidation';
import { handleValidation } from '../middlewares/handleValidation';
import { verifyTokenHandler } from '../middlewares/authMiddleware';

const avaliacaoRouter = Router();

avaliacaoRouter.get('/avaliacoes', verifyTokenHandler, getAllAvaliacoesHandler);
avaliacaoRouter.get(
  '/avaliacoes/:id',
  verifyTokenHandler,
  getAvaliacaoByIdHandler,
);
avaliacaoRouter.post(
  '/avaliacoes',
  validateAvaliacao,
  handleValidation,
  verifyTokenHandler,
  createAvaliacaoHandler,
);
avaliacaoRouter.put(
  '/avaliacoes/:id',
  validateAvaliacao,
  handleValidation,
  verifyTokenHandler,
  updateAvaliacaoHandler,
);
avaliacaoRouter.delete(
  '/avaliacoes/:id',
  verifyTokenHandler,
  deleteAvaliacaoHandler,
);

export default avaliacaoRouter;
