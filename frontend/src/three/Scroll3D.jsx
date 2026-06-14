import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { use3DEnabled } from './use3DEnabled'

const ScrollScene = lazy(() => import('./ScrollScene'))

// Static fallback for mobile / reduced-motion.
function ScrollFallback() {
  return (
    <div className="grid h-full place-items-center">
      <div className="h-40 w-40 animate-float rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-violet/30 blur-xl" />
    </div>
  )
}

export default function Scroll3D({ className = '' }) {
  const enabled = use3DEnabled()
  const wrapRef = useRef(null)
  const progress = useRef(0)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    if (!enabled) return
    const onScroll = () => {
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 as the element enters from the bottom, 1 as it leaves past the top
      const p = (vh - rect.top) / (vh + rect.height)
      progress.current = Math.min(1, Math.max(0, p))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    let obs
    if (wrapRef.current && typeof IntersectionObserver !== 'undefined') {
      obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '120px' })
      obs.observe(wrapRef.current)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      obs?.disconnect()
    }
  }, [enabled])

  return (
    <div ref={wrapRef} className={`relative h-full w-full ${className}`}>
      {enabled ? (
        <Suspense fallback={<ScrollFallback />}>
          <ScrollScene progressRef={progress} frameloop={inView ? 'always' : 'never'} />
        </Suspense>
      ) : (
        <ScrollFallback />
      )}
    </div>
  )
}
