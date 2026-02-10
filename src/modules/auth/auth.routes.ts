import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateDTO } from '@middlewares/validate.middleware';
import { AuthSignInDTO, AuthSignUpDTO } from './dtos/auth-request.dto';
import { AuthController } from './controllers/auth.controller';

const router = Router();

router.post('/sign-in', validateDTO(AuthSignInDTO), async (req, res) => {
  const dto = plainToInstance(AuthSignInDTO, req.body);
  const response = await AuthController.signIn(dto);
  res.status(200).json(response);
});

router.post('/sign-up', validateDTO(AuthSignUpDTO), async (req, res) => {
  const dto = plainToInstance(AuthSignUpDTO, req.body);
  const response = await AuthController.signUp(dto);
  res.status(200).json(response);
});

export default router;
