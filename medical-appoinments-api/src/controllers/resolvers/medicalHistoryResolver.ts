import MedicalHistory, { IMedicalHistory } from '../../models/medicalHistoryModel';
import { ObjectId } from 'mongodb';
import {
  medicalHistoryCreateValidationSchema,
  medicalHistoryUpdateValidationSchema
} from '../../utils/medicalHistoryValidation';
import { AuthenticationError } from 'apollo-server';

const medicalHistoryResolver = {
  Query: {
    getAllMedicalHistory: async (__: any, _: any, context: any): Promise<IMedicalHistory[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const medicalHistory: IMedicalHistory[] = await MedicalHistory.find();
        if (!medicalHistory) {
          throw new Error('Medical History not found!');
        }
        return medicalHistory;
      } catch (err) {
        throw err;
      }
    },
    getMedicalHistoryById: async (
      _: any,
      { _id }: { _id: string },
      context: any
    ): Promise<IMedicalHistory[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const medicalHistoryId = new ObjectId(_id);
        const getMedicalHistory: IMedicalHistory[] | null = await MedicalHistory.find({
          _id: medicalHistoryId
        });
        if (getMedicalHistory.length === 0) {
          throw new Error('Medical History not found!');
        }
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
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const medicalHistoryValidate = medicalHistoryCreateValidationSchema.validate({
          ...args.medicalHistory
        });
        if (medicalHistoryValidate.error) {
          throw new Error(medicalHistoryValidate.error.details[0].message);
        }
        const newMedicalHistory: IMedicalHistory = new MedicalHistory({ ...args.medicalHistory });
        await newMedicalHistory.save();
        return newMedicalHistory;
      } catch (err) {
        throw err;
      }
    },
    updateMedicalHistory: async (
      parent: any,
      args: {
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
      },
      context: any
    ): Promise<IMedicalHistory> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const medicalHistoryValidate = medicalHistoryUpdateValidationSchema.validate({
          ...args.medicalHistory
        });
        if (medicalHistoryValidate.error) {
          throw new Error(medicalHistoryValidate.error.details[0].message);
        }
        const medicalHistoryId = new ObjectId(args._id);
        const filter = { _id: medicalHistoryId };
        const update = {
          $set: { ...args.medicalHistory }
        };
        const options = { returnOriginal: false };
        const updatedMedicalHistory: IMedicalHistory | null = await MedicalHistory.findOneAndUpdate(
          filter,
          update,
          options
        );
        if (!updatedMedicalHistory) {
          throw new Error('Medical History not found');
        }
        return updatedMedicalHistory;
      } catch (err) {
        throw err;
      }
    },
    deleteMedicalHistory: async (
      _: any,
      { _id }: { _id: string },
      context: any
    ): Promise<string> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const medicalHistoryId = new ObjectId(_id);
        const deletedMedicalHistory: IMedicalHistory | null =
          await MedicalHistory.findByIdAndDelete({ _id: medicalHistoryId });
        if (!deletedMedicalHistory) {
          throw new Error('Medical History not found!');
        }
        return `Medical history deleted successfully`;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default medicalHistoryResolver;
