import { gql } from 'apollo-server-express';
import appointmentsTypesDefs from '../controllers/typesDefs/appointmentsTypesDefs';
import doctorTypesDefs from '../controllers/typesDefs/doctorTypesDefs';
import medicalHistoryTypesDefs from '../controllers/typesDefs/medicalHistoryTypesDefs';

describe('typesDefs', () => {
  it('should define the correct type definitions', () => {
    const expectedTypeDefs = gql`
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

    expect(appointmentsTypesDefs).toEqual(expectedTypeDefs);
  });
  it('should define the correct type definitions doctors', () => {
    const expectedDoctorTypeDefs = gql`
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
    expect(doctorTypesDefs).toEqual(expectedDoctorTypeDefs);
  });
  it('should define the correct type definitions MedicalHistory', () => {
    const expectedMedicalHistoryTypeDefs = gql`
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

    expect(medicalHistoryTypesDefs).toEqual(expectedMedicalHistoryTypeDefs);
  })
});
