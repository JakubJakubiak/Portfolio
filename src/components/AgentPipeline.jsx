import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { pipeline } from '../data/projects'
import { usePipelineSignal } from '../hooks/usePipelineSignal'
import { useGpuOk } from '../hooks/useDesktop'

const PipelineFlow = lazy(() => import('./PipelineFlow'))

function useCompact() {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const sync = () => setCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return compact
}

function PipelineNode({ step, cx, index, accent, compact }) {
  const isAmber = index % 2 === 0
  const cy = compact ? 52 : 80
  const r = compact ? 18 : 22

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.35 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="var(--color-surface)"
        stroke={accent}
        strokeWidth="1.6"
        style={
          compact
            ? undefined
            : {
                filter: isAmber
                  ? 'drop-shadow(0 0 10px var(--color-amber))'
                  : 'drop-shadow(0 0 10px var(--color-teal))',
              }
        }
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={compact ? 11 : 12}
        fill="var(--color-text)"
      >
        {step.id}
      </text>
      <text
        x={cx}
        y={compact ? 88 : 126}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={compact ? 12 : 14}
        fontWeight="600"
        fill="var(--color-text)"
      >
        {step.label}
      </text>
      {!compact && (
        <text
          x={cx}
          y={144}
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontSize="11"
          fill="var(--color-muted)"
        >
          {step.detail}
        </text>
      )}
    </motion.g>
  )
}

function NeonTrack({ padding, innerWidth, compact }) {
  const { progress, forward } = usePipelineSignal(true)
  const barW = compact ? 44 : 80
  const barX = padding + progress * (innerWidth - barW)
  const trailForwardW = Math.max(0, barX + barW - padding)
  const trailBackwardX = barX
  const trailBackwardW = Math.max(0, padding + innerWidth - barX)
  const y = compact ? 44 : 72

  return (
    <>
      <defs>
        <linearGradient id="pipeline-neon" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.25" />
          <stop offset="50%" stopColor="var(--color-amber)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="pipeline-trail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.08" />
          <stop offset="85%" stopColor="var(--color-amber)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="pipeline-trail-back" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.08" />
          <stop offset="85%" stopColor="var(--color-amber)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0.55" />
        </linearGradient>
        <filter id="pipeline-line-glow" x="-20%" y="-250%" width="140%" height="600%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pipeline-bar-glow" x="-80%" y="-300%" width="260%" height="700%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x={padding}
        y={y}
        width={innerWidth}
        height={16}
        rx={8}
        fill="var(--color-surface-2)"
        stroke="url(#pipeline-neon)"
        strokeWidth="2"
        filter="url(#pipeline-line-glow)"
        opacity={0.95}
      />
      <rect
        x={padding + 3}
        y={y + 3}
        width={innerWidth - 6}
        height={10}
        rx={5}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="1"
        opacity={0.6}
      />
      {forward && trailForwardW > 2 && (
        <rect
          x={padding}
          y={y + 3}
          width={trailForwardW}
          height={10}
          rx={5}
          fill="url(#pipeline-trail)"
          opacity={0.85}
        />
      )}
      {!forward && trailBackwardW > 2 && (
        <rect
          x={trailBackwardX}
          y={y + 3}
          width={trailBackwardW}
          height={10}
          rx={5}
          fill="url(#pipeline-trail-back)"
          opacity={0.85}
        />
      )}
      <rect
        x={barX}
        y={y + 2}
        width={barW}
        height={12}
        rx={6}
        fill="var(--color-amber)"
        filter="url(#pipeline-bar-glow)"
        opacity={0.55 + Math.sin(progress * Math.PI) * 0.4}
      />
    </>
  )
}

export default function AgentPipeline() {
  const compact = useCompact()
  const gpuOk = useGpuOk()
  const nodeCount = pipeline.length
  const padding = compact ? 36 : 72
  const innerWidth = compact ? 488 : 852
  const height = compact ? 108 : 160
  const width = innerWidth + padding * 2
  const gap = innerWidth / (nodeCount - 1)

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        {gpuOk && (
          <Suspense fallback={null}>
            <PipelineFlow />
          </Suspense>
        )}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="pointer-events-none absolute inset-0 z-[6] h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <NeonTrack padding={padding} innerWidth={innerWidth} compact={compact} />
        </svg>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0 z-10 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Agent pipeline diagram: Input, Retrieve, Reason, Act, Output"
        >
          {pipeline.map((step, i) => (
            <PipelineNode
              key={step.id}
              step={step}
              cx={padding + i * gap}
              index={i}
              accent={i % 2 === 0 ? 'var(--color-amber)' : 'var(--color-teal)'}
              compact={compact}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
