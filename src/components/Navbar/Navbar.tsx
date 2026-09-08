import { useState, useEffect } from 'react'
import './Navbar.css'

interface NavbarProps {
  currentView?: 'home' | 'about'
  onNavigate?: (view: 'home' | 'about') => void
}

export default function Navbar({ currentView = 'home', onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#top', view: 'home' as const },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about', view: 'about' as const },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#ai' },
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
    <header className={`blueritt-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container-fluid header-inner">
        {/* LOGO */}
        <div className="header-brand-wrap">
          <a
            href="#top"
            className="header-logo"
            onClick={(e) => {
              e.preventDefault()
              if (onNavigate) {
                onNavigate('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
              setMenuOpen(false)
            }}
          >
            <span className="logo-text">
              thenextio<span className="logo-accent">.ai</span>
            </span>
          </a>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="header-nav" aria-label="Main Navigation">
          <ul className="main-menu">
            {navItems.map((item) => {
              const isActive =
                (item.view === 'home' && currentView === 'home') ||
                (item.view === 'about' && currentView === 'about')

              return (
                <li key={item.label} className={`menu-item ${isActive ? 'active' : ''}`}>
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
              )
            })}
          </ul>
        </nav>

        {/* RIGHT ACTION BUTTON */}
        <div className="header-actions">
          <a href="#contact" className="header-btn signup-btn">
            Start a project ↗
          </a>

          {/* Mobile hamburger */}
          <button
            className={`menu-toggle-btn ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {menuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-top">
            <span className="logo-text">
              thenextio<span className="logo-accent">.ai</span>
            </span>
            <button
              className="mobile-nav-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <ul className="mobile-menu-list">
            {navItems.map((item) => {
              const isActive =
                (item.view === 'home' && currentView === 'home') ||
                (item.view === 'about' && currentView === 'about')

              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={isActive ? 'active' : ''}
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
              )
            })}
          </ul>
          <div className="mobile-nav-actions">
            <a href="#contact" className="header-btn signup-btn" onClick={() => setMenuOpen(false)}>
              Start a project ↗
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
