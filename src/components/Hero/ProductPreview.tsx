import './ProductPreview.css'

const NAV_ITEMS = [
  { label: 'AI Assistant', active: true },
  { label: 'Workflows' },
  { label: 'Analytics' },
  { label: 'Tasks' },
  { label: 'Data' },
  { label: 'Activity' },
  { label: 'Automations' },
  { label: 'Insights' },
]

const BARS = [38, 62, 46, 81, 58, 70, 90]

const ACTIVITY = [
  { label: 'Invoice batch processed', time: '2m' },
  { label: 'New lead synced from form', time: '14m' },
  { label: 'Weekly report generated', time: '1h' },
]

export default function ProductPreview() {
  return (
    <div className="preview">
      <div className="preview__titlebar">
        <div className="preview__dots">
          <span />
          <span />
          <span />
        </div>
        <span className="preview__titlebar-name">AI Workspace</span>
        <span className="preview__titlebar-tag">Project Overview</span>
      </div>

      <div className="preview__body">
        <aside className="preview__nav">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`preview__nav-item ${item.active ? 'preview__nav-item--active' : ''}`}
            >
              {item.label}
            </div>
          ))}
        </aside>

        <div className="preview__main">
          <div className="preview__chat">
            <div className="preview__bubble preview__bubble--user">
              What were last week&rsquo;s top three sources of returning customers?
            </div>
            <div className="preview__bubble preview__bubble--ai">
              Email campaigns, the loyalty app, and referral links — in that order. Referrals grew
              18% week over week.
            </div>
          </div>

          <div className="preview__grid">
            <div className="preview__card preview__card--chart">
              <div className="preview__card-label">Weekly activity</div>
              <div className="preview__chart">
                {BARS.map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="preview__card preview__card--activity">
              <div className="preview__card-label">Recent activity</div>
              <ul className="preview__activity">
                {ACTIVITY.map((item) => (
                  <li key={item.label}>
                    <span className="preview__activity-dot" />
                    <span className="preview__activity-label">{item.label}</span>
                    <span className="preview__activity-time">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
