import { useState, useEffect } from 'react'

// Reads the current theme (dark default, or `.light` on <html>) and returns a
// palette for the 3D scenes. Re-renders when the ThemeToggle flips the class.
function readTheme() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

const PALETTES = {
  dark: {
    cyan: '#22d3ee',
    violet: '#a855f7',
    blue: '#3b82f6',
    dim: '#1a1d2e',
    bloom: 1.25,
  },
  light: {
    cyan: '#0891b2',
    violet: '#7c3aed',
    blue: '#2563eb',
    dim: '#cbd5e1',
    bloom: 0.7,
  },
}

export function useThemeColors() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return { theme, colors: PALETTES[theme] }
}
