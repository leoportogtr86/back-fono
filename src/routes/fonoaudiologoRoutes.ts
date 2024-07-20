import { Router } from 'express';
import { getAllFonoaudiologosHandler, getFonoaudiologoByIdHandler, createFonoaudiologoHandler, updateFonoaudiologoHandler, deleteFonoaudiologoHandler } from '../controllers/fonoaudiologoController';
import { validateFonoaudiologo } from '../middlewares/fonoaudiologoValidation';
import { handleValidation } from '../middlewares/handleValidation';
import { verifyTokenHandler } from '../controllers/authController';

const fonoaudiologoRouter = Router();

fonoaudiologoRouter.get('/fonoaudiologos', verifyTokenHandler, getAllFonoaudiologosHandler);
fonoaudiologoRouter.get('/fonoaudiologos/:id', verifyTokenHandler, getFonoaudiologoByIdHandler);
fonoaudiologoRouter.post('/fonoaudiologos', validateFonoaudiologo, handleValidation, verifyTokenHandler, createFonoaudiologoHandler);
fonoaudiologoRouter.put('/fonoaudiologos/:id', validateFonoaudiologo, handleValidation, verifyTokenHandler, updateFonoaudiologoHandler);
fonoaudiologoRouter.delete('/fonoaudiologos/:id', verifyTokenHandler, deleteFonoaudiologoHandler);

export default fonoaudiologoRouter;
