import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { RotateCw } from 'lucide-react'
import { useElapsedMs, useTimedProgress } from '../hooks/useTimedProgress'

const R = 58
const C = 2 * Math.PI * R

const LOG_LINES = [
  { at: 0, kind: 'cmd', text: '$ qa overview --paint --compare' },
  { at: 90, kind: 'dim', text: 'concurrent probe' },
  { at: 260, kind: 'ok', text: 'after    query    260 ms' },
  { at: 260, kind: 'ok', text: 'after    paint    0.26 s' },
  { at: 3180, kind: 'warn', text: 'before   query    timeout  ~3 s' },
  { at: 3200, kind: 'warn', text: 'before   paint    18.52 s' },
  { at: 3480, kind: 'hi', text: 'speedup  71.2×    −18.26 s' },
  { at: 3900, kind: 'cmd', text: '$ infra split --time-series' },
  { at: 4100, kind: 'ok', text: 'store    own machine  (not on the API)' },
  { at: 4100, kind: 'ok', text: 'api      lighter     CPU/RAM back' },
  { at: 4300, kind: 'hi', text: 'vendor   cloud write  0' },
]

function formatClock(s) {
  if (s >= 10) return `${s.toFixed(1)}s`
  return `${s.toFixed(2)}s`
}

function Donut({ progress, accent, label, clock, done }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p
        className="font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ color: accent }}
      >
        {label}
      </p>
      <div className="relative size-[160px] overflow-visible">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[118px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: accent,
            opacity: 0.16 + progress * 0.28,
            filter: `blur(${18 + progress * 8}px)`,
          }}
        />
        <svg viewBox="0 0 140 140" className="relative z-[1] size-full -rotate-90" aria-hidden>
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="var(--color-surface-2)"
            strokeWidth="10"
          />
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
          />
        </svg>
        <div className="absolute inset-0 z-[2] rounded-full flex flex-col items-center justify-center">
          <span className="font-mono text-2xl tabular-nums tracking-tight">
            {formatClock(clock)}
          </span>
          <span className="font-mono text-[10px] text-[var(--color-muted)] mt-0.5">
            {done ? 'painted' : 'waiting'}
          </span>
        </div>
      </div>
    </div>
  )
}

function lineClass(kind) {
  if (kind === 'cmd') return 'text-[var(--color-text)]'
  if (kind === 'ok') return 'text-[var(--color-teal)]'
  if (kind === 'warn') return 'text-[var(--color-amber)]'
  if (kind === 'hi') return 'text-[var(--color-teal)] font-medium'
  return 'text-[var(--color-muted)]'
}

function ServerLog({ elapsed, reduce }) {
  const visible = LOG_LINES.filter((line) => elapsed >= line.at)
  const allIn = visible.length === LOG_LINES.length

  return (
    <div
      className="font-mono text-[13px] md:text-sm leading-7 min-h-[18rem]"
      aria-label="Timing probe output"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
        stdout
      </p>
      {visible.map((line, i) => (
        <p key={`${line.at}-${line.text}`} className={lineClass(line.kind)}>
          <span className="select-none text-[var(--color-muted)]/50 mr-3">
            {String(i + 1).padStart(2, '0')}
          </span>
          {line.text}
          {!reduce && i === visible.length - 1 && !allIn && (
            <span className="ems-cursor" aria-hidden />
          )}
        </p>
      ))}
      {allIn && !reduce && <span className="ems-cursor" aria-hidden />}
    </div>
  )
}

function RaceStage({ reduce }) {
  const stageRef = useRef(null)
  const inView = useInView(stageRef, { once: true, margin: '-80px' })
  const [runId, setRunId] = useState(0)
  const active = inView || reduce

  const before = useTimedProgress({
    active,
    reduced: reduce,
    animMs: 3200,
    displayTo: 18.5,
    runId,
  })
  const after = useTimedProgress({
    active,
    reduced: reduce,
    animMs: 260,
    displayTo: 0.26,
    runId,
  })
  const elapsed = useElapsedMs({
    active,
    reduced: reduce,
    runId,
    stopAfterMs: 4600,
  })

  return (
    <div ref={stageRef} className="relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-evenly gap-6 sm:gap-10"
        >
          <Donut
            progress={before.progress}
            accent="var(--color-amber)"
            label="Before"
            clock={before.clock}
            done={before.done}
          />
          <Donut
            progress={after.progress}
            accent="var(--color-teal)"
            label="After"
            clock={after.clock}
            done={after.done}
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
        >
          <ServerLog elapsed={reduce ? 99999 : elapsed} reduce={reduce} />
        </motion.div>
      </div>

      <div className="mt-8 flex justify-center lg:justify-start">
        <button
          type="button"
          onClick={() => setRunId((n) => n + 1)}
          className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full text-[var(--color-muted)] hover:text-[var(--color-teal)] transition-colors cursor-pointer"
        >
          <RotateCw size={12} />
          Replay wait
        </button>
      </div>
    </div>
  )
}

export default function EmsCase() {
  const reduce = useReducedMotion()

  return (
    <section
      id="ems"
      className="relative px-6 md:px-12 py-24 border-t border-[var(--color-line)] overflow-hidden scroll-mt-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-[var(--color-teal)]/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-[var(--color-amber)]/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-[var(--color-teal)] mb-4"
        >
          // production · energy dashboard
        </motion.p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[var(--font-display)] text-4xl md:text-6xl font-semibold tracking-tight text-balance mb-5"
        >
          19 seconds.
          <br />
          Then 0.26.
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl text-[var(--color-muted)] text-lg leading-relaxed mb-14"
        >
          Live operations panel for energy storage and industrial sites. Overview
          rings showed the right totals — they just took ~19 s to appear. Time-series
          on its own machine, not on the API — faster API box, no vendor-cloud lock-in.
        </motion.p>

        <RaceStage reduce={reduce} />
      </div>
    </section>
  )
}
