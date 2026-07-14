import Reveal from '../components/Reveal.jsx'

// Pour ajouter une photo : dépose le fichier dans /public/team/ (ex. paul.jpg)
// puis renseigne son chemin ici, ex. photo: '/team/paul.jpg'.
// Tant que `photo` est null, la carte affiche l'initiale du prénom à la place.
const TEAM = [
  {
    name: 'Tchaa Wazam Paul ABI',
    role: 'Ingénieur IA',
    bio: "Conçoit et entraîne les modèles derrière nos agents conversationnels — de la compréhension du langage à la mise en production.",
    photo: null,
  },

  {
    name: 'Ereke Rachel BINAWAI',
    role: 'Ingénieure Cybersécurité',
    bio: "Sécurise chaque système dès sa conception accès, chiffrement, audits pour que la donnée reste protégée.",
    photo: null,
  },
  {
    name: 'Awè Augustin KOURATE',
    role: 'Développeur',
    bio: "Transforme les architectures en produits concrets, robustes et prêts à passer à l'échelle.",
    photo: '/team/Augustin.jpeg',
  },
    {
    name: 'Olouwafémi Léonidas LOUTOU',
    role: 'Ingénieur Logistique',
    bio: "Structure les opérations terrain et les flux de données entre systèmes physiques et plateformes numériques.",
    photo: '/team/leo.jpeg',
  },

  {
    name: 'Tissiou Essowaza Salomon TOSSIM',
    role: 'Ingénieur IA & Big Data',
    bio: "Construit les pipelines qui transforment de gros volumes de données et d'images en informations exploitables.",
    photo: '/team/photo-pass-Tissiou.jpg',
  },

]

export default function Team() {
  return (
    <div className="pt-40 pb-28">
      <div className="max-w-content mx-auto container-px">
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

        <Reveal stagger className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-line bg-surface p-7 hover:border-accent/40 transition-colors"
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
              <h3 className="mt-5 font-display text-lg font-medium">{m.name}</h3>
              <div className="text-xs font-mono uppercase tracking-wide text-data mt-1">{m.role}</div>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  )
}
