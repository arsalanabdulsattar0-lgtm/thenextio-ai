import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import Button from '../common/Button'
import './ServicesSection.css'

const ease = [0.22, 1, 0.36, 1] as const

interface ServiceTabItem {
  id: string
  tabLabel: string
  headline: string
  desc: string
  capabilities: string[]
  ctaText: string
  ctaHref: string
  mockup: {
    userQuery: string
    tokenStatus: string
    engineName: string
    engineSub: string
    codeSnippet: string
    checks: string[]
  }
}

const SERVICES_SHOWCASE_DATA: ServiceTabItem[] = [
  {
    id: 'ai-solutions',
    tabLabel: 'AI Solutions',
    headline: 'Autonomous AI agents, generative models & custom LLM systems',
    desc: 'Deploy self-directing cognitive agents, domain-adapted models, and deterministic reasoning pipelines built to automate high-complexity enterprise operations.',
    capabilities: [
      'Multi-agent swarm coordination',
      'Custom LLM & LoRA fine-tuning',
      'Context-aware Graph-RAG memory',
      'Deterministic sandbox execution',
      'Real-time tool & API dispatch',
      'Zero-trust AI safety firewalls',
    ],
    ctaText: 'Explore AI Solutions',
    ctaHref: '#contact',
    mockup: {
      userQuery: 'Can you deploy autonomous agents to handle enterprise operations?',
      tokenStatus: 'AGENT_CORE // SPAWNED',
      engineName: 'THENEXTIO COGNITIVE ENGINE',
      engineSub: 'Spawning verified autonomous worker for operational stack orchestration.',
      codeSnippet: `const agent = await nextio.ai.spawnAgent({\n  role: 'autonomous-worker',\n  protocol: 'MCP-v2',\n  sandbox: 'deterministic',\n  governance: 'zero-trust'\n});`,
      checks: ['Agent credentials verified', 'Neural memory bus connected'],
    },
  },
  {
    id: 'custom-software',
    tabLabel: 'Custom Software',
    headline: 'High-concurrency enterprise software & distributed architectures',
    desc: 'Bespoke business platforms, high-throughput microservices, and mission-critical enterprise systems engineered around your organization’s exact specifications.',
    capabilities: [
      'Event-driven microservice mesh',
      'Sub-millisecond gRPC & REST APIs',
      'Distributed SQL & NoSQL clusters',
      'High-throughput message brokers',
      'Granular multi-tenant RBAC',
      'Legacy enterprise integrations',
    ],
    ctaText: 'Explore Custom Software',
    ctaHref: '#contact',
    mockup: {
      userQuery: 'Can you architect an enterprise platform handling 100k+ req/sec?',
      tokenStatus: 'SYSTEM_BUS // OPTIMAL',
      engineName: 'THENEXTIO CORE PLATFORM',
      engineSub: 'Allocating distributed microservice mesh with Kafka event bus.',
      codeSnippet: `const platform = await nextio.software.deploy({\n  cluster: 'distributed-mesh',\n  throughput: '100k-req/sec',\n  concurrency: 'high-scale',\n  tenancy: 'isolated'\n});`,
      checks: ['Event bus clusters healthy', 'Sub-millisecond latency verified'],
    },
  },
  {
    id: 'web-apps',
    tabLabel: 'Web Applications',
    headline: 'Ultra-fast, scalable digital platforms and cloud SaaS products',
    desc: 'Production-grade web apps built with modern reactive architectures, edge rendering, zero-downtime CI/CD deployment pipelines, and global multi-region cloud infrastructures.',
    capabilities: [
      'Full-stack Next.js & React systems',
      'Multi-tenant cloud SaaS engines',
      'Global edge caching & CDN delivery',
      'Sub-second time-to-interactive',
      'Real-time WebSocket streaming',
      'Automated containerized pipelines',
    ],
    ctaText: 'Explore Web Applications',
    ctaHref: '#contact',
    mockup: {
      userQuery: 'Can you deploy a multi-region SaaS app with latency under 20ms?',
      tokenStatus: 'EDGE_ROUTER // ACTIVE',
      engineName: 'THENEXTIO CLOUD EDGE',
      engineSub: 'Routing global web traffic via edge compute mesh.',
      codeSnippet: `const app = await nextio.web.deployApp({\n  framework: 'nextjs-enterprise',\n  edgeRuntime: 'global-mesh',\n  multiTenant: true,\n  encryption: 'end-to-end'\n});`,
      checks: ['Edge replication active (12ms)', 'Zero cold-start verified'],
    },
  },
  {
    id: 'mobile-apps',
    tabLabel: 'Mobile Applications',
    headline: 'High-performance native & cross-platform mobile experiences',
    desc: 'Fluid, pixel-perfect iOS and Android applications built with offline-first synchronization, hardware biometric security, and native device feature integration.',
    capabilities: [
      'Native iOS (Swift) & Android (Kotlin)',
      'Cross-platform React Native & Flutter',
      'Offline-first database synchronization',
      'Biometric zero-trust authentication',
      'Real-time push notification pipelines',
      'Store deployment & CI/CD automation',
    ],
    ctaText: 'Explore Mobile Apps',
    ctaHref: '#contact',
    mockup: {
      userQuery: 'Can you build an offline-first mobile app with instant biometric sync?',
      tokenStatus: 'MOBILE_SDK // CONNECTED',
      engineName: 'THENEXTIO MOBILE RUNTIME',
      engineSub: 'Packaging native binaries with local encrypted datastore.',
      codeSnippet: `const mobileApp = await nextio.mobile.build({\n  platforms: ['ios', 'android'],\n  offlineSync: 'local-first',\n  security: 'biometric-enclave',\n  state: 'reactive'\n});`,
      checks: ['Local encryption enclave ready', 'Biometric handshake verified'],
    },
  },
  {
    id: 'automation',
    tabLabel: 'Workflow Automation',
    headline: 'Intelligent workflow orchestration & event-driven pipelines',
    desc: 'Eliminate manual bottlenecks by connecting disparate SaaS platforms, databases, and third-party APIs into self-healing, deterministic automated workflows.',
    capabilities: [
      'Event-driven webhooks & queues',
      'Autonomous document parsing (OCR/AI)',
      'Multi-SaaS API data orchestration',
      'Automated compliance & audit trails',
      'Self-healing error retry strategies',
      'Zero-data-loss streaming pipelines',
    ],
    ctaText: 'Explore Automation',
    ctaHref: '#contact',
    mockup: {
      userQuery: 'Can we automate cross-department invoices and ERP synchronization?',
      tokenStatus: 'PIPELINE // RUNNING',
      engineName: 'THENEXTIO ORCHESTRATOR',
      engineSub: 'Executing event-driven workflow automation across connected APIs.',
      codeSnippet: `const pipeline = await nextio.automation.create({\n  trigger: 'event.invoice.received',\n  parser: 'ai-doc-extract',\n  syncTo: ['erp', 'quickbooks', 'slack'],\n  retryPolicy: 'exponential-backoff'\n});`,
      checks: ['Multi-platform auth verified', '1,240 events processed/min'],
    },
  },
  {
    id: 'ai-erp-bi',
    tabLabel: 'AI-Powered ERP & BI',
    headline: 'Autonomous enterprise ERP suites & predictive business intelligence',
    desc: 'Unify finance, supply chain, inventory, HR, and telemetry into an intelligent ERP dashboard backed by real-time predictive analytics and natural language query systems.',
    capabilities: [
      'Autonomous supply chain forecasting',
      'Real-time executive telemetry & BI',
      'Natural-language SQL query interfaces',
      'Unified financial & inventory ledger',
      'Multi-currency & compliance engines',
      'Granular automated audit tracking',
    ],
    ctaText: 'Explore AI ERP & BI',
    ctaHref: '#contact',
    mockup: {
      userQuery: 'Show projected quarterly revenue and flag supply chain anomalies.',
      tokenStatus: 'BI_ENGINE // COMPUTING',
      engineName: 'THENEXTIO ENTERPRISE ERP',
      engineSub: 'Running real-time predictive analytics on enterprise operational telemetry.',
      codeSnippet: `const insight = await nextio.erp.queryIntelligence({\n  ledger: 'global-finance',\n  predictivePeriod: '90-days',\n  anomalyDetection: 'real-time',\n  confidence: 0.99\n});`,
      checks: ['Telemetry stream synchronized', 'Anomaly firewalls active'],
    },
  },
]

/* ── Pure Scroll-Driven Live Terminal Build Component ── */
function LiveTerminalMockup({ mockup, progress = 1 }: { mockup: ServiceTabItem['mockup']; progress?: number }) {
  // Query Bubble pops in during early scroll (progress 0.04 -> 0.12)
  const isBubbleVisible = progress >= 0.04
  const bubbleY = progress < 0.12 ? Math.max(0, 8 * (1 - progress / 0.12)) : 0

  // Terminal card appears right after bubble
  const isCardVisible = progress >= 0.08

  // Code scrubbing between progress 0.12 and 0.70
  const typingStart = 0.12
  const typingEnd = 0.70
  const codeProgress = Math.max(0, Math.min(1, (progress - typingStart) / (typingEnd - typingStart)))
  const totalChars = mockup.codeSnippet.length
  const charCount = Math.floor(codeProgress * totalChars)
  const displayedCode = mockup.codeSnippet.slice(0, charCount)
  const isTyping = progress >= typingStart && progress < typingEnd

  // Sequential Checkmarks lock in with scroll
  const showCheck1 = progress >= 0.70
  const showCheck2 = progress >= 0.84

  return (
    <div className="services-mockup-subcol">
      {/* 1. Floating User Query Bubble */}
      <div 
        className={`services-query-wrap ${isBubbleVisible ? 'is-visible' : ''}`}
        style={{ transform: `translateY(${bubbleY}px)` }}
      >
        <div className="services-query-bubble">
          <span className="services-query-text">{mockup.userQuery}</span>
        </div>
      </div>

      {/* 2. Main Terminal Card */}
      <div className={`services-terminal-wrap ${isCardVisible ? 'is-visible' : ''}`}>
        <div className="services-terminal-card">
          <div className="services-terminal-header">
            <span className="services-terminal-status-text">
              <span className="terminal-live-beacon" />
              {mockup.tokenStatus}
            </span>
          </div>

          <div className="services-terminal-body">
            <div className="services-engine-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2" className="services-shield-icon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="services-engine-name">{mockup.engineName}</span>
            </div>
            
            <p className="services-engine-subtext">
              {mockup.engineSub}
            </p>

            {/* Code Snippet Block with Live Scroll Typing */}
            <div className="services-code-block">
              <pre>
                <code>
                  {displayedCode}
                  {isTyping && <span className="typing-cursor">_</span>}
                </code>
              </pre>
            </div>

            {/* Bottom Verification Checkmarks */}
            <div className="services-checks-list">
              {mockup.checks.map((check, idx) => {
                const isChecked = idx === 0 ? showCheck1 : showCheck2
                return (
                  <div key={idx} className={`services-check-item ${isChecked ? 'is-checked' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="services-check-svg">
                      <circle cx="12" cy="12" r="10" stroke={isChecked ? "rgba(0, 194, 255, 0.7)" : "rgba(255, 255, 255, 0.2)"} strokeWidth="1.6" />
                      {isChecked && (
                        <polyline points="8 12 11 15 16 9" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                    </svg>
                    <span className="services-check-label">{check}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const trackRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [tabProgress, setTabProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 991)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Scroll Progress across 480vh:
  // Starts when section is visible in viewport
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  })

  // ── 1. Convergence Entrance (0.00 -> 0.08): Left & Right panels dock into place like About section ──
  const leftColX = useTransform(smoothProgress, [0.00, 0.08], [-110, 0])
  const leftColOpacity = useTransform(smoothProgress, [0.00, 0.06], [0, 1])

  const rightCardX = useTransform(smoothProgress, [0.00, 0.08], [130, 0])
  const rightCardScale = useTransform(smoothProgress, [0.00, 0.08], [0.93, 1])
  const rightCardOpacity = useTransform(smoothProgress, [0.00, 0.06], [0, 1])

  // ── 2. Showcase Scrubbing (0.08 -> 1.00) ──
  const SHOWCASE_START = 0.08
  const stepSize = (1.00 - SHOWCASE_START) / SERVICES_SHOWCASE_DATA.length

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (!isDesktop) return

    if (latest < SHOWCASE_START) {
      setActiveIndex(0)
      setTabProgress(0)
      return
    }

    const progressInShowcase = Math.min(0.9999, Math.max(0, latest - SHOWCASE_START))
    const index = Math.min(
      SERVICES_SHOWCASE_DATA.length - 1,
      Math.floor(progressInShowcase / stepSize)
    )
    const tabStart = SHOWCASE_START + index * stepSize
    const local = Math.max(0, Math.min(1, (latest - tabStart) / stepSize))

    setActiveIndex(index)
    setTabProgress(local)
  })

  // Direct tab click smoothly scrolls to target position
  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    setTabProgress(0.5)
    if (isDesktop && trackRef.current) {
      const trackTop = trackRef.current.getBoundingClientRect().top + window.scrollY
      const trackHeight = trackRef.current.offsetHeight - window.innerHeight
      const targetScroll = trackTop + (SHOWCASE_START + index * stepSize + 0.5 * stepSize) * trackHeight
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }

  const currentService = SERVICES_SHOWCASE_DATA[activeIndex]

  return (
    <section id="services" ref={trackRef} className="services-scroll-track">
      {/* Sticky Full-Viewport Stage */}
      <div className="services-sticky-stage">
        {/* Soft Ambient Backdrop Lighting matching reference */}
        <div className="services-glow services-glow-left" aria-hidden="true" />
        <div className="services-glow services-glow-right" aria-hidden="true" />

        <div className="services-stage-container">
          <div className="services-split-layout">
            
            {/* ── LEFT COLUMN: Headline & Vertical Tabs List (Converges from Left) ── */}
            <motion.div 
              className="services-left-col"
              style={isDesktop ? { x: leftColX, opacity: leftColOpacity } : {}}
            >
              {/* Diamond Spark Icon */}
              <div className="services-badge-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="services-badge-icon">
                  <polygon points="12,2 22,12 12,22 2,12" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.6" fill="none" />
                  <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
                </svg>
              </div>

              {/* Exact Auth0 Headline */}
              <h2 className="services-main-heading">
                Built for what<br />
                you're building
              </h2>

              {/* Vertical Interactive Tab List with Live Liquid Scroll Progress */}
              <nav className="services-tabs-nav" aria-label="Services tabs">
                {SERVICES_SHOWCASE_DATA.map((service, idx) => {
                  const isActive = activeIndex === idx
                  const numStr = `0${idx + 1}`
                  const fillWidth = isActive ? Math.round(tabProgress * 100) : (idx < activeIndex ? 100 : 0)

                  return (
                    <div key={service.id} className={`services-tab-item ${isActive ? 'is-active' : ''}`}>
                      <button
                        type="button"
                        className={`services-tab-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleTabClick(idx)}
                      >
                        <div className="services-tab-header-line">
                          <span className="services-tab-num">{numStr}</span>
                          {isActive && <span className="services-tab-live-dot" />}
                        </div>
                        <span className="services-tab-text">{service.tabLabel}</span>
                        
                        {/* Liquid Live Scroll Progress Underline */}
                        <div className="services-tab-progress-track">
                          <div
                            className="services-tab-progress-fill"
                            style={{ width: `${fillWidth}%` }}
                          />
                        </div>
                      </button>
                    </div>
                  )
                })}
              </nav>
            </motion.div>

            {/* ── RIGHT COLUMN: Showcase Card (Converges from Right like About section) ── */}
            <motion.div 
              className="services-right-col"
              style={isDesktop ? { x: rightCardX, scale: rightCardScale, opacity: rightCardOpacity } : {}}
            >
              <div className="services-showcase-card">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentService.id}
                    className="services-card-inner"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    {/* Left Sub-Column: Content & Capabilities */}
                    <div className="services-content-subcol">
                      <h3 className="services-card-title">{currentService.headline}</h3>
                      <p className="services-card-desc">{currentService.desc}</p>

                      {/* Featured Capabilities Checklist */}
                      <div className="services-capabilities-block">
                        <span className="services-capabilities-heading">FEATURED CAPABILITIES</span>
                        <div className="services-capabilities-grid">
                          {currentService.capabilities.map((cap, cIdx) => (
                            <div key={cIdx} className="services-capability-item">
                              <span className="services-bullet" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button: Standard Common Button Component */}
                      <div className="services-cta-row">
                        <Button
                          href={currentService.ctaHref}
                          variant="ghost"
                          fillColor="orange"
                          size="md"
                        >
                          {currentService.ctaText}
                        </Button>
                      </div>
                    </div>

                    {/* Right Sub-Column: Pure Scroll-Driven Live Terminal Build */}
                    <LiveTerminalMockup mockup={currentService.mockup} progress={isDesktop ? tabProgress : 1} />

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
