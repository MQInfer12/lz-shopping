import { create } from "zustand";
import { User } from "../interfaces/user";
import { postCi } from "../services/user";

interface State {
  user: User | undefined
  admin: boolean
  loadingUserdata: boolean
}

interface Action {
  setUser: (newUser: User | undefined) => void
  activateAdmin: () => void
  deactivateAdmin: () => void
  getUserData: (ci: string) => void
}

export const useUser = create<State & Action>(set => {
  const user = JSON.parse(localStorage.getItem("lz-user") || "{}");
  const admin = !!localStorage.getItem("lz-admin");

  return {
    user: Object.keys(user).length ? user : undefined,
    admin: admin,
    loadingUserdata: true,
    setUser: (newUser) => set(state => ({...state, user: newUser })),
    activateAdmin: () => {
      localStorage.setItem("lz-admin", "true");
      set(state => ({...state, admin: true }))
    },
    deactivateAdmin: () => {
      localStorage.removeItem("lz-admin");
      set(state => ({...state, admin: false }))
    },
    getUserData: async (ci) => {
      set(state => ({
        ...state,
        loadingUserdata: true
      }));
      const res = await postCi(ci);
      set(state => ({
        ...state,
        user: res.data,
        loadingUserdata: false
      }));
    }
  }
})