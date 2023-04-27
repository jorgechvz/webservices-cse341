const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let _db;

const initDB = (callback) => {
  if (_db) {
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDB = () => {
  if (!_db) {
    throw Error('Database no initialized!');
  }
  return _db;
};

module.exports = {
  initDB,
  getDB
};
