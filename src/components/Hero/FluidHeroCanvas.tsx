import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  color: string
  alpha: number
}

interface WavePoint {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
  color: string
}

export default function FluidHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Particle[] = []
    const wavePoints: WavePoint[] = []
    const particleCount = Math.min(width < 768 ? 35 : 65, 80)

    const colors = [
      'rgba(193, 102, 47, ',   // Copper/Gold
      'rgba(111, 224, 214, ',  // Cyan
      'rgba(244, 245, 246, ',  // Neutral white
    ]

    // Initialize floating ambient nodes
    for (let i = 0; i < particleCount; i++) {
      const baseRadius = Math.random() * 2 + 1
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: baseRadius,
        baseRadius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.15,
      })
    }

    let mouseX = width / 2
    let mouseY = height / 2
    let lastMouseX = mouseX
    let lastMouseY = mouseY

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top

      const dist = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY)
      if (dist > 15) {
        wavePoints.push({
          x: mouseX,
          y: mouseY,
          radius: 10,
          maxRadius: Math.min(width * 0.25, 180),
          alpha: 0.5,
          color: Math.random() > 0.5 ? 'rgba(193, 102, 47, ' : 'rgba(111, 224, 214, ',
        })
        lastMouseX = mouseX
        lastMouseY = mouseY
      }
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)

    // Main Fluid Distortion Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw Liquid Waves from cursor
      for (let i = wavePoints.length - 1; i >= 0; i--) {
        const wave = wavePoints[i]
        wave.radius += 2.4
        wave.alpha *= 0.96

        if (wave.alpha <= 0.01 || wave.radius >= wave.maxRadius) {
          wavePoints.splice(i, 1)
          continue
        }

        const gradient = ctx.createRadialGradient(
          wave.x,
          wave.y,
          0,
          wave.x,
          wave.y,
          wave.radius
        )
        gradient.addColorStop(0, `${wave.color}${wave.alpha * 0.25})`)
        gradient.addColorStop(0.6, `${wave.color}${wave.alpha * 0.08})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Interactive Fluid Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Cursor attraction & fluid push
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.hypot(dx, dy)

        if (dist < 180) {
          const force = (180 - dist) / 180
          const angle = Math.atan2(dy, dx)
          // Gentle fluid swirl
          p.x -= Math.cos(angle + 0.4) * force * 1.8
          p.y -= Math.sin(angle + 0.4) * force * 1.8
          p.radius = p.baseRadius + force * 2
        } else {
          p.radius = p.baseRadius
        }

        // Draw particle node
        ctx.fillStyle = `${p.color}${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()

        // Fluid connectivity lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pDist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (pDist < 120) {
            const lineAlpha = (1 - pDist / 120) * 0.12
            ctx.strokeStyle = `rgba(193, 102, 47, ${lineAlpha})`
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__fluid-canvas" />
}
