import { create } from "zustand";
import { User } from "../interfaces/user";

interface State {
  user: User | undefined
  admin: boolean
}

interface Action {
  setUser: (newUser: User | undefined) => void
  activateAdmin: () => void
  deactivateAdmin: () => void
}

export const useUser = create<State & Action>(set => {
  const user = JSON.parse(localStorage.getItem("lz-user") || "{}");
  const admin = !!localStorage.getItem("lz-admin");

  return {
    user: Object.keys(user).length ? user : undefined,
    admin: admin,
    setUser: (newUser) => set(state => ({...state, user: newUser })),
    activateAdmin: () => {
      localStorage.setItem("lz-admin", "true");
      set(state => ({...state, admin: true }))
    },
    deactivateAdmin: () => {
      localStorage.removeItem("lz-admin");
      set(state => ({...state, admin: false }))
    }
  }
})