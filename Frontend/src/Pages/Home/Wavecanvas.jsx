// WaveCanvas.jsx — Shared utility for all sections
import { useEffect, useRef } from 'react'

/**
 * Reusable animated wave + particle canvas background.
 * Pass className for positioning (position:absolute, inset:0, etc.)
 */
export default function WaveCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const drawRibbon = (offset, colorStart, colorEnd, amp, freq, thickness, alpha) => {
      const W = canvas.width
      const H = canvas.height
      ctx.beginPath()
      ctx.moveTo(0, H * 0.38)
      for (let x = 0; x <= W; x += 3) {
        const y =
          H * 0.38 +
          Math.sin((x * freq + t + offset) * 0.008) * amp +
          Math.sin((x * freq * 0.6 + t * 1.3 + offset) * 0.012) * (amp * 0.5)
        ctx.lineTo(x, y)
      }
      for (let x = W; x >= 0; x -= 3) {
        const y =
          H * 0.38 +
          Math.sin((x * freq + t + offset) * 0.008) * amp +
          Math.sin((x * freq * 0.6 + t * 1.3 + offset) * 0.012) * (amp * 0.5) +
          thickness
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      const grad = ctx.createLinearGradient(0, 0, W, 0)
      grad.addColorStop(0, colorStart)
      grad.addColorStop(0.5, colorEnd)
      grad.addColorStop(1, colorStart)
      ctx.fillStyle = grad
      ctx.globalAlpha = alpha
      ctx.fill()
      ctx.globalAlpha = 1
    }

    const DOTS = Array.from({ length: 45 }, () => ({
      x: Math.random() * 1600,
      y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.8 + 0.5,
    }))

    const drawDots = () => {
      const W = canvas.width
      const H = canvas.height
      DOTS.forEach((d) => {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > W) d.vx *= -1
        if (d.y < 0 || d.y > H) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(14,90,230,0.13)'
        ctx.fill()
      })
      for (let i = 0; i < DOTS.length; i++) {
        for (let j = i + 1; j < DOTS.length; j++) {
          const dx = DOTS[i].x - DOTS[j].x
          const dy = DOTS[i].y - DOTS[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(DOTS[i].x, DOTS[i].y)
            ctx.lineTo(DOTS[j].x, DOTS[j].y)
            ctx.strokeStyle = `rgba(14,90,230,${0.055 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawDots()
      drawRibbon(0,   'rgba(14,90,230,0.14)', 'rgba(80,160,255,0.18)',  140, 1.0, 120, 0.9)
      drawRibbon(80,  'rgba(14,90,230,0.08)', 'rgba(100,180,255,0.12)', 100, 1.3,  85, 0.8)
      drawRibbon(200, 'rgba(30,110,255,0.05)', 'rgba(120,200,255,0.08)', 75, 0.9,  65, 0.7)
      drawRibbon(360, 'rgba(14,90,230,0.03)', 'rgba(60,140,255,0.06)',   55, 1.6,  50, 0.6)
      t += 0.55
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}