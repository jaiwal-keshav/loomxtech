import { useState, useEffect } from 'react'

// Decides whether to render heavy WebGL scenes. Falls back (returns false) on
// reduced-motion, small/touch screens, or when WebGL is unavailable — callers
// render a lightweight static fallback instead.
export function use3DEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const smallScreen = window.matchMedia('(max-width: 768px)').matches

    let hasWebGL = false
    try {
      const canvas = document.createElement('canvas')
      hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch {
      hasWebGL = false
    }

    setEnabled(hasWebGL && !reduceMotion && !smallScreen)
  }, [])

  return enabled
}
