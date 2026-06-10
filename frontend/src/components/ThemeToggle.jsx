import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'

const STORAGE_KEY = 'loomx_theme'

function getInitialTheme() {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('light')) {
    return 'light'
  }
  try {
    return localStorage.getItem(STORAGE_KEY) || 'dark'
  } catch {
    return 'dark'
  }
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.classList.add('light')
    else root.classList.remove('light')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-lg border border-fg/10 text-fg transition hover:border-neon-cyan/50 hover:text-neon-cyan ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} className="h-5 w-5" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
