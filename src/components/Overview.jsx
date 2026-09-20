import { motion, useReducedMotion } from 'framer-motion'

const FOCUS = [
  {
    id: '01',
    code: 'INDUSTRIAL IoT & DISTRIBUTED',
    title: 'Distributed Systems',
    blurb:
      'Fault-tolerant backend infrastructure for reliable high-frequency telemetry streams in industrial plants and energy storage facilities.',
    Diagram: MeshDiagram,
  },
  {
    id: '02',
    code: 'AGENTIC STACKS & LLM',
    title: 'AI Integrations & Agents',
    blurb:
      'Agentic stacks on large language models: contextual retrieval, inference, and automated API execution.',
    Diagram: AgentDiagram,
  },
  {
    id: '03',
    code: 'TIME-SERIES DASHBOARDS',
    title: 'Live Operations Panels',
    blurb:
      'Low-latency live operations panels for energy parameters and production-line performance monitoring.',
    Diagram: ChartDiagram,
  },
  {
    id: '04',
    code: 'TECHNICAL MINIMALISM',
    title: 'Clean Architecture',
    blurb:
      'Performance, code simplicity, and data privacy as first-order constraints. Pragmatic architecture oriented toward industrial utility.',
    Diagram: LayersDiagram,
  },
]

const VALUES = [
  {
    id: '01',
    title: 'Performance',
    blurb:
      'Architectures optimized for real-time data throughput and minimal latency. Query execution speed and resource efficiency are primary design constraints.',
    Diagram: PerfDiagram,
    accent: 'var(--color-amber)',
  },
  {
    id: '02',
    title: 'Efficiency',
    blurb:
      'Concise, stable code without superfluous layers. Lower compute consumption and shorter processing paths in complex industrial environments.',
    Diagram: EffDiagram,
    accent: 'var(--color-teal)',
  },
  {
    id: '03',
    title: 'Data Privacy',
    blurb:
      'Secure processing at the network edge and strict isolation of operational data and AI models. Information security and privacy at every stage.',
    Diagram: PrivacyDiagram,
    accent: 'var(--color-amber)',
  },
]

function MeshDiagram() {
  return (
    <svg viewBox="0 0 220 88" className="h-[72px] w-full" aria-hidden>
      <line className="focus-link" x1="110" y1="44" x2="36" y2="18" />
      <line className="focus-link" x1="110" y1="44" x2="184" y2="18" />
      <line className="focus-link" x1="110" y1="44" x2="32" y2="70" />
      <line className="focus-link" x1="110" y1="44" x2="188" y2="70" />
      <circle className="focus-node" cx="36" cy="18" r="5" fill="var(--color-teal)" />
      <circle className="focus-node" cx="184" cy="18" r="5" fill="var(--color-teal)" style={{ animationDelay: '0.2s' }} />
      <circle className="focus-node" cx="32" cy="70" r="5" fill="var(--color-teal)" style={{ animationDelay: '0.4s' }} />
      <circle className="focus-node" cx="188" cy="70" r="5" fill="var(--color-teal)" style={{ animationDelay: '0.6s' }} />
      <circle cx="110" cy="44" r="8" fill="var(--color-amber)" />
      <circle className="focus-node" cx="110" cy="44" r="14" fill="none" stroke="var(--color-amber)" strokeWidth="1" />
      <text x="110" y="86" textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="8">
        plant · store · edge
      </text>
    </svg>
  )
}

function AgentDiagram() {
  const box = (x, label, hot) => (
    <g>
      <rect
        x={x}
        y="22"
        width="56"
        height="28"
        rx="6"
        fill="var(--color-bg)"
        stroke={hot ? 'var(--color-amber)' : 'var(--color-teal)'}
        strokeWidth="1.4"
      />
      <text
        x={x + 28}
        y="40"
        textAnchor="middle"
        fill="var(--color-text)"
        fontFamily="var(--font-mono)"
        fontSize="9"
      >
        {label}
      </text>
    </g>
  )

  return (
    <svg viewBox="0 0 220 88" className="h-[72px] w-full" aria-hidden>
      {box(8, 'RAG', false)}
      {box(82, 'LLM', true)}
      {box(156, 'API', false)}
      <text x="73" y="41" textAnchor="middle" fill="var(--color-muted)" fontSize="11">
        →
      </text>
      <text x="147" y="41" textAnchor="middle" fill="var(--color-muted)" fontSize="11">
        →
      </text>
      <text x="110" y="74" textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="8">
        retrieval · inference · execution
      </text>
    </svg>
  )
}

function ChartDiagram() {
  const pts = [
    [12, 58],
    [42, 46],
    [72, 50],
    [102, 28],
    [132, 34],
    [162, 18],
    [192, 22],
    [208, 14],
  ]
  return (
    <svg viewBox="0 0 220 88" className="h-[72px] w-full" aria-hidden>
      <line x1="12" y1="68" x2="208" y2="68" stroke="var(--color-line)" strokeWidth="1" />
      <polyline
        className="focus-spark"
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        points={pts.map((p) => p.join(',')).join(' ')}
      />
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === pts.length - 1 ? 3.5 : 2}
          fill={i === pts.length - 1 ? 'var(--color-amber)' : 'var(--color-teal)'}
        />
      ))}
      <text x="12" y="82" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="8">
        kW · real-time
      </text>
    </svg>
  )
}

function LayersDiagram() {
  const layers = [
    { y: 14, w: 196, label: 'presentation', dim: true },
    { y: 32, w: 168, label: 'adapters', dim: true },
    { y: 50, w: 140, label: 'domain', dim: false },
  ]
  return (
    <svg viewBox="0 0 220 88" className="h-[72px] w-full" aria-hidden>
      {layers.map((l) => (
        <g key={l.label}>
          <rect
            x={(220 - l.w) / 2}
            y={l.y}
            width={l.w}
            height="14"
            rx="3"
            fill={l.dim ? 'var(--color-surface-2)' : 'var(--color-amber)'}
            opacity={l.dim ? 0.55 : 1}
          />
          <text
            x="110"
            y={l.y + 11}
            textAnchor="middle"
            fill={l.dim ? 'var(--color-muted)' : '#0a0b0e'}
            fontFamily="var(--font-mono)"
            fontSize="8"
          >
            {l.label}
          </text>
        </g>
      ))}
      <text x="110" y="82" textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="8">
        reduce architectural layers
      </text>
    </svg>
  )
}

function PerfDiagram() {
  return (
    <svg viewBox="0 0 220 72" className="h-[64px] w-full" aria-hidden>
      <text x="0" y="18" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="8">
        before
      </text>
      <rect x="48" y="8" width="164" height="10" rx="2" fill="var(--color-surface-2)" />
      <text x="0" y="46" fill="var(--color-teal)" fontFamily="var(--font-mono)" fontSize="8">
        after
      </text>
      <rect className="focus-grow" x="48" y="36" width="42" height="10" rx="2" fill="var(--color-teal)" />
      <text x="96" y="45" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="8">
        71×
      </text>
    </svg>
  )
}

function EffDiagram() {
  return (
    <svg viewBox="0 0 220 72" className="h-[64px] w-full" aria-hidden>
      {['cpu', 'ram', 'io'].map((label, i) => {
        const w = [48, 78, 36][i]
        return (
          <g key={label}>
            <text x="0" y={16 + i * 20} fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="8">
              {label}
            </text>
            <rect x="32" y={8 + i * 20} width="170" height="10" rx="2" fill="var(--color-surface-2)" />
            <rect
              className="focus-grow"
              x="32"
              y={8 + i * 20}
              width={w}
              height="10"
              rx="2"
              fill="var(--color-teal)"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          </g>
        )
      })}
    </svg>
  )
}

function PrivacyDiagram() {
  return (
    <svg viewBox="0 0 220 72" className="h-[64px] w-full" aria-hidden>
      <rect x="8" y="10" width="92" height="48" rx="8" fill="var(--color-bg)" stroke="var(--color-teal)" strokeWidth="1.5" />
      <text x="54" y="30" textAnchor="middle" fill="var(--color-teal)" fontFamily="var(--font-mono)" fontSize="9">
        EDGE
      </text>
      <text x="54" y="46" textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="8">
        data · models
      </text>
      <rect
        x="120"
        y="10"
        width="92"
        height="48"
        rx="8"
        fill="var(--color-bg)"
        stroke="var(--color-line)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <text x="166" y="30" textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="9">
        CLOUD
      </text>
      <text x="166" y="46" textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="8">
        0 GB written
      </text>
    </svg>
  )
}

function SectionHead({ kicker, title, reduce }) {
  return (
    <div className="mb-10">
      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm text-[var(--color-teal)] mb-3"
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold tracking-tight text-balance"
      >
        {title}
      </motion.h2>
    </div>
  )
}

export default function Overview() {
  const reduce = useReducedMotion()

  return (
    <section id="focus" className="px-6 md:px-12 py-24 border-t border-[var(--color-line)] scroll-mt-28">
      <div className="max-w-5xl mx-auto">
        <SectionHead kicker="01 // overview & focus" title="High-performance engineering" reduce={reduce} />

        <div className="grid md:grid-cols-2 gap-4">
          {FOCUS.map((item, i) => (
            <motion.article
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
              className="group rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-teal)]/60 transition-colors p-6 flex flex-col"
            >
              <div className="mb-5">
                <span className="font-mono text-xs text-[var(--color-teal)]">[{item.id}]</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] ml-2">
                  {item.code}
                </span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-semibold mb-4">{item.title}</h3>
              <div className="mb-5 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)]/70 px-3 py-2">
                <item.Diagram />
              </div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mt-auto">{item.blurb}</p>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-[var(--color-muted)]">
          <span className="text-[var(--color-teal)]">&gt;_</span> high-frequency telemetry · operations panels · edge isolation
        </p>

        <div className="mt-24">
          <SectionHead kicker="02 // engineering fundamentals" title="Technical values" reduce={reduce} />

          <div className="grid md:grid-cols-3 gap-4">
            {VALUES.map((item, i) => (
              <motion.article
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-amber)]/50 transition-colors p-6"
              >
                <p className="font-mono text-xs mb-3" style={{ color: item.accent }}>
                  {item.id}
                </p>
                <h3 className="font-[var(--font-display)] text-2xl font-semibold mb-3">{item.title}</h3>
                <div className="mb-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)]/70 px-3 py-2">
                  <item.Diagram />
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.blurb}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
