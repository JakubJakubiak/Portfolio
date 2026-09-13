export const projects = [
  {
    id: 'energy-dashboard',
    title: 'Industrial Energy Dashboard',
    tag: 'Production',
    year: '2026',
    stack: ['Node.js', 'React', 'MQTT', 'TypeScript'],
    description:
      'Live operations panel for energy storage and industrial sites. Overview ~19 s → ~0.26 s. Time-series split off the API onto its own machine — vendor cloud writes at zero.',
    metric: 'Overview charts 71× faster',
    link: '#ems',
    accent: 'teal',
  },
  {
    id: 'mymultimind',
    title: 'MyMultimind: Chat AI Bot',
    tag: 'AI Product',
    year: '2024',
    stack: ['React Native', 'LLM APIs', 'Node.js'],
    description:
      'A multi-model AI chat app for Android — switch between models mid-conversation, keep context, and compare answers side by side.',
    metric: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.night.multimindbot',
    accent: 'teal',
    image: '/projects/multimind.png',
  },
  {
    id: 'human-or-ai',
    title: 'Human or AI',
    tag: 'AI Product',
    year: '2024',
    stack: ['React Native', 'Flutter', 'LLM APIs'],
    description:
      'A quick-fire guessing game: is this text human or machine written? Built to make the texture of LLM output tangible for a general audience.',
    metric: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=inu.night.humanAI',
    accent: 'amber',
    image: '/projects/human-ai.png',
  },
  {
    id: 'plant-identifier',
    title: 'Plant Identifier: AI Scanner',
    tag: 'AI Product',
    year: '2023',
    stack: ['Flutter', 'Dart', 'Computer Vision'],
    description:
      'Point your camera at a plant, get a species match and a care plan. Grew out of an earlier watering-reminder app into a full AI plant-care companion.',
    metric: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.inu.plantsai',
    accent: 'teal',
    image: '/projects/plant.png',
  },
  {
    id: 'caption-ai',
    title: 'Caption AI',
    tag: 'AI Product',
    year: '2023',
    stack: ['React', 'LLM APIs', 'Stripe'],
    description:
      'Upload a photo, get a polished social caption with hashtags — analyze image context and ship ready-to-post copy in one tap.',
    metric: 'Image → caption pipeline',
    link: 'https://github.com/JakubJakubiak',
    accent: 'amber',
    image: '/projects/caption.png',
  },
  {
    id: 'tinder-twitch',
    title: 'Tinder_Twitch',
    tag: 'Web App',
    year: '2023',
    stack: ['TypeScript', 'Twitch API', 'React'],
    description:
      'A swipe-to-match interface built on top of the Twitch API — Tinder-style discovery for live streams and streamers instead of profiles.',
    metric: 'TypeScript · GitHub',
    link: 'https://github.com/JakubJakubiak/Tinder_Twitch',
    accent: 'amber',
    video: '/projects/tinder-twitch.mp4',
  },
]

export const stack = [
  {
    group: 'Languages',
    items: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Python', icon: 'python' },
      { name: 'Rust', icon: 'rust' },
      { name: 'Dart', icon: 'dart' },
      { name: 'C#', icon: 'csharp' },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'React Native', icon: 'reactnative' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Flutter', icon: 'flutter' },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'Docker', icon: 'docker' },
      { name: 'REST APIs', icon: 'rest' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'OVH', icon: 'ovh' },
    ],
  },
  {
    group: 'Edge / IoT',
    items: [
      { name: 'WireGuard', icon: 'wireguard' },
      { name: 'MQTT', icon: 'mqtt' },
      { name: 'Time-series', icon: 'timeseries' },
    ],
  },
  {
    group: 'AI / Agentic',
    items: [
      { name: 'LangChain', icon: 'langchain' },
      { name: 'MCP', icon: 'mcp' },
      { name: 'LLM Integration', icon: 'llm' },
      { name: 'Prompt Engineering', icon: 'prompt' },
      { name: 'Agentic Workflows', icon: 'agent' },
    ],
  },
]

export const pipeline = [
  { id: '01', label: 'Input', detail: 'User request / event' },
  { id: '02', label: 'Retrieve', detail: 'Context + tools' },
  { id: '03', label: 'Reason', detail: 'LLM planning step' },
  { id: '04', label: 'Act', detail: 'Tool / API call' },
  { id: '05', label: 'Output', detail: 'Result delivered' },
]
