import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'
import Button from '../common/Button'
import './Contact.css'

const ease = [0.22, 1, 0.36, 1] as const

/* ── Words for Headline Scroll Reveal (About/Products pattern) ── */
const HEADLINE_WORDS = [
  { word: 'Start', accent: false },
  { word: 'finding', accent: false },
  { word: 'your', accent: false },
  { word: 'next', accent: false },
  { word: 'AI', accent: true },
  { word: 'solution', accent: true },
  { word: 'today', accent: true },
]

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
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [6, 0])

  return (
    <motion.span
      className={isAccent ? 'title-highlight' : ''}
      style={{ opacity, y, display: 'inline-block', marginRight: '0.28em' }}
    >
      {word}
    </motion.span>
  )
}

const WHAT_YOU_GET = [
  'Custom Enterprise AI & Model Integration',
  'Autonomous Multi-Agent Orchestration',
  'High-Throughput Vector DB & RAG Pipelines',
  'Mission-Critical Cloud & ERP Infrastructure',
  'Dedicated Lead Architect & 99.98% SLA',
]

const SCOPE_CATEGORIES = [
  'Autonomous AI & LLMs',
  'Enterprise Cloud & ERP',
  'Vector DB & RAG',
  'Web & Mobile Apps',
]

const TIMELINES = [
  '< 2 Weeks',
  '1 - 3 Months',
  'Quarterly Roadmap',
]

export default function Contact() {
  const [selectedScope, setSelectedScope] = useState('Autonomous AI & LLMs')
  const [selectedTimeline, setSelectedTimeline] = useState('1 - 3 Months')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const sectionRef = useRef<HTMLElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 991)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Live Scroll Progress across Contact section ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'center 50%'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  })

  // 1. Tag animation
  const tagOpacity = useTransform(smoothProgress, [0.01, 0.12], [0.15, 1])
  const tagY = useTransform(smoothProgress, [0.01, 0.12], [12, 0])

  // 2. Ambient Orange Glow expansion on scroll
  const glowScale = useTransform(smoothProgress, [0.10, 0.80], [0.85, 1.06])
  const glowOpacity = useTransform(smoothProgress, [0.10, 0.65], [0.35, 0.65])

  // 3. Left Card 3D Scroll Convergence
  const cardLeftX = useTransform(smoothProgress, [0.12, 0.65], [-55, 0])
  const cardLeftY = useTransform(smoothProgress, [0.12, 0.65], [35, 0])
  const cardLeftRotateY = useTransform(smoothProgress, [0.12, 0.65], [7, 0])
  const cardLeftScale = useTransform(smoothProgress, [0.12, 0.65], [0.93, 1])
  const cardLeftOpacity = useTransform(smoothProgress, [0.08, 0.45], [0.2, 1])

  // 4. Right Form Card 3D Scroll Convergence
  const cardRightX = useTransform(smoothProgress, [0.14, 0.70], [55, 0])
  const cardRightY = useTransform(smoothProgress, [0.14, 0.70], [35, 0])
  const cardRightRotateY = useTransform(smoothProgress, [0.14, 0.70], [-7, 0])
  const cardRightScale = useTransform(smoothProgress, [0.14, 0.70], [0.93, 1])
  const cardRightOpacity = useTransform(smoothProgress, [0.10, 0.50], [0.2, 1])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
    }, 1200)
  }

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="contact" ref={sectionRef} className="contact-form-section">
      {/* Dynamic Ambient Background Glow */}
      <motion.div
        className="contact-ambient-glow"
        style={isDesktop ? { scale: glowScale, opacity: glowOpacity } : {}}
        aria-hidden="true"
      />

      <div className="container">
        {/* SECTION TITLE WITH KINETIC WORD-BY-WORD SCROLL REVEAL */}
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="contact-section-title">
              <motion.div
                className="section-tag"
                style={isDesktop ? { opacity: tagOpacity, y: tagY } : {}}
              >
                <span><strong>CONTACT US</strong></span>
              </motion.div>
              <h2>
                {HEADLINE_WORDS.map((item, idx) => {
                  const start = 0.03 + idx * 0.03
                  const end = start + 0.045
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
          </div>
        </div>

        {/* CONTENT (2-Card Grid with 3D Scroll Convergence) */}
        <div className="row g-4 justify-content-center contact-cards-row">
          
          {/* LEFT CARD */}
          <motion.div
            className="col-xl-3 col-lg-4 col-card-left"
            style={
              isDesktop
                ? {
                    x: cardLeftX,
                    y: cardLeftY,
                    rotateY: cardLeftRotateY,
                    scale: cardLeftScale,
                    opacity: cardLeftOpacity,
                    transformStyle: 'preserve-3d',
                  }
                : {}
            }
          >
            <div className="contact-info-card">
              <div className="contact-info-content">
                {/* LIVE AVAILABILITY BADGE */}
                <div className="contact-status-badge">
                  <span className="status-dot-pulsing" />
                  <span className="status-badge-text">Available for Q3/Q4 Projects</span>
                  <span className="status-dot-sep">&bull;</span>
                  <span className="status-badge-sub">Reply &lt; 2h</span>
                </div>

                <h3>What You’ll Get</h3>
                
                <ul className="contact-deliverables-list">
                  {WHAT_YOU_GET.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.1 + idx * 0.08, ease }}
                    >
                      <span className="bullet-check-icon">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="contact-trust-summary">
                  <div className="trust-stars-row">
                    <span className="stars-gold">★★★★★</span>
                    <span className="stars-score">4.9/5.0</span>
                  </div>
                  <p className="trust-clients-text">
                    Trusted by <strong>50+ Enterprise Teams</strong> across US, UK & Global Markets.
                  </p>
                </div>
              </div>
              
              <div className="contact-card-btn-wrap">
                <Button
                  href="#services"
                  variant="ghost"
                  fillColor="orange"
                  size="md"
                  onClick={handleScrollToServices}
                  className="theme-btn-standard contact-explore-btn"
                >
                  Explore Capabilities ↗
                </Button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            className="col-xl-7 col-lg-8 col-card-right"
            style={
              isDesktop
                ? {
                    x: cardRightX,
                    y: cardRightY,
                    rotateY: cardRightRotateY,
                    scale: cardRightScale,
                    opacity: cardRightOpacity,
                    transformStyle: 'preserve-3d',
                  }
                : {}
            }
          >
            <div className="contact-form-wrapper">
              <div className="contact-form-heading">
                <h3>Tell us more about your project</h3>
                <p>Share your project details with us, and we'll respond promptly.</p>
              </div>

              {status === 'success' ? (
                <div className="contact-success-state">
                  <div className="success-icon">✓</div>
                  <h4>Inquiry Submitted Successfully</h4>
                  <p>Our Principal Solutions Architect is reviewing your requirements and will reach out shortly.</p>
                  <Button
                    variant="ghost"
                    fillColor="orange"
                    size="md"
                    onClick={() => {
                      setStatus('idle')
                      setFormData({ firstName: '', lastName: '', email: '', contactNo: '', message: '' })
                    }}
                    className="theme-btn-standard"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-full-form">
                  <div className="row g-3">
                    {/* FIRST NAME */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="first_name"
                          placeholder="First Name*"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* LAST NAME */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Last Name*"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address*"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* PHONE */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Contact No."
                          value={formData.contactNo}
                          onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* CATEGORY SELECTION */}
                    <div className="col-12">
                      <div className="chips-selector-group">
                        <span className="chips-title">PROJECT CATEGORY</span>
                        <div className="chips-row">
                          {SCOPE_CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              className={`pill-chip-btn ${selectedScope === cat ? 'active' : ''}`}
                              onClick={() => setSelectedScope(cat)}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* TIMELINE SELECTION */}
                    <div className="col-12">
                      <div className="chips-selector-group">
                        <span className="chips-title">TARGET TIMELINE</span>
                        <div className="chips-row">
                          {TIMELINES.map((time) => (
                            <button
                              key={time}
                              type="button"
                              className={`pill-chip-btn ${selectedTimeline === time ? 'active' : ''}`}
                              onClick={() => setSelectedTimeline(time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          placeholder="What is your project about? (e.g. models, existing infrastructure, technical goals...)"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* SUBMIT BUTTON ROW */}
                    <div className="col-12">
                      <div className="contact-submit-row">
                        <Button
                          type="submit"
                          variant="ghost"
                          fillColor="orange"
                          size="md"
                          className="theme-btn-standard submit-btn-custom"
                        >
                          {status === 'submitting' ? 'Submitting...' : 'Submit'}
                        </Button>
                        <span className="security-tag">🔒 SOC2 Certified &bull; 100% Confidential</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
