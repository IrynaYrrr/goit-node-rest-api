import User from '../models/userModel.js';


export const signup = data => User.create(data);
