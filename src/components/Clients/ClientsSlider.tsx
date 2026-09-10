import './ClientsSlider.css'

interface ClientBrand {
  id: string
  name: string
  svg: JSX.Element
}

const CLIENTS: ClientBrand[] = [
  {
    id: 'mclaren',
    name: 'McLaren',
    svg: (
      <svg viewBox="0 0 165 32" fill="currentColor" aria-label="McLaren">
        <text x="0" y="26" fontSize="30" fontWeight="900" fontStyle="italic" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">
          McLaren
        </text>
        <path d="M126 3 C142 0, 160 5, 164 16 C160 11, 146 7, 134 9 C126 11, 119 15, 115 19 C117 13, 121 7, 126 3 Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'pga',
    name: 'PGA OF AMERICA',
    svg: (
      <svg viewBox="0 0 54 54" fill="currentColor" aria-label="PGA OF AMERICA">
        <circle cx="27" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="27" cy="22" r="4.5" fill="currentColor" />
        <line x1="14" y1="35" x2="40" y2="9" stroke="currentColor" strokeWidth="2.5" />
        <line x1="14" y1="9" x2="40" y2="35" stroke="currentColor" strokeWidth="2.5" />
        <text x="27" y="44" fontSize="10.5" fontWeight="950" textAnchor="middle" letterSpacing="0.8px" fontFamily="system-ui, sans-serif">
          PGA
        </text>
        <text x="27" y="52" fontSize="6.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5px" fontFamily="system-ui, sans-serif">
          OF AMERICA
        </text>
      </svg>
    ),
  },
  {
    id: 'zapier',
    name: '_zapier',
    svg: (
      <svg viewBox="0 0 145 32" fill="currentColor" aria-label="_zapier">
        <rect x="0" y="22" width="18" height="6" fill="currentColor" rx="1.5" />
        <text x="24" y="27" fontSize="31" fontWeight="800" fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" letterSpacing="-0.5px">
          zapier
        </text>
      </svg>
    ),
  },
  {
    id: 'cribl',
    name: 'Cribl',
    svg: (
      <svg viewBox="0 0 145 32" fill="currentColor" aria-label="Cribl">
        <polygon points="2,3 28,16 2,29" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />
        <line x1="2" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="2.4" />
        <line x1="13" y1="8" x2="21" y2="22" stroke="currentColor" strokeWidth="2.4" />
        <line x1="13" y1="24" x2="21" y2="10" stroke="currentColor" strokeWidth="2.4" />
        <text x="36" y="26" fontSize="28" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.3px">
          Cribl
        </text>
      </svg>
    ),
  },
  {
    id: 'claas',
    name: 'CLAAS',
    svg: (
      <svg viewBox="0 0 170 34" fill="currentColor" aria-label="CLAAS">
        <text x="0" y="28" fontSize="38" fontWeight="1000" fontStyle="italic" fontFamily="'Arial Black', 'Impact', sans-serif" letterSpacing="2px">
          CLAAS
        </text>
      </svg>
    ),
  },
  {
    id: 'vialto',
    name: 'VIALTO PARTNERS',
    svg: (
      <svg viewBox="0 0 150 36" fill="currentColor" aria-label="VIALTO PARTNERS">
        <text x="0" y="22" fontSize="26" fontWeight="900" letterSpacing="2.5px" fontFamily="system-ui, -apple-system, sans-serif">
          VIALTO
        </text>
        <text x="2" y="34" fontSize="10" fontWeight="800" letterSpacing="4.5px" opacity="0.9" fontFamily="system-ui, -apple-system, sans-serif">
          PARTNERS
        </text>
      </svg>
    ),
  },
  {
    id: 'jersey-mikes',
    name: "Jersey Mike's",
    svg: (
      <svg viewBox="0 0 180 36" fill="currentColor" aria-label="Jersey Mike's">
        <text x="0" y="28" fontSize="32" fontWeight="900" fontStyle="italic" fontFamily="'Brush Script MT', 'Segoe Script', cursive, sans-serif" letterSpacing="0.5px">
          Jersey Mike's
        </text>
      </svg>
    ),
  },
]

export default function ClientsSlider() {
  const marqueeItems = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS]

  return (
    <section className="clients-section">
      {/* Infinite Smooth Ticker Strip with Edge Fades */}
      <div className="marquee-wrapper">
        <div className="marquee-fade marquee-fade-left" aria-hidden="true" />
        <div className="marquee-fade marquee-fade-right" aria-hidden="true" />

        <div className="marquee-track">
          {marqueeItems.map((client, idx) => (
            <div key={`${client.id}-${idx}`} className="client-logo-item" title={client.name}>
              {client.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
