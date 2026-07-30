import { useEffect, useRef, useState } from 'react'
import { Linkedin, Twitter } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import FloatingShapesLayer from '../components/FloatingShapesLayer.jsx'

// Pour ajouter une photo : dépose le fichier dans /public/team/ (ex. paul.jpg)
// puis renseigne son chemin ici, ex. photo: '/team/paul.jpg'.
// Tant que `photo` est null, la carte affiche l'initiale du prénom à la place.
const TEAM = [
  {
    name: 'Tchaa Wazam Paul ABI',
    role: 'Ingénieur IA',
    bio: "Conçoit et entraîne les modèles derrière nos agents conversationnels de la compréhension du langage à la mise en production.",
    photo: '/team/PAUL.jpeg',
    linkedin: 'https://www.linkedin.com/in/tchaa-wazam-paul-abi',
    twitter: 'https://x.com/tchaa_paul',
  },

  {
    name: 'Ereke Rachel BINAWAI',
    role: 'Ingénieure Cybersécurité',
    bio: "Sécurise chaque système dès sa conception accès, chiffrement, audits pour que la donnée reste protégée.",
    photo: null,
    linkedin: 'https://www.linkedin.com/in/ereke-rachel-binawai',
    twitter: 'https://x.com/rachel_binawai',
  },
  {
    name: 'Awè Augustin KOURATE',
    role: 'Développeur',
    bio: "Transforme les architectures en produits concrets, robustes et prêts à passer à l'échelle.",
    photo: '/team/Augustin.jpeg',
    linkedin: 'https://www.linkedin.com/in/augustin-kourate',
    twitter: 'https://x.com/augustin_krt',
  },
    {
    name: 'Olouwafémi Léonidas LOUTOU',
    role: 'Ingénieur Logistique',
    bio: "Structure les opérations terrain et les flux de données entre systèmes physiques et plateformes numériques.",
    photo: '/team/leo.jpeg',
    linkedin: 'https://www.linkedin.com/in/olouwafemi-leonidas-loutou',
    twitter: 'https://x.com/leonidas_loutou',
  },

  {
    name: 'Tissiou Essowaza Salomon TOSSIM',
    role: 'Ingénieur IA & Big Data',
    bio: "Construit les pipelines qui transforment de gros volumes de données et d'images en informations exploitables.",
    photo: '/team/photo-pass-Tissiou.jpg',
    linkedin: 'https://www.linkedin.com/in/tissiou-essowaza-salomon-tossim',
    twitter: 'https://x.com/tissiou_salomon',
  },

]

const MEMBER_STEP_MS = 3500
const NAME_CHAR_MS = 28
const ROLE_CHAR_MS = 24
const BIO_CHAR_MS = 16

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)

    onChange()
    if (media.addEventListener) {
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    }

    media.addListener(onChange)
    return () => media.removeListener(onChange)
  }, [])

  return reduced
}

function TypedText({ as: Tag = 'p', text, start, delayMs = 0, charMs = 20, className = '' }) {
  const [value, setValue] = useState(start ? text : '')

  useEffect(() => {
    if (!start) {
      setValue('')
      return
    }

    let timeoutId
    let i = 0

    const begin = () => {
      const typeNext = () => {
        i += 1
        setValue(text.slice(0, i))
        if (i < text.length) {
          timeoutId = window.setTimeout(typeNext, charMs)
        }
      }

      timeoutId = window.setTimeout(typeNext, charMs)
    }

    timeoutId = window.setTimeout(begin, delayMs)

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [start, text, delayMs, charMs])

  return <Tag className={className}>{value}</Tag>
}

export default function Team() {
  const listRef = useRef(null)
  const reduceMotion = usePrefersReducedMotion()
  const [startSequence, setStartSequence] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (reduceMotion) {
      setStartSequence(true)
      return
    }

    const node = listRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting)
        if (isVisible) {
          setStartSequence(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  useEffect(() => {
    if (!startSequence) return

    if (reduceMotion) {
      setVisibleCount(TEAM.length)
      return
    }

    setVisibleCount(0)
    const timeouts = TEAM.map((_, index) =>
      window.setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev, index + 1))
      }, index * MEMBER_STEP_MS)
    )

    return () => timeouts.forEach((id) => window.clearTimeout(id))
  }, [startSequence, reduceMotion])

  return (
    <div className="relative overflow-hidden pt-40 pb-28">
      <FloatingShapesLayer className="absolute inset-0 z-0 h-full w-full pointer-events-none" />
      <div className="relative z-10 max-w-content mx-auto container-px">
        <Reveal className="max-w-lg">
          <span className="eyebrow">Équipe</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Cinq disciplines, une seule équipe.
          </h1>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Une petite équipe volontairement pluridisciplinaire, pour couvrir un
            projet de bout en bout de l'intelligence artificielle à la sécurité,
            en passant par la logistique.
          </p>
        </Reveal>

        <div ref={listRef} className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((m, index) => {
            const isVisible = index < visibleCount
            const nameDelay = 80
            const roleDelay = nameDelay + (m.name.length + 2) * NAME_CHAR_MS
            const bioDelay = roleDelay + (m.role.length + 2) * ROLE_CHAR_MS

            return (
            <div
              key={m.name}
              className={`rounded-2xl border border-line bg-surface p-7 hover:border-accent/40 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-accent-soft flex items-center justify-center font-display font-medium text-accent text-xl">
                  {m.name[0]}
                </div>
              )}
              <TypedText
                as="h3"
                text={m.name}
                start={reduceMotion ? true : isVisible}
                delayMs={reduceMotion ? 0 : nameDelay}
                charMs={reduceMotion ? 0 : NAME_CHAR_MS}
                className="mt-5 font-display text-lg font-medium min-h-[3.5rem]"
              />
              <TypedText
                as="div"
                text={m.role}
                start={reduceMotion ? true : isVisible}
                delayMs={reduceMotion ? 0 : roleDelay}
                charMs={reduceMotion ? 0 : ROLE_CHAR_MS}
                className="text-xs font-mono uppercase tracking-wide text-data mt-1 min-h-[1.25rem]"
              />
              <TypedText
                as="p"
                text={m.bio}
                start={reduceMotion ? true : isVisible}
                delayMs={reduceMotion ? 0 : bioDelay}
                charMs={reduceMotion ? 0 : BIO_CHAR_MS}
                className="mt-3 text-sm text-ink-soft leading-relaxed min-h-[6.5rem]"
              />
              <div className="mt-5 flex items-center gap-3">
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`LinkedIn de ${m.name}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={m.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Twitter de ${m.name}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <Twitter size={16} />
                </a>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


