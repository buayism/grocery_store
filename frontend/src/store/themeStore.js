import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,

      toggleTheme: () =>
        set((state) => {
          const newIsDark = !state.isDark;
          if (newIsDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDark: newIsDark };
        }),

      initTheme: () =>
        set((state) => {
          // Check stored preference, then system preference
          const stored = state.isDark;
          const prefersDark =
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
          const shouldBeDark = stored || prefersDark;

          if (shouldBeDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDark: shouldBeDark };
        }),
    }),
    {
      name: 'harvest-theme',
    }
  )
);
