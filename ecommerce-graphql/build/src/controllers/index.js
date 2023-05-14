"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const producstResolvers_1 = __importDefault(require("./producstResolvers"));
const productsTypesDefs_1 = __importDefault(require("./productsTypesDefs"));
const userTypesDefs_1 = __importDefault(require("./userTypesDefs"));
const userResolvers_1 = __importDefault(require("./userResolvers"));
exports.default = {
    productTypesDefs: productsTypesDefs_1.default,
    productsResolver: producstResolvers_1.default,
    userResolvers: userResolvers_1.default,
    userTypesDefs: userTypesDefs_1.default,
};
