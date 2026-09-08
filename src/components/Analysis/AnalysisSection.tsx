import { motion } from 'framer-motion'
import './AnalysisSection.css'

const ease = [0.22, 1, 0.36, 1] as const

export default function AnalysisSection() {
  return (
    <section className="analysis-section">
      {/* Background ambient glows */}
      <div className="analysis-glow-left" aria-hidden="true" />
      <div className="analysis-glow-right" aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row align-items-center analysis-row">

          {/* LEFT CONTENT */}
          <div className="col-lg-7">
            <div className="analysis-content">
              {/* TOP HEADING (Signature Blueritt Slate-to-Blue Gradient Text) */}
              <motion.h2
                className="analysis-top-heading"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                Make architectural decisions with confidence, not guesswork.
              </motion.h2>

              {/* MAIN HEADING */}
              <motion.h3
                className="analysis-main-heading"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.12 }}
              >
                TheNextIO helping you evaluate enterprise AI opportunities clearly before you invest.
              </motion.h3>

              {/* CTA CARD (Blueritt exact gradient-bordered card) */}
              <motion.div
                className="analysis-cta-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.22 }}
              >
                <p>Start deploying scalable AI architectures with real telemetry</p>
                <a href="#contact" className="analysis-btn">
                  <span>Start a Project</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE (Vector Pen Tool Curve + Huge Outlined Stat) */}
          <div className="col-lg-5">
            <div className="analysis-visual">
              {/* Animated Pen Tool Bezier Curve */}
              <div className="analysis-curve-wrap" aria-hidden="true">
                <svg
                  className="analysis-curve-svg"
                  viewBox="0 0 320 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Top-left anchor point */}
                  <rect x="18" y="18" width="8" height="8" fill="#FFFFFF" stroke="#00F0FF" strokeWidth="1.5" />
                  {/* Handle line */}
                  <line x1="22" y1="22" x2="160" y2="22" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 3" />
                  {/* Curved path */}
                  <path
                    d="M 22 22 C 220 22, 280 120, 290 200"
                    stroke="url(#curveGradient)"
                    strokeWidth="2"
                  />
                  {/* Target anchor point */}
                  <rect x="286" y="196" width="8" height="8" fill="#FF6200" stroke="#FFFFFF" strokeWidth="1.5" />
                  {/* Tangent handle line */}
                  <line x1="290" y1="200" x2="290" y2="30" stroke="rgba(255, 98, 0, 0.45)" strokeDasharray="3 3" />
                  <circle cx="290" cy="30" r="3" fill="#FF6200" />

                  <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="rgba(255,255,255,0.8)" />
                      <stop offset="100%" stopColor="#FF6200" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* HUGE OUTLINED STAT (Blueritt exact stroked typography) */}
              <motion.div
                className="analysis-stats"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                <h2 className="analysis-stat-number">50K+</h2>
                <p className="analysis-stat-label">AI Predictions Analysed</p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
