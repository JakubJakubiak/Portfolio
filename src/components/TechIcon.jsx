import {
  siTypescript,
  siJavascript,
  siPython,
  siDart,
  siDotnet,
  siReact,
  siVite,
  siTailwindcss,
  siFlutter,
  siNodedotjs,
  siExpress,
  siFirebase,
  siSupabase,
  siLangchain,
} from 'simple-icons'

const brand = {
  typescript: siTypescript,
  javascript: siJavascript,
  python: siPython,
  dart: siDart,
  csharp: siDotnet,
  react: siReact,
  reactnative: siReact,
  vite: siVite,
  tailwind: siTailwindcss,
  flutter: siFlutter,
  nodejs: siNodedotjs,
  express: siExpress,
  firebase: siFirebase,
  supabase: siSupabase,
  langchain: siLangchain,
}

/** Abstract glyphs for skills without a clean brand mark */
const abstract = {
  rest: 'M3 6h18v2H3zm0 5h12v2H3zm0 5h18v2H3z',
  mcp: 'M4 7h12v2H4zm0 4h8v2H4zm0 4h12v2H4zm14-6.5L22 12l-4 3.5v-7z',
  llm: 'M12 3a4.5 4.5 0 0 0-4.5 4.5V9H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3h-1.5V7.5A4.5 4.5 0 0 0 12 3zm-2.5 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z',
  prompt: 'M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2V5zm3 3v2h8V8H7zm0 4v2h5v-2H7z',
  agent: 'M7 8a5 5 0 0 1 10 0v1h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h1V8zm2.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z',
}

export default function TechIcon({ name, className = '' }) {
  const icon = brand[name]
  const path = icon?.path ?? abstract[name]
  if (!path) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d={path} />
    </svg>
  )
}
