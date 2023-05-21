import Doctor, { IDoctor } from '../../models/doctorModel';
import { ObjectId } from 'mongodb';

const doctorResolver = {
  Query: {
    getAllDoctors: async (): Promise<IDoctor[]> => {
      try {
        const doctor: IDoctor[] = await Doctor.find();
        return doctor;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default doctorResolver;
