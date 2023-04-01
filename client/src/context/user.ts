import { create } from "zustand";
import { User } from "../interfaces/user";

interface State {
  user: User | undefined
}

interface Action {
  setUser: (newUser: User | undefined) => void
}

export const useUser = create<State & Action>(set => {
  const user = JSON.parse(localStorage.getItem("lz-user") || "{}");

  return {
    user: Object.keys(user).length ? user : undefined,
    setUser: (newUser) => set(state => ({...state, user: newUser }))
  }
})