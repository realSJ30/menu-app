import { IOptions } from "@/global.types";
import { create } from "zustand";

interface useCategoryModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  defaultCategory: IOptions | null;
  setDefaultCategory: (item: IOptions | null) => void;
  toggleFetch: boolean;
  setToggleFetch: (value: boolean) => void;
}

export const useCategoryModal = create<useCategoryModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, defaultCategory: null }),
  defaultCategory: null,
  setDefaultCategory: (item: IOptions | null) => set({ defaultCategory: item }),
  toggleFetch: false,
  setToggleFetch: (value: boolean) => set({ toggleFetch: value }),
}));
