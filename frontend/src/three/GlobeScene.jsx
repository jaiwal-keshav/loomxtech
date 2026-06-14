import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useThemeColors } from './useThemeColors'

const R = 2

// LoomX offices
const OFFICES = [
  { name: 'Pune', lat: 18.5204, lon: 73.8567 },
  { name: 'Chhatrapati Sambhajinagar', lat: 19.8762, lon: 75.3433 },
]

function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function Marker({ position, color, label }) {
  const ring = useRef()
  useFrame((state) => {
    if (ring.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.25
      ring.current.scale.set(s, s, s)
    }
  })
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={ring} onUpdate={(self) => self.lookAt(0, 0, 0)}>
        <ringGeometry args={[0.08, 0.11, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <Html center distanceFactor={8} position={[0, 0.22, 0]}>
        <span className="whitespace-nowrap rounded-full border border-fg/15 bg-bg/70 px-2 py-0.5 text-[10px] font-medium text-fg backdrop-blur">
          {label}
        </span>
      </Html>
    </group>
  )
}

function Arc({ start, end, color }) {
  const dot = useRef()
  const curve = useMemo(() => {
    const s = start.clone()
    const e = end.clone()
    const mid = s.clone().add(e).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.4)
    return new THREE.QuadraticBezierCurve3(s, mid, e)
  }, [start, end])

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)), [curve])

  useFrame((state) => {
    if (dot.current) {
      const t = (state.clock.elapsedTime * 0.25) % 1
      dot.current.position.copy(curve.getPointAt(t))
    }
  })

  return (
    <group>
      <line geometry={geo}>
        <lineBasicMaterial color={color} transparent opacity={0.7} />
      </line>
      <mesh ref={dot}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

function Globe({ colors, theme }) {
  const points = useMemo(() => OFFICES.map((o) => latLonToVec3(o.lat, o.lon, R)), [])
  const coreColor = theme === 'light' ? '#e2e8f0' : '#0a0c14'

  return (
    <group rotation={[0, -1.2, 0.35]}>
      {/* solid core hides far-side wireframe for depth */}
      <mesh>
        <sphereGeometry args={[R * 0.985, 48, 48]} />
        <meshBasicMaterial color={coreColor} transparent opacity={0.92} />
      </mesh>
      {/* lat/long wireframe */}
      <mesh>
        <sphereGeometry args={[R, 40, 26]} />
        <meshBasicMaterial color={colors.blue} wireframe transparent opacity={0.22} />
      </mesh>
      {/* atmosphere glow */}
      <mesh scale={1.18}>
        <sphereGeometry args={[R, 48, 48]} />
        <meshBasicMaterial color={colors.cyan} transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {points.map((p, i) => (
        <Marker key={OFFICES[i].name} position={p} color={colors.cyan} label={OFFICES[i].name} />
      ))}
      <Arc start={points[0]} end={points[1]} color={colors.violet} />
    </group>
  )
}

export default function GlobeScene({ frameloop = 'always' }) {
  const { colors, theme } = useThemeColors()
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <Globe colors={colors} theme={theme} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} rotateSpeed={0.5} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={colors.bloom} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
