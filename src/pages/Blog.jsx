import Reveal from '../components/Reveal.jsx'
import FloatingShapesLayer from '../components/FloatingShapesLayer.jsx'

export default function Blog() {
  return (
    <div className="relative overflow-hidden pt-40 pb-28">
      <FloatingShapesLayer className="absolute inset-0 z-0 h-full w-full pointer-events-none" />
      <div className="relative z-10 max-w-content mx-auto container-px">
        <Reveal className="max-w-lg">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Notes & actualités.
          </h1>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Nos réflexions sur l'IA appliquée, les retours d'expérience de nos
            projets, et les actualités de Tesseract.
          </p>
        </Reveal>

        <Reveal className="mt-20 rounded-2xl border border-dashed border-line p-14 text-center">
          <p className="text-ink-soft">
            Nos premier rapport seront bientôt disponibles, Merci de nous visiter régulièrement pour rester 
            à l'affût de nos dernières réalisations.
          </p>
        </Reveal>
      </div>
    </div>
  )
}
