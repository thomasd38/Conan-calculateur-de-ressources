# Système de Déblocage par Quêtes

Ce système permet de masquer certaines améliorations (upgrades) et actions aux joueurs tant qu'ils n'ont pas accompli une quête spécifique. Cela aide à garder l'interface propre au début de la partie et donne un sentiment constant de progression au joueur.

## Comment ça marche ?

Dans le fichier `idle.js`, les améliorations et les actions sont définies respectivement dans les tableaux constants `upgrades` et `actions`.

Le moteur d'affichage (`renderUpgrades` et `renderActions`) regarde désormais si l'objet contient une propriété **`reqQuest`**.
- Si `reqQuest` **n'est pas défini**, l'élément est disponible dès le début (bien que le joueur puisse ne pas avoir les ressources).
- Si `reqQuest` **est défini** avec l'ID d'une quête, l'élément reste **totalement invisible** jusqu'à ce que la quête correspondante se trouve dans la liste des quêtes complétées du joueur (`state.completedQuestIds`).

## Comment l'utiliser en tant que développeur

C'est très simple ! Il te suffit d'ajouter la ligne `reqQuest: 'ID_DE_LA_QUETE'` dans l'objet de l'action ou de l'amélioration de ton choix. 

### Exemple 1 : Débloquer une amélioration

Imaginons que tu veux que l'amélioration "Extracteur de minerai" n'apparaisse que lorsque le joueur a complété la quête "Premier feu" (dont l'ID est `energy_100`).

Trouve le tableau `upgrades` dans `idle.js` et modifie l'objet ainsi :

```javascript
    {
        id: 'extractors',
        title: 'Extracteur de minerai',
        description: '+0,35 cristal / sec',
        reqQuest: 'energy_100', // <-- AJOUTE CETTE LIGNE
        getLevel: () => state.extractors,
        getCost: () => ({ energy: Math.floor(130 * Math.pow(1.3, state.extractors)) }),
        buy: () => {
            state.extractors += 1;
        }
    }
```

### Exemple 2 : Débloquer une action

C'est exactement la même syntaxe pour les actions. Si tu veux que l'action "Expédition de pillage" n'apparaisse qu'après avoir accumulé 100 cristaux (quête `crystals_100`) :

Trouve le tableau `actions` dans `idle.js` et ajoute :

```javascript
    {
        id: 'expedition',
        title: 'Expédition de pillage',
        description: () => 'Dépense des cristaux pour un paquet mixte de ressources.',
        reqQuest: 'crystals_100', // <-- AJOUTE CETTE LIGNE
        getCost: () => ({ crystals: 20 }),
        run: () => {
            state.energy += 260;
            state.crystals += 8;
        }
    }
```

## Trouver les IDs de quêtes

Pour savoir quel ID utiliser pour `reqQuest`, regarde le tableau `questDefinitions` au début du fichier `idle.js`. Chaque quête possède une propriété `id`.

Exemple :
`{ id: 'click_25', title: 'Première récolte', ... }` -> Utilise `'click_25'` pour débloquer suite à cette quête.

## Résumé
1.  Choisis ton amélioration / action.
2.  Choisis la quête prérequise et copie son `id`.
3.  Ajoute `reqQuest: 'ton_id_quete',` dans la déclaration de l'amélioration ou de l'action.
4.  C'est tout ! Le jeu gèrera l'affichage et les clics automatiquement de façon sécurisée.
