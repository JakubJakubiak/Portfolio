import Nav from './components/Nav'
import Hero from './components/Hero'
import EmsCase from './components/EmsCase'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-[var(--font-body)] selection:bg-[var(--color-amber)]">
      <Nav />
      <main>
        <Hero />
        <EmsCase />
        <Projects />
        <Stack />
        <Contact />
      </main>
    </div>
  )
}
