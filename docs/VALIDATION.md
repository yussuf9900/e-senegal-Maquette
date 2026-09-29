# Validation de la démonstration

Vérification réalisée le 29 septembre 2026 dans Chromium via Playwright, sur le serveur statique local.

## Scénario fonctionnel

**97 assertions réussies** dans `tests/browser-scenario.js`, sans erreur JavaScript pendant cette exécution :

- Recherche « extrait de naissance », fiche et retour après connexion.
- Identifiants incorrects, champs obligatoires et focus du premier champ invalide.
- Document obligatoire, extension/type refusé, fichier de plus de 5 Mo refusé.
- Sélection d’un fichier local, progression et suppression ; ajout du document fictif.
- Retour aux informations depuis le récapitulatif sans perte de saisie.
- Déclaration obligatoire, soumission, référence `ES-2026-001247`.
- Complément requis, nouveau justificatif, retour en étude et événement de timeline.
- Coût gratuit, disponibilité, filtres combinés, recherche vide, réinitialisation et tri.
- État vide des dossiers, recherche dans la FAQ.
- Dialogue d’aide, fermeture Échap et restauration du focus.
- Modification du profil et affichage dans le tableau de bord.
- Wolof sur le dashboard et le stepper, thème sombre, persistance des préférences.
- Absence de persistance de la session et des dossiers ; stockage limité aux trois clés de préférences.
- Mode reduced-motion et navigation au clavier.

## Responsive

63 combinaisons route/largeur contrôlées : 9 écrans × **360, 390, 768, 1024, 1280, 1440, 1920 px**. Aucun débordement horizontal final.

Écrans : accueil, catalogue, détail de démarche, dashboard, dossiers, détail de dossier, profil, aide et 404. Le wizard a également été parcouru fonctionnellement et contrôlé visuellement. La mesure automatique du débordement ne remplace pas la relecture visuelle.

## Accessibilité

Axe-core 4.10.3, règles `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`, sur 7 écrans en clair et sombre : accueil, catalogue, dashboard, détail de dossier avec upload, profil, aide et première étape du wizard.

Un contraste de 4,45:1 dans la carte d’action claire a été corrigé puis revérifié : aucune violation automatisée restante sur les écrans inspectés. Le dashboard mobile a également été revérifié avec Axe. Il ne s’agit pas d’une certification WCAG ; les parcours lecteurs d’écran et les navigateurs mobiles physiques demandent une validation humaine complémentaire.

## Corrections issues des contrôles

- Gestion des promesses de View Transitions interrompues pour éviter les erreurs de navigation rapide.
- Suppression du débordement des ellipses décoratives sur mobile/tablette.
- Repositionnement de la carte d’identité décorative pour préserver la lisibilité mobile.
- Contraste renforcé de la carte « action nécessaire ».
- Feuilles CSS directement chargées : suppression des imports en cascade au chargement et des faux diagnostics de l’outil Axe.
- Nom de profil actualisé dans l’en-tête.

## Captures

Voir `docs/screenshots/` : accueil mobile, accueil sombre desktop, dashboard mobile, détail de dossier desktop et accueil clair desktop.

## Limites explicites

- Simulation en mémoire, pas de service administratif réel.
- Traduction wolof à faire relire avant publication.
- Tests effectués dans Chromium ; Safari, Firefox et lecteurs d’écran non certifiés.
- Coûts, délais et conditions sont fictifs, pas des renseignements administratifs validés.
- Pas d’audit de sécurité d’un backend puisqu’il n’existe pas.
