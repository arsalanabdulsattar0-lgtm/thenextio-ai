import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import './BuiltFor.css'

const ease = [0.22, 1, 0.36, 1] as const

const BUILT_FOR_DATA = [
  {
    id: 'enterprises',
    title: 'Enterprise Corporations',
    desc: 'Modernize legacy IT architectures, scale proprietary generative AI models, and automate mission-critical workflows with zero downtime.',
    tag: 'Cloud & Legacy Modernization',
  },
  {
    id: 'startups',
    title: 'High-Growth Tech Startups',
    desc: 'Rapidly ship scalable AI products, serverless cloud microservices, and autonomous developer pipelines from seed stage to enterprise scale.',
    tag: 'Rapid AI Deployment',
  },
  {
    id: 'fintech',
    title: 'Fintech & Banking Systems',
    desc: 'Ultra-low latency data pipelines, real-time fraud detection neural networks, and high-frequency financial intelligence with SOC2 compliance.',
    tag: 'Zero-Latency Security',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    desc: 'HIPAA-compliant predictive analytics, encrypted patient telemetry, and secure diagnostic AI assistant workflows built for regulatory standards.',
    tag: 'Compliant Intelligence',
  },
  {
    id: 'retail',
    title: 'E-Commerce & Digital Retailers',
    desc: 'Algorithmic real-time pricing, autonomous supply chain demand forecasting, and cognitive customer recommendation engines.',
    tag: 'Predictive Commerce',
  },
]

export default function BuiltFor() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      {/* ── SECTION 1: WHO WE SERVE (Blueritt built-for-section standard) ── */}
      <section id="who-we-serve" className="bfor-section">
        {/* Background ambient glows (Hero exact) */}
        <div className="bfor-glow bfor-glow-left" aria-hidden="true" />
        <div className="bfor-glow bfor-glow-right" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* Header */}
          <div className="bfor-header">
            <motion.div
              className="section-tag"
              initial={{ opacity: 0, y: -14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <span><strong>WHO WE SERVE</strong></span>
            </motion.div>

            <motion.h2
              className="bfor-main-title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              Who TheNextIO <span className="gradient-text">Is Built For</span>
            </motion.h2>

            <motion.p
              className="bfor-main-sub"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.18 }}
            >
              Engineered for organizations demanding resilience, intelligent automation,
              and scalable Information Technology systems.
            </motion.p>
          </div>

          {/* List items */}
          <div className="bfor-list">
            {BUILT_FOR_DATA.map((item, idx) => (
              <motion.div
                key={item.id}
                className={`bfor-item${hoveredIndex === idx ? ' is-hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease, delay: idx * 0.07 }}
              >
                <div className="bfor-row">
                  <div className="bfor-left">
                    <span className="bfor-num">0{idx + 1}</span>
                    <div className="bfor-text">
                      <div className="bfor-title-row">
                        <h3 className="bfor-item-title">{item.title}</h3>
                        <span className="bfor-pill">{item.tag}</span>
                      </div>
                      <p className="bfor-item-desc">{item.desc}</p>
                    </div>
                  </div>
                  <div className="bfor-right">
                    <Button href="#contact" size="sm" fillColor="orange">
                      Learn more
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: FEATURE SPOTLIGHT CARD (Blueritt feature-card-section standard) ── */}
      <section className="fcard-section">
        {/* Radial glows (Blueritt exact) */}
        <div className="fcard-glow fcard-glow-left" aria-hidden="true" />
        <div className="fcard-glow fcard-glow-right" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className="fcard-wrapper"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="fcard-inner">
              {/* Left: copy */}
              <div className="fcard-col-text">
                <div className="fcard-badge">
                  <span className="fcard-badge-dot" />
                  Powered by TheNextIO AI &amp; Cloud Platform
                </div>

                <h2 className="fcard-heading">
                  Turn operational complexity into <span className="gradient-text">autonomous intelligence</span>
                </h2>

                <p className="fcard-para">
                  Architect, deploy, and govern production-grade AI systems, real-time data pipelines,
                  and mission-critical cloud infrastructure built for continuous enterprise scale and zero downtime.
                </p>

                <div className="fcard-metrics">
                  <div className="fcard-metric">
                    <span className="fcard-metric-val">99.99%</span>
                    <span className="fcard-metric-lbl">Uptime SLA</span>
                  </div>
                  <div className="fcard-metric-sep" />
                  <div className="fcard-metric">
                    <span className="fcard-metric-val">10x</span>
                    <span className="fcard-metric-lbl">Faster Deployment</span>
                  </div>
                  <div className="fcard-metric-sep" />
                  <div className="fcard-metric">
                    <span className="fcard-metric-val">12ms</span>
                    <span className="fcard-metric-lbl">Avg Latency</span>
                  </div>
                </div>

                <div className="fcard-actions">
                  <a href="#contact" className="fcard-btn-primary">Start an AI Project ↗</a>
                  <Button href="#who-we-serve" size="md" fillColor="orange" icon={false}>
                    Explore Capabilities
                  </Button>
                </div>
              </div>

              {/* Right: image mockup */}
              <div className="fcard-col-media">
                <div className="fcard-media-frame">
                  <img
                    src="/hero/slide-1.jpg"
                    alt="TheNextIO AI Cloud Platform Dashboard"
                    className="fcard-media-img"
                    loading="lazy"
                  />
                  <div className="fcard-media-shine" aria-hidden="true" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
