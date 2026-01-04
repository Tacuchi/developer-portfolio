import { persistentAtom } from '@nanostores/persistent';

export type Theme = 'light' | 'dark' | 'system';

export const themeStore = persistentAtom<Theme>('theme', 'system');

export function setTheme(theme: Theme) {
  themeStore.set(theme);
  applyTheme(theme);
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  root.classList.toggle('dark', isDark);
}

export function initTheme() {
  applyTheme(themeStore.get());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeStore.get() === 'system') applyTheme('system');
  });
}
