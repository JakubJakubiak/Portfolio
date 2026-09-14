import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import HeroBackground from './HeroBackground'
import { track } from '../lib/track'

const AgentPipeline = lazy(() => import('./AgentPipeline'))

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 overflow-x-clip">
      <HeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-[var(--color-teal)] mb-6"
        >
          $ whoami
        </motion.p>

        <h1 className="font-[var(--font-display)] text-balance text-[13vw] leading-[0.95] md:text-[6.5rem] font-semibold tracking-tight">
          Jakub
          <br />
          Jakubiak
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.1 }}
          className="mt-6 max-w-xl text-lg text-[var(--color-muted)]"
        >
          Full Stack Engineer at Ennovation Technology — industrial energy
          dashboards, LLM integrations, and agentic tooling. Warsaw, Poland.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.15 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#ems"
            onClick={() => track('select_content', { content_type: 'case', item_id: 'ems' })}
            className="px-6 py-3 bg-[var(--color-amber)] text-[#0a0b0e] font-medium rounded-full hover:brightness-110 transition-all cursor-pointer"
          >
            The 71× case
          </a>
          <a
            href="#projects"
            onClick={() => track('select_content', { content_type: 'nav', item_id: 'projects' })}
            className="px-6 py-3 border border-[var(--color-line)] rounded-full hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] transition-colors cursor-pointer"
          >
            View projects
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full mt-20">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">
          // how a typical request moves through my agent stack
        </p>
        <Suspense fallback={<div className="h-[108px] sm:h-[160px]" />}>
          <AgentPipeline />
        </Suspense>
      </div>
    </section>
  )
}
