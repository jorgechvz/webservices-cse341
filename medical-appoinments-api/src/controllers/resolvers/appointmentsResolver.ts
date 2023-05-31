
import Appointments, { IAppointments } from '../../models/appointmentsModel';
import { AuthenticationError } from 'apollo-server';
import {Profile} from 'passport';
import { ObjectId } from 'mongodb';
import { MyContext } from '../../config/apollo.config';

enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled'
}
const appointmentsResolver = {
  Query: {
    getAllAppointments: async (_: any, __: any, context: MyContext): Promise<IAppointments[]> => {
      if (!context.isAuthenticate) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const appointments: IAppointments[] = await Appointments.find();
        return appointments;
      } catch (err) {
        throw err;
      }
    },
    getFindAppointmentByPatientId: async (
      _: any,
      { patientId }: { patientId: string }
    ): Promise<IAppointments[]> => {
      try {
        const getPatientId = new ObjectId(patientId);
        const getAppointment: IAppointments[] | null = await Appointments.find({
          patientId: getPatientId
        });
        return getAppointment;
      } catch (err) {
        throw err;
      }
    },
    getFindAppointmentByDoctorId: async (
      _: any,
      { doctorId }: { doctorId: string }
    ): Promise<IAppointments[]> => {
      try {
        const getDoctorId = new ObjectId(doctorId);
        const getAppointment: IAppointments[] | null = await Appointments.find({
          doctorId: getDoctorId
        });
        return getAppointment;
      } catch (err) {
        throw err;
      }
    },
    getFindAppointmentByDate: async (
      _: any,
      { appointmentDate }: { appointmentDate: string }
    ): Promise<IAppointments[]> => {
      try {
        const getAppointment: IAppointments[] | null = await Appointments.find({
          appointmentDate: appointmentDate
        });
        return getAppointment;
      } catch (err) {
        throw err;
      }
    },
    getFindAppointmentByStatus: async (
      _: any,
      { appointmentStatus }: { appointmentStatus: AppointmentStatus }
    ): Promise<IAppointments[]> => {
      try {
        const getAppointment: IAppointments[] | null = await Appointments.find({
          appointmentStatus: appointmentStatus
        });
        return getAppointment;
      } catch (err) {
        throw err;
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
      try {
        const appointment: IAppointments = new Appointments({ ...args.appointments });
        await appointment.save();
        return appointment;
      } catch (err) {
        throw err;
      }
    },
    updateAppointment: async (
      _: any,
      {
        _id,
        appointments: {
          patientId,
          doctorId,
          appointmentDate,
          appointmentTime,
          appointmentDuration,
          appointmentDescription,
          appointmentStatus,
          appointmentComments
        }
      }: {
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
      }
    ): Promise<IAppointments> => {
      try {
        const appointmentId = new ObjectId(_id);
        const filter = { _id: appointmentId };
        const update = {
          $set: {
            patientId,
            doctorId,
            appointmentDate,
            appointmentTime,
            appointmentDuration,
            appointmentDescription,
            appointmentStatus,
            appointmentComments
          }
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
    deleteAppointment: async (_: any, { _id }: { _id: string }): Promise<string> => {
      try {
        const appointmentId = new ObjectId(_id);
        const appointment: IAppointments | null = await Appointments.findByIdAndDelete({ _id: appointmentId });
        if (!appointment) {
          throw new Error('Product not found!');
        }
        return `Appointment with ID: ${appointment._id} deleted successfully`;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default appointmentsResolver;
