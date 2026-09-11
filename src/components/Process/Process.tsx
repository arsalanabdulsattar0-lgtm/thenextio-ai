import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion'
import Button from '../common/Button'
import './Process.css'

const ease = [0.22, 1, 0.36, 1] as const

interface ProcessStage {
  id: string
  num: string
  title: string
  subtitle: string
  description: string
  deliverables: string[]
  verificationChecklist: string[]
  stageMetrics: { label: string; value: string }[]
  activeConsoleOutput: {
    command: string
    status: string
    logs: string[]
  }
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'discovery',
    num: '01',
    title: 'ARCHITECTURAL AUDIT & FEASIBILITY',
    subtitle: 'System Discovery, Constraint Mapping & SLA Modeling',
    description:
      'We deconstruct your operational bottlenecks, evaluate existing telemetry and infrastructure constraints, and benchmark AI model viability to establish deterministic engineering KPIs and security guardrails.',
    deliverables: [
      'Comprehensive Technical Feasibility Matrix',
      'Data Privacy, SOC2 & HIPAA Boundary Specs',
      'Target Latency, Throughput & Uptime SLA Charter',
      'Milestone-Driven Engineering Roadmap',
    ],
    verificationChecklist: [
      'Compute & Memory Ceiling Analysis Completed',
      'Regulatory Data Governance Verified',
      'Architectural Trade-off Decisions Locked',
    ],
    stageMetrics: [
      { label: 'Feasibility Score', value: '99.4%' },
      { label: 'Audit Duration', value: '5-7 Days' },
      { label: 'Risk Delta', value: '-85%' },
    ],
    activeConsoleOutput: {
      command: 'thenextio audit --target=enterprise-cluster --depth=deep',
      status: 'AUDIT COMPLETE: 0 CRITICAL BOTTLENECKS',
      logs: [
        'Running synthetic load benchmark on 12 distributed services...',
        'Validating tokenized encryption across egress gateways... PASSED',
        'Model inference latency headroom estimated at 12ms... OPTIMAL',
        'Architecture blueprint approved for Stage 02 topology design.',
      ],
    },
  },
  {
    id: 'topology',
    num: '02',
    title: 'NEURAL & CLOUD TOPOLOGY DESIGN',
    subtitle: 'System Schematics, Microservices & Data Contracts',
    description:
      'We formulate the end-to-end distributed topology—defining vector retrieval schemas, containerized Kubernetes node meshes, zero-trust service authentication, and fault-tolerant event streams.',
    deliverables: [
      'Interactive Microservice Schematic Diagram',
      'Type-Safe gRPC & GraphQL Interface Contracts',
      'Terraform Multi-Cloud Declarative Manifests',
      'Private Foundation Model Fine-Tuning Specs',
    ],
    verificationChecklist: [
      'Cross-Region Network Mesh Latency < 20ms',
      'Automated Disaster Recovery Protocol Drafted',
      'Vector Search Indexing Schema Validated',
    ],
    stageMetrics: [
      { label: 'Topology Nodes', value: '64 Multi-Cloud' },
      { label: 'Failover SLA', value: '< 200ms' },
      { label: 'Schema Rigor', value: '100% Typed' },
    ],
    activeConsoleOutput: {
      command: 'thenextio topology compile --strict-types --k8s-mesh',
      status: 'TOPOLOGY COMPILED: ZERO CONFLICTS',
      logs: [
        'Generating declarative infrastructure-as-code manifests...',
        'Synthesizing Apache Kafka stream partitions for real-time ETL...',
        'Validating mutual TLS certificate rotation policies...',
        'All 64 microservice boundaries verified for zero-trust compliance.',
      ],
    },
  },
  {
    id: 'prototyping',
    num: '03',
    title: 'RAPID PROTOTYPING & EMBEDDING',
    subtitle: 'Proof-of-Concept Validation & Model Benchmarking',
    description:
      'We construct a hardened sandbox environment to benchmark model quantization (FP8 / INT4), test autonomous agent multi-step reasoning, and pressure-test distributed streaming under peak synthetic load.',
    deliverables: [
      'Functional Autonomous Agent Sandbox',
      'Quantized Model Inference Benchmarks',
      'High-Throughput Kafka Stream Simulations',
      'Interactive Stakeholder Decision Prototype',
    ],
    verificationChecklist: [
      'Agent Reasoning Accuracy Benchmark > 99%',
      'Memory Footprint Compressed by 60%',
      'Continuous Integration Test Suite Verified',
    ],
    stageMetrics: [
      { label: 'Accuracy SLA', value: '99.8%' },
      { label: 'Inference Target', value: '12ms' },
      { label: 'Test Coverage', value: '98.5%' },
    ],
    activeConsoleOutput: {
      command: 'thenextio prototype run --agents=autonomous --stress-test',
      status: 'STRESS TEST PASSED: 15,000 REQ/S',
      logs: [
        'Executing 10,000 concurrent agent reasoning tasks...',
        'Context retrieval from Qdrant vector index: 4.8ms avg.',
        'Zero halluncination guardrails triggered during edge cases.',
        'Prototype validated for enterprise production cutover.',
      ],
    },
  },
  {
    id: 'deployment',
    num: '04',
    title: 'ENTERPRISE ZERO-DOWNTIME CUTOVER',
    subtitle: 'Blue/Green Rollout, Canary Verification & Telemetry',
    description:
      'We execute a deterministic, zero-downtime production deployment using automated blue/green canary routing, live telemetry observation, and instant rollback triggers to ensure seamless enterprise business continuity.',
    deliverables: [
      'Zero-Downtime Blue/Green Deployment Execution',
      'Prometheus & Grafana Real-Time Observability Matrix',
      'Automated Incident Response & Pager Escalation',
      'Executive Handoff & Architecture Documentation',
    ],
    verificationChecklist: [
      'Live Production Cutover with 0.000% Downtime',
      'Canary Traffic Swapped with Zero Dropped Packets',
      '24/7 Heuristic Anomaly Sentry Armed',
    ],
    stageMetrics: [
      { label: 'Downtime Window', value: '0.000%' },
      { label: 'Canary Health', value: '100% Healthy' },
      { label: 'Rollout Duration', value: '< 15 Mins' },
    ],
    activeConsoleOutput: {
      command: 'thenextio deploy --canary=10% --auto-promote --verify-sla',
      status: 'PRODUCTION DEPLOYMENT SUCCESSFUL',
      logs: [
        'Routing 10% live enterprise traffic to canary cluster...',
        'Error rate: 0.0000% | P99 latency: 11.4ms (within 12ms target).',
        'Promoting to 100% traffic across all global availability zones...',
        'Production cutover finalized. All 248 nodes reporting healthy.',
      ],
    },
  },
  {
    id: 'optimization',
    num: '05',
    title: 'CONTINUOUS AUTO-TUNING & EVOLUTION',
    subtitle: 'Heuristic Drift Detection, Weight Updates & Auto-Scaling',
    description:
      'Post-deployment, our autonomous sentinels monitor model weight drift, optimize vector retrieval embeddings, and fine-tune cloud resource allocation dynamically as data volume scales into petabytes.',
    deliverables: [
      'Autonomous Model Drift Detection Sentry',
      'Continuous Fine-Tuning & Weight Update Pipelines',
      'Dynamic Multi-Cloud Compute Cost Optimizer',
      'Quarterly Enterprise Architecture Strategic Reviews',
    ],
    verificationChecklist: [
      'Self-Healing Node Recovery Active (< 200ms)',
      'Infrastructure Cloud Spend Trimmed by 35%',
      'Model Precision Maintained at Peak Benchmark',
    ],
    stageMetrics: [
      { label: 'Continuous Uptime', value: '99.999%' },
      { label: 'Auto-Scaling', value: '< 2 Secs' },
      { label: 'Cost Efficiency', value: '+42%' },
    ],
    activeConsoleOutput: {
      command: 'thenextio sentry monitor --drift-detect --auto-heal',
      status: 'AUTONOMOUS SENTRY: LIVE & OPTIMAL',
      logs: [
        'Analyzing last 50,000 production inference requests...',
        'No concept drift detected in semantic embedding vectors.',
        'Auto-scaling cluster scaled down 14 idle pods during off-peak.',
        'Continuous optimization active. All operational targets exceeded.',
      ],
    },
  },
]

/* ── Words for Headline Scroll Reveal (Products & Showcase 1:1) ── */
const HEADLINE_WORDS = [
  { word: 'From', accent: false },
  { word: 'Raw', accent: false },
  { word: 'Concept', accent: false },
  { word: 'to', accent: false },
  { word: 'Autonomous', accent: true },
  { word: 'Scale', accent: true },
]

const WORD_RANGES: [number, number][] = [
  [0.08, 0.24], // From
  [0.20, 0.36], // Raw
  [0.32, 0.48], // Concept
  [0.44, 0.60], // to
  [0.56, 0.74], // Autonomous
  [0.70, 0.88], // Scale
]

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
  const y = useTransform(progress, range, [10, 0])

  return (
    <motion.span
      className={`process-reveal-word ${isAccent ? 'accent-word' : ''}`}
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  )
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)
  const [visibleLogsCount, setVisibleLogsCount] = useState(1)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 991)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const current = PROCESS_STAGES[activeIdx]

  // Terminal streaming simulation on phase change
  useEffect(() => {
    setVisibleLogsCount(1)
    const totalLogs = current.activeConsoleOutput.logs.length
    let step = 1
    const interval = setInterval(() => {
      step += 1
      setVisibleLogsCount(step)
      if (step >= totalLogs) {
        clearInterval(interval)
      }
    }, 240)
    return () => clearInterval(interval)
  }, [activeIdx, current.activeConsoleOutput.logs.length])

  // ── 1. Section Entrance Scroll Reveal (Word-by-Word, Products & Showcase 1:1) ──
  // Starts when Process section enters 80% of viewport and reveals progressively as user scrolls in
  const { scrollYProgress: entranceScroll } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'start 15%'],
  })

  const smoothEntrance = useSpring(entranceScroll, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  const tagOpacity = useTransform(smoothEntrance, [0.02, 0.16], [0.12, 1])
  const tagY = useTransform(smoothEntrance, [0.02, 0.16], [8, 0])

  const subOpacity = useTransform(smoothEntrance, [0.45, 0.85], [0.15, 1])
  const subY = useTransform(smoothEntrance, [0.45, 0.85], [16, 0])

  // ── 2. Sticky Stage Track (ONLY Stepper Rail + Card, Fits 100vh Perfectly!) ──
  // Begins scrubbing the instant Stepper Rail & Card fit into view at top: 75px (clear of navbar)
  const { scrollYProgress: stickyScroll } = useScroll({
    target: trackRef,
    offset: ['start 75px', 'end end'],
  })

  const smoothTimeline = useSpring(stickyScroll, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  })

  // Timeline line width driven by scroll progress: 0% -> 100%
  const timelineWidth = useTransform(smoothTimeline, [0.0, 1.0], ['0%', '100%'])

  const stepSize = 1.0 / PROCESS_STAGES.length

  // On scroll, seamlessly update the active phase 01 -> 05
  useMotionValueEvent(smoothTimeline, 'change', (latest) => {
    if (!isDesktop) return
    if (latest <= 0) {
      setActiveIdx(0)
      return
    }
    const clamped = Math.min(0.9999, Math.max(0, latest))
    const index = Math.min(
      PROCESS_STAGES.length - 1,
      Math.floor(clamped / stepSize)
    )
    setActiveIdx(index)
  })

  // Direct tab click smoothly scrolls sticky track to target phase
  const handleStepClick = (idx: number) => {
    setActiveIdx(idx)
    if (isDesktop && trackRef.current) {
      const trackTop = trackRef.current.getBoundingClientRect().top + window.scrollY
      const trackHeight = trackRef.current.offsetHeight - window.innerHeight
      const targetScroll = trackTop + (idx * stepSize + 0.5 * stepSize) * trackHeight
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }

  return (
    <section id="process" ref={sectionRef} className="process-section">
      {/* Background ambient glows (Hero exact) */}
      <div className="process-glow process-glow-left" aria-hidden="true" />
      <div className="process-glow process-glow-right" aria-hidden="true" />

      {/* ── 1. Section Header: Scrolls into view, reveals, then scrolls up naturally ── */}
      <div ref={headerRef} className="process-header-wrap">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="process-header">
            <motion.div
              className="section-tag"
              style={isDesktop ? { opacity: tagOpacity, y: tagY } : {}}
            >
              <span><strong>ENGINEERING LIFECYCLE &amp; PROCESS</strong></span>
            </motion.div>

            <div className="process-header-grid">
              <h2 className="process-main-title">
                {HEADLINE_WORDS.map((item, idx) => (
                  <RevealWord
                    key={idx}
                    word={item.word}
                    progress={smoothEntrance}
                    range={WORD_RANGES[idx]}
                    isAccent={item.accent}
                  />
                ))}
              </h2>

              <motion.p
                className="process-main-sub"
                style={isDesktop ? { opacity: subOpacity, y: subY } : {}}
              >
                A deterministic, 5-stage engineering methodology designed for predictable delivery,
                zero architectural debt, and enterprise-grade resilience under extreme load.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Sticky Stage Track: ONLY the Stepper Rail + Card! (Fits 100vh with ZERO cropping!) ── */}
      <div ref={trackRef} className="process-sticky-track">
        <div className="process-sticky-stage">
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>

            {/* Stepper Rail */}
            <div className="process-stepper-wrap">
              <div className="process-pipeline-track" aria-hidden="true">
                <div className="process-pipeline-line-bg" />
                <motion.div
                  className="process-pipeline-line-fill"
                  style={{
                    width: isDesktop ? timelineWidth : `${(activeIdx / (PROCESS_STAGES.length - 1)) * 100}%`,
                  }}
                />
              </div>

              <div className="process-stepper-rail">
                {PROCESS_STAGES.map((stage, idx) => {
                  const isActive = idx === activeIdx
                  const isCompleted = idx < activeIdx
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      className={`process-step-node ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                      onClick={() => handleStepClick(idx)}
                    >
                      <div className="node-indicator">
                        <span className="node-num">{stage.num}</span>
                        <span className="node-dot" />
                      </div>
                      <div className="node-info">
                        <span className="node-stage-lbl">PHASE 0{idx + 1}</span>
                        <span className="node-title">{stage.title}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          className="node-active-glow"
                          layoutId="stepperActiveGlow"
                          transition={{ duration: 0.35, ease }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* VIP Card */}
            <div className="process-stage-container">
              <div className="process-stage-card">
                {/* Top Terminal Status Header */}
                <div className="process-card-header">
                  <div className="process-mac-dots">
                    <span className="pdot pdot-red" />
                    <span className="pdot pdot-yellow" />
                    <span className="pdot pdot-green" />
                    <span className="process-terminal-path">
                      pipeline/lifecycle/{current.id}/execution.log
                    </span>
                  </div>
                  <div className="process-status-pill">
                    <span className="process-ping-dot" />
                    <span>{current.activeConsoleOutput.status}</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    className="process-card-content"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    {/* 2-Column VIP Process Stage Layout */}
                    <div className="process-grid-body">

                      {/* Left Column: Stage Narrative & Deliverables */}
                      <div className="process-col-info">
                        <div className="process-phase-badge">
                          <span>PHASE #{current.num}</span>
                          <span className="badge-sep">•</span>
                          <span>{current.subtitle}</span>
                        </div>

                        <h3 className="process-stage-heading">{current.title}</h3>
                        <p className="process-stage-desc">{current.description}</p>

                        {/* Deliverables Checklist Grid */}
                        <div className="process-deliverables-box">
                          <span className="deliv-header-title">PROVABLE DELIVERABLES &amp; ARTIFACTS</span>
                          <div className="deliv-list">
                            {current.deliverables.map((deliv, i) => (
                              <div key={i} className="deliv-item">
                                <span className="deliv-check">✓</span>
                                <span className="deliv-text">{deliv}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Stage Metrics Grid */}
                        <div className="process-metrics-grid">
                          {current.stageMetrics.map((m, i) => (
                            <div key={i} className="process-metric-card">
                              <span className="pmetric-val">{m.value}</span>
                              <span className="pmetric-lbl">{m.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* Single Unified Contact Us Action Button */}
                        <div className="process-actions-row">
                          <Button href="#contact" variant="ghost" fillColor="orange" size="md">
                            Contact Us
                          </Button>
                        </div>
                      </div>

                      {/* Right Column: Live Terminal Execution & Verification Checklist */}
                      <div className="process-col-console">
                        {/* Terminal Simulation with Live Streaming Effect */}
                        <div className="process-terminal-window">
                          <div className="pterm-bar">
                            <span className="pterm-cmd-icon">&gt;</span>
                            <span className="pterm-cmd-text">{current.activeConsoleOutput.command}</span>
                          </div>
                          <div className="pterm-logs">
                            {current.activeConsoleOutput.logs.slice(0, visibleLogsCount).map((log, i) => (
                              <motion.div
                                key={`${activeIdx}-${i}`}
                                className="pterm-log-line"
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <span className="log-arrow">&gt;&gt;</span>
                                <span>{log}</span>
                              </motion.div>
                            ))}
                            <span className="pterm-cursor" aria-hidden="true" />
                          </div>
                        </div>

                        {/* Verification Protocol Box */}
                        <div className="process-verification-box">
                          <span className="verif-title">GATEWAY VERIFICATION PROTOCOL</span>
                          <div className="verif-items">
                            {current.verificationChecklist.map((check, i) => (
                              <div key={i} className="verif-row">
                                <span className="verif-shield">🛡️</span>
                                <span className="verif-text">{check}</span>
                                <span className="verif-badge">PASSED</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
