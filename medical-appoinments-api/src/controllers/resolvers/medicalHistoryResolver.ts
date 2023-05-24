import MedicalHistory, { IMedicalHistory } from '../../models/medicalHistoryModel';
import { ObjectId } from 'mongodb';

const medicalHistoryResolver = {
  Query: {
    getAllMedicalHistory: async (): Promise<IMedicalHistory[]> => {
      try {
        const medicalHistory: IMedicalHistory[] = await MedicalHistory.find();
        return medicalHistory;
      } catch (err) {
        throw err;
      }
    },
    getMedicalHistoryById: async (_: any, { _id }: { _id: string }): Promise<IMedicalHistory[]> => {
      try {
        const medicalHistoryId = new ObjectId(_id);
        const getMedicalHistory: IMedicalHistory[] | null = await MedicalHistory.find({
          _id: medicalHistoryId
        });
        return getMedicalHistory;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createMedicalHistory: async (
      parent: any,
      args: {
        medicalHistory: {
          patientId: ObjectId;
          doctorId: ObjectId;
          visitDate: string;
          diagnosis: string;
          treatment: string;
          medications: string;
          testResults: string;
          comments?: string;
        };
      },
      context: any,
      info: any
    ): Promise<IMedicalHistory> => {
      try {
        const newMedicalHistory: IMedicalHistory = new MedicalHistory({ ...args.medicalHistory });
        await newMedicalHistory.save();
        return newMedicalHistory;
      } catch (err) {
        throw err;
      }
    },
    updateMedicalHistory: async (
      _: any,
      {
        _id,
        medicalHistory: {
          patientId,
          doctorId,
          visitDate,
          diagnosis,
          treatment,
          medications,
          testResults,
          comments
        }
      }: {
        _id: string;
        medicalHistory: {
          patientId: ObjectId;
          doctorId: ObjectId;
          visitDate: string;
          diagnosis: string;
          treatment: string;
          medications: string;
          testResults: string;
          comments: string;
        };
      }
    ): Promise<IMedicalHistory> => {
      try {
        const medicalHistoryId = new ObjectId(_id);
        const filter = { _id: medicalHistoryId };
        const update = {
          $set: {
            patientId,
            doctorId,
            visitDate,
            diagnosis,
            treatment,
            medications,
            testResults,
            comments
          }
        };
        const options = { returnOriginal: false };
        const updatedMedicalHistory: IMedicalHistory | null = await MedicalHistory.findOneAndUpdate(
          filter,
          update,
          options
        );
        if (!updatedMedicalHistory) {
          throw new Error('Appointment not found');
        }
        return updatedMedicalHistory;
      } catch (err) {
        throw err;
      }
    },
    deleteMedicalHistory: async (_: any, { _id }: { _id: string }): Promise<string> => {
      try {
        const medicalHistoryId = new ObjectId(_id);
        const deletedMedicalHistory: IMedicalHistory | null =
          await MedicalHistory.findByIdAndDelete({ _id: medicalHistoryId });
        if (!deletedMedicalHistory) {
          throw new Error('Product not found!');
        }
        return `Medical history deleted successfully`;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default medicalHistoryResolver;
