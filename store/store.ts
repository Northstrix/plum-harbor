// store.ts
import { create } from "zustand";

type State = {
  masterKey: Uint8Array;
  username: string;
  iterations: number;
  isLoggedIn: boolean;
  masterKeyFingerprint: string;
  cornerRounding: string;
}

type Actions = {
  setMasterKey: (key: Uint8Array) => void;
  setUsername: (name: string) => void;
  setIterations: (count: number) => void;
  setIsLoggedIn: (status: boolean) => void;
  setMasterKeyFingerprint: (fingerprint: string) => void;
  setLoginData: (masterKey: Uint8Array, username: string, iterations: number, masterKeyFingerprint: string) => void; // Updated this line
  setCornerRounding: (cornerRounding: string) => void; // New function to set cornerRounding
}

const useStore = create<State & Actions>((set) => ({
  masterKey: new Uint8Array(272),
  username: "",
  iterations: 0,
  isLoggedIn: false,
  masterKeyFingerprint: "",
  cornerRounding: 'Smooth', // Default cornerRounding as a simple string

  setMasterKey: (key: Uint8Array) => set({ masterKey: key }),
  setUsername: (name: string) => set({ username: name }),
  setIterations: (count: number) => set({ iterations: count }),
  setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
  setMasterKeyFingerprint: (fingerprint: string) => set({ masterKeyFingerprint: fingerprint }),
  
  setLoginData: (masterKey: Uint8Array, username: string, iterations: number, masterKeyFingerprint: string) =>
    set({
      masterKey,
      username,
      iterations,
      isLoggedIn: true,
      masterKeyFingerprint,
    }),

  // New function for handling cornerRounding
  setCornerRounding: (cornerRounding: string) => set({ cornerRounding }), // Set the cornerRounding
}));

export default useStore;