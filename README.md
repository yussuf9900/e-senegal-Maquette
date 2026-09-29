# e-Sénégal — démo citoyenne

Une démonstration frontend du guichet numérique citoyen : trouver une démarche, préparer un dossier, le soumettre et répondre à une demande de complément.

**Prototype indépendant, sans affiliation officielle.** Les procédures, tarifs, délais, administrations et personnes sont fictifs. Aucun paiement, aucune authentification réelle et aucune transmission de document. Les textes ne constituent pas une information administrative officielle.

## Lancement

Depuis ce dossier :

```bash
python3 -m http.server 4187 --bind 127.0.0.1
```

Ouvrir **http://127.0.0.1:4187**. Live Server fonctionne également. Il faut servir les modules ES par HTTP, pas ouvrir `index.html` avec `file://`.

Aucun build, aucune installation npm, aucun service externe : les polices, illustrations et bibliothèques GSAP sont locales. Après chargement, les interactions ne font aucune requête API.

## Présentation en 3 minutes

1. À l’accueil, rechercher **Extrait de naissance**.
2. Ouvrir sa fiche puis **Commencer la démarche**.
3. Cliquer **Utiliser le compte démo**, puis **Se connecter** : `demo@esenegal.sn` / `demo123`.
4. Saisir un prénom, un nom, une date passée, une commune et la référence fictive `DEMO-2026-042`.
5. Cliquer **Ajouter un justificatif fictif**, attendre la progression et continuer. Un fichier local PDF/JPG/PNG de 5 Mo maximum fonctionne aussi.
6. Vérifier le récapitulatif ; les actions **Modifier** ramènent aux étapes précédentes sans perdre les valeurs.
7. Cocher la déclaration puis **Soumettre ma demande**. La première demande reçoit la référence **ES-2026-001247**.
8. Cliquer **Suivre mon dossier**, puis **Simuler un complément**. Cette commande représente explicitement l’intervention d’un service instructeur fictif.
9. Ajouter un justificatif fictif, puis **Transmettre le complément**. Le statut repasse à **En étude**, avec un nouvel événement daté.
10. Montrer le catalogue et ses filtres, le tableau de bord, le Wolof, le thème sombre et la navigation mobile.

Recharger la page réinitialise les dossiers créés, les modifications de profil et la connexion. Les préférences de langue, de thème et l’intro déjà vue restent conservées. Pour rejouer l’intro : `localStorage.removeItem('es-intro')`, puis recharger.

## Architecture

```text
index.html
assets/
  fonts/                 Polices Manrope et Outfit locales
  images/                Illustration SVG originale de Dakar et favicon
  vendor/                GSAP 3.12.5 et ScrollTrigger
src/
  css/
    tokens.css           Couleurs, thèmes, typo, espacements, surfaces
    base.css             Fondations sémantiques et layout
    components.css       Boutons, formulaires, badges, modales, feedback
    pages.css            Compositions propres aux écrans
    animations.css       Motion et reduced-motion
    responsive.css       Adaptations desktop, tablette et mobile
  data/
    procedures.js        9 démarches, 5 catégories
    applications.js      Dossiers et historiques de démonstration
    statuses.js          7 statuts centralisés FR/WO
    help.js              FAQ et catégories
  js/
    app.js               Initialisation, thème, langue, transitions
    router.js            Résolution des routes hash et retour après connexion
    store.js             État de session et préférences
    i18n.js              Dictionnaire, helper t(), formats Intl
    motion.js            GSAP, ScrollTrigger, reveal et micro-tilt
    components/          Shell, composants UI, upload
    pages/               Accueil, catalogue, compte, wizard, dossiers
 tests/browser-scenario.js
 docs/VALIDATION.md
 docs/DESIGN.md
```

## Routes

| Route                                    | Écran                                                      |
| ---------------------------------------- | ---------------------------------------------------------- |
| `#/`                                     | Accueil                                                    |
| `#/procedures`                           | Catalogue, recherche, catégories, coût, disponibilité, tri |
| `#/procedures/:id`                       | Fiche démarche                                             |
| `#/login`                                | Connexion fictive                                          |
| `#/dashboard`                            | Tableau de bord orienté actions                            |
| `#/applications`                         | Liste, recherche, statuts, tri                             |
| `#/applications/new?procedure=naissance` | Wizard en quatre étapes                                    |
| `#/applications/:id`                     | Timeline et complément                                     |
| `#/profile`                              | Profil et préférences                                      |
| `#/help`                                 | FAQ filtrable et assistance de démonstration               |
| Autre route                              | 404                                                        |

Les routes citoyennes redirigent vers la connexion en mémorisant la destination. Le hash router permet un déploiement sur un hébergement statique sans règle de réécriture. La navigation historique fonctionne sans rechargement complet.

## État et données

`store.js` conserve en mémoire le compte fictif, les dossiers, le wizard, le profil et les notifications. Seules trois clés sont écrites dans LocalStorage : `es-theme`, `es-language`, `es-intro`.

L’upload ne lit ni ne transmet le contenu du document : seuls le nom, le type, la taille et la progression simulée sont conservés en mémoire. La taille et le type sont contrôlés pour l’UX de la simulation, sans prétendre remplacer une validation serveur. Les valeurs utilisateur sont échappées avant insertion HTML.

Les statuts `BROUILLON`, `SOUMIS`, `EN_ETUDE`, `COMPLEMENT_REQUIS`, `VALIDE`, `REJETE`, `ANNULE` ont une configuration centrale. Le wizard conserve son brouillon en mémoire ; il n’ajoute un dossier à la liste qu’après soumission. Le scénario implémente `SOUMIS → EN_ETUDE → COMPLEMENT_REQUIS → EN_ETUDE`. Les décisions finales sont représentées par des dossiers initiaux, sans fausse interface d’administration.

## Design system et thèmes

Voir [docs/DESIGN.md](docs/DESIGN.md). Les composants utilisent les tokens de `tokens.css`. Le mode sombre possède ses propres niveaux de surfaces bleu nuit. La préférence système est appliquée au premier chargement sans choix explicite, puis le bouton manuel prend la priorité.

## Internationalisation

`t()` utilise le dictionnaire FR/WO de `i18n.js`, avec le texte français comme clé et comme fallback. Les principaux parcours, actions, validations, noms des démarches et statuts sont traduits. Le nom propre de certaines institutions et les formats de dates restent français (`Intl`, locale `fr-SN`). La rédaction wolof doit être relue par un locuteur professionnel avant un usage public.

## Animations et accessibilité

- GSAP : apparition orchestrée du hero ; ScrollTrigger : étapes de présentation.
- Intersection Observer : apparition légère des sections ; nettoyage à chaque navigation.
- CSS : hover, focus, progression, intro de 1,4 seconde, transition d’étape.
- View Transitions API avec fallback et gestion des transitions interrompues.
- `prefers-reduced-motion` désactive les mouvements décoratifs et rend les transitions quasi instantanées.
- Curseur système, aucun scroll hijacking ni parallax mobile.
- Navigation clavier, lien d’évitement, labels, focus visible, erreurs liées avec ARIA, focus au premier champ invalide, live regions et dialogue natif avec restauration du focus.
- Le contraste et le responsive ont été inspectés ; ceci ne constitue pas une certification WCAG exhaustive.

## Validation

Le script [tests/browser-scenario.js](tests/browser-scenario.js) contient une fonction `async (page)` exécutable dans un environnement Playwright disposant d’une page. Il ne fait pas partie du code livré au navigateur. Le serveur doit être accessible sur `127.0.0.1:4187`.

Les résultats et limites sont documentés dans [docs/VALIDATION.md](docs/VALIDATION.md).

## Passage futur vers Laravel

Cette démo sert de référence de composants, de responsive, de textes et de parcours pour Laravel/Blade. Les composants visuels peuvent devenir des composants Blade ; les tokens CSS sont réutilisables. Les données mock seront remplacées par des modèles et services métier ; les statuts doivent devenir des transitions autorisées et auditées côté serveur.

À construire séparément : authentification et sessions sécurisées, autorisations par dossier, validation serveur, stockage privé des documents, contrôles antivirus, audit, notification réelle, traductions validées, règles administratives vérifiées et intégration des administrations. Le routeur hash et le store mémoire n’ont pas vocation à assurer ces fonctions.

## Ressources

- Illustration Dakar : création vectorielle originale, évocation stylisée de la corniche, non photographie documentaire.
- Icônes : famille SVG filaire locale cohérente, sans bibliothèque réseau.
- Manrope et Outfit : Google Fonts, fichiers locaux. Voir leurs licences dans `assets/fonts/`.
- GSAP et ScrollTrigger : version 3.12.5, en-têtes de licence conservés ; voir `assets/vendor/NOTICE.md`.
