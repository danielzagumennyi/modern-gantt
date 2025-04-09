// scrollStore.ts
import { create } from 'zustand';

interface ScrollStore {
  scrollTop: number;
}

export const useScrollStore = create<ScrollStore>(() => ({
  scrollTop: 0,
}));
