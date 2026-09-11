import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion'
import Button from '../common/Button'
import './Showcase.css'

const ease = [0.22, 1, 0.36, 1] as const

/* ── Words for Headline Scroll Reveal ── */
const HEADLINE_WORDS = [
  { word: 'Architected', accent: false },
  { word: 'for', accent: false },
  { word: 'Scale,', accent: false },
  { word: 'Engineered', accent: true },
  { word: 'for', accent: true },
  { word: 'Impact', accent: true },
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
      className={`tech-reveal-word ${isAccent ? 'accent-word' : ''}`}
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  )
}

interface TechDomain {
  id: string
  num: string
  name: string
  tagline: string
  description: string
  coreStack: string[]
  architectureLayers: {
    layer: string
    tech: string
    latency: string
    status: string
  }[]
  codeSnippet: {
    filename: string
    lang: string
    code: string
  }
  telemetry: {
    clusterStatus: string
    activeWorkers: string
    throughput: string
  }
}

const TECH_DOMAINS: TechDomain[] = [
  {
    id: 'neural-ai',
    num: '01',
    name: 'NEURAL AI & INFERENCE MESH',
    tagline: 'Distributed Model Serving & Autonomous Agents',
    description:
      'We engineer private, self-hosted machine learning clusters utilizing quantized LLMs, parameter-efficient LoRA adapters, and multi-agent coordination frameworks that run with sub-12ms execution speed.',
    coreStack: ['PyTorch', 'TensorRT-LLM', 'Ray Core', 'Triton Server', 'vLLM', 'Qdrant Vector DB'],
    architectureLayers: [
      { layer: 'Agent Coordination Layer', tech: 'Multi-Agent Consensus Protocol', latency: '4ms', status: 'Optimal' },
      { layer: 'Semantic Retrieval & RAG', tech: 'Hybrid Dense/Sparse Vector Search', latency: '6ms', status: 'Active' },
      { layer: 'Quantized Inference Engine', tech: 'FP8 / INT4 TensorRT Optimization', latency: '12ms', status: 'Accelerated' },
    ],
    codeSnippet: {
      filename: 'neural_cluster_runtime.py',
      lang: 'python',
      code: `@ray.remote(num_gpus=1)
class AutonomousInferenceMesh:
    def __init__(self, model_id: str = "thenextio-llm-v5"):
        self.engine = vLLM.AsyncEngine(
            model=model_id,
            tensor_parallel_size=4,
            gpu_memory_utilization=0.92
        )
        self.vector_router = QdrantMeshRouter()

    async def infer_with_rag(self, payload: TaskPayload) -> Result:
        context = await self.vector_router.query_top_k(payload.embedding)
        return await self.engine.generate(payload.prompt, context=context)`,
    },
    telemetry: {
      clusterStatus: '8x H100 SXM5 Online',
      activeWorkers: '32 Parallel Threads',
      throughput: '1,420 Tokens/s',
    },
  },
  {
    id: 'cloud-infra',
    num: '02',
    name: 'RESILIENT CLOUD & DEVOPS',
    tagline: 'Declarative Multi-Cloud Kubernetes Orchestration',
    description:
      'Mission-critical multi-region infrastructure spanning AWS, GCP, and Azure with declarative GitOps delivery pipelines, automated cross-cloud failover, and self-healing worker nodes.',
    coreStack: ['Kubernetes', 'Terraform', 'Go', 'Docker', 'ArgoCD', 'Prometheus', 'Istio Mesh'],
    architectureLayers: [
      { layer: 'Service Mesh & Routing', tech: 'Istio Envoy Zero-Trust Gateway', latency: '< 1ms', status: 'Healthy' },
      { layer: 'Container Orchestration', tech: 'Kubernetes Multi-Region Cluster', latency: '2ms', status: 'Synchronized' },
      { layer: 'Infrastructure-as-Code', tech: 'Terraform & Declarative GitOps', latency: 'Live', status: 'Enforced' },
    ],
    codeSnippet: {
      filename: 'multi_cloud_mesh.tf',
      lang: 'hcl',
      code: `module "multi_region_cluster" {
  source           = "git::https://github.com/thenextio/k8s-mesh.git"
  regions          = ["us-east-1", "eu-central-1", "ap-southeast-1"]
  min_nodes        = 48
  max_nodes        = 256
  failover_policy  = "autonomous_sub_200ms"
  zero_trust_mesh  = true
  monitoring_sla   = "99.999%"
}`,
    },
    telemetry: {
      clusterStatus: 'Multi-Region Synced',
      activeWorkers: '248 Nodes Online',
      throughput: '99.999% SLA Uptime',
    },
  },
  {
    id: 'data-eng',
    num: '03',
    name: 'AUTONOMOUS DATA PIPELINES',
    tagline: 'Petabyte-Scale Ingestion & Sub-10ms Semantic Search',
    description:
      'High-throughput distributed stream ingestion architectures built with Kafka, Apache Spark, and real-time columnar stores designed to eliminate data bottlenecks at scale.',
    coreStack: ['Apache Kafka', 'ClickHouse', 'Apache Spark', 'Rust', 'DuckDB', 'dbt Core'],
    architectureLayers: [
      { layer: 'Event Streaming Ingestion', tech: 'Distributed Apache Kafka Partitioning', latency: '3ms', status: 'Operating' },
      { layer: 'Analytical Vector Engine', tech: 'ClickHouse Columnar Storage + HNSW', latency: '7ms', status: 'Optimal' },
      { layer: 'Continuous Transformation', tech: 'Event-Driven Spark Micro-Batching', latency: 'Continuous', status: 'Real-Time' },
    ],
    codeSnippet: {
      filename: 'stream_processor.rs',
      lang: 'rust',
      code: `pub async fn process_telemetry_stream(
    mut stream: EventConsumer,
    db_pool: Arc<ClickHousePool>,
) -> Result<(), PipelineError> {
    while let Some(batch) = stream.next_batch(10_000).await? {
        let transformed = vectorize_payloads(batch)?;
        db_pool.insert_partitions("telemetry_vectors", transformed).await?;
    }
    Ok(())
}`,
    },
    telemetry: {
      clusterStatus: '10M+ Events/s Stream',
      activeWorkers: 'Zero Data Loss',
      throughput: '1.2 TB / Hour',
    },
  },
  {
    id: 'zero-trust-sec',
    num: '04',
    name: 'COGNITIVE CYBER DEFENSE',
    tagline: 'Heuristic Threat Detection & Quantum-Safe Encryption',
    description:
      'Autonomous security governance using machine learning heuristics to isolate zero-day network anomalies in milliseconds, enforced with end-to-end tokenized authorization.',
    coreStack: ['eBPF', 'Rust', 'AES-256-GCM', 'OpenID Connect', 'Linux Kernel Probes', 'gRPC'],
    architectureLayers: [
      { layer: 'Kernel Probe Monitoring', tech: 'eBPF High-Frequency Anomaly Traps', latency: '< 50µs', status: 'Active Shield' },
      { layer: 'Identity & Access Token', tech: 'Ephemeral Mutual-TLS & JWT Signing', latency: '1ms', status: 'Verified' },
      { layer: 'Encrypted Persistence', tech: 'AES-256-GCM Envelope Encryption', latency: 'Hardware', status: 'Secured' },
    ],
    codeSnippet: {
      filename: 'kernel_sentinel.c',
      lang: 'c',
      code: `SEC("tracepoint/syscalls/sys_enter_connect")
int detect_anomalous_socket(struct trace_event_raw_sys_enter *ctx) {
    u32 pid = bpf_get_current_pid_tgid() >> 32;
    struct connection_spec spec = {};
    
    if (is_unauthorized_egress(&spec)) {
        bpf_send_security_alert(SECURITY_SEV_CRITICAL, pid);
        return -EPERM; // Autonomous isolation
    }
    return 0;
}`,
    },
    telemetry: {
      clusterStatus: 'eBPF Sentinel Active',
      activeWorkers: 'Zero-Day Shield: On',
      throughput: 'SOC2 / HIPAA Compliant',
    },
  },
]

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [domainProgress, setDomainProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 991)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── 1. Entrance Scroll Progress (Identical to Our Products section) ──
  // Starts the moment section enters 75% of viewport and completes as it reaches top (start 0%)
  const { scrollYProgress: entranceScroll } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'start 0%'],
  })

  const smoothProgress = useSpring(entranceScroll, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  // Tag & Headline Word-by-Word Scroll Reveal (Products 1:1)
  const tagOpacity = useTransform(smoothProgress, [0.01, 0.08], [0.12, 1])
  const tagY = useTransform(smoothProgress, [0.01, 0.08], [8, 0])

  // Subtitle Scroll Reveal (Products 1:1)
  const subOpacity = useTransform(smoothProgress, [0.16, 0.36], [0.15, 1])
  const subY = useTransform(smoothProgress, [0.16, 0.36], [16, 0])

  // Left Column & Right Card Convergence (Products 1:1 screen docking)
  const leftColX = useTransform(smoothProgress, [0.28, 0.78], [-180, 0])
  const leftColOpacity = useTransform(smoothProgress, [0.28, 0.58], [0.1, 1])
  const leftColScale = useTransform(smoothProgress, [0.28, 0.78], [0.88, 1])

  const rightColX = useTransform(smoothProgress, [0.28, 0.78], [180, 0])
  const rightColOpacity = useTransform(smoothProgress, [0.28, 0.58], [0.1, 1])
  const rightColScale = useTransform(smoothProgress, [0.28, 0.78], [0.88, 1])

  // ── 2. Sticky Tab Scrubbing with Scroll (Across the 380vh track) ──
  const { scrollYProgress: stickyScroll } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothSticky = useSpring(stickyScroll, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  })

  const stepSize = 1.0 / TECH_DOMAINS.length

  useMotionValueEvent(smoothSticky, 'change', (latest) => {
    if (!isDesktop) return

    if (latest <= 0) {
      setActiveIdx(0)
      setDomainProgress(0)
      return
    }

    const clamped = Math.min(0.9999, Math.max(0, latest))
    const index = Math.min(
      TECH_DOMAINS.length - 1,
      Math.floor(clamped / stepSize)
    )
    const domainStart = index * stepSize
    const local = Math.max(0, Math.min(1, (clamped - domainStart) / stepSize))

    setActiveIdx(index)
    setDomainProgress(local)
  })

  // Direct tab click smoothly scrolls to target position
  const handleTabClick = (index: number) => {
    setActiveIdx(index)
    setDomainProgress(0.5)
    if (isDesktop && sectionRef.current) {
      const trackTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const trackHeight = sectionRef.current.offsetHeight - window.innerHeight
      const targetScroll = trackTop + (index * stepSize + 0.5 * stepSize) * trackHeight
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }

  const current = TECH_DOMAINS[activeIdx]

  return (
    <section id="showcase" ref={sectionRef} className="tech-section">
      {/* Sticky Full-Viewport Stage */}
      <div className="tech-sticky-stage">
        {/* Background ambient glows (Hero exact) */}
        <div className="tech-glow tech-glow-left" aria-hidden="true" />
        <div className="tech-glow tech-glow-right" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* ── Section Header (Scroll Reveal) ── */}
          <div className="tech-header">
            <motion.div
              className="section-tag"
              style={isDesktop ? { opacity: tagOpacity, y: tagY } : {}}
            >
              <span><strong>OUR SHOWCASE</strong></span>
            </motion.div>

            <div className="tech-header-grid">
              <h2 className="tech-main-title">
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

              <motion.p
                className="tech-main-sub"
                style={isDesktop ? { opacity: subOpacity, y: subY } : {}}
              >
                Explore our core technical architectures and production systems, engineered with
                autonomous AI reasoning, resilient multi-cloud backbones, and zero-latency data pipelines.
              </motion.p>
            </div>
          </div>

          {/* ── 2-Column VIP 3D Technology Interactive Layout (Scroll Convergence) ── */}
          <div className="tech-grid-layout">

            {/* Left Column: Interactive Domain Pillars (Converges from Left) */}
            <motion.div 
              className="tech-left-col"
              style={
                isDesktop
                  ? {
                      x: leftColX,
                      scale: leftColScale,
                      opacity: leftColOpacity,
                    }
                  : {}
              }
            >
              <div className="tech-pillars-list">
                {TECH_DOMAINS.map((domain, idx) => {
                  const isActive = idx === activeIdx
                  const fillWidth = isActive ? Math.round(domainProgress * 100) : (idx < activeIdx ? 100 : 0)

                  return (
                    <div
                      key={domain.id}
                      className={`tech-pillar-card ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleTabClick(idx)}
                    >
                      <div className="tech-pillar-top">
                        <span className="tech-pillar-num">{domain.num}</span>
                        <h3 className="tech-pillar-name">{domain.name}</h3>
                        <span className="tech-pillar-arrow">&rarr;</span>
                      </div>
                      <p className="tech-pillar-tagline">{domain.tagline}</p>

                      {isActive && (
                        <motion.div
                          className="tech-pillar-active-bar"
                          layoutId="techPillarActive"
                          transition={{ duration: 0.3, ease }}
                        />
                      )}

                      {/* Liquid Live Scroll Progress Underline */}
                      <div className="tech-pillar-progress-track">
                        <div
                          className="tech-pillar-progress-fill"
                          style={{ width: `${fillWidth}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

            {/* Quick Action using common Button component */}
            <div className="tech-actions-box">
              <Button href="#contact" variant="ghost" fillColor="orange" size="md">
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Tech Showcase Card (No Tilt, Flat & Stable) */}
          <motion.div 
            className="tech-right-col"
            style={
              isDesktop
                ? {
                    x: rightColX,
                    scale: rightColScale,
                    opacity: rightColOpacity,
                  }
                : {}
            }
          >
            <div className="tech-card">
              {/* Cyber Laser Scan Line across top edge */}
              <div className="tech-card-laser-scan" aria-hidden="true" />

              {/* Top Terminal Status Header */}
              <div className="tech-card-header">
                <div className="tech-terminal-dots">
                  <span className="tdot tdot-red" />
                  <span className="tdot tdot-yellow" />
                  <span className="tdot tdot-green" />
                  <span className="tech-terminal-title">{current.codeSnippet.filename}</span>
                </div>
                <div className="tech-telemetry-status">
                  <span className="tech-status-dot" />
                  <span>{current.telemetry.clusterStatus}</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  className="tech-card-content"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease }}
                >
                  {/* Domain Narrative */}
                  <div className="tech-narrative-wrap">
                    <span className="tech-badge-category">{current.name}</span>
                    <h4 className="tech-spec-heading">{current.tagline}</h4>
                    <p className="tech-spec-desc">{current.description}</p>
                  </div>

                  {/* 2-Column Split: Architecture Layers on Left, Code on Right */}
                  <div className="tech-card-split">
                    {/* Left: Architecture Layers */}
                    <div className="tech-layers-diagram">
                      <span className="tech-diagram-title">SYSTEM ARCHITECTURE LAYERS</span>
                      <div className="tech-layers-list">
                        {current.architectureLayers.map((layer, i) => (
                          <div key={i} className="tech-layer-row">
                            <div className="tech-layer-main">
                              <span className="tech-layer-pill">L{i + 1}</span>
                              <div>
                                <span className="tech-layer-name">{layer.layer}</span>
                                <span className="tech-layer-tech">{layer.tech}</span>
                              </div>
                            </div>
                            <div className="tech-layer-meta">
                              <span className="tech-layer-latency">{layer.latency}</span>
                              <span className="tech-layer-status">{layer.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Proprietary Source Code */}
                    <div className="tech-code-box">
                      <div className="tech-code-bar">
                        <span className="tech-code-lang">{current.codeSnippet.lang.toUpperCase()}</span>
                        <span className="tech-code-label">PROPRIETARY SOURCE</span>
                      </div>
                      <pre className="tech-code-pre">
                        <code>{current.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Bottom Strip: Verified Runtimes + Telemetry HUD */}
                  <div className="tech-card-bottom-row">
                    <div className="tech-stack-wrap">
                      <span className="tech-stack-label">PROD-VERIFIED RUNTIMES:</span>
                      <div className="tech-stack-badges">
                        {current.coreStack.map((tech, i) => (
                          <span key={i} className="tech-badge-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="tech-telemetry-bar">
                      <div className="tech-telem-item">
                        <span className="telem-label">CLUSTER</span>
                        <span className="telem-val">{current.telemetry.clusterStatus}</span>
                      </div>
                      <div className="tech-telem-sep" />
                      <div className="tech-telem-item">
                        <span className="telem-label">WORKERS</span>
                        <span className="telem-val">{current.telemetry.activeWorkers}</span>
                      </div>
                      <div className="tech-telem-sep" />
                      <div className="tech-telem-item">
                        <span className="telem-label">THROUGHPUT</span>
                        <span className="telem-val">{current.telemetry.throughput}</span>
                      </div>
                    </div>
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
