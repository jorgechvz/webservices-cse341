import { AuthenticationError } from 'apollo-server';
import { ObjectId } from 'mongodb';
import Appointments, { IAppointments } from '../../models/appointmentsModel';
import {
  appointmentValidationSchema,
  appointmentUpdateValidationSchema
} from '../../utils/appoitmentsValidation';

enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled'
}
const appointmentsResolver = {
  Query: {
    getAllAppointments: async (_: any, __: any, context: any): Promise<IAppointments[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const appointments: IAppointments[] = await Appointments.find();
        if (!appointments) {
          throw new Error('Appointments not found!');
        }
        return appointments;
      } catch (err) {
        throw err;
      }
    },
    getFindAppointmentByPatientId: async (
      _: any,
      { patientId }: { patientId: string },
      context: any
    ): Promise<IAppointments[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const getPatientId = new ObjectId(patientId);
        const getAppointment: IAppointments[] | null = await Appointments.find({
          patientId: getPatientId
        });
        if (getAppointment.length === 0) {
          throw new Error('Appointment not found!');
        }
        return getAppointment;
      } catch (err) {
        throw new Error('Something broke!');
      }
    },
    getFindAppointmentByDoctorId: async (
      _: any,
      { doctorId }: { doctorId: string },
      context: any
    ): Promise<IAppointments[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const getDoctorId = new ObjectId(doctorId);
        const getAppointment: IAppointments[] | null = await Appointments.find({
          doctorId: getDoctorId
        });
        if (getAppointment.length === 0) {
          throw new Error('Appointment not found!');
        }
        return getAppointment;
      } catch (err) {
        throw new Error('Something broke!');
      }
    },
    getFindAppointmentByDate: async (
      _: any,
      { appointmentDate }: { appointmentDate: string },
      context: any
    ): Promise<IAppointments[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const getAppointment: IAppointments[] | null = await Appointments.find({
          appointmentDate: appointmentDate
        });
        if (getAppointment.length === 0) {
          throw new Error('Appointment Date not found!');
        }
        return getAppointment;
      } catch (err) {
        throw new Error('Something broke!');
      }
    },
    getFindAppointmentByStatus: async (
      _: any,
      { appointmentStatus }: { appointmentStatus: AppointmentStatus },
      context: any
    ): Promise<IAppointments[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const getAppointment: IAppointments[] | null = await Appointments.find({
          appointmentStatus: appointmentStatus
        });
        if (getAppointment.length === 0) {
          throw new Error('Appointment Status not found!');
        }
        return getAppointment;
      } catch (err) {
        throw new Error('Something broke!');
      }
    }
  },
  Mutation: {
    createAppointment: async (
      parent: any,
      args: {
        appointments: {
          patientId: ObjectId;
          doctorId: ObjectId;
          appointmentDate: string;
          appointmentTime: string;
          appointmentDuration: string;
          appointmentDescription: string;
          appointmentStatus: AppointmentStatus;
          appointmentComments?: string;
        };
      },
      context: any,
      info: any
    ): Promise<IAppointments> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const appointmentCreateValidation = appointmentValidationSchema.validate({
          ...args.appointments
        });
        if (appointmentCreateValidation.error) {
          throw new Error(appointmentCreateValidation.error.details[0].message);
        }
        const appointment: IAppointments = new Appointments({ ...args.appointments });
        await appointment.save();
        return appointment;
      } catch (err) {
        throw new Error('Something broke!');
      }
    },
    updateAppointment: async (
      parent: any,
      args: {
        _id: string;
        appointments: {
          patientId: ObjectId;
          doctorId: ObjectId;
          appointmentDate: string;
          appointmentTime: string;
          appointmentDuration: string;
          appointmentDescription: string;
          appointmentStatus: AppointmentStatus;
          appointmentComments: string;
        };
      },
      context: any
    ): Promise<IAppointments> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const appointmentUpdateValidation = appointmentUpdateValidationSchema.validate({
          ...args.appointments
        });
        if (appointmentUpdateValidation.error) {
          throw new Error(appointmentUpdateValidation.error.details[0].message);
        }
        const appointmentId = new ObjectId(args._id);
        const filter = { _id: appointmentId };
        const update = {
          $set: { ...args.appointments }
        };
        const options = { returnOriginal: false };
        const updatedAppointment: IAppointments | null = await Appointments.findOneAndUpdate(
          filter,
          update,
          options
        );
        if (!updatedAppointment) {
          throw new Error('Appointment not found');
        }
        return updatedAppointment;
      } catch (err) {
        throw err;
      }
    },
    deleteAppointment: async (_: any, { _id }: { _id: string }, context: any): Promise<string> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const appointmentId = new ObjectId(_id);
        const appointment: IAppointments | null = await Appointments.findByIdAndDelete({
          _id: appointmentId
        });
        if (!appointment) {
          throw new Error('Appointment not found!');
        }
        return `Appointment with ID: ${appointment._id} deleted successfully`;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default appointmentsResolver;
