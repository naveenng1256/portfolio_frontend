import { USER_DETAIS } from "@/lib/types";
import { create } from "zustand";

const DEFAULT_USER_STATE: USER_DETAIS = {
  name: "",
  profile_headline: "",
  ing_url: "", // fixed from `ing_url`
  profile_summary: "",
  skills: [],
  projects: [],
  blogs: [],
  github: "",
  linkedin: "",
};

type InitialStateType = {
  userDetailsIssue: boolean;
  setUserDetailsIssue: (userDetailsIssue: boolean) => void;

  userData: USER_DETAIS;
  setUserData: (userData: USER_DETAIS) => void;
  mergeUserData: (partial: Partial<USER_DETAIS>) => void;
};

export const useUserStore = create<InitialStateType>((set) => ({
  userDetailsIssue: false,
  setUserDetailsIssue: (userDetailsIssue: boolean) => set({ userDetailsIssue }),

  userData: DEFAULT_USER_STATE,
  setUserData: (userData) => set({ userData }),
  mergeUserData: (partial) =>
    set((state) => ({
      userData: {
        ...state.userData,
        ...partial,
      },
    })),
}));
