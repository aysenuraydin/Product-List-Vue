import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "@/plugins/FirebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import session from '@/plugins/session';

export const useAuthStore = defineStore("auth", () => {
  const user = ref(auth.currentUser);

  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });

  const login = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (response && response.user) {
      const token = await response.user.getIdToken();
      session.setSession(token);
  }

  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    session.clearSession();
  };

  return { user, login, register, logout };
});
