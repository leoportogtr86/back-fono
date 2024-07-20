import { Router, Request, Response } from 'express';
import userRouter from './userRoutes';
import fonoaudiologoRouter from './fonoaudiologoRoutes';
import criancaRouter from './criancaRoutes';
import avaliacaoRouter from './avaliacaoRoutes';
import intervencaoRouter from './intervencaoRoutes';
import authRouter from './authRoutes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Rota principal está funcionando!');
});

router.use(authRouter);
router.use(userRouter);
router.use(fonoaudiologoRouter);
router.use(criancaRouter);
router.use(avaliacaoRouter);
router.use(intervencaoRouter);

export default router;
