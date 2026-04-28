// GradientOrbsCanvas.jsx
import { useEffect, useRef } from 'react'

export default function GradientOrbsCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const orbs = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 80 + 40,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.15 + 0.05,
      pulse: Math.random() * Math.PI * 2,
    }))

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      orbs.forEach(orb => {
        orb.x += orb.vx
        orb.y += orb.vy
        orb.pulse += 0.01
        
        // Bounce off edges
        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) orb.vx *= -1
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) orb.vy *= -1
        
        const pulsingRadius = orb.radius + Math.sin(orb.pulse) * 5
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, pulsingRadius)
        gradient.addColorStop(0, `rgba(14, 90, 230, ${orb.alpha * 1.5})`)
        gradient.addColorStop(0.5, `rgba(14, 90, 230, ${orb.alpha * 0.8})`)
        gradient.addColorStop(1, `rgba(14, 90, 230, 0)`)
        
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, pulsingRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })
      
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}