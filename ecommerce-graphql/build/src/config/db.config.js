"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let _db;
const initDB = (callback) => {
    if (_db) {
        return callback(null, _db);
    }
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose_1.default
        .connect(process.env.MONGO_URI, options)
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
exports.default = {
    initDB,
    getDB,
};
