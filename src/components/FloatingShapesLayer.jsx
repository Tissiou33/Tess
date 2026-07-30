import { useEffect, useRef } from 'react'

function edgesByDiff(vertices, diffCount) {
  const edges = []
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      let diff = 0
      for (let k = 0; k < vertices[i].length; k++) if (vertices[i][k] !== vertices[j][k]) diff++
      if (diff === diffCount) edges.push([i, j])
    }
  }
  return edges
}

const CUBE_V = []
for (let x = -1; x <= 1; x += 2)
  for (let y = -1; y <= 1; y += 2)
    for (let z = -1; z <= 1; z += 2) CUBE_V.push([x, y, z])
const CUBE = { vertices: CUBE_V, edges: edgesByDiff(CUBE_V, 1) }

const OCTA_V = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
const OCTA_E = []
for (let i = 0; i < OCTA_V.length; i++) {
  for (let j = i + 1; j < OCTA_V.length; j++) {
    const antipodal = OCTA_V[i].every((c, k) => c === -OCTA_V[j][k])
    if (!antipodal) OCTA_E.push([i, j])
  }
}
const OCTAHEDRON = { vertices: OCTA_V, edges: OCTA_E }

const TETRA_V = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]
const TETRA_E = []
for (let i = 0; i < TETRA_V.length; i++)
  for (let j = i + 1; j < TETRA_V.length; j++) TETRA_E.push([i, j])
const TETRAHEDRON = { vertices: TETRA_V, edges: TETRA_E }

const SHAPE_TYPES = [CUBE, OCTAHEDRON, TETRAHEDRON]
const COLORS = [
  '230,106,31',
  '86,184,112',
  '23,21,19',
  '59,130,246',
  '245,158,11',
  '168,85,247',
]

function rotate3D([x, y, z], ax, ay, az) {
  const y1 = y * Math.cos(ax) - z * Math.sin(ax)
  const z1 = y * Math.sin(ax) + z * Math.cos(ax)
  const x2 = x * Math.cos(ay) + z1 * Math.sin(ay)
  const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay)
  const x3 = x2 * Math.cos(az) - y1 * Math.sin(az)
  const y3 = x2 * Math.sin(az) + y1 * Math.cos(az)
  return [x3, y3, z2]
}

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function makeShape(width, height) {
  return {
    def: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
    x: rand(0, width),
    y: rand(0, height),
    vx: rand(-0.18, 0.18),
    vy: rand(-0.18, 0.18),
    r: rand(11, 22),
    life: rand(0.2, 1),
    rot: [rand(0, 7), rand(0, 7), rand(0, 7)],
    rotSpeed: [rand(-0.012, 0.012), rand(-0.012, 0.012), rand(-0.009, 0.009)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

function placeAwayFromCursor(shape, width, height, cursor) {
  let attempts = 0
  while (attempts < 16) {
    shape.x = rand(shape.r, Math.max(shape.r, width - shape.r))
    shape.y = rand(shape.r, Math.max(shape.r, height - shape.r))
    const dx = shape.x - cursor.x
    const dy = shape.y - cursor.y
    if (Math.sqrt(dx * dx + dy * dy) > 180) return
    attempts += 1
  }
}

export default function FloatingShapesLayer({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const host = canvas.parentElement

    let width = 0
    let height = 0
    let raf = 0
    let particles = []
    let shapes = []
    const cursor = { x: -9999, y: -9999 }
    const SHAPE_COUNT = prefersReduced ? 0 : 26

    function resize() {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      shapes = shapes.filter((s) => s.x <= width && s.y <= height)
      while (shapes.length < SHAPE_COUNT) shapes.push(makeShape(width, height))
    }

    function onPointerMove(event) {
      const rect = canvas.getBoundingClientRect()
      cursor.x = event.clientX - rect.left
      cursor.y = event.clientY - rect.top
    }

    function onPointerLeave() {
      cursor.x = -9999
      cursor.y = -9999
    }

    function burst(x, y, color) {
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI * 2 * i) / 8 + rand(-0.22, 0.22)
        particles.push({
          x,
          y,
          vx: Math.cos(a) * rand(0.4, 1.15),
          vy: Math.sin(a) * rand(0.4, 1.15),
          life: 1,
          color,
        })
      }
    }

    function drawShape(s) {
      const projected = s.def.vertices.map((v) => {
        const r = rotate3D(v, s.rot[0], s.rot[1], s.rot[2])
        return [s.x + r[0] * s.r * 0.5, s.y + r[1] * s.r * 0.5, r[2]]
      })

      s.def.edges.forEach(([i, j]) => {
        const p1 = projected[i]
        const p2 = projected[j]
        const depth = (p1[2] + p2[2]) / 2
        const alpha = (0.14 + ((depth + 1.4) / 2.8) * 0.28) * s.life
        ctx.beginPath()
        ctx.moveTo(p1[0], p1[1])
        ctx.lineTo(p2[0], p2[1])
        ctx.strokeStyle = `rgba(${s.color}, ${alpha.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    while (shapes.length < SHAPE_COUNT) shapes.push(makeShape(width, height))

    let last = performance.now()
    function loop(now) {
      const dt = Math.min(2.5, (now - last) / 16.67)
      last = now

      ctx.clearRect(0, 0, width, height)

      for (const s of shapes) {
        s.rot[0] += s.rotSpeed[0] * dt
        s.rot[1] += s.rotSpeed[1] * dt
        s.rot[2] += s.rotSpeed[2] * dt

        s.x += s.vx * dt * 8
        s.y += s.vy * dt * 8

        if (s.x < s.r || s.x > width - s.r) s.vx *= -1
        if (s.y < s.r || s.y > height - s.r) s.vy *= -1
        s.x = Math.max(s.r, Math.min(width - s.r, s.x))
        s.y = Math.max(s.r, Math.min(height - s.r, s.y))
        s.life = Math.min(1, s.life + dt * 0.03)

        const dx = s.x - cursor.x
        const dy = s.y - cursor.y
        const hitDistance = Math.max(18, s.r * 1.5)
        if (dx * dx + dy * dy < hitDistance * hitDistance) {
          burst(s.x, s.y, s.color)
          placeAwayFromCursor(s, width, height, cursor)
          s.life = 0
        }

        drawShape(s)
      }

      particles = particles.filter((p) => p.life > 0)
      for (const p of particles) {
        p.x += p.vx * dt * 5
        p.y += p.vy * dt * 5
        p.life -= 0.04 * dt
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${(p.life * 0.65).toFixed(3)})`
        ctx.fill()
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
