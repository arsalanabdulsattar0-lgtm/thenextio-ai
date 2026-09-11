import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'
import Button from '../common/Button'
import './PlatformSection.css'

const ease = [0.22, 1, 0.36, 1] as const

interface PlatformTab {
  id: string
  labelTop: string
  labelBottom: string
  titleLeft: string
  titleRight: string
  titleBottom: string
  heading: string
  description: string
  smallText: string
  image: string
  metrics: { label: string; value: string }[]
}

const PLATFORM_TABS: PlatformTab[] = [
  {
    id: 'neural-ai',
    labelTop: 'Neural AI &',
    labelBottom: 'Foundation Models',
    titleLeft: 'NEURAL',
    titleRight: 'AI',
    titleBottom: 'PIPELINE',
    heading: 'High-Precision Neural AI & Foundation Models',
    description: 'Custom fine-tuning, domain-specific LoRA weights, and low-latency inference pipelines built for enterprise scale.',
    smallText: 'TheNextIO architects bespoke machine learning systems with proprietary model hosting, automated training iterations, and private inference guardrails that protect sensitive enterprise intellectual property.',
    image: '/hero/slide-1.jpg',
    metrics: [
      { label: 'Inference Latency', value: '12ms' },
      { label: 'Model Accuracy', value: '99.8%' },
      { label: 'Throughput', value: '850 Req/s' },
    ],
  },
  {
    id: 'cloud-it',
    labelTop: 'Enterprise Cloud',
    labelBottom: 'Infrastructure',
    titleLeft: 'CLOUD',
    titleRight: 'IT',
    titleBottom: 'SYSTEMS',
    heading: 'Resilient Multi-Cloud & High-Availability IT',
    description: 'Autonomous auto-scaling across AWS, GCP, and Azure with 99.99% mission-critical SLA uptime guarantees.',
    smallText: 'Transform legacy on-premise hardware into modern containerized Kubernetes clusters. Deploy zero-latency microservices with automated failover, load-balancing, and continuous disaster recovery protocols.',
    image: '/hero/slide-2.jpg',
    metrics: [
      { label: 'Uptime Guarantee', value: '99.99%' },
      { label: 'Active Nodes', value: '248 Multi-Cloud' },
      { label: 'Failover Window', value: '< 200ms' },
    ],
  },
  {
    id: 'etl-pipelines',
    labelTop: 'Autonomous Data',
    labelBottom: '& ETL Pipelines',
    titleLeft: 'DATA',
    titleRight: 'STREAM',
    titleBottom: 'PIPELINES',
    heading: 'Petabyte-Scale Autonomous Data Pipelines',
    description: 'Stream ingestion, schema validation, and real-time analytical transformations built for instant decisioning.',
    smallText: 'Eliminate data bottlenecks with distributed stream processing via Apache Kafka, Apache Spark, and real-time vector databases. Convert raw enterprise telemetry into clean structured intelligence with zero data loss.',
    image: '/hero/slide-1.jpg',
    metrics: [
      { label: 'Ingestion Rate', value: '10M+ Events/s' },
      { label: 'Packet Loss', value: '0.000%' },
      { label: 'Query Latency', value: '< 8ms' },
    ],
  },
  {
    id: 'zero-trust',
    labelTop: 'Cognitive Cyber',
    labelBottom: 'Security',
    titleLeft: 'CYBER',
    titleRight: 'ZERO',
    titleBottom: 'TRUST',
    heading: 'Autonomous Cyber Defense & Zero-Trust Governance',
    description: 'Continuous heuristic threat detection, quantum-safe encryption, and SOC2 / ISO-27001 compliance standards.',
    smallText: 'Safeguard your digital infrastructure with proactive AI threat hunting. Our intelligent security agents analyze anomalous traffic, enforce end-to-end tokenized authorization, and neutralize intrusions in milliseconds.',
    image: '/hero/slide-2.jpg',
    metrics: [
      { label: 'Threat Mitigation', value: 'Instant Heuristic' },
      { label: 'Encryption', value: 'AES-256-GCM' },
      { label: 'Compliance', value: 'SOC2 / HIPAA' },
    ],
  },
  {
    id: 'edge-ai',
    labelTop: 'Real-Time Edge',
    labelBottom: '& IoT Telemetry',
    titleLeft: 'EDGE',
    titleRight: 'IOT',
    titleBottom: 'NETWORK',
    heading: 'Ultra-Low Latency Edge Computing & Telemetry',
    description: 'Run lightweight quantized neural models on edge devices and gateway nodes with zero cloud round-trip delay.',
    smallText: 'Bring intelligent decision-making directly to field devices, smart sensors, and remote industrial nodes. Synchronize local weights with central cloud models via federated learning architectures.',
    image: '/hero/slide-1.jpg',
    metrics: [
      { label: 'Edge Latency', value: '< 4ms' },
      { label: 'Sync Bandwidth', value: '90% Compressed' },
      { label: 'Offline Mode', value: '100% Autonomous' },
    ],
  },
  {
    id: 'apis',
    labelTop: 'Microservices &',
    labelBottom: 'Enterprise APIs',
    titleLeft: 'CORE',
    titleRight: 'API',
    titleBottom: 'SERVICES',
    heading: 'High-Throughput Enterprise Microservices & APIs',
    description: 'Ultra-fast gRPC and GraphQL services built to power modern web, mobile, and third-party partner integrations.',
    smallText: 'Standardize enterprise integration with type-safe, resilient APIs designed for developer velocity. Built-in rate limiting, developer sandboxes, automated Swagger/OpenAPI documentation, and distributed tracing.',
    image: '/hero/slide-2.jpg',
    metrics: [
      { label: 'API Gateway', value: 'Sub-millisecond' },
      { label: 'Type Safety', value: 'End-to-End' },
      { label: 'Developer SDKs', value: 'Multi-Language' },
    ],
  },
]

/* ── Words for Headline Scroll Reveal (About Section Pattern) ── */
const HEADLINE_WORDS = [
  { word: 'Enterprise', accent: false },
  { word: 'AI', accent: true },
  { word: '&', accent: true },
  { word: 'Cloud', accent: true },
  { word: 'Product', accent: false },
  { word: 'Platform', accent: false },
]

/* ── Reveal Word Component (Word-by-word scroll reveal) ── */
function RevealWord({
  word,
  progress,
  range,
  isAccent,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  isAccent?: boolean
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [6, 0])

  return (
    <motion.span
      className={`platform-reveal-word ${isAccent ? 'accent-word' : ''}`}
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  )
}

export default function PlatformSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 991)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Scroll Progress across section ──
  // Starts the moment section enters 75% of viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'center center'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  // ── 1. Tag & Headline Word-by-Word Scroll Reveal ──
  const tagOpacity = useTransform(smoothProgress, [0.01, 0.08], [0.12, 1])
  const tagY = useTransform(smoothProgress, [0.01, 0.08], [8, 0])

  // ── 2. Horizontal Tabs Scroll Reveal ──
  const tabsOpacity = useTransform(smoothProgress, [0.16, 0.36], [0.15, 1])
  const tabsY = useTransform(smoothProgress, [0.16, 0.36], [16, 0])

  // ── 3. Dual Preview Screens Convergence (About style) ──
  // Left Screen: docks from Left with 3D perspective
  const leftScreenX = useTransform(smoothProgress, [0.28, 0.78], [-180, 0])
  const leftScreenRotateY = useTransform(smoothProgress, [0.28, 0.78], [15, 0])
  const leftScreenScale = useTransform(smoothProgress, [0.28, 0.78], [0.88, 1])
  const leftScreenOpacity = useTransform(smoothProgress, [0.28, 0.58], [0.1, 1])

  // Right Screen: docks from Right with 3D perspective
  const rightScreenX = useTransform(smoothProgress, [0.28, 0.78], [180, 0])
  const rightScreenRotateY = useTransform(smoothProgress, [0.28, 0.78], [-15, 0])
  const rightScreenScale = useTransform(smoothProgress, [0.28, 0.78], [0.88, 1])
  const rightScreenOpacity = useTransform(smoothProgress, [0.28, 0.58], [0.1, 1])

  // ── 4. Dedicated Scroll Reveal for Bottom Area (Watermark, Content & Telemetry) ──
  const bottomRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: bottomScroll } = useScroll({
    target: bottomRef,
    offset: ['start 92%', 'center 52%'],
  })

  const smoothBottom = useSpring(bottomScroll, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  // Watermark text emerges on scroll
  const bigTextOpacity = useTransform(smoothBottom, [0.00, 0.45], [0, 0.07])
  const bigTextY = useTransform(smoothBottom, [0.00, 0.45], [25, 0])

  // Left Content (Heading, Description, Small text) lifts and reveals
  const leftContentOpacity = useTransform(smoothBottom, [0.08, 0.65], [0.12, 1])
  const leftContentY = useTransform(smoothBottom, [0.08, 0.65], [28, 0])

  // Action Buttons fade in
  const buttonsOpacity = useTransform(smoothBottom, [0.25, 0.75], [0.15, 1])
  const buttonsY = useTransform(smoothBottom, [0.25, 0.75], [16, 0])

  // Telemetry Card on Right slides in from right with scale
  const telemetryX = useTransform(smoothBottom, [0.10, 0.70], [70, 0])
  const telemetryOpacity = useTransform(smoothBottom, [0.10, 0.60], [0.1, 1])
  const telemetryScale = useTransform(smoothBottom, [0.10, 0.70], [0.94, 1])

  const current = PLATFORM_TABS[activeTab]

  return (
    <section id="products" ref={sectionRef} className="platform-section">
      {/* Background ambient glows */}
      <div className="platform-glow platform-glow-left" aria-hidden="true" />
      <div className="platform-glow platform-glow-right" aria-hidden="true" />

      {/* ── Section Tag & Headline (Live Scroll Word Reveal) ── */}
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '32px' }}>
        <motion.div
          className="section-tag"
          style={isDesktop ? { opacity: tagOpacity, y: tagY } : {}}
        >
          <span><strong>OUR PRODUCTS</strong></span>
        </motion.div>

        {/* Kinetic Word-by-Word Scroll Reveal Headline (About style) */}
        <h2 className="platform-section-title">
          {HEADLINE_WORDS.map((item, idx) => {
            const start = 0.03 + idx * 0.035
            const end = start + 0.05
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
      </div>

      {/* ── TOP HORIZONTAL TABS (Scroll Reveal) ── */}
      <motion.div
        className="platform-tabs-wrapper"
        style={isDesktop ? { opacity: tabsOpacity, y: tabsY } : {}}
      >
        <div className="platform-tabs">
          {PLATFORM_TABS.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              className={`platform-tab-btn ${idx === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span>
                {tab.labelTop} <br /> {tab.labelBottom}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── MAIN PLATFORM CARD ── */}
      <div className="platform-card">
        {/* DUAL PREVIEW SCREENS (Scroll Convergence Entrance: Left from Left, Right from Right) */}
        <div className="container">
          <div className="platform-image-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="platform-dual-frame"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
              >
                {/* ── Left Screen: Docks from Left ── */}
                <motion.div
                  className="platform-img-box platform-img-box-left"
                  style={
                    isDesktop
                      ? {
                          x: leftScreenX,
                          rotateY: leftScreenRotateY,
                          scale: leftScreenScale,
                          opacity: leftScreenOpacity,
                          transformStyle: 'preserve-3d',
                        }
                      : {}
                  }
                >
                  <img
                    src="/hero/slide-1.jpg"
                    alt={`${current.heading} - View 1`}
                    className="platform-main-image"
                    loading="lazy"
                  />
                  <div className="platform-image-glare" aria-hidden="true" />
                  <div className="platform-screen-badge">
                    <span className="platform-screen-dot" />
                    <span>SYSTEM ANALYTICS // LIVE</span>
                  </div>
                  <div className="platform-screen-scan" aria-hidden="true" />
                </motion.div>

                {/* ── Right Screen: Docks from Right ── */}
                <motion.div
                  className="platform-img-box platform-img-box-right"
                  style={
                    isDesktop
                      ? {
                          x: rightScreenX,
                          rotateY: rightScreenRotateY,
                          scale: rightScreenScale,
                          opacity: rightScreenOpacity,
                          transformStyle: 'preserve-3d',
                        }
                      : {}
                  }
                >
                  <img
                    src="/hero/slide-2.jpg"
                    alt={`${current.heading} - View 2`}
                    className="platform-main-image"
                    loading="lazy"
                  />
                  <div className="platform-image-glare" aria-hidden="true" />
                  <div className="platform-screen-badge">
                    <span className="platform-screen-dot" />
                    <span>NEURAL CORE // ACTIVE</span>
                  </div>
                  <div className="platform-screen-scan" aria-hidden="true" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── BOTTOM AREA WITH DEDICATED LIVE SCROLL REVEAL ── */}
          <div ref={bottomRef} className="platform-bottom-stage">
            {/* BIG TYPOGRAPHY WATERMARK (Emerges with scroll) */}
            <motion.div
              className="platform-big-text"
              aria-hidden="true"
              style={isDesktop ? { opacity: bigTextOpacity, y: bigTextY } : {}}
            >
              <h2>
                <div className="platform-big-text-top-row">
                  <span className="left-text">ENTERPRISE</span>
                  <span className="right-text">AI CLOUD</span>
                </div>
                <span className="bottom-text">PLATFORM</span>
              </h2>
            </motion.div>

            {/* ACTIVE CONTENT DETAILS (Live Scroll Reveal: Text + Telemetry) */}
            <div className="platform-content">
              <div className="platform-content-grid">
                {/* Left Column: Heading, Description & Actions (Lifts and reveals with scroll) */}
                <motion.div
                  className="platform-content-main"
                  style={isDesktop ? { opacity: leftContentOpacity, y: leftContentY } : {}}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <h3 className="platform-heading">{current.heading}</h3>
                      <p className="platform-description">{current.description}</p>
                      <p className="platform-small-text">{current.smallText}</p>

                      <motion.div
                        className="platform-actions"
                        style={isDesktop ? { opacity: buttonsOpacity, y: buttonsY } : {}}
                      >
                        <Button href="#contact" variant="ghost" fillColor="orange" size="md">
                          Contact Us
                        </Button>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Right Column: Key Live Metrics (Slides in from right with scroll) */}
                <motion.div
                  className="platform-metrics-col"
                  style={
                    isDesktop
                      ? {
                          x: telemetryX,
                          opacity: telemetryOpacity,
                          scale: telemetryScale,
                        }
                      : {}
                  }
                >
                  <div className="platform-metrics-box">
                    <span className="metrics-box-tag">PLATFORM TELEMETRY</span>
                    {current.metrics.map((m, i) => (
                      <div key={i} className="platform-metric-row">
                        <span className="metric-row-lbl">{m.label}</span>
                        <span className="metric-row-val">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
