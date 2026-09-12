let scrolling = false
let timer = 0
let attached = false

function onScroll() {
  scrolling = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    scrolling = false
  }, 140)
}

function ensureScrollListener() {
  if (attached || typeof window === 'undefined') return
  attached = true
  window.addEventListener('scroll', onScroll, { passive: true })
}

export function isPageScrolling() {
  ensureScrollListener()
  return scrolling
}
