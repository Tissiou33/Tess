import { Navigate, useNavigate, useParams } from 'react-router-dom'
import FloatingShapesLayer from '../components/FloatingShapesLayer.jsx'
import { PROJECTS } from '../lib/projectsData.js'

export default function ProjectOrbit() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const project = PROJECTS.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/projets" replace />
  }

  const proofs = project.proofs || []
  const slotsPerRing = 8
  const baseRadius = 320
  const ringGap = 155

  function getOrbitPosition(index, total) {
    const ring = Math.floor(index / slotsPerRing)
    const ringStart = ring * slotsPerRing
    const itemsInRing = Math.min(slotsPerRing, total - ringStart)
    const slot = index - ringStart
    const angle = (slot * 360) / Math.max(1, itemsInRing)
    const radius = baseRadius + ring * ringGap
    return { angle, radius, ring }
  }

  return (
    <div
      className="relative overflow-visible pt-28 pb-14 min-h-[calc(100vh-80px)]"
      onClick={() => navigate('/projets')}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') navigate('/projets')
      }}
      aria-label="Retour aux projets"
    >
      <FloatingShapesLayer className="absolute inset-0 z-0 h-full w-full pointer-events-none" />

      <div className="relative z-10 w-full px-4 md:px-8 xl:px-12">
        <section
          className="project-orbit-stage mt-2 mx-auto rounded-3xl border border-line/80 bg-surface/65 backdrop-blur-sm"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="project-orbit-center border border-line bg-surface shadow-[0_24px_60px_-42px_rgba(23,21,19,0.72)]">
            <div className="w-14 h-14 rounded-xl bg-accent-soft flex items-center justify-center mx-auto">
              <img src={project.logo} alt={`Logo ${project.name}`} className="h-10 w-10 object-contain" />
            </div>
            <h1 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{project.name}</h1>
            <div className="mt-2 text-xs font-mono uppercase tracking-wide text-data">{project.status}</div>
            <p className="mt-3 text-xs md:text-sm text-ink-soft leading-relaxed max-w-[300px] mx-auto">{project.text}</p>
            <div className="mt-4 text-xs font-mono uppercase tracking-wide text-ink-faint">{project.tag}</div>
          </div>

          <div className="project-orbit-ring" aria-label={`Preuves visuelles du projet ${project.name}`}>
            {proofs.map((proof, index) => {
              const { angle, radius, ring } = getOrbitPosition(index, proofs.length)
              return (
                <article
                  key={`${proof.src}-${index}`}
                  className="orbit-node"
                  style={{
                    '--angle': `${angle}deg`,
                    '--duration': `${36 + ring * 3 + (index % slotsPerRing) * 0.5}s`,
                    '--radius': `${radius}px`,
                  }}
                >
                  <span className="orbit-link" aria-hidden="true" />
                  <figure className="orbit-card rounded-xl border border-line bg-surface shadow-[0_22px_48px_-36px_rgba(23,21,19,0.9)]">
                    <img src={proof.src} alt={proof.alt} className="h-full w-full object-cover rounded-[11px]" />
                  </figure>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
