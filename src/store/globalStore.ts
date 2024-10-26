import { getCookie, hasCookie } from "cookies-next";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GlobalSettingState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useGlobalSettingStore = create<GlobalSettingState>()(
  devtools((set) => ({
    darkMode: hasCookie("theme") ? getCookie("theme") === "true" : false,
    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  }))
);

export default useGlobalSettingStore;
