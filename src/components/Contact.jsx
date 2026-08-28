import { Mail } from 'lucide-react'

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
)

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
)

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M18.24 2.5h3.32l-7.26 8.3 8.54 11.2h-6.69l-5.24-6.87-6 6.87H1.6l7.77-8.88L1.2 2.5h6.86l4.73 6.28 5.45-6.28Zm-1.17 17.4h1.84L7.02 4.42H5.05l12.02 15.48Z" />
  </svg>
)

const links = [
  { label: 'GitHub', href: 'https://github.com/JakubJakubiak', icon: GithubIcon },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jakub-jakubiak-793213174/',
    icon: LinkedinIcon,
  },
  { label: 'X / Twitter', href: 'https://x.com/InuDev_', icon: XIcon },
  { label: 'Email', href: 'mailto:hello@inudev.pl', icon: Mail },
]

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 py-24 border-t border-[var(--color-line)]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-mono text-sm text-[var(--color-teal)] mb-4">// let&apos;s talk</p>
        <h2 className="font-[var(--font-display)] text-4xl md:text-6xl font-semibold text-balance mb-8">
          Building something with LLMs?
          <br />
          I&apos;d love to help.
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-line)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] transition-colors cursor-pointer text-sm"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      </div>

      <footer className="max-w-5xl mx-auto mt-24 pt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row justify-between gap-2 text-xs font-mono text-[var(--color-muted)]">
        <span>Jakub Jakubiak — Warsaw, PL</span>
        <span>Built with React + Tailwind CSS</span>
      </footer>
    </section>
  )
}
