import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WhatWeBuild.css'

const ease = [0.22, 1, 0.36, 1] as const

interface Service {
  id: string
  num: string
  title: string
  description: string
  tag: string
  windowTitle: string
}

const SERVICES: Service[] = [
  {
    id: 'ai-solutions',
    num: '01',
    title: 'AI SOLUTIONS',
    description: 'AI agents, generative AI, intelligent assistants and custom AI systems.',
    tag: 'Autonomous AI & LLM Systems',
    windowTitle: 'Thenextio AI Workspace — Session #4820',
  },
  {
    id: 'custom-software',
    num: '02',
    title: 'CUSTOM SOFTWARE',
    description: 'Business software and enterprise platforms built around specific requirements.',
    tag: 'Enterprise Core Platform',
    windowTitle: 'Enterprise Resource & Record Inspector',
  },
  {
    id: 'web-apps',
    num: '03',
    title: 'WEB APPLICATIONS',
    description: 'Modern, scalable web applications and digital platforms.',
    tag: 'Cloud Applications & SaaS Engine',
    windowTitle: 'Cloud Application Console — Production',
  },
  {
    id: 'mobile-apps',
    num: '04',
    title: 'MOBILE APPLICATIONS',
    description: 'Custom mobile experiences for iOS and Android.',
    tag: 'Native iOS & Android Applications',
    windowTitle: 'Mobile Native Architecture Preview',
  },
  {
    id: 'automation',
    num: '05',
    title: 'AUTOMATION',
    description: 'Automate repetitive workflows and connect business processes intelligently.',
    tag: 'Workflow Automation Pipeline',
    windowTitle: 'Event-Driven Workflow Orchestrator',
  },
  {
    id: 'bi',
    num: '06',
    title: 'BUSINESS INTELLIGENCE',
    description: 'Dashboards, analytics and data-driven business insights.',
    tag: 'Executive Analytics & BI Intelligence',
    windowTitle: 'Executive Intelligence & Revenue Telemetry',
  },
  {
    id: 'erp',
    num: '07',
    title: 'AI-POWERED ERP',
    description: 'Intelligent ERP and business management systems.',
    tag: 'Autonomous Enterprise ERP Suite',
    windowTitle: 'Enterprise ERP & Operations Management',
  },
]

export default function WhatWeBuild() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = SERVICES[activeIndex]

  return (
    <section id="what-we-build" className="wwb">
      <div className="wwb__backdrop" aria-hidden="true">
        <div className="wwb__ambient-glow" />
      </div>

      <div className="wwb__inner container">
        {/* Section Header */}
        <div className="wwb__header">
          <motion.p
            className="eyebrow wwb__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <span className="eyebrow-dot" />
            WHAT WE BUILD
          </motion.p>

          <h2 className="wwb__title">
            <span className="wwb__title-row">
              <motion.span
                className="wwb__title-inner"
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.9, ease, delay: 0.18 }}
              >
                TECHNOLOGY, BUILT
              </motion.span>
            </span>
            <span className="wwb__title-row">
              <motion.span
                className="wwb__title-inner"
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.9, ease, delay: 0.3 }}
              >
                AROUND THE WAY YOU WORK.
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Two-Sided Showcase Grid */}
        <div className="wwb__grid">
          {/* Left Column: Numbered Service List */}
          <div className="wwb__list" role="tablist">
            {SERVICES.map((service, index) => {
              const isActive = index === activeIndex
              return (
                <div
                  key={service.id}
                  className={`wwb__service-item ${isActive ? 'wwb__service-item--active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                >
                  <div className="wwb__service-header">
                    <span className="wwb__service-num">{service.num}</span>
                    <h3 className="wwb__service-title">{service.title}</h3>
                  </div>

                  {/* Description Expansion */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="wwb__service-desc">{service.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Right Column: Large Rich Product Showcase */}
          <div className="wwb__stage">
            <div className="wwb__stage-header">
              <div className="wwb__stage-controls" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="wwb__stage-titlebar">{active.windowTitle}</span>
              <span className="wwb__stage-badge">{active.tag}</span>
            </div>

            <div className="wwb__stage-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <ProductShowcase serviceId={active.id} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Rich Realistic Software UI Mockups for each service */
function ProductShowcase({ serviceId }: { serviceId: string }) {
  switch (serviceId) {
    case 'ai-solutions':
      return (
        <div className="showcase-ai">
          <div className="showcase-ai__chat">
            <div className="showcase-ai__user-msg">
              "Synthesize customer retention trends across Q3 cohorts and generate auto-remediation workflows."
            </div>

            <div className="showcase-ai__assistant">
              <div className="showcase-ai__meta">
                <span>Autonomous Agent Execution</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--text-2)' }}>184ms • Model: Claude 3.5 Sonnet</span>
              </div>
              <p className="showcase-ai__response">
                Analyzed 8,420 customer records. Identified 3 accounts showing drop in API usage. Created automated customer success tickets and drafted personalized re-engagement proposals.
              </p>
              <div className="showcase-ai__actions">
                <div className="showcase-ai__card">
                  <div className="showcase-ai__card-label">Identified Accounts</div>
                  <div className="showcase-ai__card-val">3 High Priority</div>
                </div>
                <div className="showcase-ai__card">
                  <div className="showcase-ai__card-label">Action Status</div>
                  <div className="showcase-ai__card-val" style={{ color: 'var(--copper)' }}>Dispatched to CRM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case 'custom-software':
      return (
        <div className="showcase-grid">
          <div className="showcase-grid__toolbar">
            <span className="showcase-grid__search">Filter: 1,420 Active Corporate Accounts</span>
            <span className="showcase-grid__btn">Export Report (.CSV)</span>
          </div>
          <div className="showcase-grid__table-wrap">
            <table className="showcase-grid__table">
              <thead>
                <tr>
                  <th>ACCOUNT ID</th>
                  <th>CLIENT ORG</th>
                  <th>SLA TIER</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontFamily: 'monospace', color: 'var(--text-0)' }}>CORP-1092</td>
                  <td>Apex Global Logistics</td>
                  <td>99.99% Enterprise</td>
                  <td><span className="showcase-pill">Operational</span></td>
                </tr>
                <tr>
                  <td style={{ fontFamily: 'monospace', color: 'var(--text-0)' }}>CORP-1093</td>
                  <td>Stratum FinTech Systems</td>
                  <td>Dedicated Cloud</td>
                  <td><span className="showcase-pill">Operational</span></td>
                </tr>
                <tr>
                  <td style={{ fontFamily: 'monospace', color: 'var(--text-0)' }}>CORP-1094</td>
                  <td>Vanguard Healthcare</td>
                  <td>HIPAA Compliant</td>
                  <td><span className="showcase-pill">Operational</span></td>
                </tr>
                <tr>
                  <td style={{ fontFamily: 'monospace', color: 'var(--text-0)' }}>CORP-1095</td>
                  <td>Nexus Dynamics Inc</td>
                  <td>High Throughput</td>
                  <td><span className="showcase-pill">Synced</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )

    case 'web-apps':
      return (
        <div className="showcase-web">
          <div className="showcase-web__tabs">
            <span className="showcase-web__tab showcase-web__tab--active">Overview</span>
            <span className="showcase-web__tab">Deployments</span>
            <span className="showcase-web__tab">API Gateway</span>
            <span className="showcase-web__tab">Team Members</span>
          </div>
          <div className="showcase-web__overview">
            <div className="showcase-web__stat">
              <div className="showcase-web__stat-label">Active Users</div>
              <div className="showcase-web__stat-val">128,400</div>
            </div>
            <div className="showcase-web__stat">
              <div className="showcase-web__stat-label">Monthly Volume</div>
              <div className="showcase-web__stat-val">$2.4M</div>
            </div>
            <div className="showcase-web__stat">
              <div className="showcase-web__stat-label">Uptime</div>
              <div className="showcase-web__stat-val" style={{ color: 'var(--copper)' }}>99.99%</div>
            </div>
          </div>
          <div className="showcase-web__activity">
            <div className="showcase-web__activity-item">
              <span>Production build deployed to 12 edge locations</span>
              <span style={{ color: 'var(--copper)', fontFamily: 'monospace' }}>Just now</span>
            </div>
            <div className="showcase-web__activity-item">
              <span>Automated database failover verified — 0ms downtime</span>
              <span style={{ color: 'var(--text-2)', fontFamily: 'monospace' }}>2m ago</span>
            </div>
          </div>
        </div>
      )

    case 'mobile-apps':
      return (
        <div className="showcase-mobile">
          <div className="showcase-mobile__device">
            <div className="showcase-mobile__status">
              <span>9:41</span>
              <span>5G 100%</span>
            </div>
            <div className="showcase-mobile__box">
              <div className="showcase-mobile__box-title">Executive Approval</div>
              <div className="showcase-mobile__box-desc">Purchase Order #8491 • $140,000</div>
            </div>
            <div className="showcase-mobile__box">
              <div className="showcase-mobile__box-title">Biometric Auth</div>
              <div className="showcase-mobile__box-desc">Face ID Verified • Encrypted</div>
            </div>
            <div className="showcase-mobile__cta">
              Authorize Transaction
            </div>
          </div>

          <div className="showcase-mobile__device">
            <div className="showcase-mobile__status">
              <span>9:41</span>
              <span>Live Sync</span>
            </div>
            <div className="showcase-mobile__box">
              <div className="showcase-mobile__box-title">Live Revenue</div>
              <div className="showcase-mobile__box-desc" style={{ color: 'var(--copper)', fontWeight: 600 }}>+$48,200 today</div>
            </div>
            <div className="showcase-mobile__box">
              <div className="showcase-mobile__box-title">Pending Tasks</div>
              <div className="showcase-mobile__box-desc">4 team approvals remaining</div>
            </div>
            <div className="showcase-mobile__cta" style={{ background: 'var(--bg-2)', color: 'var(--text-0)', border: '1px solid var(--line)' }}>
              View Analytics
            </div>
          </div>
        </div>
      )

    case 'automation':
      return (
        <div className="showcase-auto">
          <div className="showcase-auto__step">
            <div className="showcase-auto__step-left">
              <span className="showcase-auto__badge">TRIGGER</span>
              <span className="showcase-auto__title">New Customer Contract Signed (DocuSign Webhook)</span>
            </div>
            <span className="showcase-auto__status" style={{ color: 'var(--copper)' }}>Instant</span>
          </div>

          <div className="showcase-auto__line" />

          <div className="showcase-auto__step">
            <div className="showcase-auto__step-left">
              <span className="showcase-auto__badge">AI ACTION</span>
              <span className="showcase-auto__title">Extract Terms, Billing Cycle &amp; Generate Provisioning Keys</span>
            </div>
            <span className="showcase-auto__status">Processed</span>
          </div>

          <div className="showcase-auto__line" />

          <div className="showcase-auto__step">
            <div className="showcase-auto__step-left">
              <span className="showcase-auto__badge">ERP SYNC</span>
              <span className="showcase-auto__title">Update General Ledger &amp; Notify Account Executive via Slack</span>
            </div>
            <span className="showcase-auto__status" style={{ color: 'var(--copper)' }}>Completed</span>
          </div>
        </div>
      )

    case 'bi':
      return (
        <div className="showcase-bi">
          <div className="showcase-bi__cards">
            <div className="showcase-bi__card">
              <div className="showcase-bi__card-title">Annual Recurring Revenue</div>
              <div className="showcase-bi__card-num">$4.85M</div>
              <div className="showcase-bi__card-trend">+28.4% YoY Growth</div>
            </div>
            <div className="showcase-bi__card">
              <div className="showcase-bi__card-title">Net Dollar Retention</div>
              <div className="showcase-bi__card-num">132%</div>
              <div className="showcase-bi__card-trend">Top Decile SaaS Benchmark</div>
            </div>
          </div>

          <div className="showcase-bi__chart-box">
            <div className="showcase-bi__chart-header">
              <span>Quarterly ARR Growth ($ Millions)</span>
              <span style={{ color: 'var(--copper)' }}>Q1–Q4 Telemetry</span>
            </div>
            <div className="showcase-bi__bars">
              <div className="showcase-bi__bar" style={{ height: '35%' }} />
              <div className="showcase-bi__bar" style={{ height: '48%' }} />
              <div className="showcase-bi__bar" style={{ height: '62%' }} />
              <div className="showcase-bi__bar" style={{ height: '78%' }} />
              <div className="showcase-bi__bar" style={{ height: '90%' }} />
              <div className="showcase-bi__bar" style={{ height: '100%' }} />
            </div>
          </div>
        </div>
      )

    case 'erp':
      return (
        <div className="showcase-erp">
          <div className="showcase-erp__card">
            <div>
              <div className="showcase-erp__header">Autonomous Inventory &amp; Supply Forecasting</div>
              <div className="showcase-erp__desc">Predictive model forecasted Q4 demand with 98.4% accuracy</div>
            </div>
            <span className="showcase-erp__status">Automated</span>
          </div>

          <div className="showcase-erp__card">
            <div>
              <div className="showcase-erp__header">Multi-Entity General Ledger &amp; Currency Settlement</div>
              <div className="showcase-erp__desc">Automated reconciliation across 8 global currency accounts</div>
            </div>
            <span className="showcase-erp__status">Reconciled</span>
          </div>

          <div className="showcase-erp__card">
            <div>
              <div className="showcase-erp__header">Procurement Authority Router</div>
              <div className="showcase-erp__desc">Dynamic threshold routing for cross-department capital expenditure</div>
            </div>
            <span className="showcase-erp__status">Active</span>
          </div>
        </div>
      )

    default:
      return null
  }
}
