import { useState, useRef, useEffect, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../common/Button'
import ClientsSlider from '../Clients/ClientsSlider'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1] as const

// The rotating capabilities requested by the user:
// AI -> ERP -> AI AGENT -> AGENTIC AI -> MOBILE APPS -> WEB APPLICATIONS -> AI VOICE AGENT
const CAPABILITIES = [
  {
    id: 'ai',
    title: 'AI',
    tab: 'AI',
    badge: 'CORE // NEURAL',
    sub: 'Deep Neural Engine',
    type: 'giant',
  },
  {
    id: 'erp',
    title: 'ERP',
    tab: 'ERP',
    badge: 'ENTERPRISE // ARCH',
    sub: 'Mission-Critical Cloud',
    type: 'giant',
  },
  {
    id: 'ai-agent',
    title: 'AI AGENT',
    tab: 'AI AGENT',
    badge: 'AUTONOMOUS // EXEC',
    sub: 'Recursive Task Worker',
    type: 'medium',
  },
  {
    id: 'agentic-ai',
    title: 'AGENTIC AI',
    tab: 'AGENTIC',
    badge: 'MULTI-AGENT // SWARM',
    sub: 'Cognitive Orchestration',
    type: 'medium',
  },
  {
    id: 'mobile-apps',
    title: 'MOBILE APPS',
    tab: 'MOBILE',
    badge: 'NATIVE // CROSS-PLATFORM',
    sub: 'iOS & Android Systems',
    type: 'medium',
  },
  {
    id: 'web-apps',
    title: 'WEB APPLICATIONS',
    tab: 'WEB APPS',
    badge: 'HIGH-SCALE // DISTRIBUTED',
    sub: 'Cloud-Native Architecture',
    type: 'split',
  },
  {
    id: 'voice-agent',
    title: 'AI VOICE AGENT',
    tab: 'VOICE AI',
    badge: 'REAL-TIME // LOW LATENCY',
    sub: 'Neural Audio & Speech',
    type: 'split',
  },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [capabilityIdx, setCapabilityIdx] = useState(0)

  // 3D Touch Mouse Tilt State
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, shineX: 50, shineY: 50, active: false })

  // Auto-rotate capability every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCapabilityIdx((prev) => (prev + 1) % CAPABILITIES.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const currentCap = CAPABILITIES[capabilityIdx]

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rx = ((y - centerY) / centerY) * -9
    const ry = ((x - centerX) / centerX) * 9
    const shineX = (x / rect.width) * 100
    const shineY = (y / rect.height) * 100

    setTilt({ rx, ry, shineX, shineY, active: true })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, shineX: 50, shineY: 50, active: false })
  }

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="top" 
      className="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Atmospheric Radial Backdrops (Existing Theme: Cobalt Blue & Glowing Orange) ── */}
      <div className="hero-atmospheric-glow" aria-hidden="true">
        <div className="hero-glow-orb hero-glow-orb--orange" />
        <div className="hero-glow-orb hero-glow-orb--blue" />
      </div>

      {/* Floating vertical tab on right edge */}
      <a
        href="#contact"
        className="ask-tab"
        onClick={handleScrollToContact}
        aria-label="Ask TheNextIO"
      >
        <span className="ask-tab-icon">💬</span>
        <span className="ask-tab-text">Ask TheNextIO</span>
      </a>

      <div className="container hero-container">
        <div className="hero-grid">

          {/* LEFT COLUMN: Typography, Actions & Trust Proof */}
          <motion.div 
            className="hero-left-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            {/* Main Headline */}
            <h1 className="hero-title">
              Seamlessly<br />
              <span className="hero-title-gradient">AI Integration</span><br />
              for Business
            </h1>

            {/* Sub-headline / Description */}
            <p className="hero-description">
              We engineer, orchestrate, and integrate custom autonomous AI systems, neural reasoning pipelines, and high-throughput enterprise architectures directly into your operational stack.
            </p>

            {/* Dual Actions: Standard Transparent Button + Secondary Explore Button */}
            <div className="hero-cta-wrap">
              <Button
                href="#contact"
                variant="ghost"
                fillColor="orange"
                size="md"
                onClick={handleScrollToContact}
                className="hero-standard-btn"
              >
                Get started
              </Button>

              <a
                href="#services"
                onClick={handleScrollToServices}
                className="hero-btn-secondary"
              >
                <span>Explore Platform</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </a>
            </div>

            {/* Enterprise Trust & Metric Strip */}
            <div className="hero-trust-strip">
              <div className="hero-metric-item">
                <span className="metric-val">99.98%</span>
                <span className="metric-lbl">Model Reliability</span>
              </div>
              <div className="metric-separator" aria-hidden="true" />
              <div className="hero-metric-item">
                <span className="metric-val">10x</span>
                <span className="metric-lbl">Production Velocity</span>
              </div>
              <div className="metric-separator" aria-hidden="true" />
              <div className="hero-metric-item">
                <span className="metric-val">&lt; 15ms</span>
                <span className="metric-lbl">Inference Latency</span>
              </div>
            </div>

            {/* Supported Enterprise Infrastructure Chips */}
            <div className="hero-stack-row">
              <span className="stack-prefix">DEPLOYED ON:</span>
              <div className="stack-chips">
                <span className="stack-chip"><span className="chip-dot" />NVIDIA H100</span>
                <span className="stack-chip"><span className="chip-dot" />AWS / K8S</span>
                <span className="stack-chip"><span className="chip-dot" />PyTorch</span>
                <span className="stack-chip"><span className="chip-dot" />Vector DB</span>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: 3D Interconnected Modular Circuit Schematic */}
          <div 
            ref={containerRef}
            className="hero-right-stage"
          >
            <motion.div 
              className="hero-schematic-3d-wrap"
              style={{
                transform: tilt.active
                  ? `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
                  : 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
                transition: tilt.active ? 'none' : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
            >
              
              {/* Circuit Board Wire Traces with Animated Laser Data Pulses */}
              <svg className="schematic-circuit-svg" viewBox="0 0 540 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal top trace to Crystal Polyhedron */}
                <line x1="285" y1="135" x2="455" y2="135" stroke="rgba(255, 98, 0, 0.28)" strokeWidth="1.5" />
                <line x1="285" y1="135" x2="455" y2="135" stroke="#FF7A26" strokeWidth="2" strokeDasharray="8 24" className="circuit-laser-pulse laser-1" />
                <polygon points="415,130 420,135 415,140 410,135" fill="#FF7A26" className="circuit-diamond" />
                <polygon points="265,130 270,135 265,140 260,135" fill="#FF7A26" className="circuit-diamond" />

                {/* Vertical trace to top capsule */}
                <line x1="415" y1="135" x2="415" y2="185" stroke="rgba(0, 76, 255, 0.35)" strokeWidth="1.2" />
                <line x1="415" y1="135" x2="415" y2="185" stroke="#00C2FF" strokeWidth="2" strokeDasharray="6 18" className="circuit-laser-pulse laser-2" />

                {/* Bottom horizontal trace to Vision Eye */}
                <line x1="330" y1="355" x2="470" y2="355" stroke="rgba(255, 98, 0, 0.28)" strokeWidth="1.5" />
                <line x1="330" y1="355" x2="470" y2="355" stroke="#FF7A26" strokeWidth="2" strokeDasharray="8 24" className="circuit-laser-pulse laser-3" />
                <polygon points="385,350 390,355 385,360 380,355" fill="#FF7A26" className="circuit-diamond" />

                {/* Left traces to Sliders & Gear */}
                <line x1="165" y1="265" x2="215" y2="265" stroke="rgba(0, 76, 255, 0.3)" strokeWidth="1.2" />
                <line x1="165" y1="265" x2="215" y2="265" stroke="#0057FF" strokeWidth="2" strokeDasharray="6 18" className="circuit-laser-pulse laser-4" />
                
                <line x1="280" y1="365" x2="280" y2="395" stroke="rgba(255, 98, 0, 0.25)" strokeWidth="1.2" />
                <line x1="280" y1="365" x2="280" y2="395" stroke="#FF7A26" strokeWidth="2" strokeDasharray="5 15" className="circuit-laser-pulse laser-5" />
              </svg>

              {/* ── CENTRAL ROTATING PROCESSOR CHIP (Dynamic Morphing AI / ERP / Agents / Apps) ── */}
              <div className="chip-center-module">
                {/* Outer Substrate with corner notches & screws */}
                <div className="chip-substrate">
                  {/* 4 Corner Screw Points */}
                  <span className="chip-screw chip-screw--tl" />
                  <span className="chip-screw chip-screw--tr" />
                  <span className="chip-screw chip-screw--bl" />
                  <span className="chip-screw chip-screw--br" />

                  {/* Micro-dot matrix pattern */}
                  <div className="chip-dot-matrix" />

                  {/* Dynamic 3D Rotating Inner Core */}
                  <div className="chip-inner-core">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentCap.id}
                        className={`chip-content-holder chip-type-${currentCap.type}`}
                        initial={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                        exit={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.48, ease }}
                      >
                        <span className="chip-mode-badge">{currentCap.badge}</span>
                        <h2 className="chip-mode-title">{currentCap.title}</h2>
                        <span className="chip-mode-sub">{currentCap.sub}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Silicon edge notch accents */}
                  <div className="chip-edge-notch notch-left" />
                  <div className="chip-edge-notch notch-right" />
                  <div className="chip-edge-notch notch-top" />
                  <div className="chip-edge-notch notch-bottom" />

                  {/* Energy border pulse line */}
                  <span className="chip-energy-border" />
                </div>
              </div>

              {/* ── SATELLITE MODULE 1: Top-Right 3D Faceted Crystal Polyhedron (HUD Tooltip) ── */}
              <div className="node-module node-crystal">
                <div className="node-hud-tooltip">
                  <span className="hud-label">TENSOR CORE</span>
                  <span className="hud-val">INT8 Engine • 120 TFLOPS</span>
                </div>
                <div className="crystal-faceted-gem animated-crystal-spin">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" fill="#130926" stroke="#FF7A26" strokeWidth="1.2" />
                    <polygon points="24,4 42,14 24,24 6,14" fill="rgba(255, 122, 38, 0.45)" />
                    <polygon points="24,24 42,14 42,34 24,44" fill="rgba(255, 98, 0, 0.65)" />
                    <polygon points="24,24 6,14 6,34 24,44" fill="rgba(0, 76, 255, 0.55)" />
                    <line x1="24" y1="4" x2="24" y2="24" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
                    <line x1="24" y1="24" x2="42" y2="34" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
                    <line x1="24" y1="24" x2="6" y2="34" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
                  </svg>
                </div>
              </div>

              {/* ── SATELLITE MODULE 2: Top Capsule Switch (00) (HUD Tooltip) ── */}
              <div className="node-module node-capsule">
                <div className="node-hud-tooltip">
                  <span className="hud-label">FAILOVER CLUSTER</span>
                  <span className="hud-val">Dual Redundancy Active</span>
                </div>
                <div className="capsule-switch-body">
                  <div className="capsule-slot animated-slot-1" />
                  <div className="capsule-slot animated-slot-2" />
                </div>
              </div>

              {/* ── SATELLITE MODULE 3: Left Equalizer Sliders (HUD Tooltip) ── */}
              <div className="node-module node-sliders">
                <div className="node-hud-tooltip">
                  <span className="hud-label">HYPERPARAMETERS</span>
                  <span className="hud-val">LR 2.4e-5 • Auto-Tuning</span>
                </div>
                <div className="slider-track-row">
                  <span className="slider-line" />
                  <span className="slider-knob animated-knob-1" />
                </div>
                <div className="slider-track-row">
                  <span className="slider-line" />
                  <span className="slider-knob animated-knob-2" />
                </div>
              </div>

              {/* ── SATELLITE MODULE 4: Bottom-Left Gear (HUD Tooltip) ── */}
              <div className="node-module node-gear">
                <div className="node-hud-tooltip">
                  <span className="hud-label">AUTONOMOUS WORKER</span>
                  <span className="hud-val">240 RPS • Continuous</span>
                </div>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF7A26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="spinning-gear-icon">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>

              {/* ── SATELLITE MODULE 5: Bottom-Left Concentric Rings (HUD Tooltip) ── */}
              <div className="node-module node-aperture">
                <div className="node-hud-tooltip">
                  <span className="hud-label">NEURAL ENCODER</span>
                  <span className="hud-val">1536-Dim Embeddings</span>
                </div>
                <div className="concentric-ring ring-outer animated-ring-outer">
                  <div className="concentric-ring ring-mid animated-ring-mid">
                    <div className="concentric-ring ring-core animated-ring-core" />
                  </div>
                </div>
              </div>

              {/* ── SATELLITE MODULE 6: Bottom-Right Vision Eye (HUD Tooltip) ── */}
              <div className="node-module node-vision">
                <div className="node-hud-tooltip">
                  <span className="hud-label">COMPUTER VISION</span>
                  <span className="hud-val">60 FPS Real-Time Stream</span>
                </div>
                <div className="vision-eye-wrapper">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF7A26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="vision-eye-svg">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3.5" fill="rgba(255, 98, 0, 0.35)" stroke="#FFA05C" strokeWidth="1.2" />
                    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
                  </svg>
                  <span className="vision-radar-line" />
                </div>
              </div>

              {/* Dynamic Holographic Cursor Glare */}
              {tilt.active && (
                <div
                  className="schematic-cursor-glare"
                  style={{
                    background: `radial-gradient(circle 380px at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 122, 38, 0.22), transparent 70%)`,
                  }}
                />
              )}

            </motion.div>

            {/* ── INTERACTIVE CAPABILITY MODE SELECTOR DOCK ── */}
            <div className="schematic-mode-dock">
              <div className="dock-header-row">
                <span className="dock-dot-live" />
                <span className="dock-label">CAPABILITY ENGINE CONTROLLER:</span>
              </div>
              <div className="dock-chips-list">
                {CAPABILITIES.map((cap, idx) => (
                  <button
                    key={cap.id}
                    type="button"
                    className={`dock-chip-btn ${capabilityIdx === idx ? 'is-active' : ''}`}
                    onClick={() => setCapabilityIdx(idx)}
                    title={`Switch chip to ${cap.title}`}
                  >
                    <span>{cap.tab}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Merged Clients Slider */}
      <div className="hero-clients-integration">
        <ClientsSlider />
      </div>
    </section>
  )
}
