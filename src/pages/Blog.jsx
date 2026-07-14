import Reveal from '../components/Reveal.jsx'

export default function Blog() {
  return (
    <div className="pt-40 pb-28">
      <div className="max-w-content mx-auto container-px">
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
            Le premier article arrive bientôt. Revenez faire un tour par ici.
          </p>
        </Reveal>
      </div>
    </div>
  )
}
