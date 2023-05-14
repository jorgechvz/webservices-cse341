"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const productTypesDefs = (0, apollo_server_express_1.gql) `
  type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    image_url: String!
    category: String!
    quantity: Int!
  }

  type Query {
    allProducts: [Product!]!
    singleProduct(_id: ID!): [Product!]!
  }

  input CreateProductInput {
    name: String!
    description: String!
    price: Float!
    image_url: String!
    category: String!
    quantity: Int!
  }

  input UpdateProductInput {
    name: String
    description: String
    price: Float
    image_url: String
    category: String
    quantity: Int
  }

  type Mutation {
    createProduct(product: CreateProductInput!): Product!
    updateProduct(_id: ID!, product: UpdateProductInput): Product!
    deleteProduct(_id: ID!): String!
  }
`;
exports.default = productTypesDefs;
