import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight, MessageSquare, ScanSearch, ShieldCheck, Truck } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import GeometryField from '../components/GeometryField.jsx'
import FloatingShapesLayer from '../components/FloatingShapesLayer.jsx'

const HERO_ROTATING_LINES = ['Une flexibilité inouïe', 'De meilleurs rendement', 'Un monde meilleur', 'une dimension à simplifier']
const TYPE_SPEED_MS = 100
const DELETE_SPEED_MS = 90
const HOLD_AFTER_TYPE_MS = 1400
const HOLD_AFTER_DELETE_MS = 320

const SERVICES = [
    {
    icon: MessageSquare,
    title: 'Developpement dapplications web et mobile',
    text: "Applications web et mobiles intégré à vos systèmes existants",
  },

  {
    icon: MessageSquare,
    title: 'Chatbots & agents IA',
    text: "Des assistants conversationnels sur mesure qui répondent, orientent et automatisent dans vos outils, sur votre site, ou en local.",
  },
  {
    icon: ScanSearch,
    title: 'Analyse massive de données imagées',
    text: "Traitement et interprétation à grande échelle d'images pour transformer des volumes bruts en décisions exploitables.",
  },
  {
    icon: ShieldCheck,
    title: 'Cybersécurité applicative',
    text: "Des systèmes pensés pour être sûrs dès la conception, audités et protégés à chaque étape.",
  },
  {
    icon: Truck,
    title: 'Systèmes & logistique',
    text: "Des plateformes qui organisent et fluidifient les opérations du terrain jusqu'au tableau de bord.",
  },
]

const PROJECTS = [
  { name: 'WasteLink', tag: 'Gestion des déchets', to: '/projets' },
  { name: 'ShopChap', tag: 'E-commerce', to: '/projets' },
  { name: 'AFIN', tag: 'À venir', to: '/projets' },
]

export default function Home() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const activeLine = HERO_ROTATING_LINES[lineIndex]
  const animatedLine = activeLine.slice(0, charIndex)

  useEffect(() => {
    const atLineEnd = !isDeleting && charIndex === activeLine.length
    const atLineStart = isDeleting && charIndex === 0

    let delay = isDeleting ? DELETE_SPEED_MS : TYPE_SPEED_MS
    if (atLineEnd) delay = HOLD_AFTER_TYPE_MS
    if (atLineStart) delay = HOLD_AFTER_DELETE_MS

    const timeoutId = window.setTimeout(() => {
      if (atLineEnd) {
        setIsDeleting(true)
        return
      }

      if (atLineStart) {
        setIsDeleting(false)
        setLineIndex((prev) => (prev + 1) % HERO_ROTATING_LINES.length)
        return
      }

      setCharIndex((prev) => prev + (isDeleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [activeLine, charIndex, isDeleting])

  return (
    <div className="relative overflow-hidden [&>section]:relative [&>section]:z-10">
      <FloatingShapesLayer className="absolute inset-0 z-0 h-full w-full pointer-events-none" />
      {/* HERO */}
      <section className="relative pt-40 pb-28 md:pt-48 md:pb-36 overflow-hidden">
        <div className="max-w-content mx-auto container-px grid md:grid-cols-2 gap-14 items-center">
          <div>
            <Reveal>
              <span className="eyebrow">Tesseract - solutions informatiques & IA</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                Chaque activité,
                <br />
                <span>
                  {animatedLine}
                  <span className="inline-block ml-1 text-accent animate-pulse">|</span>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-md">
                Nous accompagnons les entreprises dans leurs processus de digitalisation et concevons des systèmes d'intelligence artificielle, chatbots,
                analyse massive de données ... <br/> 
                Notre ambition est de rendre le travail des
                personnes et des entreprises plus simple et éfficace.
    
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <NavLink
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-bg text-sm font-medium px-6 py-3.5 hover:bg-accent transition-colors"
                >
                  Discuter d'un projet <ArrowUpRight size={16} />
                </NavLink>
                <NavLink
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink px-2 py-3.5"
                >
                  Voir nos services
                </NavLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative aspect-square w-full max-w-[560px] mx-auto">
            <GeometryField className="w-full h-full" />
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-surface">
        <div className="max-w-content mx-auto container-px py-10 grid grid-cols-3 gap-8">
          {[
            ['5', 'ingénieurs à temps plein'],
            ['3', 'produits en développement actif'],
            ['2', 'domaines IA : conversationnel & vision'],
          ].map(([n, label]) => (
            <div key={label}>
              <div className="font-mono text-3xl md:text-4xl text-accent">{n}</div>
              <div className="text-sm text-ink-soft mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-28">
        <div className="max-w-content mx-auto container-px">
          <Reveal className="max-w-lg">
            <span className="eyebrow">Ce que nous faisons</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              De l'idée au système en production.
            </h2>
          </Reveal>

          <Reveal stagger className="mt-14 grid sm:grid-cols-2 gap-6">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-line bg-surface p-7 hover:border-accent/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-accent">
                  <Icon size={18} />
                </div>
                <h3 className="mt-5 font-display font-medium text-lg">{title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="py-20 border-t border-line">
        <div className="max-w-content mx-auto container-px">
          <Reveal className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="eyebrow">Réalisations</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
                Ce que nous construisons.
              </h2>
            </div>
            <NavLink to="/projets" className="text-sm font-medium text-ink-soft hover:text-ink flex items-center gap-1">
              Tous les projets <ArrowUpRight size={14} />
            </NavLink>
          </Reveal>

          <Reveal stagger className="mt-12 grid md:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <NavLink
                key={p.name}
                to={p.to}
                className="group rounded-2xl border border-line bg-surface p-7 flex flex-col justify-between min-h-[160px] hover:border-accent/40 transition-colors"
              >
                <span className="text-xs font-mono uppercase tracking-wide text-data">{p.tag}</span>
                <div className="flex items-end justify-between">
                  <span className="font-display text-xl font-medium">{p.name}</span>
                  <ArrowUpRight size={18} className="text-ink-faint group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </NavLink>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="max-w-content mx-auto container-px">
          <Reveal className="rounded-3xl bg-ink text-bg px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xl mx-auto">
              Un projet à automatiser, sécuriser ou analyser ?
            </h2>
            <p className="mt-4 text-white/60 max-w-md mx-auto">
              Parlons de ce que Tesseract peut construire pour vous.
            </p>
            <NavLink
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-bg text-ink text-sm font-medium px-6 py-3.5 hover:bg-accent hover:text-bg transition-colors"
            >
              Nous écrire <ArrowUpRight size={16} />
            </NavLink>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
