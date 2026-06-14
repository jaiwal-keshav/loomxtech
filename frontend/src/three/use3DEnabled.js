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

    if (!(hasWebGL && !reduceMotion && !smallScreen)) return

    // Defer the heavy WebGL init until the browser is idle so it doesn't block
    // first paint / interactivity (keeps Total Blocking Time low). The CSS
    // aurora shows instantly in the meantime.
    const idle =
      window.requestIdleCallback || ((cb) => window.setTimeout(() => cb(), 400))
    const cancel = window.cancelIdleCallback || window.clearTimeout
    const id = idle(() => setEnabled(true), { timeout: 2000 })
    return () => cancel(id)
  }, [])

  return enabled
}
