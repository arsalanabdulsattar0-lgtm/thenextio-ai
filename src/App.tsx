import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import FlowField from './components/FlowField/FlowField'
import About from './components/About/About'
import BuiltFor from './components/BuiltFor/BuiltFor'
import AnalysisSection from './components/Analysis/AnalysisSection'
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
            {/* HOME: Blueritt-identical Rotating Dashboard Hero */}
            <Hero />
            <About />
            <BuiltFor />
            <AnalysisSection />
            <PlatformSection />
            <OurWork />
            <Technology />
            <Process />
            <Contact />
          </>
        ) : (
          <>
            {/* ABOUT: 3D FlowField Hero in Blueritt Theme */}
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
