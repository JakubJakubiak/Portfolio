import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

function ProjectCard({ project: p, index: i }) {
  const videoRef = useRef(null)
  const hasMedia = Boolean(p.video || p.image)

  const playPreview = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {})
  }

  const pausePreview = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  const cardClass =
    'group relative flex flex-col justify-between overflow-hidden p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-teal)]/60 transition-colors min-h-[340px]'

  const motionProps = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.4, delay: (i % 2) * 0.08 },
    onMouseEnter: playPreview,
    onMouseLeave: pausePreview,
    onFocus: playPreview,
    onBlur: pausePreview,
  }

  const Card = p.link ? motion.a : motion.article
  const isHash = p.link?.startsWith('#')

  return (
    <Card
      {...motionProps}
      {...(p.link
        ? {
            href: p.link,
            ...(isHash ? {} : { target: '_blank', rel: 'noreferrer' }),
            className: `${cardClass} cursor-pointer`,
          }
        : { className: cardClass })}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-full border"
            style={{
              color: p.accent === 'amber' ? 'var(--color-amber)' : 'var(--color-teal)',
              borderColor: p.accent === 'amber' ? 'var(--color-amber)' : 'var(--color-teal)',
            }}
          >
            {p.tag}
          </span>
          {p.link ? (
            <ArrowUpRight
              size={18}
              className="text-[var(--color-muted)] group-hover:text-[var(--color-text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          ) : null}
        </div>
        <h3 className="font-[var(--font-display)] text-xl font-semibold mb-2">
          {p.title}
        </h3>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[36ch]">
          {p.description}
        </p>
      </div>

      <div
        className={`relative z-10 mt-6 transition-[opacity,transform] duration-500 ${
          hasMedia
            ? 'group-hover:opacity-0 group-hover:translate-y-2 max-md:group-hover:opacity-100 max-md:group-hover:translate-y-0'
            : ''
        }`}
      >
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--color-surface-2)] text-[var(--color-muted)]"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="font-mono text-xs text-[var(--color-muted)]">{p.metric}</p>
      </div>

      {hasMedia && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] bg-[#0a0b0e] translate-y-[110%] opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100"
          aria-hidden
        >
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[var(--color-surface)] to-transparent z-[1]" />
          {p.video ? (
            <video
              ref={videoRef}
              className="h-full w-full object-contain object-bottom"
              src={p.video}
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img
              src={p.image}
              alt=""
              className="h-full w-full object-contain object-bottom"
              loading="lazy"
            />
          )}
        </div>
      )}
    </Card>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-12 py-24 border-t border-[var(--color-line)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold">
            Projects
          </h2>
          <p className="font-mono text-sm text-[var(--color-muted)]">
            {projects.length} selected from 34 repositories
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
