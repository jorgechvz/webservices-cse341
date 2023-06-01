import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { initDB } from '../config/db.config';

dotenv.config();

describe('Database', () => {
  beforeAll((done) => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose
      .connect(process.env.MONGO_URI as string, options as ConnectOptions)
      .then(() => done())
      .catch((err) => done(err));
  });

  afterAll((done) => {
    mongoose.disconnect()
      .then(() => done())
      .catch((err) => done(err));
  });

  describe('initDB', () => {
    it('should initialize the database', (done) => {
      initDB((error, db) => {
        expect(error).toBeNull();
        expect(db).toBeDefined();
        done();
      });
    });
  });
});
