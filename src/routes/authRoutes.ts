import { Router } from 'express';
import { registerHandler, loginHandler } from '../controllers/authController';
import { handleValidation } from '../middlewares/handleValidation';
import {validateRegister} from "../middlewares/authValidation";

const authRouter = Router();

authRouter.post('/register', validateRegister, handleValidation, registerHandler);
authRouter.post('/login', loginHandler);

export default authRouter;
