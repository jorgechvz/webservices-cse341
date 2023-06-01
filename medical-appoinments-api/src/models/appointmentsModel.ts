import mongoose, { Document, Model, ObjectId } from 'mongoose';

export enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled'
}

export interface IAppointments extends Document {
  patientId: ObjectId;
  doctorId: ObjectId;
  appointmentDate: string;
  appointmentTime: string;
  appointmentDuration: string;
  appointmentDescription: string;
  appointmentStatus: AppointmentStatus;
  appointmentComments?: string;
}

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId
  },
  appointmentDate: {
    type: String
  },
  appointmentTime: {
    type: String
  },
  appointmentDuration: {
    type: String
  },
  appointmentDescription: {
    type: String
  },
  appointmentStatus: {
    type: String,
    enum: Object.values(AppointmentStatus)
  },
  appointmentComments: {
    type: String
  }
});

const Appointments: Model<IAppointments> = mongoose.model<IAppointments>(
  'appointments',
  appointmentSchema
);

export default Appointments;
