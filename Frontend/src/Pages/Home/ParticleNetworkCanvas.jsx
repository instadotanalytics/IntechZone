// ParticleNetworkCanvas.jsx
import { useEffect, useRef } from 'react'

export default function ParticleNetworkCanvas({ className = '' }) {
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

    // Create nodes with 3D-like positions
    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 1,
    }))

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update positions with boundary wrapping
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < -50) node.x = canvas.width + 50
        if (node.x > canvas.width + 50) node.x = -50
        if (node.y < -50) node.y = canvas.height + 50
        if (node.y > canvas.height + 50) node.y = -50
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 150
          if (dist < maxDist) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            const opacity = 0.08 * (1 - dist / maxDist)
            ctx.strokeStyle = `rgba(14, 90, 230, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw nodes with glow effect
      nodes.forEach(node => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2)
        gradient.addColorStop(0, 'rgba(14, 90, 230, 0.4)')
        gradient.addColorStop(1, 'rgba(14, 90, 230, 0.05)')
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(80, 160, 255, 0.6)'
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