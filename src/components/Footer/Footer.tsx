import { useRef, useState, MouseEvent } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../common/Button'
import './Footer.css'

const ease = [0.22, 1, 0.36, 1] as const

const NAV_LINKS = [
  { label: 'PLATFORM', href: '#services' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'TECHNOLOGY', href: '#technology' },
  { label: 'PROCESS', href: '#process' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
]


export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  
  // 3D Touch Mouse Tilt State for Footer Headline
  const [headlineTilt, setHeadlineTilt] = useState({ rx: 0, ry: 0, mouseX: 50, mouseY: 50, active: false })

  // Scroll-linked sticky parallax curtain reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.75, 0.95, 1])

  const handleMouseMoveHeadline = (e: MouseEvent<HTMLDivElement>) => {
    if (!headlineRef.current) return
    const rect = headlineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rx = ((y - centerY) / centerY) * -6
    const ry = ((x - centerX) / centerX) * 6
    const mouseX = (x / rect.width) * 100
    const mouseY = (y / rect.height) * 100

    setHeadlineTilt({ rx, ry, mouseX, mouseY, active: true })
  }

  const handleMouseLeaveHeadline = () => {
    setHeadlineTilt({ rx: 0, ry: 0, mouseX: 50, mouseY: 50, active: false })
  }

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('hello@thenextio.ai')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="footer-reveal-wrap">
      <motion.footer style={{ y, opacity }} className="footer">
        
        {/* 3D Cyber Horizon Background Mesh */}
        <div className="footer__cyber-grid-wrap" aria-hidden="true">
          <div className="footer__cyber-grid-plane" />
          <div className="footer__ambient-glow footer__ambient-glow--orange" />
          <div className="footer__ambient-glow footer__ambient-glow--blue" />
        </div>

        <div className="footer__inner container">
          
          {/* Top 3D Interactive Headline Banner */}
          <div 
            ref={headlineRef}
            className="footer__top-banner"
            onMouseMove={handleMouseMoveHeadline}
            onMouseLeave={handleMouseLeaveHeadline}
          >
            <motion.div
              className="footer__headline-3d-wrap"
              style={{
                transform: headlineTilt.active
                  ? `perspective(1000px) rotateX(${headlineTilt.rx}deg) rotateY(${headlineTilt.ry}deg)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                transition: headlineTilt.active ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <motion.h2
                className="footer__headline"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease }}
              >
                BUILDING WHAT’S <span className="footer__headline-accent">NEXT.</span>
              </motion.h2>

              {/* Cursor Spotlight Flare on Headline */}
              {headlineTilt.active && (
                <div
                  className="footer__headline-glare"
                  style={{
                    background: `radial-gradient(circle 350px at ${headlineTilt.mouseX}% ${headlineTilt.mouseY}%, rgba(255, 98, 0, 0.18), transparent 70%)`,
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* Thin Glowing Divider with Laser Scan */}
          <div className="footer__laser-divider" aria-hidden="true">
            <span className="footer__laser-pulse" />
          </div>

          {/* Main Editorial VIP Footer Grid */}
          <div className="footer__grid">
            
            {/* Column 1: Brand & Autonomous Systems */}
            <div className="footer__col footer__col--brand">
              <a href="#top" onClick={(e) => handleScrollTo(e, '#top')} className="footer__brand-title">
                thenextio<span className="footer__brand-dot">.ai</span>
              </a>
              
              <div className="footer__brand-status-badge">
                <span className="brand-pulse-dot" />
                <span className="brand-badge-label">CUSTOM AI &amp; TECHNOLOGY SOLUTIONS</span>
              </div>

              <p className="footer__brand-desc">
                Building intelligent software, autonomous AI systems and high-throughput enterprise infrastructure engineered around real business outcomes.
              </p>

              {/* Trust & Compliance Pills */}
              <div className="footer__compliance-row">
                <span className="compliance-pill">SOC2 TYPE II</span>
                <span className="compliance-pill">ISO 27001</span>
                <span className="compliance-pill">99.99% UPTIME</span>
              </div>
            </div>

            {/* Column 2: Navigation with Smooth Cyber Hover */}
            <div className="footer__col footer__col--nav">
              <span className="footer__col-label">
                <span className="col-label-prefix">//</span> NAVIGATION
              </span>
              <ul className="footer__nav-list">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer__nav-link"
                      onClick={(e) => handleScrollTo(e, link.href)}
                    >
                      <span className="footer__nav-arrow" aria-hidden="true">→</span>
                      <span className="footer__nav-text">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Direct Inquiries & Interactive Action */}
            <div className="footer__col footer__col--cta">
              <span className="footer__col-label">
                <span className="col-label-prefix">//</span> DIRECT INQUIRIES
              </span>
              
              <div className="footer__email-card">
                <a 
                  href="mailto:hello@thenextio.ai" 
                  className="footer__email-link"
                  onClick={handleCopyEmail}
                  title="Click to copy email address"
                >
                  <span className="email-text">hello@thenextio.ai</span>
                  <span className="email-copy-icon">
                    {copied ? '✓ COPIED' : '📋'}
                  </span>
                </a>
                <span className="email-hint">Instant technical routing to lead architects</span>
              </div>

              {/* Start A Project CTA using Signature Hover Fill Button */}
              <div className="footer__cta-wrap">
                <Button 
                  href="#contact" 
                  variant="ghost"
                  fillColor="orange"
                  size="md"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="footer__project-btn"
                >
                  START A PROJECT
                </Button>
              </div>



            </div>

          </div>

          {/* Bottom Bar Divider */}
          <div className="footer__bottom-divider" />

          {/* Bottom Bar: Copyright & Back-To-Top */}
          <div className="footer__bottom">
            <span className="footer__copyright">
              &copy; {new Date().getFullYear()} thenextio.ai &bull; Autonomous Intelligence Systems
            </span>
            
            <div className="footer__status-node">
              <span className="status-indicator-dot" />
              <span className="status-indicator-text">ALL SERVICES NOMINAL</span>
            </div>

            <div className="footer__bottom-right">
              <span className="footer__legal">All rights reserved.</span>
              <button 
                type="button" 
                onClick={scrollToTop} 
                className="footer__back-to-top"
                aria-label="Back to top"
              >
                <span>TOP</span>
                <span className="top-arrow">↑</span>
              </button>
            </div>
          </div>

        </div>

      </motion.footer>
    </div>
  )
}
