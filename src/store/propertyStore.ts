import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Property, TourSchedule } from '@/types';

interface PropertyState {
  schedule: TourSchedule;
  addProperty: (property: Property) => void;
  removeProperty: (id: string) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  setTourDate: (date: string) => void;
  setAgentName: (name: string) => void;
  setClientName: (name: string) => void;
  clear: () => void;
}

const initialSchedule: TourSchedule = {
  properties: [],
  tourDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
  agentName: '',
  clientName: '',
};

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set) => ({
      schedule: initialSchedule,

      addProperty: (property: Property) =>
        set((state) => ({
          schedule: {
            ...state.schedule,
            properties: [...state.schedule.properties, property],
          },
        })),

      removeProperty: (id: string) =>
        set((state) => ({
          schedule: {
            ...state.schedule,
            properties: state.schedule.properties.filter((p) => p.id !== id),
          },
        })),

      updateProperty: (id: string, updatedProperty: Partial<Property>) =>
        set((state) => ({
          schedule: {
            ...state.schedule,
            properties: state.schedule.properties.map((p) =>
              p.id === id ? { ...p, ...updatedProperty } : p
            ),
          },
        })),

      setTourDate: (date: string) =>
        set((state) => ({
          schedule: {
            ...state.schedule,
            tourDate: date,
          },
        })),

      setAgentName: (name: string) =>
        set((state) => ({
          schedule: {
            ...state.schedule,
            agentName: name,
          },
        })),

      setClientName: (name: string) =>
        set((state) => ({
          schedule: {
            ...state.schedule,
            clientName: name,
          },
        })),

      clear: () => set({ schedule: initialSchedule }),
    }),
    {
      name: 'property-storage',
    }
  )
);
