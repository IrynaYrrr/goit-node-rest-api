import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';
import gravatar from 'gravatar';

export const findUser = filter => User.findOne(filter);

export const signup = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const avatarURL = gravatar.url(data.email, {}, true);
  return User.create({ ...data, password: hashPassword, avatarURL })
}

export const validatePassword = (password, hashPassword) => bcrypt.compare(password, hashPassword);
