import { useEffect, useRef } from 'react'

export default function Nav() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return undefined

    let raf = 0
    const sync = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      bar.style.transform = `scaleX(${p})`
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(sync)
    }

    sync()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="h-[2px] bg-[var(--color-line)]">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-teal)] will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 bg-[var(--color-bg)]/80 backdrop-blur-sm">
        <a href="/" className="flex items-center gap-2 font-[var(--font-display)] font-semibold text-lg tracking-tight">
          <img src="/logo-64.webp" alt="" width="28" height="28" className="size-7 shrink-0" />
          Inu<span className="text-[var(--color-amber)]">.</span>dev
        </a>
        <div className="hidden sm:flex items-center gap-8 font-mono text-xs text-[var(--color-muted)]">
          <a href="#ems" className="hover:text-[var(--color-text)] transition-colors cursor-pointer">case</a>
          <a href="#projects" className="hover:text-[var(--color-text)] transition-colors cursor-pointer">projects</a>
          <a href="#stack" className="hover:text-[var(--color-text)] transition-colors cursor-pointer">stack</a>
          <a href="#contact" className="hover:text-[var(--color-text)] transition-colors cursor-pointer">contact</a>
        </div>
      </nav>
    </header>
  )
}
