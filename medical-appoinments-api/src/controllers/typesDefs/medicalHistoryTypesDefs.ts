import { gql } from 'apollo-server-express';

const medicalHistoryTypesDefs = gql`
  type MedicalHistory {
    _id: ID
    patientId: ID
    doctorId: ID
    visitDate: String
    diagnosis: String
    treatment: String
    medications: String
    testResults: String
    comments: String
  }
  type Query {
    getAllMedicalHistory: [MedicalHistory!]!
    getMedicalHistoryById(_id: ID!): [MedicalHistory!]!
  }

  input CreateMedicalHistoryInput {
    patientId: ID!
    doctorId: ID!
    visitDate: String!
    diagnosis: String!
    treatment: String!
    medications: String!
    testResults: String!
    comments: String
  }

  input UpdateMedicalHistoryInput {
    patientId: ID
    doctorId: ID
    visitDate: String
    diagnosis: String
    treatment: String
    medications: String
    testResults: String
    comments: String
  }

  type Mutation {
    createMedicalHistory(medicalHistory: CreateMedicalHistoryInput!): MedicalHistory!
    updateMedicalHistory(_id: ID!, medicalHistory: UpdateMedicalHistoryInput): MedicalHistory!
    deleteMedicalHistory(_id: ID!): String!
  }
`;

export default medicalHistoryTypesDefs;