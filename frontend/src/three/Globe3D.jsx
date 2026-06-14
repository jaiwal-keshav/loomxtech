import { Suspense, lazy } from 'react'
import { use3DEnabled } from './use3DEnabled'
import { useInView } from './useInView'

const GlobeScene = lazy(() => import('./GlobeScene'))

// Static fallback: a stylized CSS globe with two pulsing markers.
function GlobeFallback() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <div className="absolute inset-0 rounded-full border border-fg/10 bg-gradient-to-br from-neon-cyan/10 to-neon-violet/10" />
      <div className="absolute inset-6 rounded-full border border-fg/10" />
      <div className="absolute inset-12 rounded-full border border-fg/10" />
      <span className="absolute left-1/2 top-1/3 h-2 w-2 -translate-x-1/2 animate-ping rounded-full bg-neon-cyan" />
      <span className="absolute left-2/3 top-1/2 h-2 w-2 animate-ping rounded-full bg-neon-violet" />
    </div>
  )
}

export default function Globe3D({ className = '' }) {
  const enabled = use3DEnabled()
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`relative aspect-square w-full ${className}`}>
      {enabled ? (
        <Suspense fallback={<GlobeFallback />}>
          <GlobeScene frameloop={inView ? 'always' : 'never'} />
        </Suspense>
      ) : (
        <GlobeFallback />
      )}
    </div>
  )
}
