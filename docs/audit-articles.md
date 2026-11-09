# Audit et adaptation du journal — 9 novembre 2026

## Constats

Les cartes du journal utilisaient une présentation différente de la homepage : illustrations anciennes, résumés longs et animations d’apparition. Les articles à l’intérieur des thèmes n’étaient pas classés par date. Les couvertures de la homepage et des pages de lecture divergeaient.

## Adaptations

- Composant ArticleVisual partagé entre la homepage, le journal et les pages de lecture : mêmes photographies pour les sujets énergie/infrastructure ; illustrations existantes conservées pour les sujets sans photo adaptée.
- Cartes carrées, coins arrondis, fond clair et titres serif sur une seule ligne avec titre complet au survol et dans le lien accessible.
- Date et durée sous le titre. Résumés longs retirés des cartes, contenu intégral conservé dans les articles.
- Tri du plus récent au plus ancien dans chaque rubrique.
- Flèches retirées de la liste ; animations de révélation retirées des cartes afin que tous les liens soient disponibles immédiatement.
- Carte interactive, rubriques, liens entre articles, glossaire, FR/EN, canonical et données structurées conservés.
- Photographies locales optimisées par Next Image, dimensions réservées et tailles adaptées aux écrans. Attributions de la homepage conservées dans les mentions légales.

## Validations

- Build Next.js : réussi, 75 pages.
- ESLint ciblé : réussi sur les quatre fichiers TypeScript modifiés.
- HTTP local : deux journaux accessibles, 11 liens d’articles chacun.
- 22 pages FR/EN : H1 unique, canonical, hreflang fr/en/x-default et données structurées présents.
- Contrôle visuel du journal et d’une page de lecture, ordinateur et mobile.

## Périmètre

Cet audit porte sur la présentation, la navigation et les éléments techniques de publication. Il ne constitue pas une vérification factuelle des affirmations et des sources de chaque article. Les sujets sans photographie adaptée gardent leur illustration existante.
