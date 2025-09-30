import modalCreateTicketFr from './modals/modalCreateTicket/fr'
import loginPage from './pages/login/fr'
import projectPage from './pages/project/fr'
import ticketPage from './pages/ticket/fr'
import employeePage from './pages/employee/fr'
import jiraPage from './jira/fr'

const fr = {
  translation: {
    welcome: 'Bienvenue',
    description: "Ceci est un exemple d'intégration i18next.",
    employees: 'Employés',
    projects: 'Projets',
    tickets: 'Tickets',
    create: 'Créer',
    loading: 'Chargement...',
    header: {
      nav: {
        dashboard: 'Tableau de bord',
        employees: 'Employés',
        projects: 'Projets',
        tickets: 'Tickets',
      },
      actions: {
        create: 'Créer',
        notifications: 'Notifications',
        tasks: 'Tâches',
        messages: 'Messages',
      },
      lang: {
        fr: 'FR',
        en: 'EN',
      },
      dropdown: {
        account: 'Compte',
        updates: 'Mises à jour',
        messages: 'Messages',
        tasks: 'Tâches',
        comments: 'Commentaires',
        settingsSection: 'Paramètres',
        profile: 'Profil',
        settings: 'Paramètres',
        payments: 'Paiements',
        projects: 'Projets',
        logout: 'Déconnexion',
        jiraConfig: 'Configuration API Jira',
        rulesConfig: 'Configuration des règles',
        addUser: 'Ajouter un utilisateur',
        avatarAlt: "Avatar de l'utilisateur",
      },
    },
    loginPage: loginPage,
    projectPage: projectPage,
    ticketPage: ticketPage,
    employeePage: employeePage,
    //Modal Create Ticket
    modalCreateTicket: modalCreateTicketFr,
    // Jira Configuration Page
    jira: {
      config: {
        pageTitle: 'Configuration API Jira',
        pageSubtitle: "Paramètres actuels de configuration de l'API Jira",
        addButton: 'Ajouter une configuration',
        table: {
          status: 'Statut',
          host: 'Hôte',
          username: "Nom d'utilisateur",
          protocol: 'Protocole',
          apiVersion: 'Version API',
          actions: 'Actions',
        },
        status: {
          enabled: 'Activée',
          disabled: 'Désactivée',
        },
        actions: {
          delete: 'Supprimer',
          edit: 'Modifier',
          enable: 'Activer',
          disable: 'Désactiver',
        },
        toast: {
          deleteFailed: 'Échec de la suppression',
          deleteSuccess: 'Supprimé avec succès',
          updateFailed: 'Échec de la mise à jour',
          updateSuccess: 'Mise à jour réussie',
          connectionFailed: 'Échec de la connexion',
        },
      },
      addConfig: jiraPage.addConfig,
    },
    // Widget Score Utilisateur
    scoreWidget: {
      lastScore: {
        title: 'Dernier score',
        text: 'Date : {{date}} | % du total : {{percent}}%',
      },
      weekScore: {
        title: 'Score semaine',
        text: '% du total : {{percent}}%',
      },
      lastWeekScore: {
        title: 'Score dernière semaine',
        text: '% du total : {{percent}}%',
      },
      totalScore: {
        title: 'Score total',
        text: 'Score global ({{percent}}%)',
      },
    },
    nav: {
      dashboard: 'Tableau de bord',
      theme: 'Thème',
      colors: 'Couleurs',
      typography: 'Typographie',
      components: 'Composants',
      base: 'Base',
      accordion: 'Accordéon',
      breadcrumb: "Fil d'Ariane",
      cards: 'Cartes',
      carousel: 'Carrousel',
      collapse: 'Réduire',
      listGroup: 'Liste groupée',
      navsTabs: 'Onglets & Navigations',
      pagination: 'Pagination',
      placeholders: 'Espaces réservés',
      popovers: 'Infobulles',
      progress: 'Progression',
      spinners: 'Chargements',
      tables: 'Tableaux',
      tabs: 'Onglets',
      tooltips: 'Tooltips',
      buttons: 'Boutons',
      buttonsGroups: 'Groupes de boutons',
      dropdowns: 'Menus déroulants',
      forms: 'Formulaires',
      formControl: 'Contrôle de formulaire',
      select: 'Sélection',
      checksRadios: 'Cases & Radios',
      range: 'Plage',
      inputGroup: 'Groupe de champs',
      floatingLabels: 'Libellés flottants',
      layout: 'Mise en page',
      validation: 'Validation',
      charts: 'Graphiques',
      icons: 'Icônes',
      coreuiFree: 'CoreUI Gratuit',
      coreuiFlags: 'Drapeaux CoreUI',
      coreuiBrands: 'Marques CoreUI',
      notifications: 'Notifications',
      alerts: 'Alertes',
      badges: 'Badges',
      modal: 'Modal',
      toasts: 'Toasts',
      widgets: 'Widgets',
      new: 'NOUVEAU',
    },
    routes: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      login: 'Connexion',
      employees: 'Employés',
      employeeList: 'Liste des employés',
      employeeDetail: 'Détail employé',
      tickets: 'Tickets',
      ticketsList: 'Liste des tickets',
      ticketView: 'Vue Ticket',
      ticketEdit: 'Modifier Ticket',
      jira: 'Jira',
      jiraConfig: 'Configuration API Jira',
      projet: 'Projet',
      projetList: 'Liste des projets',
      rule: 'Règle',
      ruleConfig: 'Configuration des règles',
    },
    employee: {
      invite: {
        success: 'Invitation envoyée avec succès !',
        errorSend: 'Échec de l’envoi de l’invitation',
      },
    },
    user: {
      update: {
        success: 'Utilisateur mis à jour avec succès.',
        error: "Une erreur s'est produite lors de la mise à jour de l'utilisateur.",
      },
      password: {
        success: 'Mot de passe mis à jour avec succès.',
        error: "Une erreur s'est produite lors de la mise à jour du mot de passe.",
      },
      add: {
        title: "Ajouter un nouveau membre d'équipe",
        email: {
          label: 'Email',
          placeholder: 'par exemple : "maria@entreprise.com"',
        },
        submit: 'Envoyer l’invitation',
        cancel: 'Annuler',
        errors: {
          managerNotFound: 'Impossible d’envoyer l’invitation : identifiant manager introuvable.',
        },
      },
    },
    modal: {
      assignTicket: {
        title: 'Personne assignée',
        submit: 'Assigner',
        errors: {
          createFailed: 'Erreur lors de la création du ticket',
        },
      },
      fields: {
        assignee: 'Assigné',
        nonAssigned: 'Non assigné',
      },
      actions: {
        assigneeToMe: "M'assigner",
        cancel: 'Annuler',
      },
    },
  },
}

export default fr
