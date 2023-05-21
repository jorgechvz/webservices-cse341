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
    }
  }
};

export default medicalHistoryResolver;
