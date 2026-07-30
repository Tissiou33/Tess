import { assetPath } from './url.js'

export const PROJECTS = [
  {
    slug: 'wastelink',
    name: 'WasteLink',
    tag: 'Gestion des déchets',
    logo: assetPath('/projects/wastelink-logo.svg'),
    status: 'En développement actif',
    text: "Une plateforme de gestion intelligente des ordures : suivi des collectes, capteurs connectés et optimisation des tournées, pour rendre la gestion des déchets plus efficace et plus visible.",
    proofs: [
      { src: assetPath('/projects/proofs/wastelink-1.svg'), alt: 'Tableau de bord WasteLink' },
      { src: assetPath('/projects/proofs/wastelink-2.svg'), alt: 'Suivi des tournées WasteLink' },
      
    ],
  },
  {
    slug: 'shopchap',
    name: 'ShopChap',
    tag: 'E-commerce',
    logo: assetPath('/projects/LogoShopChap.png'),
    status: 'En phase de test',
    text: "Une vitrine clé en main pour les vendeurs en ligne : présenter ses produits, encaisser et gérer ses commandes, sans avoir à construire sa propre boutique de zéro.",
    proofs: [
      { src: assetPath('/projects/proofs/1.png'), alt: 'Accueil ShopChap' },
      { src: assetPath('/projects/proofs/2.png'), alt: 'Catalogue ShopChap' },
      { src: assetPath('/projects/proofs/3.png'), alt: 'Panier ShopChap' },
      { src: assetPath('/projects/proofs/4.png'), alt: 'Suivi de commandes ShopChap' },
      { src: assetPath('/projects/proofs/5.png'), alt: 'Suivi de commandes ShopChap' },
      { src: assetPath('/projects/proofs/6.png'), alt: 'Suivi de commandes ShopChap' },
      { src: assetPath('/projects/proofs/8.png'), alt: 'Suivi de commandes ShopChap' },
    ],
  },
  {
    slug: 'afin',
    name: 'AFIN',
    tag: 'À venir',
    logo: assetPath('/projects/afin-logo.svg'),
    status: 'Bientôt dévoilé',
    text: "Un projet encore en incubation chez Tesseract. Les détails arrivent — restez à l'écoute.",
    mystery: true,
    proofs: [
      { src: assetPath('/projects/proofs/afin-1.svg'), alt: 'Aperçu AFIN 1' },
      { src: assetPath('/projects/proofs/afin-2.svg'), alt: 'Aperçu AFIN 2' },
      
    ],
  },
]
