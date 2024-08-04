import { create } from "zustand";

interface LinkData {
  id: number;
  title: string;
  link: string;
  order: number;
  createdAt: string;
}

interface LinkDialogState {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  data: LinkData | null;
  setData: (value: LinkData | null) => void;
  openType: "add" | "edit" | "delete" | null;
  setOpenType: (value: "add" | "edit" | "delete" | null) => void;
}

export const useLinkDialogStore = create<LinkDialogState>()((set) => ({
  isOpen: false,
  setOpen: (value) => set((state) => ({ isOpen: value })),
  openType: null,
  data: null,
  setData: (value) => set((state) => ({ data: value })),
  setOpenType: (value) => set((state) => ({ openType: value })),
}));
