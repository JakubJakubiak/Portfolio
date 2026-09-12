import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'

const EmsCase = lazy(() => import('./components/EmsCase'))
const Projects = lazy(() => import('./components/Projects'))
const Stack = lazy(() => import('./components/Stack'))
const Contact = lazy(() => import('./components/Contact'))

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-[var(--font-body)] selection:bg-[var(--color-amber)]">
      <Nav />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <EmsCase />
          <Projects />
          <Stack />
          <Contact />
        </Suspense>
      </main>
    </div>
  )
}
