import { useEffect, useState } from 'react'
import { isPageScrolling } from './isPageScrolling'

const DURATION = 4.2

/** Ping-pong 0→1→0 — no jump when reversing at the ends. */
function pingPong(t) {
  const loop = t % 1
  return loop < 0.5 ? loop * 2 : 2 - loop * 2
}

export function usePipelineSignal(enabled = true) {
  const [progress, setProgress] = useState(0)
  const [forward, setForward] = useState(true)

  useEffect(() => {
    if (!enabled) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    let raf = 0
    const start = performance.now()

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      if (document.hidden || isPageScrolling()) return

      const linear = ((now - start) / 1000 / DURATION) % 1
      const next = pingPong(linear)
      const going = linear < 0.5
      setProgress((prev) => (Math.abs(prev - next) > 0.004 ? next : prev))
      setForward((prev) => (prev === going ? prev : going))
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled])

  const leadX = 0.04 + progress * 0.92

  const nodeActivation = (index, total) => {
    const nodeX = 0.04 + (index / (total - 1)) * 0.92
    return Math.exp(-(((leadX - nodeX) / 0.05) ** 2))
  }

  return { progress, forward, leadX, nodeActivation, duration: DURATION }
}
