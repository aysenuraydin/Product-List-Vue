// stores/authStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "@/plugins/FirebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(auth.currentUser);

  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, login, register, logout };
});
