import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './About.css'

const ease = [0.22, 1, 0.36, 1] as const

/* ── SVG Icons ── */
function IconCpu({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  )
}

function IconZap({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function IconShieldCheck({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconActivity({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

/* ── AI & IT Pillars ── */
interface PillarItem {
  id: string
  title: string
  desc: string
  icon: ReactNode
}

const PILLARS: PillarItem[] = [
  {
    id: '01',
    title: 'Autonomous IT Architecture',
    desc: 'Self-healing cloud infrastructure and neural compute engines engineered to dynamically scale with global enterprise workloads.',
    icon: <IconCpu />,
  },
  {
    id: '02',
    title: 'Real-Time Cognitive Intelligence',
    desc: 'Sub-millisecond inference pipelines delivering deterministic reasoning, real-time telemetry perception, and automated IT operations.',
    icon: <IconZap />,
  },
  {
    id: '03',
    title: 'Enterprise Cyber Governance & Security',
    desc: 'Cryptographically verifiable AI models, private air-gapped deployments, and zero-trust cloud data protection standards.',
    icon: <IconShieldCheck />,
  },
]

/* ── Interactive 3D Sculpture Component ── */
function InteractiveSculpture() {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 65, damping: 18 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-250, 250], [16, -16])
  const rotateY = useTransform(smoothX, [-250, 250], [-16, 16])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      className="about__visual-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="about__sculpture"
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.0, ease }}
      >
        {/* Ambient Gyro Orbit Rings in Blueritt Orange & Blue */}
        <div className="about__ring about__ring--1" />
        <div className="about__ring about__ring--2" />

        {/* 3D Core Card in Blueritt Radial Gradient */}
        <motion.div
          className="about__core-card"
          whileHover={{ z: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="about__core-header">
            <span className="about__core-badge">
              <span className="about__core-dot" />
              IT Neural Core
            </span>
            <span className="about__core-ver">SYS // v4.8</span>
          </div>

          <div className="about__core-graph">
            <div className="about__graph-bar">
              <span>Cloud Pipeline Throughput</span>
              <div className="about__graph-track">
                <motion.div
                  className="about__graph-fill"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '96%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease, delay: 0.3 }}
                />
              </div>
              <span className="about__graph-val">96%</span>
            </div>

            <div className="about__graph-bar">
              <span>Model Reasoning Accuracy</span>
              <div className="about__graph-track">
                <motion.div
                  className="about__graph-fill"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '99.8%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease, delay: 0.45 }}
                />
              </div>
              <span className="about__graph-val">99.8%</span>
            </div>

            <div className="about__graph-bar">
              <span>IT Cluster Efficiency</span>
              <div className="about__graph-track">
                <motion.div
                  className="about__graph-fill"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '89%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease, delay: 0.6 }}
                />
              </div>
              <span className="about__graph-val">89%</span>
            </div>
          </div>

          {/* 3D Elevated Telemetry Floating Pill */}
          <motion.div
            className="about__telemetry-pill"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="about__telemetry-icon">
              <IconActivity />
            </span>
            <span className="about__telemetry-text">Latency &lt; 1.2ms // Zero Drift</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ── Main About Section (WHO WE ARE — AI & Information Technology) ── */
export default function About() {
  return (
    <section id="about" className="about-section">
      {/* Background Ambient Glows (Blueritt exact) */}
      <div className="about-glow about-glow-left" aria-hidden="true" />
      <div className="about-glow about-glow-right" aria-hidden="true" />

      <div className="container about-container">
        {/* HEADER AREA */}
        <div className="about-header-wrap">
          {/* Top Tag (Blueritt exact) */}
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span>
              <strong>WHO WE ARE</strong>
            </span>
          </motion.div>

          {/* Main Title tailored to AI & IT */}
          <motion.h2
            className="about-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            Pioneering enterprise AI &amp; next-generation Information Technology.
          </motion.h2>

          {/* Description with Blueritt signature orange underline */}
          <motion.p
            className="about-description"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.28 }}
          >
            At thenextio.ai, we engineer the convergence of artificial intelligence and
            enterprise Information Technology. We design bespoke neural architectures,
            automated cloud infrastructure, and mission-critical software systems with <span>confidence.</span>
          </motion.p>
        </div>

        {/* BLUERITT STATS ROW (Radial Gradient Cards) */}
        <div className="stats-row">
          <motion.div
            className="stats-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6 }}
          >
            <h3>99.99%</h3>
            <p>Cloud Uptime &amp; Mission-Critical SLA</p>
          </motion.div>

          <motion.div
            className="stats-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
            whileHover={{ y: -6 }}
          >
            <h3>10x</h3>
            <p>Faster Enterprise Software Velocity</p>
          </motion.div>

          <motion.div
            className="stats-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.44 }}
            whileHover={{ y: -6 }}
          >
            <h3>240+</h3>
            <p>Enterprise AI &amp; IT Systems Deployed</p>
          </motion.div>
        </div>

        {/* DETAILED DUAL-COLUMN ARCHITECTURE & PILLARS */}
        <div className="about__grid">
          {/* LEFT: 3D Interactive Sculpture */}
          <InteractiveSculpture />

          {/* RIGHT: Feature Pillars in Blueritt Gradient Cards */}
          <div className="about__pillars">
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                className="about__pillar-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease, delay: 0.25 + idx * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <div className="about__pillar-icon-box">{pillar.icon}</div>
                <div className="about__pillar-info">
                  <div className="about__pillar-top">
                    <span className="about__pillar-title">{pillar.title}</span>
                    <span className="about__pillar-num">{pillar.id}</span>
                  </div>
                  <p className="about__pillar-desc">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
