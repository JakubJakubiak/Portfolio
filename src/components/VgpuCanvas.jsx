import { useEffect, useRef, useState } from 'react'

const DEFAULT_DPR = [1, 1.25]
const MIN_FRAME_MS = 1000 / 60

function waitForCanvasSize(canvas) {
  return new Promise((resolve) => {
    if (canvas.clientWidth > 0 && canvas.clientHeight > 0) {
      resolve()
      return
    }

    const observer = new ResizeObserver(() => {
      if (canvas.clientWidth > 0 && canvas.clientHeight > 0) {
        observer.disconnect()
        resolve()
      }
    })

    observer.observe(canvas)
    requestAnimationFrame(() => {
      if (canvas.clientWidth > 0 && canvas.clientHeight > 0) {
        observer.disconnect()
        resolve()
      }
    })
  })
}

export default function VgpuCanvas({
  shader,
  className = '',
  blend,
  clearColor = [0, 0, 0, 1],
  alphaMode = 'opaque',
  dpr = DEFAULT_DPR,
  animate = true,
  ariaHidden = true,
  onReady,
  onFail,
}) {
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !shader) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !animate) {
      onFail?.()
      return undefined
    }

    if (!navigator.gpu) {
      onFail?.()
      return undefined
    }

    let disposed = false
    let visible = true
    let lastDraw = 0
    let stopLoop = () => {}

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.02)
      },
      { threshold: [0, 0.02, 0.1] },
    )
    io.observe(canvas)

    ;(async () => {
      try {
        await waitForCanvasSize(canvas)

        const { init, effect, surface, frameLoop, clock } = await import('vgpu')

        const gpu = await init()
        if (disposed) {
          gpu.dispose()
          return
        }

        const surf = surface(gpu, canvas, {
          dpr,
          clearColor,
          alphaMode,
          autoResize: true,
        })

        const fx = effect(gpu, shader, blend ? { blend } : undefined)
        await fx.compile(surf)

        const clk = clock(gpu)

        const loop = frameLoop(gpu, (frame) => {
          if (disposed || document.hidden || !visible) return
          const now = performance.now()
          if (now - lastDraw < MIN_FRAME_MS) return
          lastDraw = now

          const [w, h] = surf.size
          fx.set({
            resolution: [w, h],
            time: clk.time,
            aspect: w / Math.max(h, 1),
          })
          frame.pass(surf, fx)
        })

        if (!disposed) {
          setReady(true)
          onReady?.()
        }

        stopLoop = () => {
          loop.stop()
          gpu.dispose()
        }
      } catch {
        if (!disposed) {
          setReady(false)
          onFail?.()
        }
      }
    })()

    return () => {
      disposed = true
      io.disconnect()
      stopLoop()
      setReady(false)
    }
  }, [shader, blend, clearColor, alphaMode, dpr, animate])

  return (
    <canvas
      ref={canvasRef}
      className={`${className}${ready ? ' opacity-100' : ' opacity-0'}`}
      aria-hidden={ariaHidden}
    />
  )
}

export function useWebGpuAvailable() {
  const [available, setAvailable] = useState(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !navigator.gpu) {
      setAvailable(false)
      return
    }

    navigator.gpu.requestAdapter().then((adapter) => {
      setAvailable(Boolean(adapter))
    }).catch(() => setAvailable(false))
  }, [])

  return available
}
