import { gql } from 'apollo-server-express';

const usersTypesDefs = gql`
    enum UserRole {
        DOCTOR
        PATIENT
    }

    type User{
        _id: ID
        userName: String
        userEmail: String
        userPassword: String
        userBirthday: String
        userAddress: String
        userPhone: String
        userRole: UserRole
    }

    type Query {
        getAllUsers: [User]!
        getFindUserById(_id: ID!): [User!]!
        getFindUserByRole(userRole: UserRole): [User!]!
    }

    input CreateUserInput {
        userName: String!
        userEmail: String!
        userPassword: String!
        userBirthday: String!
        userAddress: String!
        userPhone: String!
        userRole: UserRole!
    }

    input UpdateUserInput {
        userName: String
        userEmail: String
        userPassword: String
        userBirthday: String
        userAddress: String
        userPhone: String
        userRole: UserRole
    }

    type Mutation {
        createNewUser(user: CreateUserInput): User!
        updateUser(_id: ID!, user: UpdateUserInput): User!
        deleteUser(_id: ID!): String!
    }
`;

export default usersTypesDefs;