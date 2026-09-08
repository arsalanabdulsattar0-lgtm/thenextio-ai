import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AiSolutions.css'

const ease = [0.22, 1, 0.36, 1] as const

interface Capability {
  id: string
  num: string
  title: string
  tagline: string
  description: string
  badge: string
}

const CAPABILITIES: Capability[] = [
  {
    id: 'ai-agents',
    num: '01',
    title: 'AI AGENTS',
    tagline: 'Autonomous Workflow & Task Execution',
    description: 'Autonomous multi-agent orchestration that coordinates research, code execution, and data operations with verified safety checks.',
    badge: 'Agent Mesh Active',
  },
  {
    id: 'generative-ai',
    num: '02',
    title: 'GENERATIVE AI',
    tagline: 'Enterprise Synthesis & Intelligent Assistant',
    description: 'Context-grounded assistant workspace capable of synthesizing complex unstructured datasets into actionable operational directives.',
    badge: 'Model v4.8 • Grounded',
  },
  {
    id: 'ai-automation',
    num: '03',
    title: 'AI AUTOMATION',
    tagline: 'End-to-End Business Workflows',
    description: 'Continuous event-driven automation pipelines connecting internal APIs, databases, and customer communications autonomously.',
    badge: '6 Triggers Active',
  },
  {
    id: 'document-ai',
    num: '04',
    title: 'DOCUMENT AI',
    tagline: 'Intelligent Parsing & Extraction',
    description: 'High-accuracy OCR and semantic entity extraction from unstructured PDFs, contracts, invoices, and financial records.',
    badge: 'Confidence 99.4%',
  },
  {
    id: 'computer-vision',
    num: '05',
    title: 'COMPUTER VISION',
    tagline: 'Visual Inspection & Spatial Intelligence',
    description: 'Edge-optimized neural vision for real-time defect detection, biometric verification, and spatial asset monitoring.',
    badge: '60 FPS Stream',
  },
  {
    id: 'predictive-analytics',
    num: '06',
    title: 'PREDICTIVE ANALYTICS',
    tagline: 'Forecasting & Anomaly Detection Engine',
    description: 'Time-series forecasting models and Bayesian anomaly detectors that predict demand shifts and supply bottlenecks proactively.',
    badge: 'Model Loss: 0.012',
  },
]

type GenTab = 'insights' | 'recommendations' | 'automations' | 'activity'

export default function AiSolutions() {
  const [activeCapId, setActiveCapId] = useState<string>('generative-ai')
  const [activeGenTab, setActiveGenTab] = useState<GenTab>('insights')

  const activeCap = CAPABILITIES.find((c) => c.id === activeCapId) || CAPABILITIES[1]

  return (
    <section id="ai-solutions" className="ai-sol">
      {/* Subtle backdrop glow */}
      <div className="ai-sol__backdrop" aria-hidden="true">
        <div className="ai-sol__ambient-glow" />
        <div className="ai-sol__grid-overlay" />
      </div>

      <div className="ai-sol__inner container">
        {/* Section Header */}
        <div className="ai-sol__header">
          <motion.p
            className="eyebrow ai-sol__eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <span className="eyebrow-dot" />
            AI SOLUTIONS
          </motion.p>

          <div className="ai-sol__title-wrap">
            <h2 className="ai-sol__title">
              <span className="ai-sol__title-row">
                <motion.span
                  className="ai-sol__title-inner"
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.85, ease, delay: 0.2 }}
                >
                  AI THAT DOES
                </motion.span>
              </span>
              <span className="ai-sol__title-row">
                <motion.span
                  className="ai-sol__title-inner ai-sol__title-inner--accent"
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.85, ease, delay: 0.3 }}
                >
                  THE WORK.
                </motion.span>
              </span>
            </h2>

            <motion.p
              className="ai-sol__description"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.75, ease, delay: 0.4 }}
            >
              From intelligent agents to computer vision and automation, we build
              AI systems that solve real business problems.
            </motion.p>
          </div>
        </div>

        {/* Central Main AI Product Workspace */}
        <motion.div
          className="ai-sol__workspace-container"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
        >
          <div className="ai-sol__workspace">
            {/* Top Workspace Bar */}
            <div className="ai-sol__window-bar">
              <div className="ai-sol__window-left">
                <div className="ai-sol__window-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="ai-sol__window-divider" />
                <span className="ai-sol__window-title">
                  Thenextio AI Workspace &mdash; <span className="ai-sol__window-sub">{activeCap.tagline}</span>
                </span>
              </div>

              <div className="ai-sol__window-status">
                <span className="ai-sol__pulse-dot" />
                <span className="ai-sol__status-text">{activeCap.badge}</span>
              </div>
            </div>

            {/* Dynamic AI Screen Content */}
            <div className="ai-sol__screen">
              <AnimatePresence mode="wait">
                {activeCapId === 'generative-ai' && (
                  <motion.div
                    key="gen-ai"
                    className="ai-view ai-view--gen"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    {/* Top Assistant Chat Stream */}
                    <div className="ai-chat">
                      <div className="ai-chat__bubble ai-chat__bubble--user">
                        <div className="ai-chat__avatar ai-chat__avatar--user">U</div>
                        <div className="ai-chat__content">
                          <p className="ai-chat__query">
                            &ldquo;Analyze our latest business data and identify the biggest opportunities.&rdquo;
                          </p>
                          <span className="ai-chat__meta">Enterprise Data Stream &bull; Connected (4 sources)</span>
                        </div>
                      </div>

                      <div className="ai-chat__bubble ai-chat__bubble--ai">
                        <div className="ai-chat__avatar ai-chat__avatar--ai">
                          <span className="ai-chat__ai-icon" />
                        </div>
                        <div className="ai-chat__content">
                          <div className="ai-chat__ai-head">
                            <span className="ai-chat__ai-name">THENEXTIO AI AGENT</span>
                            <span className="ai-chat__tag">Analysis Complete &bull; 420ms</span>
                          </div>

                          <div className="ai-card-grid">
                            <div className="ai-card ai-card--highlight">
                              <div className="ai-card__label">
                                <span className="ai-card__indicator" />
                                Key Insight
                              </div>
                              <p className="ai-card__text">
                                Revenue pipeline in enterprise accounts has a 38% conversion velocity spike when onboarding automation is initiated within 2 hours.
                              </p>
                            </div>

                            <div className="ai-card">
                              <div className="ai-card__label">Strategic Recommendation</div>
                              <p className="ai-card__text">
                                Deploy autonomous customer sync agents across CRM queues to eliminate 14 hours of manual data enrichment weekly.
                              </p>
                            </div>

                            <div className="ai-card">
                              <div className="ai-card__label">Immediate Action</div>
                              <div className="ai-card__action-row">
                                <span className="ai-card__action-chip">Trigger Auto-Sync Workflow</span>
                                <span className="ai-card__action-status">Ready to deploy</span>
                              </div>
                            </div>

                            <div className="ai-card">
                              <div className="ai-card__label">Supporting Telemetry</div>
                              <div className="ai-card__telemetry">
                                <div className="ai-telemetry-col">
                                  <span className="ai-telemetry-val">+$42.8k</span>
                                  <span className="ai-telemetry-lbl">Pipeline Gain</span>
                                </div>
                                <div className="ai-telemetry-sep" />
                                <div className="ai-telemetry-col">
                                  <span className="ai-telemetry-val">99.8%</span>
                                  <span className="ai-telemetry-lbl">Precision Rate</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Supporting Sub-Panels / Navigation */}
                    <div className="ai-subpanel">
                      <div className="ai-subpanel__tabs">
                        {(['insights', 'recommendations', 'automations', 'activity'] as GenTab[]).map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            className={`ai-subpanel__tab ${activeGenTab === tab ? 'ai-subpanel__tab--active' : ''}`}
                            onClick={() => setActiveGenTab(tab)}
                          >
                            {tab.toUpperCase()}
                          </button>
                        ))}
                      </div>

                      <div className="ai-subpanel__body">
                        {activeGenTab === 'insights' && (
                          <div className="ai-subpanel__row">
                            <span className="ai-subpanel__badge">Live Matrix</span>
                            <span className="ai-subpanel__info">
                              3 key bottlenecks flagged across ERP and inventory ingestion endpoints.
                            </span>
                            <span className="ai-subpanel__time">Updated 1m ago</span>
                          </div>
                        )}
                        {activeGenTab === 'recommendations' && (
                          <div className="ai-subpanel__row">
                            <span className="ai-subpanel__badge">Optimization</span>
                            <span className="ai-subpanel__info">
                              Migrate batch document reconciliation to streaming embedding worker pool.
                            </span>
                            <span className="ai-subpanel__time">Priority High</span>
                          </div>
                        )}
                        {activeGenTab === 'automations' && (
                          <div className="ai-subpanel__row">
                            <span className="ai-subpanel__badge">Pipeline</span>
                            <span className="ai-subpanel__info">
                              4 active autonomous webhooks running with zero human intervention required.
                            </span>
                            <span className="ai-subpanel__time">Operational</span>
                          </div>
                        )}
                        {activeGenTab === 'activity' && (
                          <div className="ai-subpanel__row">
                            <span className="ai-subpanel__badge">Audit Log</span>
                            <span className="ai-subpanel__info">
                              Autonomous task worker verified 1,280 schema mutations across PostgreSQL.
                            </span>
                            <span className="ai-subpanel__time">Just now</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeCapId === 'ai-agents' && (
                  <motion.div
                    key="ai-agents"
                    className="ai-view ai-view--agents"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <div className="ai-agent-layout">
                      <div className="ai-agent-main">
                        <div className="ai-agent-header">
                          <div className="ai-agent-header__left">
                            <span className="ai-agent-status-indicator" />
                            <div>
                              <div className="ai-agent-title">Autonomous Orchestration Agent #09</div>
                              <div className="ai-agent-sub">Goal: Synthesize multi-source quarterly metrics &amp; execute safe sync</div>
                            </div>
                          </div>
                          <span className="ai-tag-copper">State: Executing (Step 3/4)</span>
                        </div>

                        <div className="ai-agent-steps">
                          <div className="ai-agent-step ai-agent-step--done">
                            <span className="ai-agent-step__num">&#10003;</span>
                            <div className="ai-agent-step__body">
                              <span className="ai-agent-step__title">Ingest Postgres &amp; Snowflake Warehouses</span>
                              <span className="ai-agent-step__meta">Returned 48,290 verified data points &bull; 0.18s</span>
                            </div>
                          </div>

                          <div className="ai-agent-step ai-agent-step--done">
                            <span className="ai-agent-step__num">&#10003;</span>
                            <div className="ai-agent-step__body">
                              <span className="ai-agent-step__title">Vector Semantic Cross-Evaluation</span>
                              <span className="ai-agent-step__meta">Grounded against company compliance ontology</span>
                            </div>
                          </div>

                          <div className="ai-agent-step ai-agent-step--active">
                            <span className="ai-agent-step__num">3</span>
                            <div className="ai-agent-step__body">
                              <span className="ai-agent-step__title">Generating Predictive Dispatch Table</span>
                              <span className="ai-agent-step__meta">Synthesizing probability distributions...</span>
                            </div>
                            <span className="ai-pulse-dot" />
                          </div>

                          <div className="ai-agent-step ai-agent-step--pending">
                            <span className="ai-agent-step__num">4</span>
                            <div className="ai-agent-step__body">
                              <span className="ai-agent-step__title">Autonomous Safe API Commit</span>
                              <span className="ai-agent-step__meta">Awaiting validation checkpoint</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ai-agent-side">
                        <div className="ai-side-card">
                          <span className="ai-side-card__label">Active Subagents</span>
                          <div className="ai-subagent-item">
                            <span className="ai-subagent-dot" />
                            <span>Telemetry Ingest Subagent</span>
                          </div>
                          <div className="ai-subagent-item">
                            <span className="ai-subagent-dot" />
                            <span>Risk Assessment Subagent</span>
                          </div>
                          <div className="ai-subagent-item">
                            <span className="ai-subagent-dot" />
                            <span>Data Format Sanitizer</span>
                          </div>
                        </div>

                        <div className="ai-side-card ai-side-card--copper">
                          <span className="ai-side-card__label">Security Sandbox</span>
                          <p className="ai-side-card__desc">
                            All agent decisions execute in isolated, sandboxed environments with strict human-in-the-loop permissioning.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeCapId === 'ai-automation' && (
                  <motion.div
                    key="ai-automation"
                    className="ai-view ai-view--auto"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <div className="ai-pipeline">
                      <div className="ai-pipeline__header">
                        <span className="ai-pipeline__title">Enterprise Event Pipeline: Inbound Lead &amp; Contract Automation</span>
                        <span className="ai-tag-copper">Real-time Stream &bull; Active</span>
                      </div>

                      <div className="ai-pipeline__nodes">
                        <div className="ai-node">
                          <span className="ai-node__step">TRIGGER</span>
                          <div className="ai-node__title">Inbound Webhook</div>
                          <div className="ai-node__desc">Customer signs contract via portal</div>
                          <div className="ai-node__badge">200 OK &bull; Instant</div>
                        </div>

                        <div className="ai-node-connector" />

                        <div className="ai-node ai-node--active">
                          <span className="ai-node__step">AI EXTRACT</span>
                          <div className="ai-node__title">Document AI Parser</div>
                          <div className="ai-node__desc">Extracts terms, limits, SLAs &amp; IDs</div>
                          <div className="ai-node__badge">Confidence 99.8%</div>
                        </div>

                        <div className="ai-node-connector" />

                        <div className="ai-node">
                          <span className="ai-node__step">DECISION</span>
                          <div className="ai-node__title">Rule &amp; LLM Router</div>
                          <div className="ai-node__desc">Assigns tier &amp; routes to specialized team</div>
                          <div className="ai-node__badge">Tier Enterprise</div>
                        </div>

                        <div className="ai-node-connector" />

                        <div className="ai-node">
                          <span className="ai-node__step">DISPATCH</span>
                          <div className="ai-node__title">ERP &amp; CRM Sync</div>
                          <div className="ai-node__desc">Creates billing instance &amp; invites team</div>
                          <div className="ai-node__badge">Synchronized</div>
                        </div>
                      </div>

                      <div className="ai-pipeline__footer">
                        <div className="ai-pipeline__stat">
                          <span className="ai-pipeline__stat-num">0.42s</span>
                          <span className="ai-pipeline__stat-label">Average End-to-End Latency</span>
                        </div>
                        <div className="ai-pipeline__stat">
                          <span className="ai-pipeline__stat-num">100%</span>
                          <span className="ai-pipeline__stat-label">Audit Log Compliance</span>
                        </div>
                        <div className="ai-pipeline__stat">
                          <span className="ai-pipeline__stat-num">0</span>
                          <span className="ai-pipeline__stat-label">Manual Bottlenecks</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeCapId === 'document-ai' && (
                  <motion.div
                    key="document-ai"
                    className="ai-view ai-view--doc"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <div className="ai-doc-grid">
                      <div className="ai-doc-file">
                        <div className="ai-doc-file__header">
                          <div className="ai-doc-file__type">PDF</div>
                          <div className="ai-doc-file__meta">
                            <span className="ai-doc-file__name">Master_Service_Agreement_2026.pdf</span>
                            <span className="ai-doc-file__size">14 Pages &bull; Parsed in 310ms</span>
                          </div>
                        </div>

                        <div className="ai-doc-file__preview">
                          <div className="ai-doc-line" style={{ width: '85%' }} />
                          <div className="ai-doc-line ai-doc-line--highlight" style={{ width: '92%' }} />
                          <div className="ai-doc-line" style={{ width: '60%' }} />
                          <div className="ai-doc-line ai-doc-line--highlight" style={{ width: '78%' }} />
                          <div className="ai-doc-line" style={{ width: '40%' }} />
                        </div>
                      </div>

                      <div className="ai-doc-extracted">
                        <div className="ai-doc-extracted__title">
                          <span>Extracted Structured Entities</span>
                          <span className="ai-tag-copper">JSON Validated</span>
                        </div>

                        <div className="ai-doc-fields">
                          <div className="ai-doc-field">
                            <span className="ai-doc-field__k">Contract Party</span>
                            <span className="ai-doc-field__v">Acme Global Holdings Ltd</span>
                          </div>
                          <div className="ai-doc-field">
                            <span className="ai-doc-field__k">Effective Term</span>
                            <span className="ai-doc-field__v">36 Months (Auto-renew)</span>
                          </div>
                          <div className="ai-doc-field">
                            <span className="ai-doc-field__k">Total Contract Value</span>
                            <span className="ai-doc-field__v">$480,000 USD</span>
                          </div>
                          <div className="ai-doc-field">
                            <span className="ai-doc-field__k">SLA Guarantee</span>
                            <span className="ai-doc-field__v">99.95% Availability</span>
                          </div>
                          <div className="ai-doc-field">
                            <span className="ai-doc-field__k">Governing Law</span>
                            <span className="ai-doc-field__v">State of Delaware</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeCapId === 'computer-vision' && (
                  <motion.div
                    key="computer-vision"
                    className="ai-view ai-view--vision"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <div className="ai-vision-grid">
                      <div className="ai-vision-feed">
                        <div className="ai-vision-viewport">
                          <div className="ai-vision-corner ai-vision-corner--tl" />
                          <div className="ai-vision-corner ai-vision-corner--tr" />
                          <div className="ai-vision-corner ai-vision-corner--bl" />
                          <div className="ai-vision-corner ai-vision-corner--br" />

                          {/* Bounding box 1 */}
                          <div className="ai-bbox ai-bbox--primary">
                            <span className="ai-bbox__tag">Item ID #4810 &bull; 99.4% Match</span>
                          </div>

                          {/* Bounding box 2 */}
                          <div className="ai-bbox ai-bbox--secondary">
                            <span className="ai-bbox__tag">Defect Verification: Clear</span>
                          </div>

                          <div className="ai-vision-telemetry-overlay">
                            <span>CAM-04 &bull; 60 FPS</span>
                            <span>INSPECTION: PASS</span>
                          </div>
                        </div>
                      </div>

                      <div className="ai-vision-data">
                        <div className="ai-vision-data__title">
                          <span>Real-time Inference Stream</span>
                          <span className="ai-tag-copper">Edge Latency: 12ms</span>
                        </div>

                        <div className="ai-vision-detections">
                          <div className="ai-det-row">
                            <span className="ai-det-name">Surface Geometry Check</span>
                            <span className="ai-det-bar"><span style={{ width: '99%' }} /></span>
                            <span className="ai-det-val">99.2%</span>
                          </div>
                          <div className="ai-det-row">
                            <span className="ai-det-name">Component Alignment</span>
                            <span className="ai-det-bar"><span style={{ width: '97%' }} /></span>
                            <span className="ai-det-val">97.8%</span>
                          </div>
                          <div className="ai-det-row">
                            <span className="ai-det-name">Barcode / Serial OCR</span>
                            <span className="ai-det-bar"><span style={{ width: '100%' }} /></span>
                            <span className="ai-det-val">100%</span>
                          </div>
                        </div>

                        <div className="ai-vision-summary">
                          All 1,480 units checked in the last manufacturing shift passed automated defect validation.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeCapId === 'predictive-analytics' && (
                  <motion.div
                    key="predictive-analytics"
                    className="ai-view ai-view--predict"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <div className="ai-predict-grid">
                      <div className="ai-predict-chart-card">
                        <div className="ai-predict-chart-header">
                          <div>
                            <div className="ai-predict-chart-title">Demand Forecast &amp; Inventory Projection</div>
                            <div className="ai-predict-chart-sub">Bayesian Time-Series Model (95% Confidence Interval)</div>
                          </div>
                          <span className="ai-tag-copper">Next 90 Days</span>
                        </div>

                        <div className="ai-predict-bars">
                          <div className="ai-pbar"><div className="ai-pbar__fill" style={{ height: '42%' }} /><span className="ai-pbar__lbl">Jan</span></div>
                          <div className="ai-pbar"><div className="ai-pbar__fill" style={{ height: '54%' }} /><span className="ai-pbar__lbl">Feb</span></div>
                          <div className="ai-pbar"><div className="ai-pbar__fill" style={{ height: '61%' }} /><span className="ai-pbar__lbl">Mar</span></div>
                          <div className="ai-pbar"><div className="ai-pbar__fill" style={{ height: '70%' }} /><span className="ai-pbar__lbl">Apr</span></div>
                          <div className="ai-pbar ai-pbar--forecast"><div className="ai-pbar__fill" style={{ height: '82%' }} /><span className="ai-pbar__lbl">May*</span></div>
                          <div className="ai-pbar ai-pbar--forecast"><div className="ai-pbar__fill" style={{ height: '94%' }} /><span className="ai-pbar__lbl">Jun*</span></div>
                          <div className="ai-pbar ai-pbar--forecast"><div className="ai-pbar__fill" style={{ height: '98%' }} /><span className="ai-pbar__lbl">Jul*</span></div>
                        </div>
                      </div>

                      <div className="ai-predict-kpis">
                        <div className="ai-kpi-card">
                          <span className="ai-kpi-lbl">Predicted Demand Surge</span>
                          <span className="ai-kpi-val">+28.4%</span>
                          <span className="ai-kpi-sub">Q3 Seasonal Velocity</span>
                        </div>
                        <div className="ai-kpi-card">
                          <span className="ai-kpi-lbl">Stockout Risk Prevention</span>
                          <span className="ai-kpi-val">0.02%</span>
                          <span className="ai-kpi-sub">Auto-reorder configured</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Compact Interactive Capability Row / List */}
        <div className="ai-sol__capabilities-wrap">
          <div className="ai-sol__capabilities-heading">
            <span className="ai-sol__cap-title-hint">EXPLORE AI CAPABILITIES</span>
            <span className="ai-sol__cap-line" />
          </div>

          <div className="ai-sol__capabilities-grid">
            {CAPABILITIES.map((cap, index) => {
              const isActive = activeCapId === cap.id
              return (
                <motion.button
                  key={cap.id}
                  type="button"
                  className={`ai-sol__cap-card ${isActive ? 'ai-sol__cap-card--active' : ''}`}
                  onClick={() => setActiveCapId(cap.id)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease, delay: 0.08 * index }}
                >
                  <div className="ai-sol__cap-header">
                    <span className="ai-sol__cap-num">{cap.num}</span>
                    <span className="ai-sol__cap-name">{cap.title}</span>
                    <span className="ai-sol__cap-arrow" aria-hidden="true">&rarr;</span>
                  </div>

                  <p className="ai-sol__cap-desc">{cap.tagline}</p>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
