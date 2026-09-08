import { useState, useRef, MouseEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const ease = [0.22, 1, 0.36, 1] as const

const SCOPE_OPTIONS = [
  'Autonomous AI & LLMs',
  'Multi-Cloud Kubernetes',
  'Real-Time ETL & Vector DB',
  'Zero-Trust Cyber Defense',
  'Custom Enterprise Architecture',
]

const TIMELINE_OPTIONS = [
  'Immediate (< 2 Weeks)',
  '1 - 3 Months',
  'Quarterly Roadmap',
]

export default function Contact() {
  const [selectedScope, setSelectedScope] = useState('Autonomous AI & LLMs')
  const [selectedTimeline, setSelectedTimeline] = useState('Immediate (< 2 Weeks)')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  // 3D Touch Mouse Tilt State
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, shineX: 50, shineY: 50, active: false })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
    }, 900)
  }

  return (
    <section id="contact" className="contact-section">
      {/* Background ambient glows (Hero exact) */}
      <div className="contact-glow contact-glow-left" aria-hidden="true" />
      <div className="contact-glow contact-glow-right" aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Section Header (Blueritt 1:1 Standard) ── */}
        <div className="contact-header">
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span><strong>LET&rsquo;S BUILD TOGETHER</strong></span>
          </motion.div>

          <div className="contact-header-grid">
            <motion.h2
              className="contact-main-title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              Turn Your Architecture Vision{' '}
              <span className="gradient-text">Into Production Reality</span>
            </motion.h2>

            <motion.p
              className="contact-main-sub"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.18 }}
            >
              Ready to deploy resilient neural AI, scale mission-critical cloud infrastructure,
              or eliminate data bottlenecks? Connect directly with our enterprise engineering team.
            </motion.p>
          </div>
        </div>

        {/* ── 2-Column VIP 3D Contact Layout ── */}
        <div className="contact-grid-body">

          {/* Left Column: Direct Channels, SLAs & Intake Status */}
          <div className="contact-left-col">

            {/* Direct Intake Card */}
            <div className="contact-info-card">
              <span className="contact-card-label">DIRECT ENGINEERING DESK</span>
              <h3 className="contact-card-heading">Speak with a Principal Architect</h3>
              <p className="contact-card-desc">
                Skip the generic sales queue. Connect directly with systems engineers who architect and deploy production workloads.
              </p>

              <div className="contact-channels-list">
                <a href="mailto:partnerships@thenextio.ai" className="contact-channel-item">
                  <div className="channel-icon-wrap">✉️</div>
                  <div>
                    <span className="channel-title">Direct Inquiries</span>
                    <span className="channel-val">partnerships@thenextio.ai</span>
                  </div>
                </a>

                <div className="contact-channel-item">
                  <div className="channel-icon-wrap">⚡</div>
                  <div>
                    <span className="channel-title">Guaranteed Response Window</span>
                    <span className="channel-val">&lt; 2 Hours for Enterprise Inquiries</span>
                  </div>
                </div>

                <div className="contact-channel-item">
                  <div className="channel-icon-wrap">🛡️</div>
                  <div>
                    <span className="channel-title">Security &amp; Confidentiality</span>
                    <span className="channel-val">Mutual NDA Guaranteed • SOC2 Type II</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Intake Status & Capacity Card */}
            <div className="contact-capacity-box">
              <div className="capacity-header">
                <span className="capacity-ping-dot" />
                <span className="capacity-status-text">Q3 DEPLOYMENT CAPACITY</span>
              </div>
              <div className="capacity-metrics">
                <div className="capacity-metric">
                  <span className="cmetric-num">3 Slots</span>
                  <span className="cmetric-lbl">Remaining for Q3 Enterprise Cohort</span>
                </div>
                <div className="capacity-metric-sep" />
                <div className="capacity-metric">
                  <span className="cmetric-num">99.8%</span>
                  <span className="cmetric-lbl">On-Time Architecture Delivery SLA</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic Project Intake Console (Mouse Tilt) */}
          <div className="contact-right-col">
            <div className="contact-3d-stage">
              <motion.div
                ref={cardRef}
                className="contact-3d-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: tilt.active ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
                }}
              >
                {/* Holographic Mouse Glare Layer */}
                <div
                  className="contact-3d-glare"
                  style={{
                    background: `radial-gradient(circle 500px at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.09) 0%, transparent 80%)`,
                    opacity: tilt.active ? 1 : 0,
                  }}
                  aria-hidden="true"
                />

                {/* Top Terminal Bar */}
                <div className="contact-card-topbar">
                  <div className="contact-mac-dots">
                    <span className="cdot cdot-red" />
                    <span className="cdot cdot-yellow" />
                    <span className="cdot cdot-green" />
                  </div>
                  <div className="contact-terminal-url">
                    <span className="curl-lock">🔒</span>
                    <span>https://intake.thenextio.ai/new-project</span>
                  </div>
                  <div className="contact-terminal-secure">
                    <span className="csecure-dot" />
                    <span>AES-256 ENCRYPTED</span>
                  </div>
                </div>

                {/* Card Form Body */}
                <div className="contact-card-content">
                  {status === 'success' ? (
                    <motion.div
                      className="contact-success-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <div className="success-icon-wrap">✓</div>
                      <h3 className="success-title">Project Intake Dispatched</h3>
                      <p className="success-desc">
                        Your architectural specification has been securely routed to our senior engineering desk.
                        A Principal Architect will review your parameters and follow up within &lt; 2 hours.
                      </p>
                      <div className="success-badge">
                        <span>CONFIRMATION ID: #{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                      <button
                        type="button"
                        className="success-reset-btn"
                        onClick={() => {
                          setStatus('idle')
                          setFormData({ name: '', email: '', company: '', message: '' })
                        }}
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="contact-form-inner">

                      {/* Scope Selector Chips */}
                      <div className="cform-group">
                        <label className="cform-label">PROJECT ARCHITECTURE SCOPE</label>
                        <div className="cscope-chips">
                          {SCOPE_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`cscope-chip ${selectedScope === opt ? 'is-active' : ''}`}
                              onClick={() => setSelectedScope(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name & Work Email Inputs */}
                      <div className="cform-row">
                        <div className="cform-field">
                          <label className="cform-label" htmlFor="client-name">
                            FULL NAME <span className="req">*</span>
                          </label>
                          <input
                            id="client-name"
                            type="text"
                            required
                            placeholder="e.g. Elena Rostova"
                            className="cform-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>

                        <div className="cform-field">
                          <label className="cform-label" htmlFor="client-email">
                            WORK EMAIL <span className="req">*</span>
                          </label>
                          <input
                            id="client-email"
                            type="email"
                            required
                            placeholder="elena@enterprise.com"
                            className="cform-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Organization / Company */}
                      <div className="cform-field">
                        <label className="cform-label" htmlFor="client-company">
                          ORGANIZATION / COMPANY
                        </label>
                        <input
                          id="client-company"
                          type="text"
                          placeholder="e.g. Global Financial Corp"
                          className="cform-input"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>

                      {/* Timeline Options */}
                      <div className="cform-group">
                        <label className="cform-label">TARGET DEPLOYMENT TIMELINE</label>
                        <div className="ctimeline-chips">
                          {TIMELINE_OPTIONS.map((t) => (
                            <button
                              key={t}
                              type="button"
                              className={`ctimeline-chip ${selectedTimeline === t ? 'is-active' : ''}`}
                              onClick={() => setSelectedTimeline(t)}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Project Overview */}
                      <div className="cform-field">
                        <label className="cform-label" htmlFor="client-message">
                          TECHNICAL SCOPE &amp; OBJECTIVES
                        </label>
                        <textarea
                          id="client-message"
                          rows={4}
                          placeholder="Briefly describe your existing infrastructure, model requirements, target SLAs, or operational hurdles..."
                          className="cform-textarea"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      {/* Submit Action */}
                      <div className="cform-submit-row">
                        <button
                          type="submit"
                          disabled={status === 'submitting'}
                          className="cform-submit-btn"
                        >
                          <span className="submit-btn-bg" aria-hidden="true" />
                          <span className="submit-btn-content">
                            <span>
                              {status === 'submitting'
                                ? 'Encrypting & Routing...'
                                : 'Submit Project Architecture ↗'}
                            </span>
                          </span>
                        </button>

                        <span className="cform-security-note">
                          🔒 Encrypted under SOC2 Type II &bull; Mutual NDA Applied
                        </span>
                      </div>

                    </form>
                  )}
                </div>

              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
