// DataStreamCanvas.jsx
import { useEffect, useRef } from 'react'

export default function DataStreamCanvas({ className = '' }) {
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

    const columns = Math.ceil(canvas.width / 25)
    const drops = Array(columns).fill(1)
    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>?;:{}[]|!@#$%^&*()'

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = 'rgba(14, 90, 230, 0.12)'
      ctx.font = '14px monospace'
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)]
        ctx.fillText(text, i * 25, drops[i] * 20)
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      
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