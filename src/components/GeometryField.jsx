import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// Définitions géométriques (espace local, unité = 1)
// ---------------------------------------------------------------------------

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
for (let i = 0; i < OCTA_V.length; i++)
  for (let j = i + 1; j < OCTA_V.length; j++) {
    const antipodal = OCTA_V[i].every((c, k) => c === -OCTA_V[j][k])
    if (!antipodal) OCTA_E.push([i, j])
  }
const OCTAHEDRON = { vertices: OCTA_V, edges: OCTA_E }

const TETRA_V = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]
const TETRA_E = []
for (let i = 0; i < TETRA_V.length; i++)
  for (let j = i + 1; j < TETRA_V.length; j++) TETRA_E.push([i, j])
const TETRAHEDRON = { vertices: TETRA_V, edges: TETRA_E }

const FLOATING_TYPES = [CUBE, OCTAHEDRON, TETRAHEDRON]

// Tesseract (hypercube 4D) — la pièce centrale et persistante
const TESS_V = []
for (let x = -1; x <= 1; x += 2)
  for (let y = -1; y <= 1; y += 2)
    for (let z = -1; z <= 1; z += 2)
      for (let w = -1; w <= 1; w += 2) TESS_V.push([x, y, z, w])
const TESS_E = edgesByDiff(TESS_V, 1)

function rotate4D(v, aXW, aYZ, aZW) {
  let [x, y, z, w] = v
  let x1 = x * Math.cos(aXW) - w * Math.sin(aXW)
  let w1 = x * Math.sin(aXW) + w * Math.cos(aXW)
  let y1 = y * Math.cos(aYZ) - z * Math.sin(aYZ)
  let z1 = y * Math.sin(aYZ) + z * Math.cos(aYZ)
  let z2 = z1 * Math.cos(aZW) - w1 * Math.sin(aZW)
  let w2 = z1 * Math.sin(aZW) + w1 * Math.cos(aZW)
  return [x1, y1, z2, w2]
}

function rotate3D([x, y, z], ax, ay, az) {
  let y1 = y * Math.cos(ax) - z * Math.sin(ax)
  let z1 = y * Math.sin(ax) + z * Math.cos(ax)
  let x2 = x * Math.cos(ay) + z1 * Math.sin(ay)
  let z2 = -x * Math.sin(ay) + z1 * Math.cos(ay)
  let x3 = x2 * Math.cos(az) - y1 * Math.sin(az)
  let y3 = x2 * Math.sin(az) + y1 * Math.cos(az)
  return [x3, y3, z2]
}

const COLORS = [
  '230,106,31',  // orange
  '86,184,112',  // vert clair
  '23,21,19',    // noir
  '59,130,246',  // bleu
  '245,158,11',  // jaune
  '168,85,247',  // violet
]

// ---------------------------------------------------------------------------
// Figure flottante : dérive, rotation propre, naissance/disparition en fondu
// ---------------------------------------------------------------------------
let uid = 0
function makeShape(x, y, vx, vy, r) {
  const def = FLOATING_TYPES[Math.floor(Math.random() * FLOATING_TYPES.length)]
  return {
    id: uid++,
    def,
    x, y, vx, vy, r,
    rot: [Math.random() * 7, Math.random() * 7, Math.random() * 7],
    rotSpeed: [
      (Math.random() - 0.5) * 0.018,
      (Math.random() - 0.5) * 0.018,
      (Math.random() - 0.5) * 0.014,
    ],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: 0, // 0 -> 1 fade-in
    dying: false,
    deathT: 0,
  }
}

export default function GeometryField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let width, height
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // -- état de la simulation --
    let tessAngle = 0
    let shapes = []
    let particles = []
    const MIN_SHAPES = 5
    const MAX_SHAPES = 7

    function spawnRandomShape(x, y, vx = 0, vy = 0) {
      const r = 18 + Math.random() * 16
      const px = x ?? Math.random() * width
      const py = y ?? Math.random() * height
      shapes.push(makeShape(px, py, vx, vy, r))
    }

    for (let i = 0; i < MIN_SHAPES; i++) {
      spawnRandomShape(
        undefined, undefined,
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.35
      )
    }

    function burst(x, y, color) {
      const count = 10
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count + Math.random() * 0.3
        const speed = 0.6 + Math.random() * 0.8
        particles.push({
          x, y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 1,
          color,
        })
      }
    }

    function collide(a, b) {
      a.dying = true
      b.dying = true
      const mx = (a.x + b.x) / 2
      const my = (a.y + b.y) / 2
      burst(mx, my, a.color)
      // une troisième figure naît de la collision
      const child = makeShape(
        mx, my,
        (a.vx + b.vx) / 2 + (Math.random() - 0.5) * 0.1,
        (a.vy + b.vy) / 2 + (Math.random() - 0.5) * 0.1,
        Math.min(30, (a.r + b.r) / 2 + 4)
      )
      shapes.push(child)
    }

    function drawShape(s, alpha) {
      const scale = s.r
      const projected = s.def.vertices.map((v) => {
        const r = rotate3D(v, s.rot[0], s.rot[1], s.rot[2])
        return [s.x + r[0] * scale * 0.5, s.y + r[1] * scale * 0.5, r[2]]
      })
      s.def.edges.forEach(([i, j]) => {
        const p1 = projected[i]
        const p2 = projected[j]
        const depth = (p1[2] + p2[2]) / 2
        const a = (0.18 + ((depth + 1.4) / 2.8) * 0.4) * alpha
        ctx.beginPath()
        ctx.moveTo(p1[0], p1[1])
        ctx.lineTo(p2[0], p2[1])
        ctx.strokeStyle = `rgba(${s.color}, ${a.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    function drawTesseract() {
      const scale = Math.min(width, height) * 0.16
      const cx = width / 2
      const cy = height / 2
      const projected = TESS_V.map((v) => {
        const r = rotate4D(v, tessAngle * 0.6, tessAngle * 0.4, tessAngle * 0.25)
        const distance4 = 2.6
        const w = 1 / (distance4 - r[3])
        const x3 = r[0] * w, y3 = r[1] * w, z3 = r[2] * w
        const distance3 = 3.2
        const wz = 1 / (distance3 - z3)
        return [cx + x3 * wz * scale, cy + y3 * wz * scale, r[3]]
      })
      TESS_E.forEach(([i, j]) => {
        const a = projected[i], b = projected[j]
        const depth = (a[2] + b[2]) / 2
        const alpha = 0.16 + ((depth + 1.4) / 2.8) * 0.38
        ctx.beginPath()
        ctx.moveTo(a[0], a[1])
        ctx.lineTo(b[0], b[1])
        ctx.strokeStyle = `rgba(230, 106, 31, ${alpha.toFixed(3)})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      })
      projected.forEach(([x, y, z]) => {
        const r = 1.5 + ((z + 1.4) / 2.8) * 1.6
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(86, 184, 112, 0.55)'
        ctx.fill()
      })
    }

    function step(dt) {
      tessAngle += 0.0035 * dt

      // -- mise à jour des figures flottantes --
      shapes.forEach((s) => {
        s.rot[0] += s.rotSpeed[0] * dt
        s.rot[1] += s.rotSpeed[1] * dt
        s.rot[2] += s.rotSpeed[2] * dt

        if (!s.dying) {
          s.x += s.vx * dt
          s.y += s.vy * dt
          if (s.x < s.r || s.x > width - s.r) s.vx *= -1
          if (s.y < s.r || s.y > height - s.r) s.vy *= -1
          s.x = Math.max(s.r, Math.min(width - s.r, s.x))
          s.y = Math.max(s.r, Math.min(height - s.r, s.y))
          s.life = Math.min(1, s.life + dt * 0.05)
        } else {
          s.deathT += dt
        }
      })

      // -- collisions entre figures vivantes --
      if (!prefersReduced) {
        for (let i = 0; i < shapes.length; i++) {
          for (let j = i + 1; j < shapes.length; j++) {
            const a = shapes[i], b = shapes[j]
            if (a.dying || b.dying || a.life < 1 || b.life < 1) continue
            const dx = a.x - b.x, dy = a.y - b.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < (a.r + b.r) * 0.55) collide(a, b)
          }
        }
      }

      shapes = shapes.filter((s) => s.deathT < 22)

      // -- maintien d'une population dynamique --
      const alive = shapes.filter((s) => !s.dying).length
      if (alive < MIN_SHAPES && shapes.length < MAX_SHAPES && Math.random() < 0.02 * dt) {
        spawnRandomShape(undefined, undefined, (Math.random() - 0.5) * 0.35, (Math.random() - 0.5) * 0.35)
      }

      // -- particules d'impact --
      particles.forEach((p) => {
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.life -= 0.025 * dt
      })
      particles = particles.filter((p) => p.life > 0)
    }

    function render() {
      ctx.clearRect(0, 0, width, height)
      drawTesseract()
      shapes.forEach((s) => {
        const fade = s.dying ? Math.max(0, 1 - s.deathT / 14) : s.life
        drawShape(s, fade)
      })
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${(p.life * 0.7).toFixed(3)})`
        ctx.fill()
      })
    }

    let last = performance.now()
    function loop(now) {
      const dt = prefersReduced ? 0 : Math.min(2.5, (now - last) / 16.67)
      last = now
      step(dt)
      render()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
