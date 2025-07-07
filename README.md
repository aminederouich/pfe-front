# TakeIt - Système de Gestion de Tickets JIRA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg?style=flat-square)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg?style=flat-square)](https://vitejs.dev/)
[![CoreUI](https://img.shields.io/badge/CoreUI-5.4.0-orange.svg?style=flat-square)](https://coreui.io/)

**TakeIt** est une application web moderne de gestion de tickets intégrée avec JIRA, développée dans le cadre d'un Projet de Fin d'Études (PFE). Cette solution offre une interface intuitive pour la création, la modification et le suivi des tickets, avec une intégration complète aux fonctionnalités JIRA.

## 🚀 Fonctionnalités

- **Gestion des Tickets** : Création, édition, visualisation et suivi complet des tickets
- **Intégration JIRA** : Synchronisation bidirectionnelle avec les serveurs JIRA
- **Tableau de Bord** : Vue d'ensemble des métriques et statistiques des tickets
- **Gestion des Projets** : Organisation et catégorisation des tickets par projet
- **Interface Responsive** : Compatible desktop, tablette et mobile
- **Authentification** : Système de connexion sécurisé
- **Rapports & Exports** : Génération de rapports PDF avec jsPDF
- **Thème Moderne** : Interface basée sur CoreUI avec thème sombre/clair

## 📋 Table des Matières

* [Technologies Utilisées](#technologies-utilisées)
* [Prérequis](#prérequis)
* [Installation](#installation)
* [Utilisation](#utilisation)
* [Structure du Projet](#structure-du-projet)
* [Fonctionnalités Détaillées](#fonctionnalités-détaillées)
* [Configuration JIRA](#configuration-jira)
* [Scripts Disponibles](#scripts-disponibles)
* [Déploiement](#déploiement)
* [Contribution](#contribution)
* [Support](#support)
* [Licence](#licence)

## 🛠️ Technologies Utilisées

### Frontend
- **React 18.3.1** - Bibliothèque JavaScript pour les interfaces utilisateur
- **Vite 6.2.0** - Outil de build rapide et serveur de développement
- **CoreUI 5.4.0** - Framework UI pour React avec composants Bootstrap
- **Redux & Redux Toolkit** - Gestion d'état centralisée
- **React Router Dom** - Navigation et routage côté client
- **Axios** - Client HTTP pour les appels API

### UI/UX
- **Bootstrap 5.3.3** - Framework CSS responsive
- **Material-UI** - Composants Material Design
- **CoreUI Icons** - Jeu d'icônes professionnel
- **SCSS/Sass** - Préprocesseur CSS
- **React Toastify** - Notifications toast élégantes

### Outils & Intégrations
- **jsPDF** - Génération de documents PDF
- **Chart.js** - Graphiques et visualisations
- **Date-fns** - Manipulation des dates
- **TinyMCE** - Éditeur de texte riche

## 📋 Prérequis

Avant d'installer et d'exécuter l'application, assurez-vous d'avoir :

- **Node.js** (version 16.x ou supérieure)
- **npm** (version 8.x ou supérieure) ou **yarn**
- **Git** pour le clonage du repository
- Accès à un serveur JIRA (pour l'intégration complète)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone git@github.com:aminederouich/pfe-front.git
cd pfe-front
```

### 2. Installer les dépendances

Avec npm :
```bash
npm install
```

Ou avec yarn :
```bash
yarn install
```

## 💻 Utilisation

### Serveur de développement

Démarrer le serveur de développement avec rechargement automatique :

```bash
npm start
```
ou
```bash
yarn start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

### Build de production

Générer les fichiers optimisés pour la production :

```bash
npm run build
```
ou
```bash
yarn build
```

Les fichiers générés seront placés dans le dossier `dist/`

### Prévisualisation de la production

Prévisualiser le build de production localement :

```bash
npm run serve
```
ou
```bash
yarn serve
```

## 📁 Structure du Projet

```
pfe-front/
├── public/                    # Fichiers statiques
│   ├── favicon.ico
│   └── manifest.json
│
├── src/                       # Code source principal
│   ├── actions/              # Actions Redux
│   │   ├── authActions.js    # Actions d'authentification
│   │   ├── ticketActions.js  # Actions pour les tickets
│   │   ├── jiraActions.js    # Actions JIRA
│   │   ├── projectActions.js # Actions pour les projets
│   │   └── userActions.js    # Actions utilisateur
│   │
│   ├── assets/               # Ressources statiques
│   │   ├── brand/           # Logos et branding
│   │   └── images/          # Images et icônes
│   │       ├── avatars/     # Avatars utilisateurs
│   │       ├── issuetype/   # Icônes types d'issues
│   │       └── priorities/  # Icônes priorités
│   │
│   ├── components/           # Composants réutilisables
│   │   ├── AppHeader.js     # En-tête de l'application
│   │   ├── AppSidebarNav.js # Navigation latérale
│   │   ├── header/          # Composants d'en-tête
│   │   └── Modal/           # Modales
│   │       ├── ModalCreateTicket.js
│   │       ├── ModalEditTicket.js
│   │       └── ModalEditProject.js
│   │
│   ├── layout/               # Layouts de page
│   │   └── DefaultLayout.js  # Layout principal
│   │
│   ├── reducers/             # Reducers Redux
│   │   ├── authReducer.js    # Gestion authentification
│   │   ├── ticketReducer.js  # Gestion tickets
│   │   ├── jiraReducer.js    # Gestion JIRA
│   │   └── projectReducer.js # Gestion projets
│   │
│   ├── services/             # Services API
│   │   ├── authService.js    # Service authentification
│   │   ├── ticketService.js  # Service tickets
│   │   ├── jiraService.js    # Service JIRA
│   │   └── projectService.js # Service projets
│   │
│   ├── scss/                 # Styles SCSS
│   │   ├── _variables.scss   # Variables CSS
│   │   ├── _mixins.scss      # Mixins SCSS
│   │   └── style.scss        # Styles principaux
│   │
│   ├── utils/                # Utilitaires
│   │   ├── authProviders.js  # Fournisseurs d'auth
│   │   ├── emptyIssue.js     # Templates d'issues
│   │   └── TicketsConsts.js  # Constantes tickets
│   │
│   ├── views/                # Pages de l'application
│   │   ├── dashboard/        # Tableau de bord
│   │   ├── pages/            # Pages métier
│   │   │   ├── Tickets/      # Gestion des tickets
│   │   │   │   └── TicketView.js # Vue détaillée ticket
│   │   │   ├── jira/         # Configuration JIRA
│   │   │   ├── projet/       # Gestion projets
│   │   │   └── login/        # Authentification
│   │   └── base/             # Composants de base
│   │
│   ├── _nav.js               # Configuration navigation
│   ├── App.js                # Composant racine
│   ├── index.js              # Point d'entrée
│   ├── routes.js             # Configuration routes
│   └── store.js              # Store Redux
│
├── index.html                # Template HTML
├── package.json              # Dépendances et scripts
├── vite.config.mjs          # Configuration Vite
└── README.md                # Documentation projet
```

## ⚙️ Fonctionnalités Détaillées

### 🎫 Gestion des Tickets
- **Création de tickets** : Interface intuitive pour créer de nouveaux tickets
- **Vue détaillée** : Affichage complet des informations ticket (résumé, description, priorité, statut, assigné, etc.)
- **Édition en ligne** : Modification directe des champs ticket
- **Sous-tâches** : Visualisation et gestion des sous-tâches
- **Historique** : Suivi des modifications et commentaires
- **Filtrage et recherche** : Outils avancés de recherche et filtrage

### 🔗 Intégration JIRA
- **Synchronisation bidirectionnelle** : Synchronisation temps réel avec JIRA
- **Configuration serveur** : Interface de configuration des serveurs JIRA
- **Import/Export** : Import de tickets existants et export de données
- **Mapping de champs** : Configuration du mapping des champs personnalisés

### 📊 Tableau de Bord
- **Métriques en temps réel** : Statistiques des tickets par statut, priorité, assigné
- **Graphiques interactifs** : Visualisations avec Chart.js
- **Rapports personnalisés** : Génération de rapports PDF
- **Notifications** : Alertes et notifications en temps réel

### 👥 Gestion des Projets
- **Organisation par projet** : Regroupement et catégorisation des tickets
- **Configuration projet** : Paramétrage des workflows et champs personnalisés
- **Gestion des équipes** : Attribution des rôles et permissions

## 🔧 Configuration JIRA

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Configuration JIRA
VITE_JIRA_BASE_URL=https://votre-instance.atlassian.net
VITE_JIRA_USERNAME=votre-email@exemple.com
VITE_JIRA_API_TOKEN=votre-token-api

# Configuration API Backend
VITE_API_BASE_URL=http://localhost:8080/api
```

### Configuration du serveur JIRA

1. **Accédez à la configuration JIRA** via le menu de navigation
2. **Configurez les paramètres de connexion** :
   - URL du serveur JIRA
   - Nom d'utilisateur
   - Token d'API JIRA
3. **Testez la connexion** pour vérifier la configuration
4. **Configurez le mapping des champs** selon vos besoins

## 🛠️ Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm start

# Build de production
npm run build

# Prévisualiser le build de production
npm run serve

# Linter le code
npm run lint

# Corriger automatiquement les erreurs de lint
npm run lint:fix
```

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

### Déploiement sur serveur web

1. **Upload des fichiers** : Copiez le contenu du dossier `dist/` sur votre serveur web
2. **Configuration serveur** : Configurez votre serveur pour servir l'application React
3. **Variables d'environnement** : Configurez les variables d'environnement pour la production

### Exemple de configuration Apache

```apache
<VirtualHost *:80>
    DocumentRoot /var/www/takeit/dist
    ServerName votre-domaine.com
    
    <Directory /var/www/takeit/dist>
        AllowOverride All
        Require all granted
    </Directory>
    
    # Redirection pour React Router
    FallbackResource /index.html
</VirtualHost>
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Standards de code

- Utilisez ESLint et Prettier pour le formatage du code
- Respectez les conventions de nommage React/JavaScript
- Ajoutez des tests pour les nouvelles fonctionnalités
- Documentez les nouvelles fonctionnalités

## 📞 Support

Pour toute question ou problème :

- **Issues GitHub** : [Ouvrir une issue](https://github.com/aminederouich/pfe-front/issues)
- **Documentation** : Consultez ce README et les commentaires dans le code
- **Email** : Contactez l'équipe de développement

## 📝 Changelog

### Version 0.0.0 (Actuelle)
- ✅ Gestion complète des tickets JIRA
- ✅ Interface d'administration moderne
- ✅ Intégration JIRA bidirectionnelle
- ✅ Tableau de bord avec métriques
- ✅ Génération de rapports PDF
- ✅ Système d'authentification
- ✅ Design responsive

## 🎯 Roadmap

- [ ] **API REST complète** : Développement de l'API backend
- [ ] **Tests automatisés** : Implémentation des tests unitaires et d'intégration
- [ ] **Notifications push** : Système de notifications en temps réel
- [ ] **Mode hors ligne** : Support pour le mode déconnecté
- [ ] **Plugins JIRA** : Support des plugins JIRA personnalisés
- [ ] **Multi-tenant** : Support multi-organisations

## 👨‍💻 Équipe de Développement

**Amine Derouich**
- GitHub: [@aminederouich](https://github.com/aminederouich)
- Email: amine.derouich@exemple.com

**Projet de Fin d'Études**
- Institution : [Nom de votre institution]
- Année : 2024-2025
- Encadrant : [Nom de l'encadrant]

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2024 Amine Derouich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

**⭐ Si ce projet vous a été utile, n'hésitez pas à lui donner une étoile !**
