import jwt from 'jsonwebtoken';

import * as authServices from '../services/authServices.js';

import { HttpError } from '../helpers/HttpError.js';

import ctrlWrapper from '../helpers/ctrlWrapper.js';

const { JWT_SECRET } = process.env;



const signup = async (req, res) => {
  const { email } = req.body;

  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const newUser = await authServices.signup(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    }
  })
}

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const comparePassword = await authServices.validatePassword(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const { _id: id } = user;

  const payload = {
    id,
  }

  user.token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
  await user.save()

  res.json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

const logout = async (req, res) => {
  req.user.token = null;
  await req.user.save();

  res.status(204).end()
}

const current = async (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  })
}

const subscription = async (req, res) => {
  const { subscription } = req.body;

  req.user.subscription = subscription;

  await req.user.save();

  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  })
}

export const authController = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscription: ctrlWrapper(subscription),
}
