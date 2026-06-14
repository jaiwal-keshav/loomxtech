import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useThemeColors } from './useThemeColors'

const COUNT = 110
const RADIUS = 6.5
const MAX_DIST = 2.2
const MAX_LINES = 1100

function Constellation({ colors }) {
  const tiltRef = useRef()
  const spinRef = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  // Particle positions + velocities (stable across re-renders)
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
      velocities[i * 3] = (Math.random() - 0.5) * 0.006
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006
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

  // Round particle sprite
  const sprite = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.4, 'rgba(255,255,255,0.6)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(c)
    return tex
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, delta) => {
    const pos = pointGeo.attributes.position.array
    // drift particles, bounce within sphere bounds
    for (let i = 0; i < COUNT; i++) {
      for (let k = 0; k < 3; k++) {
        const idx = i * 3 + k
        pos[idx] += velocities[idx]
        if (pos[idx] > RADIUS || pos[idx] < -RADIUS) velocities[idx] *= -1
      }
    }
    pointGeo.attributes.position.needsUpdate = true

    // rebuild proximity lines
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

    if (spinRef.current) spinRef.current.rotation.y += delta * 0.06
    if (tiltRef.current) {
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(tiltRef.current.rotation.x, pointer.current.y * 0.28, 0.05)
      tiltRef.current.rotation.y = THREE.MathUtils.lerp(tiltRef.current.rotation.y, pointer.current.x * 0.4, 0.05)
    }
  })

  return (
    <group ref={tiltRef}>
      <group ref={spinRef}>
        <points geometry={pointGeo}>
          <pointsMaterial
            map={sprite}
            color={colors.cyan}
            size={0.18}
            sizeAttenuation
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial color={colors.blue} transparent opacity={0.22} depthWrite={false} />
        </lineSegments>
        <mesh>
          <icosahedronGeometry args={[2.4, 1]} />
          <meshBasicMaterial color={colors.violet} wireframe transparent opacity={0.32} />
        </mesh>
      </group>
    </group>
  )
}

export default function HeroScene({ frameloop = 'always' }) {
  const { colors } = useThemeColors()
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <Constellation colors={colors} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={colors.bloom} luminanceThreshold={0.08} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
