import api from "@/lib/axios";
import type { SigninForm, SignupForm, User } from "@/types/authTypes";
import { create } from "zustand";

type AuthStore = {
  user: User | null;

  // loading state
  isCheckingAuth: boolean;

  // error state
  error: string | null;

  // functions
  signin: (formdata: SigninForm) => Promise<void>;
  signup: (formdata: SignupForm) => Promise<void>;
  checkAuth: () => Promise<void>;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isCheckingAuth: true,
  error: null,
  signin: async (formdata) => {
    try {
      const response = await api.post("/auth/signin", formdata);
      const { user } = response.data;
      set({ user, error: null });
    } catch (error) {
      set({ error: String(error) });
    }
  },
  signup: async (formdata) => {
    try {
      const response = await api.post("/auth/signup", formdata);
      const { user } = response.data;
      set({ user, error: null });
    } catch (error) {
      set({ error: String(error) });
    }
  },
  checkAuth: async () => {
    try {
      const response = await api.get("/auth/check-auth");
      const { user } = response.data;
      set({ user, isCheckingAuth: false });
    } catch {
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
