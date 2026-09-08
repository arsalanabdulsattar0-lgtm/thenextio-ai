import { useState, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AISolutionsSection.css'

const ease = [0.22, 1, 0.36, 1] as const

/* ── Typed Lucide-Compatible SVG Icons ── */
function IconBotSwarm({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
    </svg>
  )
}

function IconTrendUp({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function IconFileBrain({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10 13a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
      <path d="M10 17h4" />
    </svg>
  )
}

function IconScanEye({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" /><path d="M7 12h.01" /><path d="M17 12h.01" />
    </svg>
  )
}

function IconArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function IconCode({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

/* ── Solution Data Definition ── */
export interface AISolutionItem {
  id: string
  code: string
  title: string
  shortDesc: string
  accentColor: string
  glowColor: string
  icon: (className?: string) => JSX.Element
  badge: string
  modeTag: string
  codeFileName: string
  simulatedCode: string
  architecture: {
    inputs: string[]
    core: string
    outputs: string[]
  }
  metrics: {
    val: string
    numeric: number
    suffix: string
    label: string
  }[]
}

export const AI_SOLUTIONS: AISolutionItem[] = [
  {
    id: 'agent-swarms',
    code: 'SOL // 01',
    title: 'Autonomous Agent Swarms',
    shortDesc: 'Multi-agent cognitive orchestration for recursive task decomposition and deterministic execution.',
    accentColor: '#C1662F', // Copper
    glowColor: 'rgba(193, 102, 47, 0.28)',
    icon: (cls) => <IconBotSwarm className={cls} />,
    badge: 'ORCHESTRATION_CORE // v4.2',
    modeTag: 'Dynamic Swarm Mode: Active',
    codeFileName: 'agent-executor.json',
    simulatedCode: `{
  "agent_id": "swarm-supervisor-alpha",
  "status": "ORCHESTRATING",
  "recursive_depth": 3,
  "active_workers": [
    { "role": "code_gen", "model": "Qwen-2.5-Coder", "tasks": 14 },
    { "role": "semantic_qa", "model": "Llama-3.3-70B", "tasks": 8 },
    { "role": "tool_verifier", "policy": "Deterministic-Airgap", "tasks": 22 }
  ],
  "latency_p99": "6.8ms",
  "consensus_reached": true
}`,
    architecture: {
      inputs: ['Task Queue Bus', 'ERP Webhook Ingress'],
      core: 'Multi-Agent Planner (CoT Supervisor)',
      outputs: ['Atomic DB Mutations', 'Real-Time API Actions'],
    },
    metrics: [
      { val: '85%', numeric: 85, suffix: '%', label: 'Manual Process Automation' },
      { val: '<6.8ms', numeric: 6.8, suffix: 'ms', label: 'Supervisor Latency' },
      { val: '4.2x', numeric: 4.2, suffix: 'x', label: 'Execution Speedup' },
    ],
  },
  {
    id: 'predictive-analytics',
    code: 'SOL // 02',
    title: 'Real-Time Predictive Analytics Engine',
    shortDesc: 'Sub-millisecond inference pipelines delivering continuous risk estimation and deterministic decisions.',
    accentColor: '#6FE0D6', // Cyan
    glowColor: 'rgba(111, 224, 214, 0.25)',
    icon: (cls) => <IconTrendUp className={cls} />,
    badge: 'INFERENCE_CORE // ZERO_LATENCY',
    modeTag: 'Temporal Window: 100ms Rolling',
    codeFileName: 'stream-inference.log',
    simulatedCode: `[STREAM_INGRESS] 4,820,000 events/sec ingested via Kafka
[TEMPORAL_MODEL] TensorRT-LLM Engine: Batch size 256
[INFERENCE_RESULT] {
  "anomaly_probability": 0.00012,
  "confidence_score": 0.9994,
  "projected_drift": "+0.02%",
  "action_trigger": "AUTO_SCALE_PODS",
  "compute_duration": "1.42ms"
}`,
    architecture: {
      inputs: ['Real-Time Kafka Bus', 'Telemetry Sensor Feeds'],
      core: 'Temporal Transformer Engine (TensorRT)',
      outputs: ['Predictive Risk Alerts', 'Automated Failover'],
    },
    metrics: [
      { val: '99.94%', numeric: 99.94, suffix: '%', label: 'Prediction Accuracy' },
      { val: '1.4ms', numeric: 1.4, suffix: 'ms', label: 'Inference Latency' },
      { val: '4.8M', numeric: 4.8, suffix: 'M/s', label: 'Event Ingestion Rate' },
    ],
  },
  {
    id: 'rag-pipelines',
    code: 'SOL // 03',
    title: 'Enterprise LLM RAG Pipelines',
    shortDesc: 'Cryptographically private Graph-RAG architectures delivering hallucination-free knowledge retrieval.',
    accentColor: '#A78FC7', // Amethyst / Violet
    glowColor: 'rgba(167, 143, 199, 0.28)',
    icon: (cls) => <IconFileBrain className={cls} />,
    badge: 'KNOWLEDGE_GRAPH_RAG // PRIVATE',
    modeTag: 'Air-Gap Isolation: Enforced',
    codeFileName: 'rag-query-response.json',
    simulatedCode: `{
  "query_vector": "financial_risk_audit_q3",
  "retrieval_strategy": "Hybrid (Dense Vector + Neo4j Graph)",
  "nodes_queried": 184000,
  "grounded_sources": [
    { "doc_id": "SEC-10K-2026.pdf", "cosine_sim": 0.962 },
    { "doc_id": "Internal-Ledger-Audit.parquet", "cosine_sim": 0.948 }
  ],
  "hallucination_index": 0.0002,
  "citation_verification": "CRYPTOGRAPHICALLY_VALIDATED"
}`,
    architecture: {
      inputs: ['Enterprise Data Lake', 'Internal Documentation'],
      core: 'Hybrid Vector + Knowledge Graph RAG',
      outputs: ['Grounded Citations', 'Verified Synthetic Summary'],
    },
    metrics: [
      { val: '100%', numeric: 100, suffix: '%', label: 'Data Sovereignty' },
      { val: '0.02%', numeric: 0.02, suffix: '%', label: 'Hallucination Rate' },
      { val: '12x', numeric: 12, suffix: 'x', label: 'Knowledge Retrieval Speed' },
    ],
  },
  {
    id: 'vision-ai',
    code: 'SOL // 04',
    title: 'Vision AI & Quality Inspection',
    shortDesc: 'Real-time spatial computing, neural object tracking, and automated industrial anomaly inspection.',
    accentColor: '#4ECCA3', // Electric Emerald
    glowColor: 'rgba(78, 204, 163, 0.28)',
    icon: (cls) => <IconScanEye className={cls} />,
    badge: 'SPATIAL_PERCEPTION // EDGE_ORIN',
    modeTag: 'Pipeline Frame Rate: 120 FPS',
    codeFileName: 'vision-telemetry.json',
    simulatedCode: `{
  "camera_stream": "CAM_04_OPTICAL_4K",
  "resolution": "3840x2160 @ 120fps",
  "edge_device": "NVIDIA Jetson AGX Orin 64GB",
  "detections": [
    { "class": "micro_crack_defect", "confidence": 0.998, "bbox": [412, 890, 428, 915] }
  ],
  "action_dispatched": "PNEUMATIC_EJECTION_ARM",
  "latency_overhead": "2.1ms"
}`,
    architecture: {
      inputs: ['4K High-Speed Optical Cams', 'Spatial LiDAR Array'],
      core: 'Spatial Neural Mesh (DeepStream + CUDA)',
      outputs: ['Automated Defect Ejection', 'Defect Telemetry Heatmap'],
    },
    metrics: [
      { val: '99.99%', numeric: 99.99, suffix: '%', label: 'Defect Detection Recall' },
      { val: '120 FPS', numeric: 120, suffix: ' FPS', label: 'Real-Time Inference' },
      { val: '65%', numeric: 65, suffix: '%', label: 'Scrap Reduction' },
    ],
  },
]

/* ── Interactive Architecture Diagram Component ── */
function ArchitectureDiagram({
  architecture,
  accentColor,
}: {
  architecture: AISolutionItem['architecture']
  accentColor: string
}) {
  return (
    <div className="ai-cockpit__diagram">
      <svg className="ai-cockpit__diagram-svg" viewBox="0 0 680 110" fill="none">
        {/* Glow Filters */}
        <defs>
          <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Connection Pulse Lines */}
        {/* Input 1 to Core */}
        <path d="M 130 32 C 220 32, 240 55, 300 55" stroke="rgba(244, 245, 246, 0.15)" strokeWidth="1.5" />
        <motion.path
          d="M 130 32 C 220 32, 240 55, 300 55"
          stroke={accentColor}
          strokeWidth="2"
          strokeDasharray="6 12"
          initial={{ strokeDashoffset: 36 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Input 2 to Core */}
        <path d="M 130 78 C 220 78, 240 55, 300 55" stroke="rgba(244, 245, 246, 0.15)" strokeWidth="1.5" />
        <motion.path
          d="M 130 78 C 220 78, 240 55, 300 55"
          stroke={accentColor}
          strokeWidth="2"
          strokeDasharray="6 12"
          initial={{ strokeDashoffset: 36 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
        />

        {/* Core to Output 1 */}
        <path d="M 380 55 C 440 55, 460 32, 550 32" stroke="rgba(244, 245, 246, 0.15)" strokeWidth="1.5" />
        <motion.path
          d="M 380 55 C 440 55, 460 32, 550 32"
          stroke={accentColor}
          strokeWidth="2"
          strokeDasharray="6 12"
          initial={{ strokeDashoffset: 36 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.25 }}
        />

        {/* Core to Output 2 */}
        <path d="M 380 55 C 440 55, 460 78, 550 78" stroke="rgba(244, 245, 246, 0.15)" strokeWidth="1.5" />
        <motion.path
          d="M 380 55 C 440 55, 460 78, 550 78"
          stroke={accentColor}
          strokeWidth="2"
          strokeDasharray="6 12"
          initial={{ strokeDashoffset: 36 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.75 }}
        />

        {/* Input Nodes (Left) */}
        <g>
          <rect x="10" y="16" width="120" height="32" rx="6" fill="#12131A" stroke="rgba(244, 245, 246, 0.12)" />
          <circle cx="24" cy="32" r="3.5" fill={accentColor} />
          <text x="34" y="36" fill="#F4F5F6" fontSize="9" fontFamily="monospace">{architecture.inputs[0]}</text>

          <rect x="10" y="62" width="120" height="32" rx="6" fill="#12131A" stroke="rgba(244, 245, 246, 0.12)" />
          <circle cx="24" cy="78" r="3.5" fill={accentColor} />
          <text x="34" y="82" fill="#F4F5F6" fontSize="9" fontFamily="monospace">{architecture.inputs[1]}</text>
        </g>

        {/* Center AI Engine Core */}
        <g>
          <rect x="260" y="32" width="160" height="46" rx="8" fill="#161720" stroke={accentColor} strokeWidth="1.5" filter="url(#node-glow)" />
          <circle cx="280" cy="55" r="5" fill={accentColor} />
          <text x="292" y="52" fill="#F4F5F6" fontSize="10" fontWeight="bold" fontFamily="monospace">AI CORE ENGINE</text>
          <text x="292" y="66" fill="#8B9096" fontSize="8" fontFamily="monospace">{architecture.core.slice(0, 24)}...</text>
        </g>

        {/* Output Nodes (Right) */}
        <g>
          <rect x="550" y="16" width="120" height="32" rx="6" fill="#12131A" stroke="rgba(244, 245, 246, 0.12)" />
          <circle cx="564" cy="32" r="3.5" fill={accentColor} />
          <text x="574" y="36" fill="#F4F5F6" fontSize="9" fontFamily="monospace">{architecture.outputs[0]}</text>

          <rect x="550" y="62" width="120" height="32" rx="6" fill="#12131A" stroke="rgba(244, 245, 246, 0.12)" />
          <circle cx="564" cy="78" r="3.5" fill={accentColor} />
          <text x="574" y="82" fill="#F4F5F6" fontSize="9" fontFamily="monospace">{architecture.outputs[1]}</text>
        </g>
      </svg>
    </div>
  )
}

/* ── Main AI Solutions Section Component ── */
export default function AISolutionsSection() {
  const [activeSolution, setActiveSolution] = useState<AISolutionItem>(AI_SOLUTIONS[0])

  return (
    <section
      id="ai"
      className="ai-cockpit"
      style={
        {
          '--active-accent': activeSolution.accentColor,
          '--active-glow': activeSolution.glowColor,
        } as CSSProperties
      }
    >
      {/* Background Atmosphere */}
      <div className="ai-cockpit__backdrop" aria-hidden="true">
        <div className="ai-cockpit__neural-grid" />
        <div
          className="ai-cockpit__ambient-glow"
          style={{ background: activeSolution.glowColor }}
        />
      </div>

      <div className="ai-cockpit__inner container">
        {/* Header & Tactical Status HUD */}
        <div className="ai-cockpit__header">
          <div className="ai-cockpit__top-bar">
            <div className="ai-cockpit__badge">
              <span className="ai-cockpit__neural-pulse" />
              [ ENTERPRISE AI SOLUTIONS ]
            </div>

            {/* Live HUD Widgets */}
            <div className="ai-cockpit__hud-stats">
              <div className="ai-cockpit__hud-item">
                <span>THROUGHPUT:</span>
                <span className="ai-cockpit__hud-val">4.8M req/s</span>
              </div>
              <div className="ai-cockpit__hud-item">
                <span>ACCURACY:</span>
                <span className="ai-cockpit__hud-val">99.94%</span>
              </div>
              <div className="ai-cockpit__hud-item">
                <span>GLOBAL_NODES:</span>
                <span className="ai-cockpit__hud-val">1,024</span>
              </div>
            </div>
          </div>

          <div className="ai-cockpit__title-row">
            <h2 className="ai-cockpit__title">
              Autonomous Systems Built for{' '}
              <span className="ai-cockpit__title-gradient">Infinite Enterprise Scale</span>.
            </h2>
            <p className="ai-cockpit__subtitle">
              Mission-critical artificial intelligence engines built to reason, automate,
              and protect with deterministic sub-millisecond precision.
            </p>
          </div>
        </div>

        {/* Dual Panel Command Workspace */}
        <div className="ai-cockpit__workspace">
          {/* Left Navigation Matrix */}
          <div className="ai-cockpit__selector" role="tablist">
            {AI_SOLUTIONS.map((sol) => {
              const isActive = activeSolution.id === sol.id
              return (
                <button
                  key={sol.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`ai-cockpit__tab-btn ${isActive ? 'ai-cockpit__tab-btn--active' : ''}`}
                  onClick={() => setActiveSolution(sol)}
                >
                  {/* Vertical Glowing Neon Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="cockpit-active-laser"
                      className="ai-cockpit__laser-bar"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}

                  <div className="ai-cockpit__tab-icon-wrap">
                    {sol.icon('ai-cockpit__tab-icon')}
                  </div>

                  <div className="ai-cockpit__tab-info">
                    <span className="ai-cockpit__tab-tag">{sol.code}</span>
                    <h3 className="ai-cockpit__tab-title">{sol.title}</h3>
                    <p className="ai-cockpit__tab-desc">{sol.shortDesc}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Holographic Showcase Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSolution.id}
              className="ai-cockpit__stage"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
            >
              <div className="ai-cockpit__stage-wireframe" aria-hidden="true" />

              {/* Stage Header */}
              <div className="ai-cockpit__stage-header">
                <div className="ai-cockpit__stage-title-wrap">
                  <span className="ai-cockpit__stage-badge">{activeSolution.badge}</span>
                  <h3 className="ai-cockpit__stage-title">{activeSolution.title}</h3>
                </div>
                <span className="ai-cockpit__stage-mode-tag">{activeSolution.modeTag}</span>
              </div>

              {/* Visual Architecture Flow Diagram */}
              <ArchitectureDiagram
                architecture={activeSolution.architecture}
                accentColor={activeSolution.accentColor}
              />

              {/* Simulated Interactive Code / Terminal Box */}
              <div className="ai-cockpit__terminal">
                <div className="ai-cockpit__terminal-bar">
                  <div className="ai-cockpit__terminal-dots">
                    <span className="ai-cockpit__terminal-dot ai-cockpit__terminal-dot--red" />
                    <span className="ai-cockpit__terminal-dot ai-cockpit__terminal-dot--yellow" />
                    <span className="ai-cockpit__terminal-dot ai-cockpit__terminal-dot--green" />
                  </div>
                  <span className="ai-cockpit__terminal-file">
                    <IconCode /> {activeSolution.codeFileName}
                  </span>
                </div>
                <div className="ai-cockpit__terminal-body">
                  <code>{activeSolution.simulatedCode}</code>
                  <span className="ai-cockpit__cursor" />
                </div>
              </div>

              {/* Key Impact Metrics Bar */}
              <div className="ai-cockpit__metrics-bar">
                {activeSolution.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="ai-cockpit__metric-col">
                    <motion.span
                      className="ai-cockpit__metric-val"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: mIdx * 0.1 }}
                    >
                      {metric.val}
                    </motion.span>
                    <span className="ai-cockpit__metric-lbl">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="ai-cockpit__action-bar">
                <a href="#contact" className="ai-cockpit__deploy-btn">
                  Deploy Solution Architecture <IconArrowRight />
                </a>
                <a href="#projects" className="ai-cockpit__docs-btn">
                  View Case Studies
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
