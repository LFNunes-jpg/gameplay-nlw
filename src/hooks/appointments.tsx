import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { seedAppointments } from '../data/appointments';
import { getItem, setItem, STORAGE_KEYS } from '../services/storage';
import type { AppointmentProps } from '../types';
import { useAuth } from './auth';

type AppointmentsContextData = {
  appointments: AppointmentProps[];
  addAppointment: (data: Omit<AppointmentProps, 'id' | 'isOwner'>) => Promise<void>;
  removeAppointment: (appointmentId: string) => Promise<void>;
};

const AppointmentsContext = createContext<AppointmentsContextData | null>(null);

// As partidas são salvas por usuário: cada conta enxerga só as suas.
export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  useEffect(() => {
    if (!user) {
      setAppointments([]);
      return;
    }
    let active = true;
    getItem<AppointmentProps[] | null>(STORAGE_KEYS.appointments(user.id), null).then((saved) => {
      if (!active) return;
      setAppointments(saved ?? seedAppointments);
    });
    return () => {
      active = false;
    };
  }, [user]);

  const value = useMemo<AppointmentsContextData>(
    () => ({
      appointments,
      async addAppointment(data) {
        if (!user) return;
        const created: AppointmentProps = { ...data, id: `${Date.now()}`, isOwner: true };
        const next = [created, ...appointments]; // a mais nova aparece no topo
        setAppointments(next);
        await setItem(STORAGE_KEYS.appointments(user.id), next);
      },
      async removeAppointment(appointmentId) {
        if (!user) return;
        const next = appointments.filter((item) => item.id !== appointmentId);
        setAppointments(next);
        await setItem(STORAGE_KEYS.appointments(user.id), next);
      },
    }),
    [appointments, user],
  );

  return <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>;
}

export function useAppointments() {
  const context = useContext(AppointmentsContext);
  if (!context) throw new Error('useAppointments deve ser usado dentro de <AppointmentsProvider>');
  return context;
}
