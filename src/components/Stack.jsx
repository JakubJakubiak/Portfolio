import { motion, useReducedMotion } from 'framer-motion'
import { stack } from '../data/projects'
import TechIcon from './TechIcon'

const groupVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Stack() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="stack" className="px-6 md:px-12 py-24 border-t border-[var(--color-line)]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold mb-12"
        >
          Tech stack
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {stack.map((group, i) => (
            <motion.div
              key={group.group}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              variants={
                reduceMotion
                  ? undefined
                  : {
                      ...groupVariants,
                      show: {
                        ...groupVariants.show,
                        transition: {
                          ...groupVariants.show.transition,
                          delayChildren: i * 0.08,
                        },
                      },
                    }
              }
            >
              <motion.p
                variants={reduceMotion ? undefined : itemVariants}
                className="font-mono text-xs text-[var(--color-teal)] mb-4"
              >
                {String(i + 1).padStart(2, '0')} / {group.group}
              </motion.p>

              <ul className="space-y-1">
                {group.items.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={reduceMotion ? undefined : itemVariants}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { x: 3, transition: { duration: 0.15, ease: 'easeOut' } }
                    }
                    className="group flex items-center gap-2.5 py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-200 cursor-default"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-[color,border-color,background-color] duration-200 group-hover:border-[var(--color-teal)]/50 group-hover:text-[var(--color-teal)] group-hover:bg-[var(--color-surface-2)]">
                      <TechIcon name={item.icon} />
                    </span>
                    {item.name}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
