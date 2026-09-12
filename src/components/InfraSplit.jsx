import { useEffect, useRef, useState } from 'react'
import { LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion'
import infraSplitShader from '../shaders/infra-split.wgsl'
import VgpuCanvas from './VgpuCanvas'

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
      className="relative z-10 w-[min(100%,220px)] shrink-0"
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

function PacketBridge({ live }) {
  if (!live) {
    return <div className="hidden md:block flex-1 h-12" />
  }

  return (
    <div className="relative hidden md:flex flex-1 items-center self-center mx-2 h-12 min-w-[8rem]">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-[var(--color-amber)] via-[var(--color-line)] to-[var(--color-teal)] opacity-80" />
      <div className="ems-pkt ems-pkt-amber" style={{ animationDelay: '0s' }} />
      <div className="ems-pkt ems-pkt-amber" style={{ animationDelay: '0.62s' }} />
      <div className="ems-pkt ems-pkt-teal" style={{ animationDelay: '0.2s' }} />
      <div className="ems-pkt ems-pkt-teal" style={{ animationDelay: '0.95s' }} />
      <span className="absolute left-1/2 -top-1 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)]">
        queries
      </span>
    </div>
  )
}

export default function InfraSplit() {
  const reduce = useReducedMotion()
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { once: true, margin: '-80px' })
  const [split, setSplit] = useState(Boolean(reduce))
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!inView || reduce) return undefined
    const t = setTimeout(() => setSplit(true), 700)
    return () => clearTimeout(t)
  }, [inView, reduce])

  const showGpu = !reduce && !failed

  return (
    <div ref={rootRef} className="relative mt-16 md:mt-20">
      <p className="font-mono text-[11px] text-[var(--color-muted)] mb-5">
        // two machines · store peels off the API · vendor cloud 0
      </p>

      <LayoutGroup>
        <div className="relative min-h-[240px] md:min-h-[280px]">
          {showGpu && (
            <VgpuCanvas
              shader={infraSplitShader}
              className="pointer-events-none absolute inset-0 hidden md:block h-full w-full opacity-70"
              blend="premultiplied"
              clearColor={[0, 0, 0, 0]}
              alphaMode="premultiplied"
              dpr={[1, 1.5]}
              onFail={() => setFailed(true)}
            />
          )}

          <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-0 md:px-[2%] pt-2 pb-4">
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

            <div className="md:hidden font-mono text-[10px] text-[var(--color-teal)] tracking-widest text-center">
              {split ? '↓ store moves off ↓' : 'splitting…'}
            </div>

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
        {split ? 'vendor cloud write  0' : 'vendor cloud still in the path…'}
      </motion.p>
    </div>
  )
}
