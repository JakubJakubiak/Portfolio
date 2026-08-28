import { motion } from 'framer-motion'
import { pipeline } from '../data/projects'

export default function AgentPipeline() {
  const nodeCount = pipeline.length
  const padding = 32
  const innerWidth = 900
  const width = innerWidth + padding * 2
  const gap = innerWidth / (nodeCount - 1)

  return (
    <div className="relative w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} 160`}
        className="w-full min-w-[680px] h-auto"
        role="img"
        aria-label="Agent pipeline diagram: Input, Retrieve, Reason, Act, Output"
      >
        {/* base line */}
        <line
          x1={padding}
          y1="80"
          x2={width - padding}
          y2="80"
          stroke="var(--color-line)"
          strokeWidth="2"
        />

        {/* traveling signal */}
        <motion.circle
          r="5"
          fill="var(--color-amber)"
          initial={{ cx: padding, cy: 80 }}
          animate={{ cx: width - padding, cy: 80 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 6px var(--color-amber))' }}
        />

        {pipeline.map((step, i) => {
          const cx = padding + i * gap
          return (
            <g key={step.id}>
              <motion.circle
                cx={cx}
                cy={80}
                r="22"
                fill="var(--color-surface)"
                stroke={i % 2 === 0 ? 'var(--color-amber)' : 'var(--color-teal)'}
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
              />
              <text
                x={cx}
                y={85}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="12"
                fill="var(--color-text)"
              >
                {step.id}
              </text>
              <text
                x={cx}
                y={126}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="14"
                fontWeight="600"
                fill="var(--color-text)"
              >
                {step.label}
              </text>
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
            </g>
          )
        })}
      </svg>
    </div>
  )
}
