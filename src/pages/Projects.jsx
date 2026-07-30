import { NavLink } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import FloatingShapesLayer from '../components/FloatingShapesLayer.jsx'
import { PROJECTS } from '../lib/projectsData.js'

export default function Projects() {
  return (
    <div className="relative overflow-hidden pt-40 pb-28">
      <FloatingShapesLayer className="absolute inset-0 z-0 h-full w-full pointer-events-none" />
      <div className="relative z-10 max-w-content mx-auto container-px">
        <Reveal className="max-w-lg">
          <span className="eyebrow">Projets</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Ce que nous construisons.
          </h1>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Trois produits, à trois stades différents. Cette page sera mise à jour
            au fil de nos avancées.
          </p>
        </Reveal>

        <Reveal stagger className="mt-16 grid md:grid-cols-3 gap-6">
          {PROJECTS.map(({ slug, name, tag, logo, status, text, mystery }) => (
            <NavLink
              key={name}
              to={`/projets/${slug}`}
              className={`rounded-2xl border p-7 flex flex-col ${
                mystery ? 'border-dashed border-line bg-surface/60 hover:border-accent/40 transition-colors' : 'border-line bg-surface hover:border-accent/40 transition-colors'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-xl bg-accent-soft flex items-center justify-center text-accent">
                  <img
                    src={logo}
                    alt={`Logo ${name}`}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <span className="text-xs font-mono uppercase tracking-wide text-data">{tag}</span>
              </div>
              <h2 className="mt-6 font-display text-2xl font-medium">{name}</h2>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed flex-1">{text}</p>
              <div className="mt-6 text-xs font-mono text-ink-faint uppercase tracking-wide">
                {status}
              </div>
            </NavLink>
          ))}
        </Reveal>

        <Reveal className="mt-6 text-sm text-ink-faint">
          Restez à l'écoute, d'autres projets sont en incubation chez Tesseract. 
          <br />
          Nous sommes impatients de les partager avec vous.
        </Reveal>
      </div>
    </div>
  )
}
