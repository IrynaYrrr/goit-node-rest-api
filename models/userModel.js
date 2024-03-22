import { Schema, model } from 'mongoose';
import { emailRegexp } from '../constants/user-constants';
import { handleSaveError, setUpdateSettings } from './hooks';


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: emailRegexp,
    unique: true,
    required: true,

  },
  password: {
    type: String,
    required: true,
  }

}, { versionKey: false, timestamps: true });


userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
