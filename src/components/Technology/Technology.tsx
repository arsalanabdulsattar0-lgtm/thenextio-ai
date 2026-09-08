import { useState, useRef, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../common/Button'
import './Technology.css'

const ease = [0.22, 1, 0.36, 1] as const

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
    id: 'data-pipelines',
    num: '03',
    name: 'DISTRIBUTED DATA & ETL',
    tagline: 'Petabyte-Scale Ingestion & Sub-10ms Analytics',
    description:
      'High-throughput real-time stream processing architecture built on Apache Kafka and ClickHouse. Eliminates enterprise data silos and processes millions of continuous sensor and transaction events per second.',
    coreStack: ['Apache Kafka', 'ClickHouse', 'Rust', 'Apache Spark', 'Redis Cluster', 'DuckDB'],
    architectureLayers: [
      { layer: 'Event Ingestion Broker', tech: 'Distributed Apache Kafka Partitioning', latency: '2ms', status: 'Streaming' },
      { layer: 'Stream Processing Core', tech: 'Rust Micro-Batch Analytics Engine', latency: '4ms', status: 'Optimal' },
      { layer: 'Analytical Storage Matrix', tech: 'ClickHouse Columnar Vector Engine', latency: '8ms', status: 'Zero-Loss' },
    ],
    codeSnippet: {
      filename: 'stream_processor.rs',
      lang: 'rust',
      code: `#[tokio::main]
async fn main() -> Result<(), StreamError> {
    let consumer = KafkaConsumer::builder()
        .topic("enterprise.telemetry.v1")
        .max_batch_size(100_000)
        .build()?;

    let mut stream = consumer.into_stream();
    while let Some(event_batch) = stream.next().await {
        tokio::spawn(async move {
            ClickHouseSink::ingest_batch(event_batch).await;
        });
    }
    Ok(())
}`,
    },
    telemetry: {
      clusterStatus: 'Kafka Cluster Ready',
      activeWorkers: '10M+ Events/s',
      throughput: '0.000% Packet Loss',
    },
  },
  {
    id: 'cyber-security',
    num: '04',
    name: 'ZERO-TRUST CYBER SECURITY',
    tagline: 'Autonomous Threat Defense & Quantum-Safe Protocols',
    description:
      'Kernel-level eBPF monitoring, micro-segmented identity boundaries, and AES-256-GCM tokenized data protection. Neutralizes intrusions autonomously before malicious vectors reach production application code.',
    coreStack: ['eBPF', 'Rust', 'AES-256-GCM', 'HashiCorp Vault', 'OpenID Connect', 'gRPC'],
    architectureLayers: [
      { layer: 'Kernel Observation Layer', tech: 'eBPF High-Speed Packet Inspection', latency: '< 100μs', status: 'Armed' },
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

export default function Technology() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = TECH_DOMAINS[activeIdx]

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
    <section id="technology" className="tech-section">
      {/* Background ambient glows (Hero exact) */}
      <div className="tech-glow tech-glow-left" aria-hidden="true" />
      <div className="tech-glow tech-glow-right" aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Section Header (Blueritt 1:1 Standard) ── */}
        <div className="tech-header">
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span><strong>ENTERPRISE TECHNOLOGY STACK</strong></span>
          </motion.div>

          <div className="tech-header-grid">
            <motion.h2
              className="tech-main-title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              The Neural &amp; Cloud Backbone{' '}
              <span className="gradient-text">Behind Every Build</span>
            </motion.h2>

            <motion.p
              className="tech-main-sub"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.18 }}
            >
              We combine enterprise foundation models, distributed Kubernetes backbones,
              and low-latency streaming protocols to build resilient architectures that thrive under extreme scale.
            </motion.p>
          </div>
        </div>

        {/* ── 2-Column VIP 3D Technology Interactive Layout ── */}
        <div className="tech-grid-layout">

          {/* Left Column: Interactive Domain Pillars */}
          <div className="tech-left-col">
            <div className="tech-pillars-list">
              {TECH_DOMAINS.map((domain, idx) => {
                const isActive = idx === activeIdx
                return (
                  <motion.div
                    key={domain.id}
                    className={`tech-pillar-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveIdx(idx)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: idx * 0.08 }}
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
                  </motion.div>
                )
              })}
            </div>

            {/* Quick Actions using common Button component */}
            <div className="tech-actions-box">
              <Button href="#contact" variant="primary" size="md">
                Deploy Architecture ↗
              </Button>
              <Button href="#projects" variant="ghost" fillColor="orange" size="md" icon={false}>
                View Production Case Studies
              </Button>
            </div>
          </div>

          {/* Right Column: 3D Holographic Tech Stage (Mouse Tilt) */}
          <div className="tech-right-col">
            <div className="tech-3d-stage">
              <motion.div
                ref={stageRef}
                className="tech-3d-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: tilt.active ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
                }}
              >
                {/* Holographic Mouse Glare Layer */}
                <div
                  className="tech-3d-glare"
                  style={{
                    background: `radial-gradient(circle 500px at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.09) 0%, transparent 80%)`,
                    opacity: tilt.active ? 1 : 0,
                  }}
                  aria-hidden="true"
                />

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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    {/* Domain Narrative */}
                    <div className="tech-narrative-wrap">
                      <span className="tech-badge-category">{current.name}</span>
                      <h4 className="tech-spec-heading">{current.tagline}</h4>
                      <p className="tech-spec-desc">{current.description}</p>
                    </div>

                    {/* Live Architecture Layers Diagram */}
                    <div className="tech-layers-diagram">
                      <span className="tech-diagram-title">LIVE ARCHITECTURE SCHEMATIC</span>
                      <div className="tech-layers-list">
                        {current.architectureLayers.map((layer, i) => (
                          <div key={i} className="tech-layer-row">
                            <div className="tech-layer-main">
                              <span className="tech-layer-pill">L0{i + 1}</span>
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

                    {/* Interactive Code Snippet Window */}
                    <div className="tech-code-box">
                      <div className="tech-code-bar">
                        <span className="tech-code-lang">{current.codeSnippet.lang.toUpperCase()}</span>
                        <span className="tech-code-label">Production Implementation</span>
                      </div>
                      <pre className="tech-code-pre">
                        <code>{current.codeSnippet.code}</code>
                      </pre>
                    </div>

                    {/* Core Tech Stack Badges */}
                    <div className="tech-stack-wrap">
                      <span className="tech-stack-label">VERIFIED ENTERPRISE FRAMEWORKS:</span>
                      <div className="tech-stack-badges">
                        {current.coreStack.map((tech, i) => (
                          <span key={i} className="tech-badge-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Floating HUD Telemetry Bar */}
                    <div className="tech-telemetry-bar">
                      <div className="tech-telem-item">
                        <span className="telem-label">THROUGHPUT</span>
                        <span className="telem-val">{current.telemetry.throughput}</span>
                      </div>
                      <div className="tech-telem-sep" />
                      <div className="tech-telem-item">
                        <span className="telem-label">PARALLEL WORKERS</span>
                        <span className="telem-val">{current.telemetry.activeWorkers}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
