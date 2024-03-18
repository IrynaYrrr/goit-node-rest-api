import mongoose from 'mongoose';
import 'dotenv/config';

export async function connect() {
  await mongoose.connect(process.env.DB_HOST);
  console.log("Database connection successful");
}
