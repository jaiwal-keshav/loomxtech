import { useState, useEffect, useRef } from 'react'

// Tracks whether an element is on screen, so WebGL scenes can pause their
// render loop (frameloop="never") when scrolled out of view.
export function useInView(rootMargin = '120px') {
  const ref = useRef(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  return [ref, inView]
}
