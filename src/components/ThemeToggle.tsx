import { useEffect, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { themeStore, setTheme, type Theme } from '../stores/theme';

const THEMES: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Claro' },
  { value: 'system', label: 'Sistema' },
  { value: 'dark', label: 'Oscuro' },
];

export default function ThemeToggle() {
  const currentTheme = useStore(themeStore);
  // El servidor no conoce el tema guardado: ningún botón sale marcado del HTML,
  // y el real se marca al montar. Así la hidratación no arrastra un estado falso.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div class="theme" role="group" aria-label="Tema">
      {THEMES.map(({ value, label }) => (
        <button type="button" aria-pressed={mounted && currentTheme === value} onClick={() => setTheme(value)}>
          {label}
        </button>
      ))}
    </div>
  );
}
