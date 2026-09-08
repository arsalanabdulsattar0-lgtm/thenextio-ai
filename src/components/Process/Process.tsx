import { useState, useRef, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

export default function Process() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = PROCESS_STAGES[activeIdx]

  // 3D Touch Mouse Tilt State
  const stageRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, shineX: 50, shineY: 50, active: false })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rx = ((y - centerY) / centerY) * -8
    const ry = ((x - centerX) / centerX) * 8
    const shineX = (x / rect.width) * 100
    const shineY = (y / rect.height) * 100

    setTilt({ rx, ry, shineX, shineY, active: true })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, shineX: 50, shineY: 50, active: false })
  }

  return (
    <section id="process" className="process-section">
      {/* Background ambient glows (Hero exact) */}
      <div className="process-glow process-glow-left" aria-hidden="true" />
      <div className="process-glow process-glow-right" aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Section Header (Blueritt 1:1 Standard) ── */}
        <div className="process-header">
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span><strong>ENGINEERING LIFECYCLE &amp; PROCESS</strong></span>
          </motion.div>

          <div className="process-header-grid">
            <motion.h2
              className="process-main-title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              From Raw Concept to{' '}
              <span className="gradient-text">Autonomous Scale</span>
            </motion.h2>

            <motion.p
              className="process-main-sub"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.18 }}
            >
              A deterministic, 5-stage engineering methodology designed for predictable delivery,
              zero architectural debt, and enterprise-grade resilience under extreme load.
            </motion.p>
          </div>
        </div>

        {/* ── Interactive Milestone Stepper Rail ── */}
        <div className="process-stepper-rail">
          {PROCESS_STAGES.map((stage, idx) => {
            const isActive = idx === activeIdx
            const isCompleted = idx < activeIdx
            return (
              <button
                key={stage.id}
                type="button"
                className={`process-step-node ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                onClick={() => setActiveIdx(idx)}
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

        {/* ── VIP 3D INTERACTIVE PROCESS STAGE (Mouse Tilt) ── */}
        <div className="process-3d-stage">
          <motion.div
            ref={stageRef}
            className="process-3d-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: tilt.active ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
            }}
          >
            {/* Holographic Mouse Glare Layer */}
            <div
              className="process-3d-glare"
              style={{
                background: `radial-gradient(circle 500px at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.09) 0%, transparent 80%)`,
                opacity: tilt.active ? 1 : 0,
              }}
              aria-hidden="true"
            />

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
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease }}
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

                    {/* Action Buttons using common Button component */}
                    <div className="process-actions-row">
                      <Button href="#contact" variant="primary" size="md">
                        Start an Architecture Audit ↗
                      </Button>
                      <Button href="#contact" variant="ghost" fillColor="orange" size="md" icon={false}>
                        Schedule Technical Deep-Dive
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Live Terminal Execution & Verification Checklist */}
                  <div className="process-col-console">
                    {/* Terminal Simulation */}
                    <div className="process-terminal-window">
                      <div className="pterm-bar">
                        <span className="pterm-cmd-icon">&gt;</span>
                        <span className="pterm-cmd-text">{current.activeConsoleOutput.command}</span>
                      </div>
                      <div className="pterm-logs">
                        {current.activeConsoleOutput.logs.map((log, i) => (
                          <div key={i} className="pterm-log-line">
                            <span className="log-arrow">&gt;&gt;</span>
                            <span>{log}</span>
                          </div>
                        ))}
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
          </motion.div>
        </div>

      </div>
    </section>
  )
}
