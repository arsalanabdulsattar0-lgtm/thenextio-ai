import { useState, useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, type MotionValue } from 'framer-motion'
import './About.css'

/* ── SVG Technical Icons (Precision Handcrafted) ── */
function IconCpu({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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
      width="13"
      height="13"
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

/* ── Reveal Word Component for Smooth Scroll Typography ── */
interface RevealWordProps {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  isAccent?: boolean
}

function RevealWord({ word, progress, range, isAccent = false }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [6, 0])

  return (
    <motion.span
      className={`about-reveal-word ${isAccent ? 'word-accent' : ''}`}
      style={{ opacity, y }}
    >
      {word}{' '}
    </motion.span>
  )
}

/* ── Node Data Definition ── */
interface ArchitectureNode {
  id: string
  code: string
  title: string
  desc: string
  metricVal: string
  metricLabel: string
  telemetry: string
  accent: 'cyan' | 'orange' | 'blue'
  icon: ReactNode
}

const NODES: ArchitectureNode[] = [
  {
    id: 'node-1',
    code: 'SYSTEM // 01',
    title: 'Autonomous IT Architecture',
    desc: 'Self-healing cloud infrastructure and neural compute engines engineered to dynamically scale with global enterprise workloads.',
    metricVal: '99.99%',
    metricLabel: 'Cloud Uptime & Mission-Critical SLA',
    telemetry: 'Self-Healing Engine • 0 Drift',
    accent: 'cyan',
    icon: <IconCpu />,
  },
  {
    id: 'node-2',
    code: 'SYSTEM // 02',
    title: 'Real-Time Cognitive Intelligence',
    desc: 'Sub-millisecond inference pipelines delivering deterministic reasoning, real-time telemetry perception, and automated IT operations.',
    metricVal: '10x',
    metricLabel: 'Faster Enterprise Software Velocity',
    telemetry: 'Inference < 1.2ms • 240 RPS',
    accent: 'orange',
    icon: <IconZap />,
  },
  {
    id: 'node-3',
    code: 'SYSTEM // 03',
    title: 'Enterprise Cyber Governance',
    desc: 'Cryptographically verifiable AI models, private air-gapped deployments, and zero-trust cloud data protection standards.',
    metricVal: '240+',
    metricLabel: 'Enterprise AI & IT Systems Deployed',
    telemetry: 'Zero-Trust • Air-Gapped Validated',
    accent: 'blue',
    icon: <IconShieldCheck />,
  },
]

const HEADLINE_WORDS = [
  { word: 'Pioneering', accent: false },
  { word: 'enterprise', accent: false },
  { word: 'AI', accent: true },
  { word: '&', accent: false },
  { word: 'next-generation', accent: false },
  { word: 'Information', accent: false },
  { word: 'Technology.', accent: true },
]

export default function About() {
  const trackRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(true)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 991)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Scroll Progress across 240vh ──
  // Starts exactly when About section reaches 65% of viewport (visible to user)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 65%', 'end end'],
  })

  // Silky responsive spring with zero lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  })

  // 3D Parallax Mouse Response (Handcrafted subtle tilt)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 18 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 18 })
  const rotateX = useTransform(smoothMouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-5, 5])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!isDesktop) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    setHoveredNode(null)
  }

  // ── 1. Text Phase: Starts completely unrevealed, lights up word-by-word with scroll (0.01 -> 0.25) ──
  const tagOpacity = useTransform(smoothProgress, [0.00, 0.05], [0.15, 1])
  const descOpacity = useTransform(smoothProgress, [0.20, 0.29], [0.15, 1])
  const descY = useTransform(smoothProgress, [0.20, 0.29], [10, 0])

  // Header lifts slightly when cards converge to make room
  const headerMoveY = useTransform(smoothProgress, [0.28, 0.52], [0, -18])
  const headerScale = useTransform(smoothProgress, [0.28, 0.52], [1, 0.96])

  // ── 2. Central Core Ignition (0.26 -> 0.46) ──
  const coreScale = useTransform(smoothProgress, [0.26, 0.46], [0.82, 1])
  const coreOpacity = useTransform(smoothProgress, [0.26, 0.40], [0, 1])
  const coreY = useTransform(smoothProgress, [0.26, 0.46], [-30, 0])

  // ── 3. The 3-Way Card Convergence (Left, Bottom, Right) (0.28 -> 0.54) ──
  // Card 1: Flies in smoothly from the LEFT
  const card1X = useTransform(smoothProgress, [0.28, 0.54], [-240, 0])
  const card1Y = useTransform(smoothProgress, [0.28, 0.54], [25, 0])
  const card1RotateY = useTransform(smoothProgress, [0.28, 0.54], [18, 0])
  const card1RotateZ = useTransform(smoothProgress, [0.28, 0.54], [-4, 0])
  const card1Scale = useTransform(smoothProgress, [0.28, 0.54], [0.86, 1])
  const card1Opacity = useTransform(smoothProgress, [0.28, 0.44], [0, 1])

  // Card 2: Rises smoothly from the BOTTOM
  const card2Y = useTransform(smoothProgress, [0.32, 0.58], [220, 0])
  const card2Scale = useTransform(smoothProgress, [0.32, 0.58], [0.84, 1])
  const card2Opacity = useTransform(smoothProgress, [0.32, 0.46], [0, 1])

  // Card 3: Flies in smoothly from the RIGHT
  const card3X = useTransform(smoothProgress, [0.28, 0.54], [240, 0])
  const card3Y = useTransform(smoothProgress, [0.28, 0.54], [25, 0])
  const card3RotateY = useTransform(smoothProgress, [0.28, 0.54], [-18, 0])
  const card3RotateZ = useTransform(smoothProgress, [0.28, 0.54], [4, 0])
  const card3Scale = useTransform(smoothProgress, [0.28, 0.54], [0.86, 1])
  const card3Opacity = useTransform(smoothProgress, [0.28, 0.44], [0, 1])

  // ── 4. Laser Circuit Trace Draw (Locks as cards dock: 0.48 -> 0.70) ──
  const line1Length = useTransform(smoothProgress, [0.48, 0.68], [0, 1])
  const line2Length = useTransform(smoothProgress, [0.50, 0.70], [0, 1])
  const line3Length = useTransform(smoothProgress, [0.48, 0.68], [0, 1])

  return (
    <section id="about" ref={trackRef} className="about-scroll-track">
      {/* Sticky Cinematic Viewport Stage */}
      <div className="about-sticky-stage">
        {/* Blueritt Atmospheric Backdrop Lighting */}
        <div className="about-glow about-glow-left" aria-hidden="true" />
        <div className="about-glow about-glow-right" aria-hidden="true" />
        <div className="about-glow about-glow-center" aria-hidden="true" />

        <div className="container about-stage-container">
          {/* ── 1. CINEMATIC SCROLL-REVEAL TEXT HEADER ── */}
          <motion.div
            ref={headerRef}
            className="about-header-wrap"
            style={isDesktop ? { y: headerMoveY, scale: headerScale } : {}}
          >
            <motion.div className="section-tag" style={isDesktop ? { opacity: tagOpacity } : {}}>
              <span>
                <strong>ABOUT US</strong>
              </span>
            </motion.div>

            {/* Kinetic Typography: Words Reveal Opacity on Scroll */}
            <h2 className="about-title">
              {HEADLINE_WORDS.map((item, idx) => {
                // Stagger each word across smoothProgress 0.01 to 0.24 (reveals live as user scrolls)
                const start = 0.01 + idx * 0.03
                const end = start + 0.045
                return (
                  <RevealWord
                    key={idx}
                    word={item.word}
                    progress={smoothProgress}
                    range={[start, end]}
                    isAccent={item.accent}
                  />
                )
              })}
            </h2>

            <motion.p
              className="about-description"
              style={isDesktop ? { opacity: descOpacity, y: descY } : {}}
            >
              At thenextio.ai, we engineer the convergence of artificial intelligence and
              enterprise Information Technology. We design bespoke neural architectures,
              automated cloud infrastructure, and mission-critical software systems with <span>confidence.</span>
            </motion.p>
          </motion.div>

          {/* ── 2. INTERACTIVE 3D CONVERGENCE STAGE ── */}
          <div
            className="about-map-viewport"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="about-map-stage"
              style={isDesktop ? { rotateX, rotateY } : {}}
            >
              {/* Central Core (Hub that activates as cards converge) */}
              <motion.div
                className="about-neural-core"
                style={isDesktop ? { scale: coreScale, opacity: coreOpacity, y: coreY } : {}}
              >
                <div className="core-orbit core-orbit-1" />
                <div className="core-orbit core-orbit-2" />

                <div className="core-pod">
                  <div className="core-pod-header">
                    <span className="core-badge-dot" />
                    <span className="core-badge-text">THENEXTIO AI ARCHITECTURE</span>
                    <span className="core-ver">SYS // v4.8</span>
                  </div>

                  <div className="core-status-row">
                    <span className="core-status-beacon" />
                    <span className="core-status-title">3 CONVERGED CLUSTERS ACTIVE</span>
                    <span className="core-status-rate">2.4 TB/S BUS</span>
                  </div>
                </div>
              </motion.div>

              {/* Connecting Laser Circuit Bus (Desktop) */}
              {isDesktop && (
                <svg
                  className="about-circuit-svg"
                  viewBox="0 0 1200 110"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="laserGradCyan" x1="600" y1="0" x2="200" y2="110" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#0057FF" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="laserGradOrange" x1="600" y1="0" x2="600" y2="110" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFA05C" stopOpacity="1" />
                      <stop offset="100%" stopColor="#FF5900" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="laserGradBlue" x1="600" y1="0" x2="1000" y2="110" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#155DFC" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Laser 1: to Left Card */}
                  <path
                    d="M 600,0 C 600,50 200,50 200,110"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1.8"
                    strokeDasharray="4 6"
                  />
                  <motion.path
                    d="M 600,0 C 600,50 200,50 200,110"
                    stroke="url(#laserGradCyan)"
                    strokeWidth={hoveredNode === 'node-1' ? '3.5' : '2.4'}
                    style={{ pathLength: line1Length }}
                    className={`laser-trace laser-trace--cyan ${hoveredNode === 'node-1' ? 'is-boosted' : ''}`}
                  />

                  {/* Laser 2: to Center Card (Middle Pipeline) */}
                  <path
                    d="M 600,0 L 600,110"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1.8"
                    strokeDasharray="4 6"
                  />
                  <motion.path
                    d="M 600,0 L 600,110"
                    stroke="url(#laserGradOrange)"
                    strokeWidth={hoveredNode === 'node-2' ? '3.5' : '2.4'}
                    style={{ pathLength: line2Length }}
                    className={`laser-trace laser-trace--orange ${hoveredNode === 'node-2' ? 'is-boosted' : ''}`}
                  />

                  {/* Laser 3: to Right Card */}
                  <path
                    d="M 600,0 C 600,50 1000,50 1000,110"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1.8"
                    strokeDasharray="4 6"
                  />
                  <motion.path
                    d="M 600,0 C 600,50 1000,50 1000,110"
                    stroke="url(#laserGradBlue)"
                    strokeWidth={hoveredNode === 'node-3' ? '3.5' : '2.4'}
                    style={{ pathLength: line3Length }}
                    className={`laser-trace laser-trace--blue ${hoveredNode === 'node-3' ? 'is-boosted' : ''}`}
                  />
                </svg>
              )}

              {/* ── 3. THREE CARDS FLY-IN FROM LEFT, BOTTOM, RIGHT ── */}
              <div className="about-nodes-grid">
                {/* CARD 01: FLIES IN FROM LEFT */}
                <motion.div
                  className={`node-card node-card--${NODES[0].accent} ${hoveredNode === NODES[0].id ? 'is-hovered' : ''}`}
                  style={
                    isDesktop
                      ? {
                          x: card1X,
                          y: card1Y,
                          rotateY: card1RotateY,
                          rotateZ: card1RotateZ,
                          scale: card1Scale,
                          opacity: card1Opacity,
                        }
                      : {}
                  }
                  onMouseEnter={() => setHoveredNode(NODES[0].id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                >
                  <div className="node-card-glare" />

                  <div className="node-card-top">
                    <span className="node-code-badge">{NODES[0].code}</span>
                    <div className="node-icon-box">{NODES[0].icon}</div>
                  </div>

                  <div className="node-metric-block">
                    <span className="node-metric-val">{NODES[0].metricVal}</span>
                    <span className="node-metric-label">{NODES[0].metricLabel}</span>
                  </div>

                  <h3 className="node-title">{NODES[0].title}</h3>
                  <p className="node-desc">{NODES[0].desc}</p>

                  <div className="node-telemetry-strip">
                    <IconActivity className="telemetry-pulse-icon" />
                    <span>{NODES[0].telemetry}</span>
                  </div>
                </motion.div>

                {/* CARD 02: RISES FROM BOTTOM */}
                <motion.div
                  className={`node-card node-card--${NODES[1].accent} ${hoveredNode === NODES[1].id ? 'is-hovered' : ''}`}
                  style={
                    isDesktop
                      ? {
                          y: card2Y,
                          scale: card2Scale,
                          opacity: card2Opacity,
                        }
                      : {}
                  }
                  onMouseEnter={() => setHoveredNode(NODES[1].id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                >
                  <div className="node-card-glare" />

                  <div className="node-card-top">
                    <span className="node-code-badge">{NODES[1].code}</span>
                    <div className="node-icon-box">{NODES[1].icon}</div>
                  </div>

                  <div className="node-metric-block">
                    <span className="node-metric-val">{NODES[1].metricVal}</span>
                    <span className="node-metric-label">{NODES[1].metricLabel}</span>
                  </div>

                  <h3 className="node-title">{NODES[1].title}</h3>
                  <p className="node-desc">{NODES[1].desc}</p>

                  <div className="node-telemetry-strip">
                    <IconActivity className="telemetry-pulse-icon" />
                    <span>{NODES[1].telemetry}</span>
                  </div>
                </motion.div>

                {/* CARD 03: FLIES IN FROM RIGHT */}
                <motion.div
                  className={`node-card node-card--${NODES[2].accent} ${hoveredNode === NODES[2].id ? 'is-hovered' : ''}`}
                  style={
                    isDesktop
                      ? {
                          x: card3X,
                          y: card3Y,
                          rotateY: card3RotateY,
                          rotateZ: card3RotateZ,
                          scale: card3Scale,
                          opacity: card3Opacity,
                        }
                      : {}
                  }
                  onMouseEnter={() => setHoveredNode(NODES[2].id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                >
                  <div className="node-card-glare" />

                  <div className="node-card-top">
                    <span className="node-code-badge">{NODES[2].code}</span>
                    <div className="node-icon-box">{NODES[2].icon}</div>
                  </div>

                  <div className="node-metric-block">
                    <span className="node-metric-val">{NODES[2].metricVal}</span>
                    <span className="node-metric-label">{NODES[2].metricLabel}</span>
                  </div>

                  <h3 className="node-title">{NODES[2].title}</h3>
                  <p className="node-desc">{NODES[2].desc}</p>

                  <div className="node-telemetry-strip">
                    <IconActivity className="telemetry-pulse-icon" />
                    <span>{NODES[2].telemetry}</span>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
