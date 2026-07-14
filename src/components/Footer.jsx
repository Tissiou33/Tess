import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-32">
      <div className="max-w-content mx-auto container-px py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-semibold text-lg">Tesseract</div>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">
            Des solutions informatiques et des systèmes d'IA pensés pour faciliter
            les activités des personnes et des entreprises.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">Navigation</div>
          <ul className="space-y-2.5 text-sm">
            <li><NavLink to="/services" className="text-ink-soft hover:text-ink">Services</NavLink></li>
            <li><NavLink to="/equipe" className="text-ink-soft hover:text-ink">Équipe</NavLink></li>
            <li><NavLink to="/projets" className="text-ink-soft hover:text-ink">Projets</NavLink></li>
            <li><NavLink to="/blog" className="text-ink-soft hover:text-ink">Blog</NavLink></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Services</div>
          <ul className="space-y-2.5 text-sm text-ink-soft">
            <li>Chatbots & agents IA</li>
            <li>Analyse massive de données imagées</li>
            <li>Cybersécurité applicative</li>
            <li>Systèmes & logistique</li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Contact</div>
          <ul className="space-y-2.5 text-sm text-ink-soft">
            <li>Lomé, Togo</li>
            <li><a href="mailto:contact@tesseract.tg" className="hover:text-ink">contact@tesseract.tg</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-content mx-auto container-px py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-ink-faint font-mono">
          <span>© {new Date().getFullYear()} Tesseract. Tous droits réservés.</span>
          <span>Conçu et développé à Lomé.</span>
        </div>
      </div>
    </footer>
  )
}
