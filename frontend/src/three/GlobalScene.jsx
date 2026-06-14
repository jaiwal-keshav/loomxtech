import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import { useThemeColors } from './useThemeColors'

const COUNT = 100
const RADIUS = 7
const MAX_DIST = 2.3
const MAX_LINES = 900

function Field({ colors, scrollRef, pointerRef }) {
  const tilt = useRef()
  const spin = useRef()
  const { camera } = useThree()

  const { positions, velocities, linePositions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const velocities = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r = RADIUS * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      velocities[i * 3] = (Math.random() - 0.5) * 0.005
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    }
    return { positions, velocities, linePositions: new Float32Array(MAX_LINES * 2 * 3) }
  }, [])

  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return g
  }, [linePositions])

  const sprite = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.35, 'rgba(255,255,255,0.55)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(c)
  }, [])

  // Recompute proximity lines every other frame to halve CPU work.
  const tick = useRef(0)

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05)
    const pos = pointGeo.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      for (let k = 0; k < 3; k++) {
        const idx = i * 3 + k
        pos[idx] += velocities[idx]
        if (pos[idx] > RADIUS || pos[idx] < -RADIUS) velocities[idx] *= -1
      }
    }
    pointGeo.attributes.position.needsUpdate = true

    tick.current = (tick.current + 1) % 2
    if (tick.current === 0) {
      let ptr = 0
      const maxD2 = MAX_DIST * MAX_DIST
      for (let i = 0; i < COUNT && ptr < MAX_LINES; i++) {
        const ix = pos[i * 3], iy = pos[i * 3 + 1], iz = pos[i * 3 + 2]
        for (let j = i + 1; j < COUNT && ptr < MAX_LINES; j++) {
          const dx = ix - pos[j * 3]
          const dy = iy - pos[j * 3 + 1]
          const dz = iz - pos[j * 3 + 2]
          if (dx * dx + dy * dy + dz * dz < maxD2) {
            linePositions[ptr * 6] = ix
            linePositions[ptr * 6 + 1] = iy
            linePositions[ptr * 6 + 2] = iz
            linePositions[ptr * 6 + 3] = pos[j * 3]
            linePositions[ptr * 6 + 4] = pos[j * 3 + 1]
            linePositions[ptr * 6 + 5] = pos[j * 3 + 2]
            ptr++
          }
        }
      }
      lineGeo.setDrawRange(0, ptr * 2)
      lineGeo.attributes.position.needsUpdate = true
    }

    // Scroll-driven camera dolly + rotation (the interactive scroll graphic)
    const p = scrollRef.current
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 12 - p * 5, 0.06)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, p * 2.5, 0.06)
    camera.lookAt(0, 0, 0)

    if (spin.current) {
      spin.current.rotation.y += d * 0.04
      spin.current.rotation.z = THREE.MathUtils.lerp(spin.current.rotation.z, p * 0.7, 0.06)
    }
    if (tilt.current) {
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, pointerRef.current.y * 0.18, 0.05)
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, pointerRef.current.x * 0.28, 0.05)
    }
  })

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <points geometry={pointGeo}>
          <pointsMaterial
            map={sprite}
            color={colors.cyan}
            size={0.22}
            sizeAttenuation
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial color={colors.blue} transparent opacity={0.18} depthWrite={false} />
        </lineSegments>
        <mesh>
          <icosahedronGeometry args={[2.6, 1]} />
          <meshBasicMaterial color={colors.violet} wireframe transparent opacity={0.28} />
        </mesh>
      </group>
    </group>
  )
}

export default function GlobalScene() {
  const { colors } = useThemeColors()
  const [dpr, setDpr] = useState(1.5)
  const scrollRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0
    }
    const onMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />
      <Field colors={colors} scrollRef={scrollRef} pointerRef={pointerRef} />
    </Canvas>
  )
}
