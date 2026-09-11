import { useEffect, useState } from 'react'

/** Maps elapsed real time onto a display clock, then holds at `displayTo`. */
export function useTimedProgress({
  active,
  reduced,
  animMs,
  displayTo,
  runId,
}) {
  const [progress, setProgress] = useState(reduced ? 1 : 0)
  const [clock, setClock] = useState(reduced ? displayTo : 0)
  const [done, setDone] = useState(Boolean(reduced))

  useEffect(() => {
    if (!active) return undefined
    if (reduced) {
      setProgress(1)
      setClock(displayTo)
      setDone(true)
      return undefined
    }

    setProgress(0)
    setClock(0)
    setDone(false)

    const t0 = performance.now()
    let raf = 0

    const tick = (now) => {
      const elapsed = now - t0
      const p = Math.min(1, elapsed / animMs)
      setProgress(p)
      setClock(p * displayTo)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDone(true)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, reduced, animMs, displayTo, runId])

  return { progress, clock, done }
}

/** Shared clock for the paint race + server log. Stops after `stopAfterMs`. */
export function useElapsedMs({ active, reduced, runId, stopAfterMs = 4200 }) {
  const [ms, setMs] = useState(reduced ? stopAfterMs : 0)

  useEffect(() => {
    if (!active) return undefined
    if (reduced) {
      setMs(stopAfterMs)
      return undefined
    }

    setMs(0)
    const t0 = performance.now()
    let raf = 0

    const tick = (now) => {
      const elapsed = now - t0
      setMs(elapsed)
      if (elapsed < stopAfterMs) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, reduced, runId, stopAfterMs])

  return ms
}
