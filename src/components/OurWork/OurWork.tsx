import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import Button from '../common/Button'
import './OurWork.css'

const ease = [0.22, 1, 0.36, 1] as const

interface Project {
  id: string
  num: string
  title: string
  subtitle: string
  category: string
  filterTag: string
  description: string
  impact: string
  techStack: string[]
  metrics: { label: string; value: string }[]
  liveStatus: string
  hudMetric: string
  accentColor: string
  codeLines: string[]
}

const PROJECTS: Project[] = [
  {
    id: 'aura-neural',
    num: '01',
    title: 'AURA NEURAL MESH',
    subtitle: 'Autonomous Enterprise AI Reasoning & Multi-Agent Mesh',
    category: 'ENTERPRISE AI ARCHITECTURE',
    filterTag: 'ai',
    description:
      'Engineered an enterprise-grade autonomous reasoning engine combining domain-fine-tuned LLMs, contextual RAG vector databases, and self-healing agent pipelines to automate high-stakes decision workflows.',
    impact: 'Automated 74% of cross-departmental operations with zero human bottleneck.',
    techStack: ['Python', 'PyTorch', 'Vector DB', 'FastAPI', 'Ray Cluster', 'TypeScript'],
    metrics: [
      { label: 'Inference SLA', value: '12ms' },
      { label: 'Agent Accuracy', value: '99.8%' },
      { label: 'Active Mesh Nodes', value: '64 Units' },
    ],
    liveStatus: 'PRODUCTION MESH ACTIVE',
    hudMetric: 'Aura Core v5.2 • 840 req/s',
    accentColor: '#FF6200',
    codeLines: [
      '> agent.spawnWorker({ role: "autonomous" })',
      '  ✓ Neural mesh initialized',
      '  ✓ RAG context loaded — 8.2M vectors',
      '  → Dispatching to 64 agent nodes...',
      '  ✓ Task complete — 12ms inference SLA',
    ],
  },
  {
    id: 'vortex-cloud',
    num: '02',
    title: 'VORTEX OPS CLOUD',
    subtitle: 'Resilient Multi-Cloud Kubernetes & Auto-Healing Core',
    category: 'MISSION-CRITICAL CLOUD IT',
    filterTag: 'cloud',
    description:
      'Constructed a global high-availability cloud architecture spanning AWS, GCP, and Azure with automated failover, declarative GitOps infrastructure-as-code, and round-the-clock proactive system health telemetry.',
    impact: 'Achieved 99.999% SLA uptime while reducing global infrastructure costs by 42%.',
    techStack: ['Kubernetes', 'Terraform', 'Go', 'Docker', 'AWS EKS', 'Prometheus'],
    metrics: [
      { label: 'Global Uptime', value: '99.999%' },
      { label: 'Failover Window', value: '< 180ms' },
      { label: 'Cost Optimization', value: '-42%' },
    ],
    liveStatus: 'MULTI-REGION REPLICATED',
    hudMetric: 'Cluster Sync • 248 Nodes Online',
    accentColor: '#0057FF',
    codeLines: [
      '> kubectl apply -f cluster-global.yaml',
      '  ✓ 248 nodes synchronized',
      '  ✓ Auto-healing policy active',
      '  → Failover drill: AWS → GCP → Azure',
      '  ✓ Failover completed in 178ms',
    ],
  },
  {
    id: 'synapse-stream',
    num: '03',
    title: 'SYNAPSE VECTOR STREAM',
    subtitle: 'Petabyte-Scale Ingestion & Sub-10ms Semantic Search',
    category: 'REAL-TIME DATA INFRASTRUCTURE',
    filterTag: 'data',
    description:
      'Distributed stream ingestion pipeline built with Apache Kafka, ClickHouse, and real-time GPU-accelerated embeddings, enabling instant semantic search across hundreds of millions of enterprise records.',
    impact: 'Processes over 15 million events per second with sub-8ms query execution.',
    techStack: ['Apache Kafka', 'ClickHouse', 'Rust', 'Apache Spark', 'Python', 'CUDA'],
    metrics: [
      { label: 'Event Ingestion', value: '15M+ / sec' },
      { label: 'Query Execution', value: '< 8ms' },
      { label: 'Data Integrity', value: '100.0%' },
    ],
    liveStatus: 'STREAM INGESTION OPTIMAL',
    hudMetric: 'Pipeline Throughput • 1.2 TB/hr',
    accentColor: '#00C2FF',
    codeLines: [
      '> synapse.stream.connect({ broker: "kafka" })',
      '  ✓ 15M events/sec pipeline warm',
      '  ✓ CUDA embeddings: 1536-dim active',
      '  → Semantic query: "anomaly detected"',
      '  ✓ 847 matches returned in 7.4ms',
    ],
  },
  {
    id: 'sentinel-cyber',
    num: '04',
    title: 'SENTINEL ZERO-TRUST',
    subtitle: 'Autonomous Cyber Defense & Quantum-Safe Encryption',
    category: 'COGNITIVE CYBER SECURITY',
    filterTag: 'security',
    description:
      'Autonomous security governance system employing heuristic machine learning agents to detect anomalous zero-day threats in milliseconds and enforce end-to-end tokenized authorization across distributed services.',
    impact: 'Neutralized 100% of simulated adversarial attacks with instant heuristic isolation.',
    techStack: ['eBPF', 'Rust', 'AES-256-GCM', 'OpenID Connect', 'Linux Kernel', 'gRPC'],
    metrics: [
      { label: 'Threat Mitigation', value: '< 45ms' },
      { label: 'Zero-Day Protection', value: 'Active' },
      { label: 'Compliance Level', value: 'SOC2 / HIPAA' },
    ],
    liveStatus: 'THREAT SHIELD ARMED',
    hudMetric: 'Heuristic Isolation • 0 Anomalies',
    accentColor: '#FF3366',
    codeLines: [
      '> sentinel.scan({ mode: "zero-trust" })',
      '  ✓ eBPF kernel probes armed',
      '  ⚠ Zero-day pattern detected — ID #7421',
      '  → Isolating threat in 41ms...',
      '  ✓ Neutralized. SOC2 log recorded.',
    ],
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'Enterprise AI' },
  { id: 'cloud', label: 'Cloud IT' },
  { id: 'data', label: 'Data Streaming' },
  { id: 'security', label: 'Cyber Defense' },
]

/* ── Styled Code HUD Visual ── */
function ProjectHudVisual({ project }: { project: Project }) {
  return (
    <div className="work-hud-visual" style={{ '--proj-accent': project.accentColor } as React.CSSProperties}>
      {/* Top bar */}
      <div className="work-hud-topbar">
        <div className="work-mac-dots">
          <span className="mac-dot mac-red" />
          <span className="mac-dot mac-yellow" />
          <span className="mac-dot mac-green" />
        </div>
        <div className="work-url-pill">
          <span className="url-lock">🔒</span>
          <span className="url-text">nodes.thenextio.ai/{project.id}/live</span>
        </div>
        <div className="work-card-status">
          <span className="status-ping" />
          <span>{project.liveStatus}</span>
        </div>
      </div>

      {/* Code area */}
      <div className="work-hud-code-area">
        <div className="work-hud-code-header">
          <span className="work-hud-code-title">
            <span className="work-hud-dot" />
            LIVE EXECUTION LOG
          </span>
          <span className="work-hud-metric">{project.hudMetric}</span>
        </div>
        <div className="work-hud-code-body">
          {project.codeLines.map((line, i) => (
            <div key={i} className="work-hud-line">
              <span className="work-hud-line-num">{String(i + 1).padStart(2, '0')}</span>
              <span
                className={`work-hud-line-text ${
                  line.startsWith('  ✓')
                    ? 'is-success'
                    : line.startsWith('  ⚠')
                    ? 'is-warn'
                    : line.startsWith('  →')
                    ? 'is-action'
                    : 'is-cmd'
                }`}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Metrics row at bottom */}
        <div className="work-hud-metrics-row">
          {project.metrics.map((m, i) => (
            <div key={i} className="work-hud-stat">
              <span className="work-hud-stat-val">{m.value}</span>
              <span className="work-hud-stat-lbl">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Corner reticles */}
      <div className="work-reticle reticle-tl" />
      <div className="work-reticle reticle-br" />

      {/* Laser scan */}
      <div className="work-laser-scan" aria-hidden="true" />
    </div>
  )
}

export default function OurWork() {
  const trackRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [tabProgress, setTabProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 991)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterTag === activeFilter)

  const activeProject = filteredProjects[selectedIdx] ?? filteredProjects[0] ?? PROJECTS[0]

  // ── Scroll Progress across 320vh ──
  // Starts when section approaches viewport (starts at 75%)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  })

  // ── 1. Convergence Entrance (0.00 -> 0.12): Left & Right panels dock into place like About section ──
  const headerY = useTransform(smoothProgress, [0.00, 0.09], [-24, 0])
  const headerOpacity = useTransform(smoothProgress, [0.00, 0.07], [0, 1])

  const leftX = useTransform(smoothProgress, [0.00, 0.12], [-130, 0])
  const leftOpacity = useTransform(smoothProgress, [0.00, 0.09], [0, 1])

  const rightX = useTransform(smoothProgress, [0.00, 0.12], [140, 0])
  const rightScale = useTransform(smoothProgress, [0.00, 0.12], [0.92, 1])
  const rightOpacity = useTransform(smoothProgress, [0.00, 0.09], [0, 1])

  // ── 2. Scroll-driven project scrubbing (0.12 -> 1.00) ──
  const SHOWCASE_START = 0.12
  const stepSize = (1.00 - SHOWCASE_START) / filteredProjects.length

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (!isDesktop) return

    if (latest < SHOWCASE_START) {
      setSelectedIdx(0)
      setTabProgress(0)
      return
    }

    const progressInShowcase = Math.min(0.9999, Math.max(0, latest - SHOWCASE_START))
    const index = Math.min(
      filteredProjects.length - 1,
      Math.floor(progressInShowcase / stepSize)
    )
    const tabStart = SHOWCASE_START + index * stepSize
    const local = Math.max(0, Math.min(1, (latest - tabStart) / stepSize))

    setSelectedIdx(index)
    setTabProgress(local)
  })

  // Direct tab click smoothly scrolls to target offset in sticky track
  const handleTabClick = (index: number) => {
    setSelectedIdx(index)
    setTabProgress(0.5)
    if (isDesktop && trackRef.current) {
      const trackTop = trackRef.current.getBoundingClientRect().top + window.scrollY
      const trackHeight = trackRef.current.offsetHeight - window.innerHeight
      const targetScroll = trackTop + (SHOWCASE_START + index * stepSize + 0.4 * stepSize) * trackHeight
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }

  return (
    <section id="projects" ref={trackRef} className="work-scroll-track">
      {/* Sticky Full-Viewport Stage */}
      <div className="work-sticky-stage">
        {/* Ambient Glows */}
        <div className="work-glow work-glow-left" aria-hidden="true" />
        <div className="work-glow work-glow-right" aria-hidden="true" />

        <div className="work-stage-container">
          {/* ── Section Header (Scroll Entrance) ── */}
          <motion.div
            className="work-header"
            style={isDesktop ? { y: headerY, opacity: headerOpacity } : {}}
          >
            <div className="section-tag">
              <span><strong>OUR PROJECTS</strong></span>
            </div>

            <div className="work-header-row">
              <div>
                <h2 className="work-main-title">
                  Architected for Scale,{' '}
                  <span className="gradient-text">Engineered for Impact</span>
                </h2>
                <p className="work-main-sub">
                  Production systems engineered for tier-1 enterprises with autonomous AI reasoning and zero-latency pipelines.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="work-filter-pills">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`work-filter-btn ${activeFilter === cat.id ? 'is-active' : ''}`}
                    onClick={() => {
                      setActiveFilter(cat.id)
                      setSelectedIdx(0)
                      setTabProgress(0)
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Main Scroll-Driven Split Layout (Converges from Left & Right) ── */}
          <div className="work-split-layout">
            {/* LEFT COLUMN: Tab navigation with liquid progress (Converges from Left) */}
            <motion.div
              className="work-left-col"
              style={isDesktop ? { x: leftX, opacity: leftOpacity } : {}}
            >
              <nav className="work-tabs-nav" aria-label="Project tabs">
                {filteredProjects.map((project, idx) => {
                  const isActive = selectedIdx === idx
                  const fillWidth = isActive
                    ? Math.round(tabProgress * 100)
                    : idx < selectedIdx
                    ? 100
                    : 0

                  return (
                    <div key={project.id} className={`work-tab-item ${isActive ? 'is-active' : ''}`}>
                      <button
                        type="button"
                        className={`work-tab-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleTabClick(idx)}
                      >
                        <div className="work-tab-header-line">
                          <span className="work-tab-num">{project.num}</span>
                          {isActive && <span className="work-tab-live-dot" />}
                        </div>
                        <span className="work-tab-category">{project.category}</span>
                        <span className="work-tab-title">{project.title}</span>

                        {/* Liquid scroll progress underline */}
                        <div className="work-tab-progress-track">
                          <div
                            className="work-tab-progress-fill"
                            style={{ width: `${fillWidth}%` }}
                          />
                        </div>
                      </button>
                    </div>
                  )
                })}
              </nav>
            </motion.div>

            {/* RIGHT COLUMN: Project showcase card (Converges from Right) */}
            <motion.div
              className="work-right-col"
              style={isDesktop ? { x: rightX, scale: rightScale, opacity: rightOpacity } : {}}
            >
              <div className="work-showcase-card">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    className="work-card-inner"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    {/* Project info subcol */}
                    <div className="work-col-info">
                      <div className="work-badge-row">
                        <span className="work-cat-badge">{activeProject.category}</span>
                        <span className="work-num-pill">DEPLOYMENT #{activeProject.num}</span>
                      </div>

                      <h3 className="work-project-heading">{activeProject.title}</h3>
                      <p className="work-project-subhead">{activeProject.subtitle}</p>
                      <p className="work-project-desc">{activeProject.description}</p>

                      {/* Impact callout */}
                      <div className="work-impact-box">
                        <span className="impact-icon">⚡</span>
                        <span className="impact-text">
                          <strong>VERIFIED OUTCOME:</strong> {activeProject.impact}
                        </span>
                      </div>

                      {/* Tech stack pills */}
                      <div className="work-stack-list">
                        {activeProject.techStack.map((tech, i) => (
                          <span key={i} className="work-tech-pill">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA buttons */}
                      <div className="work-card-actions">
                        <Button href="#contact" variant="primary" size="md">
                          Explore Architecture
                        </Button>
                        <Button href="#contact" variant="ghost" fillColor="orange" size="md" icon={false}>
                          View Case Study
                        </Button>
                      </div>
                    </div>

                    {/* HUD Visual subcol */}
                    <div className="work-col-visual">
                      <ProjectHudVisual project={activeProject} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
