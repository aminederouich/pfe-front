const modalCreateTicketFr = {
  title: 'Créer un nouveau ticket',
  description: "Les champs obligatoires sont marqués d'un astérisque *",
  fields: {
    projectType: ' Type projet *',
    configJira: 'Configuration Jira *',
    projectName: 'Nom du projet *',
    issueType: 'Type de ticket *',
    summary: 'Résumé *',
    description: 'Description',
    priority: 'Priorité *',
    assignee: 'Assigné à *',
    nonAssigned: 'Non assigné',
    startDate: 'Date début *',
    endDate: 'Date limite',
  },
  fieldsHelper: {
    project: 'Sélectionnez le projet auquel ce ticket appartient.',
    summary: 'Résumé du ticket...',
    description: 'Description détaillée du ticket...',
    priority: 'Sélectionnez le niveau de priorité pour ce ticket...',
    configJira: 'Sélectionnez une configuration Jira...',
    configJiraHelper: 'Veuillez sélectionner une configuration Jira.',
    projectName: 'Sélectionnez le nom du projet...',
  },
  fieldsErrors: {
    externalLink: 'Le lien externe est obligatoire pour un projet externe.',
    project: 'Le projet est obligatoire pour un projet interne.',
    issuetype: 'Le type de ticket est obligatoire pour un projet interne.',
    summary: 'Le résumé est obligatoire pour un projet interne.',
    priority: 'La priorité est obligatoire pour un projet interne.',
    sameStartEndDate: 'La date de début et la date de fin ne peuvent pas être identiques.',
  },
  actions: {
    assigneeToMe: "Me l'assigner",
    create: 'Créer',
    creating: 'Création...',
    cancel: 'Annuler',
  },
}

export default modalCreateTicketFr
