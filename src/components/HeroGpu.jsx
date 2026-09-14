import heroBgShader from '../shaders/hero-bg.wgsl'
import VgpuCanvas, { useWebGpuAvailable } from './VgpuCanvas'

function FallbackGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-1/3 left-1/4 h-[70%] w-[55%] rounded-full bg-[var(--color-amber)]/10 blur-[100px]" />
      <div className="absolute -bottom-1/4 right-1/5 h-[60%] w-[50%] rounded-full bg-[var(--color-teal)]/8 blur-[90px]" />
    </div>
  )
}

export default function HeroGpu() {
  const webgpu = useWebGpuAvailable()
  const useGpu = Boolean(webgpu)

  return (
    <>
      {!useGpu && <FallbackGlow />}
      <VgpuCanvas
        shader={heroBgShader}
        className="pointer-events-none absolute inset-0 h-full w-full"
        clearColor={[0.055, 0.062, 0.078, 1]}
        pauseOnScroll
      />
    </>
  )
}
