import { gql } from 'apollo-server-express';

const doctorTypesDefs = gql`
  type Doctor {
    _id: ID
    doctorName: String
    doctorSpecialty: String
    doctorOfficeAddress: String
    doctorCity: String
    doctorState: String
    doctorCountry: String
    doctorPhone: String
    doctorHoursAvailability: String
  }

  type Query {
    getAllDoctors: [Doctor!]!
    getFindDoctorById(_id: ID!): [Doctor!]!
    getFindDoctorBySpecialty(doctorSpecialty: String!): [Doctor!]!
    getFindDoctorByAvailability(doctorAvailability: String!): [Doctor!]!
  }

  input CreateDoctorInput {
    doctorName: String!
    doctorSpecialty: String!
    doctorOfficeAddress: String!
    doctorCity: String!
    doctorState: String!
    doctorCountry: String!
    doctorPhone: String!
    doctorHoursAvailability: String!
  }

  input UpdateDoctorInput {
    doctorName: String
    doctorSpecialty: String
    doctorOfficeAddress: String
    doctorCity: String
    doctorState: String
    doctorCountry: String
    doctorPhone: String
    doctorHoursAvailability: String
  }

  type Mutation {
    createNewDoctor(doctors: CreateDoctorInput): Doctor!
    updateDoctor(_id: ID!, doctors: UpdateDoctorInput): Doctor!
    deleteDoctor(_id: ID!): String!
  }
`;

export default doctorTypesDefs;
