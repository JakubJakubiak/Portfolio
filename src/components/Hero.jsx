import { motion } from 'framer-motion'
import AgentPipeline from './AgentPipeline'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-16">
      <div className="max-w-5xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-[var(--color-teal)] mb-6"
        >
          $ whoami
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[var(--font-display)] text-balance text-[13vw] leading-[0.95] md:text-[6.5rem] font-semibold tracking-tight"
        >
          Jakub
          <br />
          Jakubiak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-[var(--color-muted)]"
        >
          Full Stack Engineer at Ennovation Technology — building LLM integrations,
          agentic tooling, and interactive web experiences. Warsaw, Poland.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-[var(--color-amber)] text-[#0a0b0e] font-medium rounded-full hover:brightness-110 transition-all cursor-pointer"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-[var(--color-line)] rounded-full hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] transition-colors cursor-pointer"
          >
            Contact
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-5xl mx-auto w-full mt-20"
      >
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">
          // how a typical request moves through my agent stack
        </p>
        <AgentPipeline />
      </motion.div>
    </section>
  )
}
