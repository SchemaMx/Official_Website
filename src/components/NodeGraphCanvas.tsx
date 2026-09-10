import { useEffect, useRef } from 'react'

export function NodeGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const nodes = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 2 + 1,
      color: i % 3 === 0 ? '#82c9c1' : i % 3 === 1 ? '#a4a7d4' : '#e2eaf6',
    }))

    function draw() {
      if (!canvas || !ctx) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > 1) n.vx *= -1
        if (n.y < 0 || n.y > 1) n.vy *= -1
      })

      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dx = (a.x - b.x) * W
          const dy = (a.y - b.y) * H
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            ctx.beginPath()
            ctx.moveTo(a.x * W, a.y * H)
            ctx.lineTo(b.x * W, b.y * H)
            ctx.strokeStyle = `rgba(130,201,193,${(1 - dist / 200) * 0.14})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.color + '77'
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}
