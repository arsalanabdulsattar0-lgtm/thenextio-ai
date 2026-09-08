import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface EarthGlobeProps {
  onLoaded?: () => void
}

const CITY_HUBS = [
  { name: 'San Francisco', lat: 37.77, lon: -122.41, color: '#6FE0D6' },
  { name: 'New York',      lat: 40.71, lon: -74.00,  color: '#C1662F' },
  { name: 'London',        lat: 51.50, lon: -0.12,   color: '#6FE0D6' },
  { name: 'Dubai',         lat: 25.20, lon: 55.27,   color: '#C1662F' },
  { name: 'Singapore',     lat: 1.35,  lon: 103.81,  color: '#6FE0D6' },
  { name: 'Tokyo',         lat: 35.67, lon: 139.65,  color: '#C1662F' },
  { name: 'Sydney',        lat: -33.86,lon: 151.20,  color: '#6FE0D6' },
]

const CONNECTIONS: [number, number][] = [
  [0, 1], // SF -> NY
  [1, 2], // NY -> London
  [2, 3], // London -> Dubai
  [3, 4], // Dubai -> Singapore
  [4, 5], // Singapore -> Tokyo
  [5, 0], // Tokyo -> SF
  [4, 6], // Singapore -> Sydney
]

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

export default function EarthGlobe({ onLoaded }: EarthGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 480
    const height = container.clientHeight || 480

    // Scene & Camera with safe padding so globe never clips at canvas edge
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.z = 6.2

    // Renderer with high performance & full alpha transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Master globe group
    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const RADIUS = 1.48

    // 1. Official NASA Blue Marble Earth Texture
    const textureLoader = new THREE.TextureLoader()
    const earthTexture = textureLoader.load('/earth-map.jpg', () => {
      onLoaded?.()
    })
    earthTexture.colorSpace = THREE.SRGBColorSpace

    // Earth Base Sphere (Realistic Blue Oceans + Green Continents)
    const sphereGeo = new THREE.SphereGeometry(RADIUS, 64, 64)
    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.55,
      metalness: 0.08,
    })
    const earthMesh = new THREE.Mesh(sphereGeo, sphereMat)
    globeGroup.add(earthMesh)

    // 2. Realistic Earth Atmosphere Outer Halo (Light Blue, tightly wrapped)
    const atmosVertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    const atmosFragmentShader = `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.72 - dot(vNormal, vec3(0, 0, 1.0)), 2.4);
        gl_FragColor = vec4(0.35, 0.68, 1.0, intensity * 0.72);
      }
    `
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: atmosVertexShader,
      fragmentShader: atmosFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    })
    const atmosMesh = new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 1.035, 48, 48), atmosMat)
    globeGroup.add(atmosMesh)

    // 3. City Hub Beacons & Pulsing Rings
    const hubPositions: THREE.Vector3[] = []
    const pulseMeshes: { mesh: THREE.Mesh; phase: number }[] = []

    CITY_HUBS.forEach((hub, idx) => {
      const pos = latLonToVec3(hub.lat, hub.lon, RADIUS)
      hubPositions.push(pos)

      // Beacon Dot
      const beaconGeo = new THREE.SphereGeometry(0.032, 16, 16)
      const beaconMat = new THREE.MeshBasicMaterial({ color: hub.color })
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat)
      beaconMesh.position.copy(pos)
      globeGroup.add(beaconMesh)

      // Pulsing Ring around Beacon
      const ringGeo = new THREE.RingGeometry(0.04, 0.058, 32)
      const ringMat = new THREE.MeshBasicMaterial({
        color: hub.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.position.copy(pos.clone().multiplyScalar(1.002))
      ringMesh.lookAt(pos.clone().multiplyScalar(2))
      globeGroup.add(ringMesh)
      pulseMeshes.push({ mesh: ringMesh, phase: idx * 0.8 })
    })

    // 4. Curved 3D Arcs between hubs
    const arcPointsList: THREE.Vector3[][] = []
    CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const p1 = hubPositions[startIdx]
      const p2 = hubPositions[endIdx]
      if (!p1 || !p2) return

      const dist = p1.distanceTo(p2)
      const mid = p1.clone().add(p2).multiplyScalar(0.5)
      const arcHeight = RADIUS * (1 + Math.min(dist * 0.16, 0.32))
      mid.normalize().multiplyScalar(arcHeight)

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      const pts = curve.getPoints(40)
      arcPointsList.push(pts)

      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(startIdx % 2 === 0 ? '#C1662F' : '#6FE0D6'),
        transparent: true,
        opacity: 0.42,
      })
      const line = new THREE.Line(lineGeo, lineMat)
      globeGroup.add(line)
    })

    // 5. Traveling light pulses along arcs
    const packetGeo = new THREE.SphereGeometry(0.02, 12, 12)
    const packets: { mesh: THREE.Mesh; arcIdx: number; t: number; speed: number }[] = []

    arcPointsList.forEach((_, arcIdx) => {
      const pMat = new THREE.MeshBasicMaterial({
        color: arcIdx % 2 === 0 ? 0xffffff : 0x6fe0d6,
      })
      const pMesh = new THREE.Mesh(packetGeo, pMat)
      globeGroup.add(pMesh)
      packets.push({
        mesh: pMesh,
        arcIdx,
        t: (arcIdx * 0.25) % 1,
        speed: 0.005 + (arcIdx % 3) * 0.002,
      })
    })

    // 6. Delicate Planetary Orbit Rings
    const createTechRing = (r: number, tiltX: number, tiltY: number, color: string, opacity: number) => {
      const ringGeo = new THREE.RingGeometry(r - 0.01, r, 96)
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = tiltX
      ring.rotation.y = tiltY
      globeGroup.add(ring)
      return ring
    }

    const ring1 = createTechRing(RADIUS * 1.22, Math.PI / 2.7, 0.2, '#6FE0D6', 0.22)
    const ring2 = createTechRing(RADIUS * 1.36, Math.PI / 2.2, -0.35, '#C1662F', 0.18)

    // 7. Natural Sunlight & Illumination
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.7)
    sunLight.position.set(5, 3.5, 4)
    scene.add(sunLight)

    const fillLight = new THREE.DirectionalLight(0x5a90bf, 0.85)
    fillLight.position.set(-5, -2, -2)
    scene.add(fillLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45)
    scene.add(ambientLight)

    // Mouse Tracking & Inertia Tilt
    let targetRotX = 0.15
    let targetRotY = 0
    let curRotX = 0.15
    let curRotY = 0

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      targetRotX = 0.15 - ny * 0.32
      targetRotY = nx * 0.45
    }

    const parentHero = container.closest('.hero')
    if (parentHero) {
      parentHero.addEventListener('mousemove', handleMouseMove as EventListener)
    } else {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // Animation Loop
    let animId: number
    let clock = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)
      clock += 0.016

      // Continuous Earth Auto-Spin
      globeGroup.rotation.y += 0.0026

      // Smooth Mouse Tilt Lerp (rotation only, no position shift so it never cuts into edges)
      curRotX += (targetRotX - curRotX) * 0.05
      curRotY += (targetRotY - curRotY) * 0.05
      globeGroup.rotation.x = curRotX
      globeGroup.position.set(0, 0, 0)

      // Rings gentle rotation
      ring1.rotation.z += 0.0015
      ring2.rotation.z -= 0.001

      // Pulse city beacons
      pulseMeshes.forEach(({ mesh, phase }) => {
        const s = 1 + Math.sin(clock * 2.8 + phase) * 0.45
        mesh.scale.set(s, s, s)
        const mat = mesh.material as THREE.MeshBasicMaterial
        mat.opacity = 0.3 + (1 - Math.sin(clock * 2.8 + phase)) * 0.35
      })

      // Move data packets along arcs
      packets.forEach((pkt) => {
        pkt.t += pkt.speed
        if (pkt.t >= 1) pkt.t = 0
        const pts = arcPointsList[pkt.arcIdx]
        if (pts && pts.length > 0) {
          const sampleIdx = Math.floor(pkt.t * (pts.length - 1))
          pkt.mesh.position.copy(pts[sampleIdx])
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Resize Observer
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nw = entry.contentRect.width
        const nh = entry.contentRect.height
        if (nw > 0 && nh > 0) {
          camera.aspect = nw / nh
          camera.updateProjectionMatrix()
          renderer.setSize(nw, nh)
        }
      }
    })
    ro.observe(container)

    // Cleanup
    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      if (parentHero) {
        parentHero.removeEventListener('mousemove', handleMouseMove as EventListener)
      } else {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      sphereGeo.dispose()
      sphereMat.dispose()
      atmosMat.dispose()
    }
  }, [onLoaded])

  return <div ref={mountRef} className="hero__globe-canvas" />
}
