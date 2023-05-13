import { gql } from 'apollo-server-express';

const productTypesDefs = gql`
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

export default productTypesDefs;