import { useRef } from 'react'

// Pointer-driven 3D tilt with a moving glare highlight. Children can use
// `style={{ transform: 'translateZ(Npx)' }}` to float at different depths.
export default function Tilt({ children, className = '', max = 12, glare = true }) {
  const ref = useRef(null)
  const raf = useRef(0)

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMove = (e) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * max * 2
    const ry = (px - 0.5) * max * 2
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    })
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(raf.current)
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-3d ${className}`}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}
    >
      {children}
      {glare && <span className="tilt-glare" aria-hidden="true" />}
    </div>
  )
}
