import { ItemColumn } from "@/global.types";
import { create } from "zustand";

interface useItemModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  defaultItem: ItemColumn | null;
  setDefaultItem: (item: ItemColumn | null) => void;
  toggleFetch: boolean;
  setToggleFetch: (value: boolean) => void;
}

export const useItemModal = create<useItemModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, defaultItem: null }),
  defaultItem: null,
  setDefaultItem: (item: ItemColumn | null) => set({ defaultItem: item }),
  toggleFetch: false,
  setToggleFetch: (value: boolean) => set({ toggleFetch: value }),
}));
