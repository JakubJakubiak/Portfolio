import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import WhenVisible from './components/WhenVisible'

const EmsCase = lazy(() => import('./components/EmsCase'))
const Projects = lazy(() => import('./components/Projects'))
const Stack = lazy(() => import('./components/Stack'))
const Contact = lazy(() => import('./components/Contact'))

function Gate({ minHeight, children }) {
  return (
    <WhenVisible minHeight={minHeight}>
      <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>
    </WhenVisible>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-[var(--font-body)] selection:bg-[var(--color-amber)]">
      <Nav />
      <main>
        <Hero />
        <Gate minHeight={720}>
          <EmsCase />
        </Gate>
        <Gate minHeight={900}>
          <Projects />
        </Gate>
        <Gate minHeight={520}>
          <Stack />
        </Gate>
        <Gate minHeight={420}>
          <Contact />
        </Gate>
      </main>
    </div>
  )
}
