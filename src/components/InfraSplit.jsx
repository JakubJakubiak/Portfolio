import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion'
import { useGpuOk } from '../hooks/useDesktop'

const InfraSplitGpu = lazy(() => import('./InfraSplitGpu'))

function DockerLayer({ id, name, hot }) {
  return (
    <motion.div
      layoutId={id}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="rounded-md border px-2.5 py-1.5 font-mono text-[11px]"
      style={{
        borderColor: hot ? hot : 'var(--color-line)',
        color: hot ? 'var(--color-text)' : 'var(--color-muted)',
      }}
    >
      <span className="opacity-40 mr-2">docker</span>
      {name}
    </motion.div>
  )
}

function Rack({ title, subtitle, accent, children, reduce, from }) {
  const color = accent === 'teal' ? 'var(--color-teal)' : 'var(--color-amber)'

  return (
    <motion.div
      initial={reduce ? false : { x: from, opacity: 0.55 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.15 }}
      className="relative z-10 w-full md:w-[min(100%,220px)] shrink-0"
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2 text-center"
        style={{ color }}
      >
        {title}
      </p>
      <div className="rounded-xl bg-[var(--color-bg)]/85 px-3 py-3 space-y-1.5 min-h-[108px]">
        {children}
      </div>
      <p className="mt-2 text-center font-mono text-[10px] text-[var(--color-muted)]">
        {subtitle}
      </p>
    </motion.div>
  )
}

function PacketDots({ axis }) {
  const isY = axis === 'y'
  const a = isY ? 'ems-pkt-south' : 'ems-pkt-east'
  const b = isY ? 'ems-pkt-north' : 'ems-pkt-west'
  const pos = isY ? 'ems-pkt-y' : 'ems-pkt-x'

  return (
    <>
      <div className={`ems-pkt ems-pkt-amber ${pos} ${a}`} style={{ animationDelay: '0s' }} />
      <div className={`ems-pkt ems-pkt-amber ${pos} ${a}`} style={{ animationDelay: '0.62s' }} />
      <div className={`ems-pkt ems-pkt-teal ${pos} ${b}`} style={{ animationDelay: '0.2s' }} />
      <div className={`ems-pkt ems-pkt-teal ${pos} ${b}`} style={{ animationDelay: '0.95s' }} />
    </>
  )
}

function PacketBridge({ live }) {
  return (
    <>
      <div className="relative md:hidden h-14 w-full">
        {live && (
          <>
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[var(--color-amber)] via-[var(--color-line)] to-[var(--color-teal)] opacity-80" />
            <PacketDots axis="y" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-bg)] px-2 font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)]">
              queries
            </span>
          </>
        )}
      </div>
      <div className="relative hidden md:flex flex-1 items-center self-center mx-2 h-12 min-w-[8rem]">
        {live && (
          <>
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-[var(--color-amber)] via-[var(--color-line)] to-[var(--color-teal)] opacity-80" />
            <PacketDots axis="x" />
            <span className="absolute left-1/2 -top-1 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)]">
              queries
            </span>
          </>
        )}
      </div>
    </>
  )
}

export default function InfraSplit() {
  const reduce = useReducedMotion()
  const gpuOk = useGpuOk()
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { once: true, margin: '-80px' })
  const [split, setSplit] = useState(Boolean(reduce))
  const [gpuFail, setGpuFail] = useState(false)

  useEffect(() => {
    if (!inView || reduce) return undefined
    const t = setTimeout(() => setSplit(true), 700)
    return () => clearTimeout(t)
  }, [inView, reduce])

  const showGpu = gpuOk && !reduce && !gpuFail

  return (
    <div ref={rootRef} className="relative mt-16 md:mt-20">
      <p className="font-mono text-[11px] text-[var(--color-muted)] mb-5">
        // two machines · store peels off the API · 0 GB to vendor cloud
      </p>

      <LayoutGroup>
        <div className="relative min-h-[240px] md:min-h-[280px]">
          {showGpu && (
            <Suspense fallback={null}>
              <InfraSplitGpu onFail={() => setGpuFail(true)} />
            </Suspense>
          )}

          <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-0 md:px-[2%] pt-2 pb-4">
            <Rack
              reduce={reduce}
              accent="amber"
              title="API"
              subtitle={split ? 'lighter box' : 'one box · crowded'}
              from={reduce ? 0 : 72}
            >
              <DockerLayer id="layer-app" name="app" hot="var(--color-amber)" />
              <DockerLayer id="layer-workers" name="workers" />
              {!split && (
                <>
                  <DockerLayer id="layer-store" name="store" hot="var(--color-teal)" />
                  <DockerLayer id="layer-ingest" name="ingest" />
                </>
              )}
            </Rack>

            <PacketBridge live={split && !reduce} />

            <Rack
              reduce={reduce}
              accent="teal"
              title="Time-series"
              subtitle={split ? 'own machine' : '—'}
              from={reduce ? 0 : -72}
            >
              {split && (
                <>
                  <DockerLayer id="layer-store" name="store" hot="var(--color-teal)" />
                  <DockerLayer id="layer-ingest" name="ingest" />
                </>
              )}
            </Rack>
          </div>
        </div>
      </LayoutGroup>

      <motion.p
        className="mt-2 font-mono text-xs text-center md:text-left"
        animate={
          split
            ? { color: 'var(--color-teal)', opacity: 1 }
            : { color: 'var(--color-muted)', opacity: 0.7 }
        }
      >
        {split ? 'vendor cloud: 0 GB written' : 'vendor cloud still in the path…'}
      </motion.p>
    </div>
  )
}
