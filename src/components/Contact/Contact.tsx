import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import './Contact.css'

const ease = [0.22, 1, 0.36, 1] as const

const WHAT_YOU_GET = [
  'Custom Enterprise AI & Model Integration',
  'Autonomous Multi-Agent Orchestration',
  'Mission-Critical Cloud & ERP Infrastructure',
  'High-Throughput Vector DB & RAG Pipelines',
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
    <section id="contact" className="contact-form-section">
      <div className="container">
        {/* SECTION TITLE */}
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="contact-section-title">
              <motion.div
                className="section-tag"
                initial={{ opacity: 0, y: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <span><strong>CONTACT US</strong></span>
              </motion.div>
              <h2>Start finding your next <span className="title-highlight">AI solution today</span></h2>
            </div>
          </div>
        </div>

        {/* CONTENT (2-Card Grid) */}
        <div className="row g-4 justify-content-center contact-cards-row">
          
          {/* LEFT CARD */}
          <div className="col-xl-3 col-lg-4">
            <div className="contact-info-card">
              <div>
                <h3>What You’ll Get</h3>
                <ul>
                  {WHAT_YOU_GET.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="contact-card-btn-wrap">
                <Button
                  href="#services"
                  variant="ghost"
                  fillColor="orange"
                  size="md"
                  onClick={handleScrollToServices}
                  className="theme-btn-standard"
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-xl-7 col-lg-8">
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
          </div>

        </div>
      </div>
    </section>
  )
}
