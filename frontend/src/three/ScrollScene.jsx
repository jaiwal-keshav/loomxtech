import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useThemeColors } from './useThemeColors'

function Knot({ progressRef, colors }) {
  const mesh = useRef()
  const target = useRef(0)

  useFrame((_, delta) => {
    target.current = THREE.MathUtils.lerp(target.current, progressRef.current || 0, 0.08)
    const p = target.current
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.3
      mesh.current.rotation.x = p * Math.PI * 1.5
      const s = 0.75 + p * 0.6
      mesh.current.scale.set(s, s, s)
    }
  })

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.34, 140, 24]} />
      <MeshDistortMaterial
        color={colors.violet}
        emissive={colors.cyan}
        emissiveIntensity={0.5}
        roughness={0.15}
        metalness={0.65}
        distort={0.32}
        speed={1.8}
      />
    </mesh>
  )
}

export default function ScrollScene({ progressRef, frameloop = 'always' }) {
  const { colors } = useThemeColors()
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={50} color={colors.cyan} />
      <pointLight position={[-4, -2, 2]} intensity={40} color={colors.violet} />
      <Knot progressRef={progressRef} colors={colors} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={colors.bloom} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
