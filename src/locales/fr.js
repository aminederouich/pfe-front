const fr = {
  translation: {
    welcome: 'Bienvenue',
    description: "Ceci est un exemple d'intégration i18next.",
    employees: 'Employés',
    projects: 'Projets',
    tickets: 'Tickets',
    create: 'Créer',
    // Ajoutez d'autres clés si besoin
    //Modal Create Ticket
    modal: {
      title: 'Créer un nouveau ticket',
      description: "Les champs obligatoires sont marqués d'un astérisque *",
      fields: {
        projectType: ' Type projet *',
        configJira: 'Configuration Jira *',
        projectName: 'Nom du projet *',
        issueType: 'Type de ticket *',
        summary: 'Résumé *',
        description: 'Description *',
        priority: 'Priorité *',
        startDate: 'Date début *',
        endDate: 'Date de fin *',
      },
      fieldsHelper: {
        project: 'Sélectionnez le projet auquel ce ticket appartient.',
        summary: 'Résumé du ticket...',
        description: 'Description détaillée du ticket...',
        priority: 'Sélectionnez le niveau de priorité pour ce ticket...',
        configJira: 'Sélectionnez une configuration Jira...',
        configJiraHelper: 'Veuillez sélectionner une configuration Jira.',
      },
      actions: {
        create: 'Créer',
        creating: 'Création...',
        cancel: 'Annuler',
      },
    },
  },
}

export default fr
