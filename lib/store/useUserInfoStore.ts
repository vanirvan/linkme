import { create } from "zustand";

interface UserInfoState {
  name: string;
  username: string;
  image: string;
  update: ({
    name,
    username,
    image,
  }: {
    name: string;
    username: string;
    image: string;
  }) => void;
}

export const useUserInfoStore = create<UserInfoState>()((set) => ({
  name: "",
  username: "",
  image: "",
  update: (data) =>
    set((state) => ({
      name: data.name,
      username: data.username,
      image: data.image,
    })),
}));
