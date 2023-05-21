import Appointments, { IAppointments } from '../../models/appointmentsModel';
import { ObjectId } from 'mongodb';
enum AppointmentStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Canceled = 'canceled'
  }
const appointmentsResolver = {
  Query: {
    getAllAppointments: async (): Promise<IAppointments[]> => {
      try {
        const appointments: IAppointments[] = await Appointments.find();
        return appointments;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createAppointment: async (
      parent: any,
      args: {
        patientId: ObjectId;
        doctorId: ObjectId;
        appointmentDate: string;
        appointmentTime: string;
        appointmentDuration: string;
        appointmentDescription: string;
        appointmentStatus: AppointmentStatus;
        appointmentComments?: string;
      },
      context: any,
      info: any
    ): Promise<IAppointments> => {
      try {
        const { patientId, doctorId, appointmentDate, appointmentTime, appointmentDuration, appointmentDescription, appointmentStatus, appointmentComments } = args;
        const appointment: IAppointments = new Appointments({
          patientId,
          doctorId,
          appointmentDate,
          appointmentTime,
          appointmentDuration,
          appointmentDescription,
          appointmentStatus,
          appointmentComments
        });
        await appointment.save();
        return appointment;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default appointmentsResolver;
