import { useState, useEffect } from 'react'
import './Navbar.css'

interface NavbarProps {
  currentView?: 'home' | 'about'
  onNavigate?: (view: 'home' | 'about') => void
}

export default function Navbar({ currentView = 'home', onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  interface NavItem {
    label: string
    href: string
    view?: 'home' | 'about'
  }

  const navItems: NavItem[] = [
    { label: 'About', href: '#about', view: 'about' },
    { label: 'Services', href: '#services' },
    { label: 'Products', href: '#products' },
    { label: 'Projects', href: '#projects' },
    { label: 'Technology', href: '#technology' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const handleLinkClick = (item: (typeof navItems)[number]) => {
    setMenuOpen(false)
    if (item.view && onNavigate) {
      onNavigate(item.view)
    } else if (currentView === 'about' && onNavigate) {
      onNavigate('home')
      setTimeout(() => {
        const el = document.querySelector(item.href)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <header className={`modern-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner container">
        
        {/* LOGO */}
        <div className="navbar-brand">
          <a
            href="#top"
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault()
              if (onNavigate) {
                onNavigate('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
              setMenuOpen(false)
            }}
          >
            <span className="logo-main">
              thenextio<span className="logo-dot">.ai</span>
            </span>
          </a>
        </div>

        {/* MINIMAL RIGHT-ALIGNED NAVIGATION WITH PIPE SEPARATORS */}
        <nav className="navbar-links-desktop" aria-label="Main Navigation">
          {navItems.map((item, index) => {
            const isActive =
              (item.view === 'home' && currentView === 'home') ||
              (item.view === 'about' && currentView === 'about')

            return (
              <div key={item.label} className="nav-item-wrapper">
                <a
                  href={item.href}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                  onClick={(e) => {
                    if (item.view && onNavigate) {
                      e.preventDefault()
                    }
                    handleLinkClick(item)
                  }}
                >
                  {item.label}
                </a>
                {index < navItems.length - 1 && (
                  <span className="nav-separator" aria-hidden="true">|</span>
                )}
              </div>
            )
          })}
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className={`navbar-toggle-btn ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {menuOpen && (
        <div className="navbar-mobile-drawer">
          <div className="mobile-drawer-top">
            <span className="logo-main">
              thenextio<span className="logo-dot">.ai</span>
            </span>
            <button
              className="mobile-drawer-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <ul className="mobile-drawer-list">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.view && onNavigate) {
                      e.preventDefault()
                    }
                    handleLinkClick(item)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-drawer-footer">
            <a 
              href="#contact" 
              className="mobile-cta-btn"
              onClick={() => setMenuOpen(false)}
            >
              Get started ↗
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
