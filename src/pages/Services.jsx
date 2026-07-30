import { MessageSquare, ScanSearch, ShieldCheck, Truck } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import FloatingShapesLayer from '../components/FloatingShapesLayer.jsx'

const SERVICES = [
  {
    icon: MessageSquare,
    title: 'Developpement dapplications web et mobile',
    text: "Nous concevons des applications web et mobiles sur mesure, adaptées à vos besoins spécifiques. Que ce soit pour la gestion interne, le suivi des opérations ou l'engagement client, nous créons des solutions intuitives et performantes.",
    points: ['Applications web et mobiles ', 'Intégration avec vos systèmes existants'],
  },
  {
    icon: MessageSquare,
    title: 'Chatbots & agents IA',
    text: "Nous concevons des assistants conversationnels capables de comprendre une demande, de la traiter et de la router sur WhatsApp, sur votre site, ou en interne pour vos équipes. Du support client automatisé aux assistants métiers spécialisés (agriculture, santé, service public), chaque agent est entraîné sur mesure selon vos besions",
    points: ['Compréhension du langage naturel', 'Déploiement sur vos canaux existants', 'Fonctionnement en local possible, sans dépendance à une API externe'],
  },
  {
    icon: ScanSearch,
    title: 'Analyse massive de données imagées',
    text: "Nous traitons de grands volumes d'images, données industriels pour en extraire des informations exploitables à l'échelle. Nous construisons les pipelines qui transforment la donnée brute en décision.",
    points: ['Pipelines de traitement à grande échelle', 'Annotation et classification semi-automatisées', "Adapté aux contraintes de connectivité et d'infrastructure locales"],
  },
  {
    icon: ShieldCheck,
    title: 'Cybersécurité applicative',
    text: "Chaque système que nous livrons est pensé pour être sûr dès sa conception : gestion des accès, chiffrement des données sensibles, audits réguliers. Nous accompagnons aussi les équipes existantes dans la sécurisation de leurs applications en production.",
    points: ["Audit de sécurité et tests d'intrusion", 'Architecture sécurisée dès la conception', 'Conformité et protection des données sensibles'],
  },
  {
    icon: Truck,
    title: 'Systèmes & logistique',
    text: "Rendre toute chose accessible",
    points: ['Suivi et optimisation des opérations terrain', 'Tableaux de bord temps réel', 'Intégration avec capteurs et objets connectés'],
  },
]

export default function Services() {
  return (
    <div className="relative overflow-hidden pt-40 pb-28">
      <FloatingShapesLayer className="absolute inset-0 z-0 h-full w-full pointer-events-none" />
      <div className="relative z-10 max-w-content mx-auto container-px">
        <Reveal className="max-w-lg">
          <span className="eyebrow">Services</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Quatre disciplines, un même objectif.
          </h1>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Simplifier des activités réelles humaines, opérationnelles,
            décisionnelles avec des systèmes conçus pour durer.
          </p>
        </Reveal>

        <div className="mt-20 divide-y divide-line">
          {SERVICES.map(({ icon: Icon, title, text, points }, i) => (
            <Reveal key={title} className="grid md:grid-cols-[1fr_1.4fr] gap-8 py-14">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-lg bg-accent-soft flex items-center justify-center text-accent">
                  <Icon size={20} />
                </div>
                <h2 className="font-display text-2xl font-medium leading-tight pt-1.5">{title}</h2>
              </div>
              <div>
                <p className="text-ink-soft leading-relaxed">{text}</p>
                <ul className="mt-6 space-y-2.5">
                  {points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm text-ink">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-data shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
