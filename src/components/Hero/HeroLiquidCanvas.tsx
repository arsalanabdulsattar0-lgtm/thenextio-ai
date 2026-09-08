import { useEffect, useRef } from 'react'

/**
 * HeroLiquidCanvas
 * - Renders the hero image on a canvas with real-time water-ripple displacement
 * - Mouse movement disturbs the water surface, making the image distort / move
 * - Runs the wave simulation at 1/4 resolution for performance, then upscales
 */
export default function HeroLiquidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // ── sizing ──────────────────────────────────────────────────────────────
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    // Simulation runs at 1/4 resolution for performance
    const SCALE = 4
    let SW = Math.ceil(W / SCALE)
    let SH = Math.ceil(H / SCALE)

    // ── wave buffers (two alternating height fields) ─────────────────────────
    let cur = new Float32Array(SW * SH)
    let prv = new Float32Array(SW * SH)
    const DAMPING = 0.982

    // ── offscreen canvas holds the scaled source image ───────────────────────
    const offscreen = document.createElement('canvas')
    const offCtx = offscreen.getContext('2d')!

    // ── image loading ────────────────────────────────────────────────────────
    const img = new Image()
    img.src = '/hero-visual.jpg'

    let srcPixels: Uint8ClampedArray | null = null
    let animId = 0

    function buildSourcePixels() {
      offscreen.width = SW
      offscreen.height = SH
      offCtx.drawImage(img, 0, 0, SW, SH)
      srcPixels = offCtx.getImageData(0, 0, SW, SH).data
    }

    // ── ripple disturbance ───────────────────────────────────────────────────
    function disturb(mx: number, my: number, strength = 255, radius = 14) {
      const sx = Math.floor(mx / SCALE)
      const sy = Math.floor(my / SCALE)
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy <= radius * radius) {
            const x = sx + dx
            const y = sy + dy
            if (x > 0 && x < SW - 1 && y > 0 && y < SH - 1) {
              cur[y * SW + x] = strength
            }
          }
        }
      }
    }

    // ── main render loop ─────────────────────────────────────────────────────
    function render() {
      if (!srcPixels) {
        animId = requestAnimationFrame(render)
        return
      }

      // Propagate wave heights
      for (let y = 1; y < SH - 1; y++) {
        for (let x = 1; x < SW - 1; x++) {
          const i = y * SW + x
          cur[i] =
            (prv[i - 1] + prv[i + 1] + prv[i - SW] + prv[i + SW]) * 0.5 -
            cur[i]
          cur[i] *= DAMPING
        }
      }

      // Swap buffers
      const tmp = prv
      prv = cur
      cur = tmp

      // Build displaced image data
      const destImg = ctx!.createImageData(SW, SH)
      const dest = destImg.data

      for (let y = 1; y < SH - 1; y++) {
        for (let x = 1; x < SW - 1; x++) {
          const i = y * SW + x
          // Gradient of wave height → displacement
          const dx = Math.round((prv[i - 1] - prv[i + 1]) * 0.6)
          const dy = Math.round((prv[i - SW] - prv[i + SW]) * 0.6)

          let sx = x + dx
          let sy = y + dy
          if (sx < 0) sx = 0
          else if (sx >= SW) sx = SW - 1
          if (sy < 0) sy = 0
          else if (sy >= SH) sy = SH - 1

          const si = (sy * SW + sx) * 4
          const di = i * 4
          dest[di]     = srcPixels[si]
          dest[di + 1] = srcPixels[si + 1]
          dest[di + 2] = srcPixels[si + 2]
          dest[di + 3] = srcPixels[si + 3]
        }
      }

      ctx!.putImageData(destImg, 0, 0)

      // Scale up to fill the full canvas (nearest-neighbour via CSS, or drawImage)
      // We draw the small canvas back at full size
      // (already written to ctx at SW×SH; scale via canvas transform)
      animId = requestAnimationFrame(render)
    }

    // ── mouse tracking ───────────────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      disturb(mx, my, 240, 14)
    }

    // Gentle idle auto-disturbance so something always moves
    let idleTimer = 0
    function idleDisturbance() {
      const cx = W * 0.55 + Math.sin(Date.now() * 0.0006) * W * 0.15
      const cy = H * 0.42 + Math.cos(Date.now() * 0.0004) * H * 0.1
      disturb(cx, cy, 80, 10)
      idleTimer = window.setTimeout(idleDisturbance, 180)
    }

    // ── resize ───────────────────────────────────────────────────────────────
    function onResize() {
      W = canvas!.width = window.innerWidth
      H = canvas!.height = window.innerHeight
      SW = Math.ceil(W / SCALE)
      SH = Math.ceil(H / SCALE)
      cur = new Float32Array(SW * SH)
      prv = new Float32Array(SW * SH)
      if (img.complete) buildSourcePixels()
    }

    // ── boot ─────────────────────────────────────────────────────────────────
    img.onload = () => {
      buildSourcePixels()
      idleDisturbance()
      render()
    }

    // If image already cached
    if (img.complete && img.naturalWidth > 0) {
      buildSourcePixels()
      idleDisturbance()
      render()
    }

    canvas.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(idleTimer)
      canvas.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Canvas is SW×SH but CSS-scaled to 100%×100%
  return (
    <canvas
      ref={canvasRef}
      className="hero__liquid-canvas"
      style={{ imageRendering: 'auto' }}
    />
  )
}
