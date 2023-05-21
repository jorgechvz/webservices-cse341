import mongoose, { Document, Model } from 'mongoose';

export interface IDoctor extends Document {
  doctorName: string;
  doctorSpecialty: string;
  doctorOfficeAddress: string;
  doctorCity: string;
  doctorState: string;
  doctorCountry: string;
  doctorPhone: string;
  doctorHoursAvailability: string;
}

const doctorSchema = new mongoose.Schema({
  doctorName: {
    type: String
  },
  doctorSpecialty: {
    type: String
  },
  doctorOfficeAddress: {
    type: String
  },
  doctorCity: {
    type: String
  },
  doctorState: {
    type: String
  },
  doctorCountry: {
    type: String
  },
  doctorPhone: {
    type: String
  },
  doctorHoursAvailability: {
    type: String
  }
});

const Doctor: Model<IDoctor> = mongoose.model<IDoctor>('doctors', doctorSchema);

export default Doctor;
