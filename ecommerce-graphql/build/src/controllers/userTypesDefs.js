"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const userTypesDefs = (0, apollo_server_express_1.gql) `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    phone: String
  }

  type Query {
    allUsers: [User]!
    simpleUser(_id: ID!): [User!]!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    phone: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    phone: String
  }

  type Mutation {
    createUser(user: CreateUserInput!): User!
    updateUser(_id: ID!, user: UpdateUserInput): User!
    deleteUser(_id: ID!): String!
  }
`;
exports.default = userTypesDefs;
