import { useState, useRef, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  image: string
  liveStatus: string
  hudMetric: string
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
    image: '/hero/slide-1.jpg',
    liveStatus: 'PRODUCTION MESH ACTIVE',
    hudMetric: 'Aura Core v5.2 • 840 req/s',
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
    image: '/hero/slide-2.jpg',
    liveStatus: 'MULTI-REGION REPLICATED',
    hudMetric: 'Cluster Sync • 248 Nodes Online',
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
    image: '/hero/slide-1.jpg',
    liveStatus: 'STREAM INGESTION OPTIMAL',
    hudMetric: 'Pipeline Throughput • 1.2 TB/hr',
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
    image: '/hero/slide-2.jpg',
    liveStatus: 'THREAT SHIELD ARMED',
    hudMetric: 'Heuristic Isolation • 0 Anomalies',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'Enterprise AI' },
  { id: 'cloud', label: 'Cloud IT' },
  { id: 'data', label: 'Data Streaming' },
  { id: 'security', label: 'Cyber Defense' },
]

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedIdx, setSelectedIdx] = useState(0)

  // 3D Touch Mouse Tilt State
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, shineX: 50, shineY: 50, active: false })

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.filterTag === activeFilter)

  const activeProject = filteredProjects[selectedIdx] || filteredProjects[0] || PROJECTS[0]

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Smooth tilt angles (-10deg to +10deg)
    const rx = ((y - centerY) / centerY) * -9
    const ry = ((x - centerX) / centerX) * 9
    const shineX = (x / rect.width) * 100
    const shineY = (y / rect.height) * 100

    setTilt({ rx, ry, shineX, shineY, active: true })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, shineX: 50, shineY: 50, active: false })
  }

  return (
    <section id="projects" className="work-section">
      {/* Background ambient glows (Hero exact) */}
      <div className="work-glow work-glow-left" aria-hidden="true" />
      <div className="work-glow work-glow-right" aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Section Header (Blueritt 1:1 Standard) ── */}
        <div className="work-header">
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span><strong>SELECTED WORK &amp; CASE STUDIES</strong></span>
          </motion.div>

          <div className="work-header-row">
            <div>
              <motion.h2
                className="work-main-title"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
              >
                Architected for Scale,{' '}
                <span className="gradient-text">Engineered for Impact</span>
              </motion.h2>

              <motion.p
                className="work-main-sub"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.18 }}
              >
                Explore production systems engineered for tier-1 enterprises, combining
                autonomous AI reasoning, resilient cloud backbones, and zero-latency pipelines.
              </motion.p>
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
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Project Quick Select Navigation ── */}
        <div className="work-nav-strip">
          {filteredProjects.map((p, idx) => {
            const isSelected = p.id === activeProject.id
            return (
              <button
                key={p.id}
                type="button"
                className={`work-nav-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedIdx(idx)}
              >
                <span className="work-nav-num">{p.num}</span>
                <span className="work-nav-title">{p.title}</span>
                {isSelected && <motion.div layoutId="workNavUnderline" className="work-nav-underline" />}
              </button>
            )
          })}
        </div>

        {/* ── VIP 3D INTERACTIVE PROJECT STAGE ── */}
        <div className="work-3d-stage">
          <motion.div
            ref={cardRef}
            className="work-3d-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: tilt.active ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
            }}
          >
            {/* Holographic Mouse Glare Layer */}
            <div
              className="work-3d-glare"
              style={{
                background: `radial-gradient(circle 500px at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.09) 0%, transparent 80%)`,
                opacity: tilt.active ? 1 : 0,
              }}
              aria-hidden="true"
            />

            {/* Top Browser Bar */}
            <div className="work-card-topbar">
              <div className="work-mac-dots">
                <span className="mac-dot mac-red" />
                <span className="mac-dot mac-yellow" />
                <span className="mac-dot mac-green" />
              </div>
              <div className="work-url-pill">
                <span className="url-lock">🔒</span>
                <span className="url-text">https://nodes.thenextio.ai/{activeProject.id}/production</span>
              </div>
              <div className="work-card-status">
                <span className="status-ping" />
                <span>{activeProject.liveStatus}</span>
              </div>
            </div>

            {/* Card Content: 2-Column VIP Layout */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                className="work-card-body"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease }}
              >
                {/* Left: Project Specs & Content */}
                <div className="work-col-info">
                  <div className="work-badge-row">
                    <span className="work-cat-badge">{activeProject.category}</span>
                    <span className="work-num-pill">DEPLOYMENT #{activeProject.num}</span>
                  </div>

                  <h3 className="work-project-heading">{activeProject.title}</h3>
                  <p className="work-project-subhead">{activeProject.subtitle}</p>

                  <p className="work-project-desc">{activeProject.description}</p>

                  {/* Impact Callout */}
                  <div className="work-impact-box">
                    <span className="impact-icon">⚡</span>
                    <span className="impact-text">
                      <strong>VERIFIED OUTCOME:</strong> {activeProject.impact}
                    </span>
                  </div>

                  {/* Live Metrics Grid */}
                  <div className="work-metrics-grid">
                    {activeProject.metrics.map((m, i) => (
                      <div key={i} className="work-metric-card">
                        <span className="work-metric-val">{m.value}</span>
                        <span className="work-metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="work-stack-list">
                    {activeProject.techStack.map((tech, i) => (
                      <span key={i} className="work-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons using common Button component */}
                  <div className="work-card-actions">
                    <Button href="#contact" variant="primary" size="md">
                      Explore Architecture
                    </Button>
                    <Button href="#contact" variant="ghost" fillColor="orange" size="md" icon={false}>
                      View Case Study
                    </Button>
                  </div>
                </div>

                {/* Right: 3D Holographic Visual with HUD */}
                <div className="work-col-visual">
                  <div className="work-visual-frame">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="work-visual-img"
                    />

                    {/* Cyber Scanning Laser Line */}
                    <div className="work-laser-scan" aria-hidden="true" />

                    {/* Floating 3D Telemetry HUD Badge */}
                    <div className="work-hud-badge">
                      <span className="hud-badge-dot" />
                      <span>{activeProject.hudMetric}</span>
                    </div>

                    {/* Corner Tech Reticles */}
                    <div className="work-reticle reticle-tl" />
                    <div className="work-reticle reticle-br" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
