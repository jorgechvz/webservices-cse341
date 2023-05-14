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
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("./src/config/db.config"));
const producstResolvers_1 = __importDefault(require("./src/controllers/producstResolvers"));
const productsTypesDefs_1 = __importDefault(require("./src/controllers/productsTypesDefs"));
const userResolvers_1 = __importDefault(require("./src/controllers/userResolvers"));
const userTypesDefs_1 = __importDefault(require("./src/controllers/userTypesDefs"));
const apollo_server_express_1 = require("apollo-server-express");
const port = parseInt(process.env.PORT, 10) || 8080;
const app = (0, express_1.default)();
app
    .get("/", (req, res) => {
    res.send("Welcome to my api");
});
db_config_1.default.initDB((err, db) => {
    if (err) {
        console.log(err);
    }
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const typeDefs = [productsTypesDefs_1.default, userTypesDefs_1.default];
        const resolvers = [producstResolvers_1.default, userResolvers_1.default];
        const apolloServer = new apollo_server_express_1.ApolloServer({
            typeDefs,
            resolvers,
        });
        yield apolloServer.start();
        apolloServer.applyMiddleware({ app, path: "/api" });
        app.use((req, res, next) => {
            res.status(404).send("not found");
        });
        app.listen(port);
        console.log(`Connect to database and server is running in ${port} port!`);
    });
}
start();
