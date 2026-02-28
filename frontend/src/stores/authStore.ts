import type { SigninForm, User } from "@/types/authTypes";
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  signin: (formdata: SigninForm) => Promise<void>;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isChecking: false,
  signin: async (formdata) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const {
        data: { user },
      } = await response.json();

      set({ user, isAuthenticated: true });
    } catch (error) {
      // WORKING HERE AT ERROR
      console.log("ERROR: ", error);
    }
  },
}));

export default useAuthStore;
