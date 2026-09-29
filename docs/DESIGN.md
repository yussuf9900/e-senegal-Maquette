# Direction visuelle et architecture UI

## Intention

Institutionnel et chaleureux : fond blanc cassé, vert émeraude pour les actions, bleu nuit pour le texte, champagne pour les accents. L’illustration vectorielle de Dakar fournit une identité locale sans recourir à une photographie générique. Le mode sombre utilise un fond bleu-noir avec plusieurs niveaux de surfaces.

## Fondations

Les tokens sont la source de vérité dans `src/css/tokens.css` : couleurs sémantiques, échelle de texte responsive, espaces, rayons (8/14/22 px), ombres, blur, transition, couches et conteneur de 1 240 px. Les breakpoints CSS sont 650, 850 et 1 100 px, avec un ajustement grand écran à 1 600 px. Les variables CSS ne sont pas utilisées dans les media queries, qui ne les supportent pas nativement.

Outfit porte les titres et chiffres ; Manrope porte l’interface. Les bordures et espaces créent la hiérarchie avant les ombres. Les boutons, champs, listes et surfaces sont partagés. Les pages composent ces primitives sans dépendance de framework.

## Composants utilisés

Bouton/lien d’action, IconButton, recherche, input/select, checkbox, upload, cartes de catégories et procédures, badge de statut, notice, toast, dialogue natif, accordéon, filtres par onglets, fil d’Ariane, empty state, progression, timeline, stepper, avatar, langue et thème. Les interactions ne nécessitant pas un drawer ou un dropdown dédié utilisent une page ou le contrôle natif, pour limiter les couches inutiles. Le shell mobile possède sa propre navigation inférieure.

## Motion

Séquence du hero en 650 ms avec décalages de 90 ms ; upload simulé en 560 ms ; envoi en 900 ms ; transition d’étape de 300 ms. Le tilt est inférieur à 1 degré et limité à la souris desktop. Les sections restent utilisables en l’absence de GSAP. `prefers-reduced-motion` prévaut sur les effets.

## Frontières du prototype

Aucune disponibilité réelle d’administration, aucun tarif officiel, aucune sécurité d’authentification revendiquée. Le compte de démonstration ne représente pas une personne réelle. Les fichiers ne quittent pas le navigateur. Les préférences seules persistent ; le reste est réinitialisé au rechargement.
