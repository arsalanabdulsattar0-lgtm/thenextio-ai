import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import FlowField from './components/FlowField/FlowField'
import About from './components/About/About'
import Services from './components/Services/Services'
import Products from './components/Products/Products'
import Showcase from './components/Showcase/Showcase'
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
            {/* 1. HERO */}
            <Hero />

            {/* 2. ABOUT */}
            <About />

            {/* 3. SERVICES */}
            <Services />

            {/* 4. PRODUCTS */}
            <Products />

            {/* 5. SHOWCASE */}
            <Showcase />

            {/* 6. PROCESS */}
            <Process />

            {/* 7. CONTACT */}
            <Contact />
          </>
        ) : (
          <>
            {/* ABOUT VIEW: 3D FlowField Experience */}
            <FlowField theme="blueritt" />
            <About />
            <Showcase />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
