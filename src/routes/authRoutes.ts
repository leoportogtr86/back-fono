import { Router } from 'express';
import { registerHandler, loginHandler } from '../controllers/authController';
import { validateFonoaudiologo } from '../middlewares/fonoaudiologoValidation';
import { handleValidation } from '../middlewares/handleValidation';

const authRouter = Router();

authRouter.post('/register', validateFonoaudiologo, handleValidation, registerHandler);
authRouter.post('/login', loginHandler);

export default authRouter;
