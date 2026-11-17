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

  if (root.classList.contains('dark') === isDark) return;

  const style = document.createElement('style');
  style.textContent = '*,*::before,*::after{transition:none !important}';
  document.head.append(style);
  root.classList.toggle('dark', isDark);
  // Fija los colores nuevos antes de devolver las transiciones.
  void document.body.offsetHeight;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => style.remove());
  });
}

export function initTheme() {
  applyTheme(themeStore.get());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeStore.get() === 'system') applyTheme('system');
  });
}
