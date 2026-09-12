import { useEffect, useState } from 'react'
import heroBgShader from '../shaders/hero-bg.wgsl'
import VgpuCanvas, { useWebGpuAvailable } from './VgpuCanvas'

function useDesktop() {
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

function FallbackGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -top-1/3 left-1/4 h-[70%] w-[55%] rounded-full bg-[var(--color-amber)]/10 blur-[100px]" />
      <div className="absolute -bottom-1/4 right-1/5 h-[60%] w-[50%] rounded-full bg-[var(--color-teal)]/8 blur-[90px]" />
    </div>
  )
}

export default function HeroBackground() {
  const desktop = useDesktop()
  const webgpu = useWebGpuAvailable()
  const useGpu = desktop && webgpu

  return (
    <>
      {!useGpu && <FallbackGlow />}
      {desktop && (
        <VgpuCanvas
          shader={heroBgShader}
          className="pointer-events-none absolute inset-0 h-full w-full"
          clearColor={[0.055, 0.062, 0.078, 1]}
          dpr={[1, 1.5]}
        />
      )}
    </>
  )
}
