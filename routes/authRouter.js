import express from 'express';

import { authController } from '../controllers/authController.js';

import { validateBody } from '../helpers/validateBody.js';

import { userSignUpSchema, userSignInSchema } from '../schemas/userSchema.js';

const authRouter = express.Router();

authRouter.post('/users/register', validateBody(userSignUpSchema), authController.signup);

authRouter.post('/users/login', validateBody(userSignInSchema), authController.signin);

export default authRouter;
