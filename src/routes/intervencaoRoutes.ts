import { Router } from 'express';
import {
  getAllIntervencoesHandler,
  getIntervencaoByIdHandler,
  createIntervencaoHandler,
  updateIntervencaoHandler,
  deleteIntervencaoHandler,
} from '../controllers/intervencaoController';
import { validateIntervencao } from '../middlewares/intervencaoValidation';
import { handleValidation } from '../middlewares/handleValidation';
import { verifyTokenHandler } from '../middlewares/authMiddleware';

const intervencaoRouter = Router();

intervencaoRouter.get(
  '/intervencoes',
  verifyTokenHandler,
  getAllIntervencoesHandler,
);
intervencaoRouter.get(
  '/intervencoes/:id',
  verifyTokenHandler,
  getIntervencaoByIdHandler,
);
intervencaoRouter.post(
  '/intervencoes',
  validateIntervencao,
  handleValidation,
  verifyTokenHandler,
  createIntervencaoHandler,
);
intervencaoRouter.put(
  '/intervencoes/:id',
  validateIntervencao,
  handleValidation,
  verifyTokenHandler,
  updateIntervencaoHandler,
);
intervencaoRouter.delete(
  '/intervencoes/:id',
  verifyTokenHandler,
  deleteIntervencaoHandler,
);

export default intervencaoRouter;
