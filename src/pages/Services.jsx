import { MessageSquare, ScanSearch, ShieldCheck, Truck } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const SERVICES = [
  {
    icon: MessageSquare,
    title: 'Chatbots & agents IA',
    text: "Nous concevons des assistants conversationnels capables de comprendre une demande, de la traiter et de la router — sur WhatsApp, sur votre site, ou en interne pour vos équipes. Du support client automatisé aux assistants métiers spécialisés (agriculture, santé, service public), chaque agent est entraîné sur vos propres données.",
    points: ['Compréhension du langage naturel en français et langues locales', 'Déploiement sur vos canaux existants', 'Fonctionnement en local possible, sans dépendance à une API externe'],
  },
  {
    icon: ScanSearch,
    title: 'Analyse massive de données imagées',
    text: "Nous traitons de grands volumes d'images et de signaux — médicaux, satellites, industriels — pour en extraire des informations exploitables à l'échelle. De l'annotation semi-automatisée à la détection de motifs, nous construisons les pipelines qui transforment la donnée brute en décision.",
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
    text: "Nous développons des plateformes qui organisent les opérations de terrain — suivi, tournées, ressources — et les rendent visibles en temps réel pour la prise de décision.",
    points: ['Suivi et optimisation des opérations terrain', 'Tableaux de bord temps réel', 'Intégration avec capteurs et objets connectés'],
  },
]

export default function Services() {
  return (
    <div className="pt-40 pb-28">
      <div className="max-w-content mx-auto container-px">
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
