import { lazy, Suspense } from 'react'
import { useGpuOk } from '../hooks/useDesktop'

const HeroGpu = lazy(() => import('./HeroGpu'))

function MobileGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,180,84,0.07),transparent_55%)]" />
    </div>
  )
}

export default function HeroBackground() {
  const gpuOk = useGpuOk()

  if (!gpuOk) return <MobileGlow />

  return (
    <Suspense fallback={<MobileGlow />}>
      <HeroGpu />
    </Suspense>
  )
}
