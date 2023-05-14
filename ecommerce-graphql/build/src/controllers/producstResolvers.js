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
const products_1 = __importDefault(require("../models/products"));
const mongodb_1 = require("mongodb");
const productsResolver = {
    Query: {
        allProducts: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const products = yield products_1.default.find();
                return products;
            }
            catch (err) {
                throw err;
            }
        }),
        singleProduct: (_, { _id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const productId = new mongodb_1.ObjectId(_id);
                const product = yield products_1.default.find({ _id: productId });
                return product;
            }
            catch (err) {
                throw err;
            }
        })
    },
    Mutation: {
        createProduct: (_, { name, description, price, image_url, category, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const product = new products_1.default({
                    name,
                    description,
                    price,
                    image_url,
                    category,
                    quantity
                });
                yield product.save();
                return product;
            }
            catch (err) {
                throw err;
            }
        }),
        updateProduct: (_, { _id, name, description, price, image_url, category, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const productId = new mongodb_1.ObjectId(_id);
                const product = yield products_1.default.findOne({ _id: productId });
                if (!product) {
                    throw new Error('Product not found!');
                }
                if (name) {
                    product.name = name;
                }
                if (description) {
                    product.description = description;
                }
                if (price) {
                    product.price = price;
                }
                if (image_url) {
                    product.image_url = image_url;
                }
                if (category) {
                    product.category = category;
                }
                if (quantity) {
                    product.quantity = quantity;
                }
                product.save();
                return product;
            }
            catch (err) {
                throw err;
            }
        }),
        deleteProduct: (_, { _id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const productId = new mongodb_1.ObjectId(_id);
                const product = yield products_1.default.findByIdAndDelete({ _id: productId });
                if (!product) {
                    throw new Error('Product not found!');
                }
                return 'Product deleted successfully';
            }
            catch (err) {
                throw err;
            }
        })
    }
};
exports.default = productsResolver;
