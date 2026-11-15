import { useStore } from '@nanostores/preact';
import { themeStore, setTheme, type Theme } from '../stores/theme';

const THEMES: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Claro' },
  { value: 'system', label: 'Sistema' },
  { value: 'dark', label: 'Oscuro' },
];

export default function ThemeToggle() {
  const currentTheme = useStore(themeStore);

  return (
    <div class="theme" role="group" aria-label="Tema">
      {THEMES.map(({ value, label }) => (
        <button type="button" aria-pressed={currentTheme === value} onClick={() => setTheme(value)}>
          {label}
        </button>
      ))}
    </div>
  );
}
