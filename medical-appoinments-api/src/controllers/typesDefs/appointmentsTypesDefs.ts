import { gql } from 'apollo-server-express';

const appointmentsTypesDefs = gql`
  enum AppointmentStatus {
    pending
    confirmed
    canceled
  }

  type Appointments {
    _id: ID
    patientId: ID
    doctorId: ID
    appointmentDate: String
    appointmentTime: String
    appointmentDuration: String
    appointmentDescription: String
    appointmentStatus: AppointmentStatus
    appointmentComments: String
  }

  type Query {
    getAllAppointments: [Appointments]!
    getFindAppointmentByPatientId(patientId: ID!): [Appointments!]!
    getFindAppointmentByDoctorId(doctorId: ID!): [Appointments!]!
    getFindAppointmentByDate(appointmentDate: String): [Appointments!]!
    getFindAppointmentByStatus(appointmentStatus: AppointmentStatus): [Appointments!]!
  }

  input CreateAppointmentInput {
    patientId: ID! 
    doctorId: ID!
    appointmentDate: String!
    appointmentTime: String!
    appointmentDuration: String!
    appointmentDescription: String!
    appointmentStatus: AppointmentStatus!
    appointmentComments: String
  }

  input UpdateAppointmentInput {
    patientId: ID
    doctorId: ID
    appointmentDate: String
    appointmentTime: String
    appointmentDuration: String
    appointmentDescription: String
    appointmentStatus: AppointmentStatus
    appointmentComments: String
  }

  type Mutation {
    createAppointment(appointments: CreateAppointmentInput!): Appointments!
    updateAppointment(_id: ID!, appointments: UpdateAppointmentInput): Appointments!
    deleteAppointment(_id: ID!): String!
  }
`;

export default appointmentsTypesDefs;