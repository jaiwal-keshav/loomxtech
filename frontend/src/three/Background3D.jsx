import { Suspense, lazy } from 'react'
import { use3DEnabled } from './use3DEnabled'
import AnimatedBackground from '../components/AnimatedBackground'

// One persistent, lightweight WebGL background for the whole site. Doubles as
// the interactive scroll graphic (camera dollies into the field on scroll).
const GlobalScene = lazy(() => import('./GlobalScene'))

export default function Background3D() {
  const enabled = use3DEnabled()

  // CSS aurora always renders — it sets the page background colour and is the
  // fallback when 3D is disabled. The transparent canvas layers on top of it.
  return (
    <>
      <AnimatedBackground />
      {enabled && (
        <div className="pointer-events-none fixed inset-0 -z-10">
          <Suspense fallback={null}>
            <GlobalScene />
          </Suspense>
        </div>
      )}
    </>
  )
}
