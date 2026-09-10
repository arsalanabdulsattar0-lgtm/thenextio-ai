import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import FlowField from './components/FlowField/FlowField'
import About from './components/About/About'
import ServicesSection from './components/Services/ServicesSection'
import PlatformSection from './components/Platform/PlatformSection'
import OurWork from './components/OurWork/OurWork'
import Technology from './components/Technology/Technology'
import Process from './components/Process/Process'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

export default function App() {
  const [view, setView] = useState<'home' | 'about'>(() => {
    return window.location.hash === '#about' || window.location.hash === '#/about'
      ? 'about'
      : 'home'
  })

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#about' || window.location.hash === '#/about') {
        setView('about')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (
        window.location.hash === '#top' ||
        window.location.hash === '' ||
        window.location.hash === '#/'
      ) {
        setView('home')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleNavigate = (page: 'home' | 'about') => {
    setView(page)
    window.location.hash = page === 'about' ? '/about' : 'top'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar currentView={view} onNavigate={handleNavigate} />
      <main>
        {view === 'home' ? (
          <>
            {/* 1. HERO: Rotating Capabilities Dashboard (Includes Integrated Clients Logo Strip) */}
            <Hero />

            {/* 2. ABOUT: 3D Stacking & Architecture Core */}
            <About />

            {/* 4. SERVICES: Unified 6-Module Technical Capabilities */}
            <ServicesSection />

            {/* 5. PRODUCTS: Enterprise AI & Cloud Product Platform */}
            <PlatformSection />

            {/* 6. PROJECTS: Case Studies & Production Architectures */}
            <OurWork />

            {/* 7. TECHNOLOGY & PROCESS */}
            <Technology />
            <Process />

            {/* 8. CONTACT: Consultation & Project Scope */}
            <Contact />
          </>
        ) : (
          <>
            {/* ABOUT VIEW: 3D FlowField Experience */}
            <FlowField theme="blueritt" />
            <About />
            <Technology />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
