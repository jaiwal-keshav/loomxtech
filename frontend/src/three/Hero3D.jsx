import { Suspense, lazy } from 'react'
import { use3DEnabled } from './use3DEnabled'
import { useInView } from './useInView'

// Heavy WebGL bundle is only imported when 3D is enabled.
const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero3D() {
  const enabled = use3DEnabled()
  const [ref, inView] = useInView()
  if (!enabled) return null // CSS aurora background remains as the fallback

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0">
      <Suspense fallback={null}>
        <HeroScene frameloop={inView ? 'always' : 'never'} />
      </Suspense>
    </div>
  )
}
