import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ServicesSection.css'

const ease = [0.22, 1, 0.36, 1] as const

/* ── Typed SVG Icons (Matching Lucide Specifications) ── */
function IconBrain({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M12 18v4" />
    </svg>
  )
}

function IconBot({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="12" x="3" y="6" rx="2" />
      <path d="M9 13v-2" /><path d="M15 13v-2" /><path d="M12 2v4" />
      <path d="m2 14 1-1" /><path d="m22 14-1-1" />
    </svg>
  )
}

function IconCloud({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}

function IconEye({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconShield({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconLayers({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function IconArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

/* ── Service Item Definition ── */
export type ServiceCategory = 'all' | 'ai' | 'cloud' | 'enterprise'

export interface ServiceModule {
  id: string
  num: string
  title: string
  category: ServiceCategory
  desc: string
  gridSpan: 'span-7' | 'span-5' | 'span-4' | 'span-12'
  icon: ReactNode
  specs: string[]
  terminalData: { label: string; val: string }[]
  telemetry: {
    systemNode: string
    activeDataFlow: string
    memoryUsage: string
    stack: string[]
  }
}

export const SERVICES_DATA: ServiceModule[] = [
  {
    id: 'neural-llm',
    num: 'MOD // 01',
    title: 'Neural AI & LLM Fine-Tuning',
    category: 'ai',
    desc: 'Bespoke foundation model adaptation, domain-specific LoRA fine-tuning, and ultra-quantized local inference pipelines built for enterprise data privacy.',
    gridSpan: 'span-7',
    icon: <IconBrain />,
    specs: ['Latency: <14ms', 'Quantization: 4-bit / 8-bit', 'Throughput: 540 tps'],
    terminalData: [
      { label: 'BASE_WEIGHTS', val: 'Llama-3-70B-Custom' },
      { label: 'ATTENTION_OPT', val: 'FlashAttention-v2 [ACTIVE]' },
      { label: 'CONTEXT_WINDOW', val: '128k Tokens (Lossless)' },
    ],
    telemetry: {
      systemNode: 'Cluster-Alpha (8x H100 SXM5)',
      activeDataFlow: '3.42 GB/s Token Vector Bus',
      memoryUsage: '94.2% VRAM Allocation',
      stack: ['PyTorch', 'vLLM', 'TensorRT-LLM', 'Triton Server', 'HuggingFace'],
    },
  },
  {
    id: 'autonomous-agents',
    num: 'MOD // 02',
    title: 'Autonomous Agent Systems',
    category: 'enterprise',
    desc: 'Self-directing cognitive agents capable of recursive task decomposition, deterministic tool invocation, and multi-agent coordination.',
    gridSpan: 'span-5',
    icon: <IconBot />,
    specs: ['Supervisor Mode: Active', 'Memory: Graph-RAG', 'Tool Sandboxing'],
    terminalData: [
      { label: 'PLANNER_CORE', val: 'Recursive CoT Engine' },
      { label: 'AGENT_SWARM', val: '4 Active Supervisors' },
      { label: 'EXEC_SAFETY', val: 'Deterministic Sandbox' },
    ],
    telemetry: {
      systemNode: 'Swarm Coordinator v2.6',
      activeDataFlow: '1,420 Async Events/sec',
      memoryUsage: 'Graph Memory: 12.4M Nodes',
      stack: ['LangGraph', 'AutoGPT Core', 'Redis Vector', 'Docker Sandbox', 'Celery'],
    },
  },
  {
    id: 'quantum-cloud',
    num: 'MOD // 03',
    title: 'Quantum Cloud & Infrastructure',
    category: 'cloud',
    desc: 'Next-gen distributed multi-region Kubernetes clusters engineered for zero cold-starts, automatic horizontal scaling, and edge computing.',
    gridSpan: 'span-4',
    icon: <IconCloud />,
    specs: ['Uptime: 99.995%', 'Replication: Multi-Region', 'Cold-Start: 0ms'],
    terminalData: [
      { label: 'K8S_TOPOLOGY', val: 'Multi-AZ Auto-Mesh' },
      { label: 'INGRESS_LATENCY', val: '0.8ms Cloudflare Rail' },
    ],
    telemetry: {
      systemNode: 'AWS / GCP Hybrid Backbone',
      activeDataFlow: '14.8 Gbps Global Edge',
      memoryUsage: 'Auto-Scaling Pods: 180 Active',
      stack: ['Kubernetes', 'Terraform', 'Istio Mesh', 'AWS Graviton', 'ArgoCD'],
    },
  },
  {
    id: 'computer-vision',
    num: 'MOD // 04',
    title: 'Computer Vision & Spatial AI',
    category: 'ai',
    desc: 'Real-time multi-object tracking, spatial neural radiance fields (NeRF), and edge-based optical neural perception for robotics and industrial QA.',
    gridSpan: 'span-4',
    icon: <IconEye />,
    specs: ['FPS: 120@4K', 'Perception: Spatial 3D', 'Edge-Compiled'],
    terminalData: [
      { label: 'FRAME_PROCESSING', val: '120 FPS Real-Time' },
      { label: 'DETECTION_MAP', val: 'YOLOv10-TensorRT' },
    ],
    telemetry: {
      systemNode: 'Edge Inference Hub (Orin AGX)',
      activeDataFlow: '8.6 GB/s Raw Video Feed',
      memoryUsage: 'Inference Buffer: 2.1 GB',
      stack: ['OpenCV', 'TensorRT', 'CUDA 12', 'DeepStream', 'ONNX Runtime'],
    },
  },
  {
    id: 'cybernetic-security',
    num: 'MOD // 05',
    title: 'Cybernetic Security & Zero-Trust',
    category: 'enterprise',
    desc: 'AI threat vector mitigation, prompt-injection firewalls, cryptographic access controls, and post-quantum encryption standards.',
    gridSpan: 'span-4',
    icon: <IconShield />,
    specs: ['Protocol: Zero-Trust', 'Firewall: Semantic L7', 'Air-Gap: Ready'],
    terminalData: [
      { label: 'SEMANTIC_FIREWALL', val: 'Guardrails v3.1 [ENFORCED]' },
      { label: 'ANOMALY_INDEX', val: '0.002% (Baseline)' },
    ],
    telemetry: {
      systemNode: 'Zero-Trust Sentinel Mesh',
      activeDataFlow: 'Real-Time Telemetry Audit',
      memoryUsage: 'Zero Leakage Enclave',
      stack: ['Vault', 'mTLS', 'NeMo Guardrails', 'eBPF', 'Wazuh'],
    },
  },
  {
    id: 'enterprise-software',
    num: 'MOD // 06',
    title: 'Custom Enterprise Software Architectures',
    category: 'enterprise',
    desc: 'End-to-end full-stack platforms engineered with micro-frontends, event-driven streaming buses, high-concurrency databases, and bespoke enterprise integrations.',
    gridSpan: 'span-12',
    icon: <IconLayers />,
    specs: ['Architecture: Event-Driven Mesh', 'Throughput: 100k+ Req/s', 'API: GraphQL / gRPC'],
    terminalData: [
      { label: 'EVENT_BUS', val: 'Kafka Multi-Broker Streaming Cluster' },
      { label: 'DATABASE_TIER', val: 'PostgreSQL Distributed + ScyllaDB NoSQL' },
      { label: 'API_GATEWAY', val: 'Sub-millisecond gRPC & Rust Ingress Engine' },
    ],
    telemetry: {
      systemNode: 'Enterprise Core Platform Bus',
      activeDataFlow: '120k Events / Second',
      memoryUsage: 'Distributed Cache: 64 GB NVMe',
      stack: ['React', 'TypeScript', 'Node / Go / Rust', 'Kafka', 'PostgreSQL', 'Docker'],
    },
  },
]

const FILTER_TABS: { id: ServiceCategory; label: string }[] = [
  { id: 'all', label: 'All Engine Modules' },
  { id: 'ai', label: 'Core AI & Neural' },
  { id: 'cloud', label: 'Cloud & Infrastructure' },
  { id: 'enterprise', label: 'Enterprise Platforms' },
]

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all')
  const [selectedService, setSelectedService] = useState<ServiceModule>(SERVICES_DATA[0])

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory)

  return (
    <section id="services" className="services">
      {/* Background Atmosphere */}
      <div className="services__backdrop" aria-hidden="true">
        <div className="services__grid-mesh" />
        <div className="services__glow-1" />
        <div className="services__glow-2" />
      </div>

      <div className="services__inner container">
        {/* Section Header & Status Bar */}
        <div className="services__header">
          <div className="services__status-row">
            <span className="services__tag">[ SYSTEM CAPABILITIES // V4.0 ]</span>
            <span className="services__status-live">
              <span className="services__live-dot" />
              SYSTEM_ONLINE • 6 MODULES READY
            </span>
          </div>

          <div className="services__headline-row">
            <h2 className="services__headline">
              Engineering{' '}
              <span className="services__headline-gradient">Next-Gen Intelligence</span> &amp;
              Enterprise Architectures.
            </h2>

            {/* Mode Switcher Filter */}
            <div className="services__filters" role="tablist">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeCategory === tab.id}
                  className={`services__filter-btn ${activeCategory === tab.id ? 'services__filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(tab.id)}
                >
                  {activeCategory === tab.id && (
                    <motion.div
                      layoutId="services-filter-pill"
                      className="services__filter-bubble"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="services__filter-text">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Asymmetric Bento Matrix Grid */}
        <motion.div
          className="services__bento"
          layout
          transition={{ duration: 0.5, ease }}
        >
          <AnimatePresence>
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.6, ease, delay: idx * 0.08 }}
                className={`services__card services__card--${service.gridSpan} ${
                  selectedService.id === service.id ? 'services__card--active' : ''
                }`}
                onClick={() => setSelectedService(service)}
              >
                <div className="services__card-wireframe" aria-hidden="true" />

                {/* Card Top */}
                <div className="services__card-top">
                  <div className="services__icon-aura">
                    {service.icon}
                  </div>
                  <span className="services__card-id">{service.num}</span>
                </div>

                {/* Card Body */}
                <div className="services__card-body">
                  <h3 className="services__card-title">{service.title}</h3>
                  <p className="services__card-desc">{service.desc}</p>

                  {/* Micro-Terminal Widget */}
                  <div className="services__micro-terminal">
                    {service.terminalData.map((item, i) => (
                      <div key={i} className="services__terminal-row">
                        <span className="services__terminal-label">&gt; {item.label}:</span>
                        <span className="services__terminal-val">{item.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Spec Badges */}
                  <div className="services__specs">
                    {service.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="services__spec-tag">{spec}</span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="services__card-footer">
                  <span className="services__inspect-prompt">Click to Inspect Specs</span>
                  <span className="services__arrow-btn">
                    Explore Architecture <IconArrowRight />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Live Holographic Telemetry Inspector Panel */}
        <motion.div
          key={selectedService.id}
          className="services__telemetry-panel"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {/* Panel Header */}
          <div className="services__telemetry-header">
            <span className="services__telemetry-badge">
              LIVE TELEMETRY INSPECTOR // {selectedService.num}
            </span>
            <h4 className="services__telemetry-title">{selectedService.title}</h4>
            <span className="services__telemetry-status">
              Telemetry Status: Active Node Monitoring
            </span>
          </div>

          {/* Active Nodes Widget */}
          <div className="services__nodes-widget">
            <div className="services__node-item">
              <span>ACTIVE_NODE:</span>
              <span className="services__node-status">{selectedService.telemetry.systemNode}</span>
            </div>
            <div className="services__node-item">
              <span>DATA_BUS:</span>
              <span className="services__node-status">{selectedService.telemetry.activeDataFlow}</span>
            </div>
            <div className="services__node-item">
              <span>SYS_CAPACITY:</span>
              <span className="services__node-status">{selectedService.telemetry.memoryUsage}</span>
            </div>
          </div>

          {/* Tech Stack Badges & CTA */}
          <div className="services__telemetry-stack">
            <span className="services__stack-title">Engine Stack &amp; Libraries</span>
            <div className="services__stack-pills">
              {selectedService.telemetry.stack.map((tech, tIdx) => (
                <span key={tIdx} className="services__stack-pill">{tech}</span>
              ))}
            </div>
            <a href="#contact" className="services__deploy-btn">
              Deploy This Architecture <IconArrowRight />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
