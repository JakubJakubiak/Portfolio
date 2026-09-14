import { useEffect, useState } from 'react'

export function canUseGpuFx() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 767px)').matches) return false
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return false
  return true
}

export function useDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return desktop
}

export function useGpuOk() {
  const [ok, setOk] = useState(canUseGpuFx)

  useEffect(() => {
    const sync = () => setOk(canUseGpuFx())
    const q = [
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(hover: none) and (pointer: coarse)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ]
    q.forEach((mq) => mq.addEventListener('change', sync))
    sync()
    return () => q.forEach((mq) => mq.removeEventListener('change', sync))
  }, [])

  return ok
}
