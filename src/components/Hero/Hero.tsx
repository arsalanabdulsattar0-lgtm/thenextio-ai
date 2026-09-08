import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Hero.css'

/* ── Slide data (Tailored to AI & Information Technology) ── */
const slides = [
  {
    title: (
      <>
        AI Systems &amp; Software,<br />
        Intelligent Automation<br />
        &amp; Enterprise Cloud<br />
        Information Technology
      </>
    ),
    desc: 'Empowering modern enterprises with custom AI architectures, resilient cloud infrastructure, and mission-critical Information Technology solutions.',
  },
  {
    title: (
      <>
        Next-Gen AI Software,<br />
        Intelligent Data Pipelines<br />
        &amp; Cognitive Neural<br />
        Infrastructure
      </>
    ),
    desc: 'We architect, engineer, and deploy production-grade AI models, neural training workflows, and autonomous IT systems built for continuous enterprise scale.',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)

  // 3D Tilt State
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    // 3D tilt calculation
    const rotateY = (x - 0.5) * 18
    const rotateX = (0.5 - y) * 18
    setTilt({
      rotateX,
      rotateY,
      shineX: Math.round(x * 100),
      shineY: Math.round(y * 100),
    })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 })
  }

  /* Auto-rotate every 6 seconds */
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6500)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="hero-section hero-r">
      {/* ── Background blurs (Blueritt exact) ── */}
      <div className="hero-blur hero-blur-left" aria-hidden="true" />
      <div className="hero-blur hero-blur-right" aria-hidden="true" />

      {/* Floating vertical tab on right edge */}
      <a
        href="#contact"
        className="ask-tab"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        }}
        aria-label="Ask TheNextIO"
      >
        <span className="ask-tab-icon">💬</span>
        <span className="ask-tab-text">Ask TheNextIO</span>
      </a>

      <div className="container hero-r-container">
        <div className="row align-items-center hero-r-row">

          {/* LEFT: Copy column */}
          <div className="hero-r-copy">
            <div className="hero-r-texts">
              <div className="hero-top-badge">
                <span className="hero-top-badge-dot" />
                <span>NEXT-GEN AI &amp; INFORMATION TECHNOLOGY</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="hero-r-text is-active"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <h1 className="hero-r-title">{slides[active].title}</h1>
                  <p className="hero-r-desc">{slides[active].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTAs (Watch Demo removed per user request) */}
            <div className="hero-r-actions">
              <a href="#contact" className="hero-r-btn hero-r-btn-primary">
                Start a project ↗
              </a>
            </div>

            {/* DOTS (2 horizontal bars) */}
            <div className="hero-r-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`hero-r-dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: 3D Touch Video Showcase with Perspective Tilt */}
          <div className="hero-r-media-wrap">
            <motion.div
              className="hero-3d-stage"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
              }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            >
              <div className="hero-r-media">
                {/* Single continuous 3D video loop for both slides */}
                <div className="hero-video-box">
                  <video
                    ref={(el) => {
                      if (el) {
                        el.muted = true
                        el.play().catch(() => {})
                      }
                    }}
                    className="hero-r-video"
                    src="/hero/hero-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                </div>

                {/* 3D Specular Dynamic Glow (Tracks cursor) */}
                <div
                  className="hero-3d-shine"
                  style={{
                    background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(0, 220, 255, 0.22) 0%, rgba(96, 132, 255, 0.06) 40%, transparent 70%)`
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
