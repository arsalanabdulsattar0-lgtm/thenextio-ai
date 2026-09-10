import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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



export default function PlatformSection() {
  const [activeTab, setActiveTab] = useState(0)
  const current = PLATFORM_TABS[activeTab]

  return (
    <section id="products" className="platform-section">
      {/* Background ambient glows (Hero exact) */}
      <div className="platform-glow platform-glow-left" aria-hidden="true" />
      <div className="platform-glow platform-glow-right" aria-hidden="true" />

      {/* ── Section Tag (Blueritt 1:1 Standard) ── */}
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '36px' }}>
        <motion.div
          className="section-tag"
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <span><strong>OUR PRODUCTS</strong></span>
        </motion.div>

        <motion.h2
          className="platform-section-title"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          Enterprise AI &amp; <span className="gradient-text">Cloud Product Platform</span>
        </motion.h2>
      </div>

      {/* ── TOP HORIZONTAL TABS (Blueritt 1:1 Standard) ── */}
      <div className="platform-tabs-wrapper">
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
      </div>

      {/* ── MAIN PLATFORM CARD (Blueritt 1:1 Standard) ── */}
      <div className="platform-card">
        {/* IMAGE PREVIEW FRAME WITH 2 IMAGES (User requested 2 images in each tab) */}
        <div className="container">
          <div className="platform-image-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="platform-dual-frame"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease }}
              >
                <div className="platform-img-box">
                  <img
                    src="/hero/slide-1.jpg"
                    alt={`${current.heading} - View 1`}
                    className="platform-main-image"
                    loading="lazy"
                  />
                  <div className="platform-image-glare" aria-hidden="true" />
                </div>
                <div className="platform-img-box">
                  <img
                    src="/hero/slide-2.jpg"
                    alt={`${current.heading} - View 2`}
                    className="platform-main-image"
                    loading="lazy"
                  />
                  <div className="platform-image-glare" aria-hidden="true" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* BIG TYPOGRAPHY (TheNextIO AI & Cloud Platform - Centered) */}
          <div className="platform-big-text" aria-hidden="true">
            <h2>
              <div className="platform-big-text-top-row">
                <span className="left-text">ENTERPRISE</span>
                <span className="right-text">AI CLOUD</span>
              </div>
              <span className="bottom-text">PLATFORM</span>
            </h2>
          </div>

          {/* ACTIVE CONTENT DETAILS */}
          <div className="platform-content">
            <div className="platform-content-grid">
              {/* Left Column: Heading & Description */}
              <div className="platform-content-main">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <h3 className="platform-heading">{current.heading}</h3>
                    <p className="platform-description">{current.description}</p>
                    <p className="platform-small-text">{current.smallText}</p>

                    <div className="platform-actions">
                      <a href="#contact" className="platform-btn-primary">
                        Deploy Architecture ↗
                      </a>
                      <Button href="#who-we-serve" size="md" fillColor="orange" icon={false}>
                        View System Specs
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Key Live Metrics */}
              <div className="platform-metrics-col">
                <div className="platform-metrics-box">
                  <span className="metrics-box-tag">PLATFORM TELEMETRY</span>
                  {current.metrics.map((m, i) => (
                    <div key={i} className="platform-metric-row">
                      <span className="metric-row-lbl">{m.label}</span>
                      <span className="metric-row-val">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}
