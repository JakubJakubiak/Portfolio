import { useEffect, useState } from 'react'

export default function Nav() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? scrolled / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="h-[2px] bg-[var(--color-line)]">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-teal)] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-sm">
        <a href="#" className="font-[var(--font-display)] font-semibold text-lg tracking-tight">
          Inu<span className="text-[var(--color-amber)]">.</span>dev
        </a>
        <div className="hidden sm:flex items-center gap-8 font-mono text-xs text-[var(--color-muted)]">
          <a href="#projects" className="hover:text-[var(--color-text)] transition-colors cursor-pointer">projects</a>
          <a href="#stack" className="hover:text-[var(--color-text)] transition-colors cursor-pointer">stack</a>
          <a href="#contact" className="hover:text-[var(--color-text)] transition-colors cursor-pointer">contact</a>
        </div>
      </nav>
    </header>
  )
}
