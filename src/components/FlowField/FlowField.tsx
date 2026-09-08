import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { type ReactNode, useEffect, useRef, type MouseEvent } from 'react'
import { cn } from '../../lib/utils'
import './FlowField.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColorTheme = 'blueritt' | 'aurora' | 'ember' | 'ocean'
export type ParticleDensity = 'sparse' | 'medium' | 'dense'

interface Particle {
  x: number
  y: number
  speed: number
  hue: number
  saturation: number
  lightness: number
  life: number
  maxLife: number
  size: number
}

interface ThemeConfig {
  hueStart: number
  hueRange: number
  saturation: number
  lightness: number
  bg: string
  trailAlpha: number
  hasOrangeAccent?: boolean
}

export interface FlowFieldProps {
  className?: string
  children?: ReactNode
  theme?: ColorTheme
  density?: ParticleDensity
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PARTICLE_COUNTS: Record<ParticleDensity, number> = {
  sparse: 500,
  medium: 900,
  dense: 1500,
} as const

const THEMES: Record<ColorTheme, ThemeConfig> = {
  blueritt: {
    hueStart: 195,
    hueRange: 45,
    saturation: 96,
    lightness: 60,
    bg: '0, 9, 23', // Blueritt navy #000917
    trailAlpha: 0.16,
    hasOrangeAccent: true,
  },
  aurora: {
    hueStart: 120,
    hueRange: 200,
    saturation: 90,
    lightness: 62,
    bg: '5, 5, 8',
    trailAlpha: 0.15,
  },
  ember: {
    hueStart: 0,
    hueRange: 55,
    saturation: 95,
    lightness: 58,
    bg: '8, 4, 2',
    trailAlpha: 0.15,
  },
  ocean: {
    hueStart: 180,
    hueRange: 90,
    saturation: 88,
    lightness: 60,
    bg: '2, 6, 10',
    trailAlpha: 0.15,
  },
} as const

// ─── Noise / vector-field ─────────────────────────────────────────────────────

function fieldAngle(x: number, y: number, t: number, mx = 0, my = 0): number {
  const s = 0.0025
  const angle =
    Math.sin(x * s + t * 0.0007) * Math.PI +
    Math.cos(y * s + t * 0.0005) * Math.PI +
    Math.sin((x + y) * s * 0.6 + t * 0.0009) * Math.PI * 0.6 +
    Math.cos((x - y) * s * 0.4 + t * 0.0006) * Math.PI * 0.4

  if (mx !== 0 || my !== 0) {
    const dx = x - mx
    const dy = y - my
    const distSq = dx * dx + dy * dy
    if (distSq < 160000 && distSq > 100) {
      const influence = (1 - Math.sqrt(distSq) / 400) * 0.35
      return angle + Math.atan2(dy, dx) * influence
    }
  }

  return angle
}

// ─── Original TheNextIO Centered Content ──────────────────────────────────────

function DefaultContent() {
  return (
    <div className="flow-field-content">
      {/* Animated pill badge */}
      <motion.div
        className="flow-field-badge"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <span className="flow-field-badge-dot" />
        Next-Gen AI Platform
      </motion.div>

      {/* Headline: Building what's next. */}
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        className="flow-field-headline"
        initial={{ opacity: 0, y: 22 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      >
        Building what's{' '}
        <span className="flow-field-gradient-text">next.</span>
      </motion.h1>

      {/* Original Subtitle */}
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="flow-field-sub"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.9, delay: 0.48, ease: 'easeOut' }}
      >
        Intelligent technology, custom-built. We design and engineer AI systems
        and software that power your business into the future.
      </motion.p>

      {/* Original Action Buttons */}
      <motion.div
        className="flow-field-actions"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.62, ease: 'easeOut' }}
      >
        <a href="#contact" className="flow-btn-primary">
          Start a project <span className="flow-arrow">↗</span>
        </a>
        <a href="#projects" className="flow-btn-ghost">
          Explore our work
        </a>
      </motion.div>

      {/* Trust line */}
      <motion.div
        className="flow-field-trust"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <span className="flow-trust-dot" />
        Trusted by startups &amp; enterprises worldwide
      </motion.div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FlowField({
  className,
  children,
  theme = 'blueritt',
  density = 'medium',
}: FlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  // 3D Parallax Tilt Values
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const smoothX = useSpring(rawX, { stiffness: 50, damping: 16 })
  const smoothY = useSpring(rawY, { stiffness: 50, damping: 16 })

  const rotateX = useTransform(smoothY, [-300, 300], [10, -10])
  const rotateY = useTransform(smoothX, [-300, 300], [-10, 10])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set(e.clientX - cx)
    rawY.set(e.clientY - cy)
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    mouseRef.current = { x: -9999, y: -9999 }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cfg = THEMES[theme]
    const count = PARTICLE_COUNTS[density]
    const dpr = window.devicePixelRatio ?? 1

    let width = 0
    let height = 0
    let animId = 0
    let time = 0
    let particles: Particle[] = []

    const spawnParticle = (): Particle => {
      const maxLife = 200 + Math.floor(Math.random() * 300)
      const isOrange = cfg.hasOrangeAccent && Math.random() < 0.25 // 25% Blueritt orange accents

      let hue: number
      let sat = cfg.saturation
      let light = cfg.lightness

      if (isOrange) {
        hue = 24 + Math.random() * 16 // Orange (#ff6a00)
        light = 58
        sat = 96
      } else {
        hue = cfg.hueStart + Math.random() * cfg.hueRange // Blue to Cyan
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1.1 + Math.random() * 1.8,
        hue,
        saturation: sat,
        lightness: light,
        life: Math.floor(Math.random() * maxLife),
        maxLife,
        size: 1.3,
      }
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      ctx.fillStyle = `rgb(${cfg.bg})`
      ctx.fillRect(0, 0, width, height)

      particles = Array.from({ length: count }, spawnParticle)
    }

    const render = () => {
      time++

      // Clean fade
      ctx.fillStyle = `rgba(${cfg.bg}, ${cfg.trailAlpha})`
      ctx.fillRect(0, 0, width, height)

      // Periodic deep micro-flush to keep background pitch navy
      if (time % 240 === 0) {
        ctx.fillStyle = `rgba(${cfg.bg}, 0.35)`
        ctx.fillRect(0, 0, width, height)
      }

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particles) {
        const angle = fieldAngle(p.x, p.y, time, mx, my)

        p.x += Math.cos(angle) * p.speed
        p.y += Math.sin(angle) * p.speed
        p.life++

        if (p.life > p.maxLife) {
          p.x = Math.random() * width
          p.y = Math.random() * height
          p.life = 0
          continue
        }

        if (p.x < 0) p.x += width
        else if (p.x > width) p.x -= width
        if (p.y < 0) p.y += height
        else if (p.y > height) p.y -= height

        const progress = p.life / p.maxLife
        const fadeIn = Math.min(progress * 8, 1)
        const fadeOut = Math.min((1 - progress) * 6, 1)
        const alpha = fadeIn * fadeOut * 0.9

        if (alpha < 0.04) continue

        const hueMod = (p.hue + (angle / (Math.PI * 2)) * 50 + 360) % 360

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hueMod}, ${p.saturation}%, ${p.lightness}%, ${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [theme, density])

  const bgColor = THEMES[theme].bg

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('flow-field-wrapper', className)}
      style={{ background: `rgb(${bgColor})` }}
    >
      <canvas aria-hidden="true" className="flow-field-canvas" ref={canvasRef} />

      {/* Radial vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 60% at 50% 50%, transparent 20%, rgba(${bgColor}, 0.92) 100%)`,
        }}
      />

      {/* Soft top / bottom fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background: `linear-gradient(to bottom, rgb(${bgColor}), transparent)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: `linear-gradient(to top, rgb(${bgColor}), transparent)`,
        }}
      />

      {/* 3D Centered Content */}
      <motion.div className="flow-field-3d-stage" style={{ rotateX, rotateY }}>
        {children ?? <DefaultContent />}
      </motion.div>
    </div>
  )
}
