import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IMedicalHistory extends Document {
  patiendId: ObjectId;
  doctorId: ObjectId;
  visitDate: string;
  diagnosis: string;
  treatment: string;
  medications: string;
  testResults: string;
  comments: string;
}

const medicalHistoriSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId
  },
  visitDate: {
    type: String
  },
  diagnosis: {
    type: String
  },
  treatment: {
    type: String
  },
  medications: {
    type: String
  },
  testResults: {
    type: String
  },
  comments: {
    type: String
  }
});

const MedicalHistory: Model<IMedicalHistory> = mongoose.model<IMedicalHistory>(
  'medicalHistory',
  medicalHistoriSchema
);

export default MedicalHistory;
