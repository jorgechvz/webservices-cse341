import { gql } from 'apollo-server-express';

const userTypesDefs = gql`
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
    createUser(input: CreateUserInput!): User!
    updateUser(_id: ID!, input: UpdateUserInput): User!
    deleteUser(_id: ID!): String!
  }
`;

export default userTypesDefs;
