import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

interface NavbarProps {
  currentView?: 'home' | 'about'
  onNavigate?: (view: 'home' | 'about') => void
}

export default function Navbar({ currentView = 'home', onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  interface NavItem {
    label: string
    href: string
    sectionId: string
    view?: 'home' | 'about'
  }

  const navItems: NavItem[] = [
    { label: 'Services', href: '#services', sectionId: 'services' },
    { label: 'Projects', href: '#showcase', sectionId: 'showcase' },
    { label: 'Products', href: '#products', sectionId: 'products' },
    { label: 'Process', href: '#process', sectionId: 'process' },
    { label: 'About', href: '#about', sectionId: 'about', view: 'about' },
    { label: 'Contact', href: '#contact', sectionId: 'contact' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ScrollSpy to highlight active nav link
  useEffect(() => {
    const handleScrollSpy = () => {
      if (currentView === 'about') {
        setActiveSection('about')
        return
      }
      const sections = ['contact', 'process', 'showcase', 'products', 'services', 'about']
      const scrollPos = window.scrollY + 220

      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            return
          }
        }
      }
      if (window.scrollY < 250) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScrollSpy, { passive: true })
    handleScrollSpy()
    return () => window.removeEventListener('scroll', handleScrollSpy)
  }, [currentView])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const handleLinkClick = (item: NavItem) => {
    setMenuOpen(false)
    if (item.view && onNavigate) {
      onNavigate(item.view)
    } else if (currentView === 'about' && onNavigate) {
      onNavigate('home')
      setTimeout(() => {
        const el = document.querySelector(item.href)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      const el = document.querySelector(item.href)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`modern-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner">
        
        {/* 1. OUTER LEFT LOGO: Gracefully fades/slides towards center on scroll */}
        <div className={`navbar-brand ${scrolled ? 'is-hidden' : ''}`}>
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

        {/* 2. FLOATING PILL NAVBAR (Screenshot 1:1 Layout) */}
        <nav className="navbar-pill-nav" aria-label="Main Navigation">
          {/* Left Slot: Logo animates in symmetrically on scroll */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                key="pill-logo"
                className="pill-logo-wrap"
                initial={{ opacity: 0, width: 0, scale: 0.95 }}
                animate={{ opacity: 1, width: 140, scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.95 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="#top"
                  className="pill-logo-link"
                  onClick={(e) => {
                    e.preventDefault()
                    if (onNavigate) onNavigate('home')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  <span className="pill-logo-text">
                    thenextio<span className="pill-logo-dot">.ai</span>
                  </span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center Slot: All website links - ALWAYS LOCKED IN EXACT CENTER */}
          <div className="navbar-pill-links">
            {navItems.map((item) => {
              const isActive =
                (item.view === 'about' && currentView === 'about') ||
                activeSection === item.sectionId

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`navbar-pill-link ${isActive ? 'is-active' : ''}`}
                  onClick={(e) => {
                    if (item.view && onNavigate) {
                      e.preventDefault()
                    }
                    handleLinkClick(item)
                  }}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </nav>

        {/* 3. OUTER RIGHT ACTIONS */}
        <div className={`navbar-actions ${scrolled ? 'is-hidden' : ''}`}>
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
