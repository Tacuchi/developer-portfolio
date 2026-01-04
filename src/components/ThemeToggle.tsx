import { useStore } from '@nanostores/preact';
import { themeStore, setTheme, type Theme } from '../stores/theme';

const THEMES: Record<Theme, { icon: string; label: string; next: Theme }> = {
  light: { icon: '☀️', label: 'Claro', next: 'dark' },
  dark: { icon: '🌙', label: 'Oscuro', next: 'system' },
  system: { icon: '💻', label: 'Sistema', next: 'light' },
};

export default function ThemeToggle() {
  const currentTheme = useStore(themeStore);
  const { icon, label, next } = THEMES[currentTheme];

  return (
    <button
      onClick={() => setTheme(next)}
      class="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border)] transition-colors"
      aria-label="Cambiar tema"
      title={`Tema: ${label}`}
    >
      <span class="text-xl">{icon}</span>
    </button>
  );
}
