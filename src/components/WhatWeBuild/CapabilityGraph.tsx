import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CapabilityGraphProps {
  scrollProgress: number
  activeIndex?: number
  onNodeHover?: (index: number | null) => void
  onNodeSelect?: (index: number) => void
}

const NODES_COUNT = 8
const RADIUS = 2.2
const COPPER_COLOR = '#C1662F'
const CYAN_COLOR = '#6FE0D6'
const INACTIVE_COLOR = '#55585E'
const LINE_COLOR = 'rgba(244, 245, 246, 0.12)'

function SceneContent({
  scrollProgress,
  activeIndex = 0,
  onNodeHover,
  onNodeSelect,
}: CapabilityGraphProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { camera } = useThree()

  // Fibonacci-sphere point generation for 8 nodes
  const points = useMemo(() => {
    const pts: [number, number, number][] = []
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < NODES_COUNT; i++) {
      const y = 1 - (i / (NODES_COUNT - 1 || 1)) * 2
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = phi * i
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      pts.push([x * RADIUS, y * RADIUS, z * RADIUS])
    }
    return pts
  }, [])

  // Nearest-neighbor edges between nodes
  const lineGeometry = useMemo(() => {
    const positions: number[] = []
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const v1 = new THREE.Vector3(...points[i])
        const v2 = new THREE.Vector3(...points[j])
        if (v1.distanceTo(v2) < 3.2) {
          positions.push(...points[i], ...points[j])
        }
      }
    }
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geom
  }, [points])

  useFrame((_, delta) => {
    // Smooth auto-rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1
    }

    // Scroll-linked camera zoom: map scrollProgress [0, 0.5, 1] to camera z [7, 5.4, 7]
    const p = Math.max(0, Math.min(1, scrollProgress))
    const targetZ =
      p <= 0.5 ? 7 - (7 - 5.4) * (p / 0.5) : 5.4 + (7 - 5.4) * ((p - 0.5) / 0.5)
    
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08)
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <group ref={groupRef}>
        {/* Nearest-neighbor connection lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color={LINE_COLOR} transparent opacity={0.25} />
        </lineSegments>

        {/* 8 Capability Nodes */}
        {points.map((pos, idx) => {
          const isActive = idx === activeIndex
          const isHovered = idx === hoveredIndex
          const nodeSelected = isActive || isHovered

          return (
            <group key={idx} position={pos}>
              {/* Main Node Sphere */}
              <mesh
                onPointerOver={(e) => {
                  e.stopPropagation()
                  setHoveredIndex(idx)
                  onNodeHover?.(idx)
                }}
                onPointerOut={(e) => {
                  e.stopPropagation()
                  setHoveredIndex(null)
                  onNodeHover?.(null)
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onNodeSelect?.(idx)
                }}
              >
                <sphereGeometry args={[nodeSelected ? 0.18 : 0.12, 16, 16]} />
                <meshBasicMaterial
                  color={nodeSelected ? COPPER_COLOR : INACTIVE_COLOR}
                />
              </mesh>

              {/* Cyan wireframe emissive rim for hovered / active node */}
              {nodeSelected && (
                <mesh>
                  <sphereGeometry args={[0.26, 12, 12]} />
                  <meshBasicMaterial
                    color={CYAN_COLOR}
                    wireframe
                    transparent
                    opacity={0.25}
                  />
                </mesh>
              )}
            </group>
          )
        })}
      </group>
    </>
  )
}

export default function CapabilityGraph(props: CapabilityGraphProps) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '180px' }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 7], fov: 45 }}
      >
        <SceneContent {...props} />
      </Canvas>
    </div>
  )
}
