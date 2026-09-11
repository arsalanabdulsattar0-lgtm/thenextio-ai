import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'
import Button from '../common/Button'
import './Products.css'

const ease = [0.22, 1, 0.36, 1] as const

interface ProductView {
  id: string
  label: string
  image: string
  badge: string
}

interface PlatformTab {
  id: string
  name: string
  titleLeft: string
  titleRight: string
  titleBottom: string
  heading: string
  description: string
  smallText: string
  image: string
  badgeLeft: string
  badgeRight: string
  url: string
  views?: ProductView[]
  features: string[]
  metrics: { label: string; value: string }[]
}

const PLATFORM_TABS: PlatformTab[] = [
  {
    id: 'whatsapp-apis',
    name: 'BriskTalks WhatsApp APIs',
    titleLeft: 'BRISKTALKS',
    titleRight: 'WHATSAPP',
    titleBottom: 'APIS',
    heading: 'Meta-Verified WhatsApp Business APIs & Chatbot Automation',
    description: 'Official Meta WhatsApp Business API solution engineered for high-volume broadcasts, team inboxes, and automated customer engagement.',
    smallText: 'Direct Meta Cloud API infrastructure with 99.98% delivery rates. Broadcast pre-approved promotional templates, automate order tracking & 2FA authentication, manage multi-agent shared inboxes, and connect directly with Shopify, CRMs, and ERP systems.',
    image: '/products/brisktalks-dashboard.png',
    badgeLeft: 'WHATSAPP API // LIVE',
    badgeRight: 'META VERIFIED // OFFICIAL',
    url: 'https://www.generixglobal.co.uk/brisktalks-whatsapp-apis/',
    views: [
      {
        id: 'dashboard',
        label: '📊 KPI Dashboard',
        image: '/products/brisktalks-dashboard.png',
        badge: 'KPI DASHBOARD // LIVE',
      },
      {
        id: 'livechat',
        label: '💬 Live Chat Inbox',
        image: '/hero/slide-1.jpg',
        badge: 'TEAM INBOX // REALTIME',
      },
      {
        id: 'workflows',
        label: '🤖 AI Automation & Bots',
        image: '/hero/slide-2.jpg',
        badge: 'BOT WORKFLOWS // ACTIVE',
      },
      {
        id: 'broadcasts',
        label: '📢 Broadcast Templates',
        image: '/hero/slide-1.jpg',
        badge: 'META VERIFIED // BROADCAST',
      },
    ],
    features: [
      'Meta Official Cloud API & Green Tick Verification',
      'Multi-Agent Shared Inbox & Role-Based Access',
      'Smart Chat Routing & Queue Workload Balancer',
      'Rich Media, Quick Replies & Interactive Catalogs',
      'Pre-Approved Broadcast Templates & High Delivery',
      'Native Shopify, CRM & ERP Webhook Integrations',
    ],
    metrics: [
      { label: 'Delivery Rate', value: '99.98% SLA' },
      { label: 'Message Open Rate', value: '98% Direct' },
      { label: 'API Throughput', value: '10,000+ Msg/min' },
      { label: 'Channel Support', value: 'Official Meta Cloud' },
    ],
  },
  {
    id: 'ai-voice-agents',
    name: 'AI Voice Agent',
    titleLeft: 'VOICE',
    titleRight: 'AI',
    titleBottom: 'AGENTS',
    heading: 'Human-Like Conversational AI Voice Agents for Calling',
    description: 'Intelligent, low-latency AI voice agents that understand context, converse naturally with human-like tone, and autonomously handle calls 24/7.',
    smallText: 'Scale conversations without scaling headcount. Our AI Voice Agents qualify incoming leads, book appointments directly into calendars, answer complex queries, and seamlessly transfer calls to human agents with zero latency and full context retention.',
    image: '/hero/slide-2.jpg',
    badgeLeft: 'VOICE SYNTHESIS // ACTIVE',
    badgeRight: 'SIP TELEPHONY // LIVE',
    url: 'https://www.generixglobal.co.uk/brisktalks-ai-voice-agents/',
    views: [
      {
        id: 'voice-console',
        label: '🎙️ Voice Console',
        image: '/hero/slide-2.jpg',
        badge: 'VOICE SYNTHESIS // ACTIVE',
      },
      {
        id: 'telephony',
        label: '📞 SIP Telephony & PBX',
        image: '/hero/slide-1.jpg',
        badge: 'SIP TRUNKING // 1000+ STREAMS',
      },
      {
        id: 'scheduling',
        label: '📅 Auto Scheduling',
        image: '/hero/slide-2.jpg',
        badge: 'CALENDAR SYNC // LIVE',
      },
    ],
    features: [
      'Natural, Human-Like Speech Synthesis & Accents',
      'Automated Inbound & Outbound Lead Qualification',
      'Dynamic Smart Appointment & Calendar Scheduling',
      'Instant Zero-Drop Call Transfer to Human Agents',
      'Direct SIP Trunking, PBX & WebRTC Integration',
      'Real-Time Call Analytics, Sentiment & Audio Logs',
    ],
    metrics: [
      { label: 'Speech Latency', value: '< 420ms Latency' },
      { label: 'Resolution Rate', value: '88.4% Autonomous' },
      { label: 'Concurrent Streams', value: '1,000+ Lines' },
      { label: 'Telephony Protocol', value: 'SIP / WebRTC / PSTN' },
    ],
  },
  {
    id: 'ai-agents',
    name: 'AI Agent',
    titleLeft: 'AGENTIC',
    titleRight: 'AI',
    titleBottom: 'SYSTEMS',
    heading: 'Autonomous Goal-Driven AI Agents That Think, Act & Deliver',
    description: 'Next-generation agentic AI systems that orchestrate conversations, execute multi-step workflows, and convert customer interactions into business results.',
    smallText: 'Move beyond basic chatbots and static LLMs. BriskTalks AI Agents hold persistent context across channels, pull dynamic data from your internal knowledgebase, autonomously execute actions like cancellations and payments, and drive conversions with smart product recommendations.',
    image: '/hero/slide-1.jpg',
    badgeLeft: 'AGENTIC AI // ACTIVE',
    badgeRight: 'AUTONOMOUS // RUNNING',
    url: 'https://www.generixglobal.co.uk/brisktalks-ai-agents/',
    views: [
      {
        id: 'agentic-flow',
        label: '🧠 Agentic Workflows',
        image: '/hero/slide-1.jpg',
        badge: 'AGENTIC ENGINE // ACTIVE',
      },
      {
        id: 'knowledgebase',
        label: '📚 AI Knowledgebase',
        image: '/hero/slide-2.jpg',
        badge: 'DOCS & VECTOR SEARCH',
      },
      {
        id: 'integrations',
        label: '⚡ 250+ Integrations',
        image: '/hero/slide-1.jpg',
        badge: 'EXECUTION SANDBOX // LIVE',
      },
    ],
    features: [
      'Goal-Oriented Autonomous Multi-Step Reasoning',
      'AI Knowledgebase Search (Docs, PDFs & Policies)',
      'Dynamic Actions (Bookings, Cancellations & Payments)',
      'Smart Product Recommendations & Lost Sales Tracking',
      '24/7 Omnichannel Deployment (WhatsApp & Webchat)',
      'Real-Time CRM Sync & Seamless Human Handover',
    ],
    metrics: [
      { label: 'Task Execution', value: '10x Faster Automation' },
      { label: 'Resolution Accuracy', value: '99.6% Precision' },
      { label: 'Pre-built Connectors', value: '250+ Tools' },
      { label: 'Reasoning Engine', value: 'Multi-Agent LLM' },
    ],
  },
  {
    id: 'web-erp',
    name: 'ERP with AI Web-Based',
    titleLeft: 'ENTERPRISE',
    titleRight: 'ERP',
    titleBottom: 'INTELLIGENCE',
    heading: 'Smart Cloud-Native Web-Based Enterprise ERP with Embedded AI',
    description: 'Complete industrial digitalization suite integrating 22+ enterprise modules—from finance and supply chain to HR, payroll, and predictive business intelligence.',
    smallText: 'Unify corporate operations across branches with a high-availability cloud web platform. Features interactive Business Intelligence (BI) dashboards, Employee/Manager Self-Service (ESS/MSS) portals, approval centers, automated loan/leave tracking, and predictive AI analytics for real-time executive decision-making.',
    image: '/hero/slide-2.jpg',
    badgeLeft: 'SMART ERP // CLOUD LIVE',
    badgeRight: 'PREDICTIVE BI // ACTIVE',
    url: 'https://www.generixglobal.co.uk/smart-erp-enterprise-application/',
    views: [
      {
        id: 'erp-overview',
        label: '📈 Executive BI Dashboard',
        image: '/hero/slide-2.jpg',
        badge: 'SMART ERP // CLOUD LIVE',
      },
      {
        id: 'ess-portal',
        label: '👤 ESS/MSS Portal',
        image: '/hero/slide-1.jpg',
        badge: 'EMPLOYEE SELF-SERVICE',
      },
      {
        id: 'supply-chain',
        label: '📦 Supply Chain & Finance',
        image: '/hero/slide-2.jpg',
        badge: 'PREDICTIVE AI FORECAST',
      },
    ],
    features: [
      '22+ Integrated Modules (Finance, Supply Chain, POS, HR)',
      'Predictive AI Business Intelligence & KPI Dashboards',
      'ESS/MSS Employee & Manager Self-Service Web Portal',
      'Automated Payroll, Daily Attendance & Leave Management',
      'Digital Approval Center for Multi-Tiered Workflows',
      'Multi-Branch Cloud Architecture with FBR Invoicing Ready',
    ],
    metrics: [
      { label: 'Enterprise Modules', value: '22+ Complete Suites' },
      { label: 'Architecture', value: '100% Cloud Web' },
      { label: 'Process Efficiency', value: '+75% Productivity' },
      { label: 'Compliance & Audit', value: 'FBR & Multi-Branch' },
    ],
  },
]

/* ── Words for Headline Scroll Reveal (About Section Pattern) ── */
const HEADLINE_WORDS = [
  { word: 'Enterprise', accent: false },
  { word: 'AI', accent: true },
  { word: '&', accent: true },
  { word: 'Cloud', accent: true },
  { word: 'Product', accent: false },
  { word: 'Platform', accent: false },
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
      className={`platform-reveal-word ${isAccent ? 'accent-word' : ''}`}
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  )
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [activeView, setActiveView] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  // Reset activeView whenever activeTab changes
  useEffect(() => {
    setActiveView(0)
  }, [activeTab])

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 991)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Scroll Progress across section ──
  // Starts the moment section enters 75% of viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'center center'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  // ── 1. Tag & Headline Word-by-Word Scroll Reveal ──
  const tagOpacity = useTransform(smoothProgress, [0.01, 0.08], [0.12, 1])
  const tagY = useTransform(smoothProgress, [0.01, 0.08], [8, 0])

  // ── 2. Horizontal Tabs Scroll Reveal ──
  const tabsOpacity = useTransform(smoothProgress, [0.16, 0.36], [0.15, 1])
  const tabsY = useTransform(smoothProgress, [0.16, 0.36], [16, 0])

  // ── 3. Single Preview Screen (Cinematic 3D Scroll Lift & Scale) ──
  const screenScale = useTransform(smoothProgress, [0.18, 0.65], [0.93, 1])
  const screenRotateX = useTransform(smoothProgress, [0.18, 0.65], [7, 0])
  const screenY = useTransform(smoothProgress, [0.18, 0.65], [30, 0])
  const screenOpacity = useTransform(smoothProgress, [0.15, 0.40], [0.25, 1])

  // ── 4. Dedicated Scroll Reveal for Bottom Area (Watermark, Content & Telemetry) ──
  const bottomRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: bottomScroll } = useScroll({
    target: bottomRef,
    offset: ['start 92%', 'center 52%'],
  })

  const smoothBottom = useSpring(bottomScroll, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  // Watermark text emerges on scroll
  const bigTextOpacity = useTransform(smoothBottom, [0.00, 0.45], [0, 0.07])
  const bigTextY = useTransform(smoothBottom, [0.00, 0.45], [25, 0])

  // Left Content (Heading, Description, Small text) lifts and reveals
  const leftContentOpacity = useTransform(smoothBottom, [0.08, 0.65], [0.12, 1])
  const leftContentY = useTransform(smoothBottom, [0.08, 0.65], [28, 0])

  // Action Buttons fade in
  const buttonsOpacity = useTransform(smoothBottom, [0.25, 0.75], [0.15, 1])
  const buttonsY = useTransform(smoothBottom, [0.25, 0.75], [16, 0])

  // Telemetry Card on Right slides in from right with scale
  const telemetryX = useTransform(smoothBottom, [0.10, 0.70], [70, 0])
  const telemetryOpacity = useTransform(smoothBottom, [0.10, 0.60], [0.1, 1])
  const telemetryScale = useTransform(smoothBottom, [0.10, 0.70], [0.94, 1])

  const current = PLATFORM_TABS[activeTab]
  const currentViews = current.views || []
  const activeViewData = currentViews[activeView] || {
    image: current.image,
    badge: current.badgeLeft,
    label: current.heading,
  }

  return (
    <section id="products" ref={sectionRef} className="platform-section">
      {/* Background ambient glows */}
      <div className="platform-glow platform-glow-left" aria-hidden="true" />
      <div className="platform-glow platform-glow-right" aria-hidden="true" />

      {/* ── Section Tag & Headline (Live Scroll Word Reveal) ── */}
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '14px' }}>
        <motion.div
          className="section-tag"
          style={isDesktop ? { opacity: tagOpacity, y: tagY } : {}}
        >
          <span><strong>OUR PRODUCTS</strong></span>
        </motion.div>

        {/* Kinetic Word-by-Word Scroll Reveal Headline (About style) */}
        <h2 className="platform-section-title">
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
      </div>

      {/* ── TOP HORIZONTAL TABS (Scroll Reveal) ── */}
      <motion.div
        className="platform-tabs-wrapper"
        style={isDesktop ? { opacity: tabsOpacity, y: tabsY } : {}}
      >
        <div className="platform-tabs">
          {PLATFORM_TABS.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              className={`platform-tab-btn ${idx === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── MAIN PLATFORM CARD ── */}
      <div className="platform-card">
        {/* SINGLE PREVIEW SCREEN (Cinematic 3D Scroll Entrance with Feature Sub-Tabs) */}
        <div className="container">
          {/* ── Sub-Tabs Feature Switcher (Idea 1) ── */}
          {currentViews.length > 0 && (
            <div className="platform-subtabs-bar">
              <div className="platform-subtabs-pill">
                {currentViews.map((v, vIdx) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`platform-subtab-btn ${vIdx === activeView ? 'active' : ''}`}
                    onClick={() => setActiveView(vIdx)}
                  >
                    <span>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="platform-image-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.id}-${activeView}`}
                className="platform-single-frame"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease }}
              >
                <motion.div
                  className="platform-img-box platform-img-box-single"
                  style={
                    isDesktop
                      ? {
                          scale: screenScale,
                          rotateX: screenRotateX,
                          y: screenY,
                          opacity: screenOpacity,
                          transformStyle: 'preserve-3d',
                        }
                      : {}
                  }
                >
                  <img
                    src={activeViewData.image}
                    alt={`${current.heading} - ${activeViewData.label || 'Preview'}`}
                    className="platform-main-image"
                    loading="lazy"
                  />
                  <div className="platform-image-glare" aria-hidden="true" />

                  {/* Left Screen Badge */}
                  <div className="platform-screen-badge platform-screen-badge-left">
                    <span className="platform-screen-dot" />
                    <span>{activeViewData.badge || current.badgeLeft}</span>
                  </div>

                  {/* Right Screen Badge */}
                  <div className="platform-screen-badge platform-screen-badge-right">
                    <span className="platform-screen-dot" />
                    <span>{current.badgeRight}</span>
                  </div>

                  {/* Quick Prev / Next Arrows */}
                  {currentViews.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="platform-nav-arrow platform-nav-arrow-left"
                        aria-label="Previous view"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveView((prev) => (prev > 0 ? prev - 1 : currentViews.length - 1))
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="platform-nav-arrow platform-nav-arrow-right"
                        aria-label="Next view"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveView((prev) => (prev < currentViews.length - 1 ? prev + 1 : 0))
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </>
                  )}

                  <div className="platform-screen-scan" aria-hidden="true" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── BOTTOM AREA WITH DEDICATED LIVE SCROLL REVEAL ── */}
          <div ref={bottomRef} className="platform-bottom-stage">
            {/* BIG TYPOGRAPHY WATERMARK (Emerges with scroll) */}
            <motion.div
              className="platform-big-text"
              aria-hidden="true"
              style={isDesktop ? { opacity: bigTextOpacity, y: bigTextY } : {}}
            >
              <h2>
                <div className="platform-big-text-top-row">
                  <span className="left-text">{current.titleLeft}</span>
                  <span className="right-text">{current.titleRight}</span>
                </div>
                <span className="bottom-text">{current.titleBottom}</span>
              </h2>
            </motion.div>

            {/* ACTIVE CONTENT DETAILS (Live Scroll Reveal: Text + Telemetry) */}
            <div className="platform-content">
              <div className="platform-content-grid">
                {/* Left Column: Heading, Description & Actions (Lifts and reveals with scroll) */}
                <motion.div
                  className="platform-content-main"
                  style={isDesktop ? { opacity: leftContentOpacity, y: leftContentY } : {}}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <h3 className="platform-heading">{current.heading}</h3>
                      <p className="platform-description">{current.description}</p>
                      <p className="platform-small-text">{current.smallText}</p>

                      {current.features && current.features.length > 0 && (
                        <div className="platform-features-grid">
                          {current.features.map((feat, i) => (
                            <div key={i} className="platform-feature-item">
                              <span className="platform-feature-bullet" aria-hidden="true" />
                              <span className="platform-feature-text">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <motion.div
                        className="platform-actions"
                        style={isDesktop ? { opacity: buttonsOpacity, y: buttonsY } : {}}
                      >
                        {current.url && current.url.startsWith('http') && (
                          <Button
                            href={current.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            fillColor="orange"
                            size="md"
                          >
                            Explore Product
                          </Button>
                        )}
                        <Button href="#contact" variant="ghost" fillColor="orange" size="md">
                          Contact Us
                        </Button>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Right Column: Key Live Metrics (Slides in from right with scroll) */}
                <motion.div
                  className="platform-metrics-col"
                  style={
                    isDesktop
                      ? {
                          x: telemetryX,
                          opacity: telemetryOpacity,
                          scale: telemetryScale,
                        }
                      : {}
                  }
                >
                  <div className="platform-metrics-box">
                    <span className="metrics-box-tag">PLATFORM TELEMETRY</span>
                    {current.metrics.map((m, i) => (
                      <div key={i} className="platform-metric-row">
                        <span className="metric-row-lbl">{m.label}</span>
                        <span className="metric-row-val">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
