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
    },
    getFindDoctorById: async (_: any, { _id }: { _id: string }): Promise<IDoctor[]> => {
      try {
        const doctorId = new ObjectId(_id);
        const findDoctor: IDoctor[] | null = await Doctor.find({ _id: doctorId });
        return findDoctor;
      } catch (err) {
        throw err;
      }
    },
    getFindDoctorBySpecialty: async (
      _: any,
      { doctorSpecialty }: { doctorSpecialty: string }
    ): Promise<IDoctor[]> => {
      try {
        const findDoctor: IDoctor[] | null = await Doctor.find({ 
          doctorSpecialty: doctorSpecialty });
        return findDoctor;
      } catch (err) {
        throw err;
      }
    },
    getFindDoctorByAvailability: async (
      _: any,
      { doctorAvailability }: { doctorAvailability: string }
    ): Promise<IDoctor[]> => {
      try {
        const findDoctor: IDoctor[] | null = await Doctor.find({
          doctorHoursAvailability: doctorAvailability
        });
        return findDoctor;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createNewDoctor: async (
      parent: any,
      args: {
        doctors: {
          doctorName: string;
          doctorSpecialty: string;
          doctorOfficeAddress: string;
          doctorCity: string;
          doctorState: string;
          doctorCountry: string;
          doctorPhone: string;
          doctorHoursAvailability: string;
        };
      },
      context: any,
      info: any
    ): Promise<IDoctor> => {
      try {
        const newDoctor: IDoctor = new Doctor({ ...args.doctors });
        await newDoctor.save();
        return newDoctor;
      } catch (err) {
        throw err;
      }
    },
    updateDoctor: async (
      _: any,
      {
        _id,
        doctors: {
          doctorName,
          doctorSpecialty,
          doctorOfficeAddress,
          doctorCity,
          doctorState,
          doctorCountry,
          doctorPhone,
          doctorHoursAvailability
        }
      }: {
        _id: string;
        doctors: {
          doctorName: string,
          doctorSpecialty: string;
          doctorOfficeAddress: string;
          doctorCity: string;
          doctorState: string;
          doctorCountry: string;
          doctorPhone: string;
          doctorHoursAvailability: string;
        };
      }
    ): Promise<IDoctor> => {
      try {
        const doctorId = new ObjectId(_id);
        const filter = { _id: doctorId };
        const update = {
          $set: {
            doctorName,
            doctorSpecialty,
            doctorOfficeAddress,
            doctorCity,
            doctorState,
            doctorCountry,
            doctorPhone,
            doctorHoursAvailability
          }
        };
        const options = { returnOriginal: false };
        const updatedDoctor: IDoctor | null = await Doctor.findOneAndUpdate(
          filter,
          update,
          options
        );
        if (!updatedDoctor) {
          throw new Error('Appointment not found');
        }
        return updatedDoctor;
      } catch (err) {
        throw err;
      }
    },
    deleteDoctor: async (_: any, { _id }: { _id: string }): Promise<string> => {
      try {
        const doctorId = new ObjectId(_id);
        const deleledDoctor: IDoctor | null = await Doctor.findByIdAndDelete({ _id: doctorId });
        if (!deleledDoctor) {
          throw new Error('Product not found!');
        }
        return `Doctor ${deleledDoctor.doctorName} deleted successfully`;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default doctorResolver;
