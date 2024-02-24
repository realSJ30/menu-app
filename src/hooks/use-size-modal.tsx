import { IOptions } from "@/global.types";
import { create } from "zustand";

interface useSizeModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  defaultSize: IOptions | null;
  setDefaultSize: (item: IOptions | null) => void;
  toggleFetch: boolean;
  setToggleFetch: (value: boolean) => void;
}

export const useSizeModal = create<useSizeModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, defaultSize: null }),
  defaultSize: null,
  setDefaultSize: (item: IOptions | null) => set({ defaultSize: item }),
  toggleFetch: false,
  setToggleFetch: (value: boolean) => set({ toggleFetch: value }),
}));
