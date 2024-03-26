import express from 'express';
import { authController } from '../controllers/authController.js';
import { validateBody } from '../helpers/validateBody.js';
import { userSignUpSchema, userSignInSchema, userSubscriptionSchema } from '../schemas/userSchema.js';
import { authenticate } from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(userSignUpSchema), authController.signup);

authRouter.post('/login', validateBody(userSignInSchema), authController.signin);

authRouter.post('/logout', authenticate, authController.logout);

authRouter.get('/current', authenticate, authController.current);

authRouter.patch('/subscription', authenticate, validateBody(userSubscriptionSchema), authController.subscription);

authRouter.patch('/avatars', upload.single("avatar"), authenticate, authController.avatars);

export default authRouter;
