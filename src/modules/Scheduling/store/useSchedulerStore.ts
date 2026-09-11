import { create } from 'zustand';

interface SchedulerState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useSchedulerStore = create<SchedulerState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
