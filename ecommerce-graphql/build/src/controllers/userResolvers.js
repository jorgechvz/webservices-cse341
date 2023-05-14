"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const mongodb_1 = require("mongodb");
const userResolvers = {
    Query: {
        allUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield users_1.default.find();
                return users;
            }
            catch (err) {
                throw err;
            }
        }),
        simpleUser: (_, { _id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userId = new mongodb_1.ObjectId(_id);
                const user = yield users_1.default.find({ _id: userId });
                return user;
            }
            catch (err) {
                throw err;
            }
        })
    },
    Mutation: {
        createUser: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { name, email, password, phone } = args;
                const user = new users_1.default({
                    name,
                    email,
                    password,
                    phone
                });
                yield user.save();
                return user;
            }
            catch (err) {
                throw err;
            }
        }),
        updateUser: (_, { _id, name, email, password, phone }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userId = new mongodb_1.ObjectId(_id);
                const user = yield users_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error('User not found!');
                }
                if (name) {
                    user.name = name;
                }
                if (email) {
                    user.email = email;
                }
                if (password) {
                    user.password = password;
                }
                if (phone) {
                    user.phone = phone;
                }
                yield user.save();
                return user;
            }
            catch (err) {
                throw err;
            }
        }),
        deleteUser: (_, { _id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userId = new mongodb_1.ObjectId(_id);
                const user = yield users_1.default.findByIdAndDelete({ _id: userId });
                if (!user) {
                    throw new Error('User not found');
                }
                return 'Product deleted succesfully';
            }
            catch (err) {
                throw err;
            }
        })
    }
};
exports.default = userResolvers;
