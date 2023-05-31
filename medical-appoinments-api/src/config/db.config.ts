import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let _db: typeof mongoose;

export const initDB = (callback: (error: Error | null, db?: typeof mongoose) => void) => {
  if (_db) {
    return callback(null, _db);
  }
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(process.env.MONGO_URI as string, options as ConnectOptions)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getDB = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db;
};

