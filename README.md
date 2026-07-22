# Tesseract — site vitrine

Site React + Vite avec smooth scroll (Lenis) et animations au scroll (GSAP ScrollTrigger),
dans le même esprit que la fluidité observée sur ovaar.app.

## Démarrer

```bash
npm install
npm run dev
```

Build de production :
```bash
npm run build
```
(le dossier `dist/` généré est prêt à être déployé sur Vercel, comme le reste de vos projets)

## Structure


```
src/
  components/
    Navbar.jsx        # navigation fixe, transparente puis opaque au scroll
    Footer.jsx
    Reveal.jsx         # wrapper réutilisable : fade-in au scroll (GSAP)
    GeometryField.jsx   # animation signature : tesseract central + figures
                         # (cube, octaèdre, tétraèdre) qui dérivent, tournent,
                         # entrent en collision et en font naître une nouvelle
  lib/
    useLenis.js        # smooth scroll, synchronisé avec GSAP ScrollTrigger
  pages/
    Home.jsx / Services.jsx / Team.jsx / Projects.jsx / Blog.jsx / Contact.jsx
```

## À faire avant mise en ligne

1. **Logo** — remplacer le texte "Tesseract" dans `Navbar.jsx` et `Footer.jsx` par votre logo (SVG de préférence).
2. **Logos de projets** — dans `Projects.jsx`, remplacer les icônes Lucide (Recycle, Store, Lock)
   par vos vrais logos WasteLink / ShopChap / AFIN dès qu'ils sont prêts.
3. **Photos d'équipe** — déposez les fichiers dans `public/team/` (ex. `paul.jpg`), puis dans
   `Team.jsx`, renseignez `photo: '/team/paul.jpg'` pour la personne concernée. Tant que `photo`
   reste `null`, la carte affiche l'initiale du prénom à la place — aucune casse visuelle en attendant.
4. **Formulaire de contact** — `Contact.jsx` a un formulaire fonctionnel côté UI mais pas encore
   connecté à un backend. Options rapides : EmailJS, Formspree, ou une fonction Firebase (cohérent
   avec le reste de votre stack).
5. **Contenu** — les textes de `Services.jsx`, `Team.jsx` et `Projects.jsx` sont des premiers jets :
   à relire et ajuster avec vous.
6. **Couleurs de marque** — si vous avez déjà une charte, les valeurs sont centralisées dans
   `tailwind.config.js` (`accent`, `ink`, `bg`, `data`) : un seul endroit à modifier.

## L'animation du hero

`GeometryField.jsx` fait vivre une petite scène géométrique :
- un **tesseract** (hypercube 4D) reste fixe au centre, en rotation continue — l'ancrage visuel ;
- quelques figures plus petites (cube, octaèdre, tétraèdre) **dérivent et tournent** librement autour ;
- quand deux figures se **percutent**, elles disparaissent en fondu et font naître une **troisième**
  figure (type aléatoire) à l'endroit de l'impact, accompagnée d'une petite explosion de particules ;
- une population minimale de figures est maintenue en continu, donc la scène ne s'arrête jamais.

Tout est calculé (projection 3D/4D → 2D sur `<canvas>`), pas d'image ni de vidéo — donc léger et
net à toutes les résolutions. `prefers-reduced-motion` désactive collisions et rotations.

## Notes techniques

- L'animation du tesseract (`TesseractCanvas.jsx`) est un vrai calcul de projection 4D → 3D → 2D
  sur `<canvas>`, pas une image ou un GIF — donc légère et redimensionnable sans perte.
- `prefers-reduced-motion` est respecté partout (smooth scroll et animations désactivés si l'utilisateur
  le demande dans son système).
- Le smooth scroll (Lenis) est synchronisé avec GSAP ScrollTrigger via `gsap.ticker`, pour que les
  animations au scroll restent alignées avec la position réelle de la page.
