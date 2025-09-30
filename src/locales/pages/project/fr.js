const projectPage = {
  title: 'Page de Projet',
  allProjects: 'Tous les projets',
  description:
    'Ceci est la page de gestion des projets. Vous pouvez consulter, ajouter, modifier ou supprimer des projets ici.',
  modifierConfigurationJira: 'Modifier configuration Jira',
  editModalTitle: 'Modifier le projet',
  fields: {
    projectName: 'Nom du projet',
    key: 'Clé',
    projectType: 'Type de projet',
    projectLead: 'Responsable du projet',
    projectCategory: 'Catégorie du projet',
    actions: 'Actions',
  },
  fieldsHelper: {
    projectName: 'Entrez le nom du projet',
    key: 'Entrez la clé du projet',
    projectType: 'Sélectionnez le type de projet',
    projectLead:
      "Le Project Lead est automatiquement défini comme l'utilisateur qui crée le projet",
    projectCategory: 'Sélectionnez la catégorie du projet',
  },
  toast: {
    add: 'Projet ajouté avec succès',
    delete: 'Projet supprimé avec succès',
    edit: 'Projet modifié avec succès',
    fill: 'Veuillez remplir tous les champs obligatoires',
    key: 'La clé doit comporter au moins 3 caractères',
    keyUppercase: 'La clé doit contenir uniquement des lettres majuscules',
  },
  actions: {
    add: 'Ajouter un projet',
    delete: 'Supprimer',
    edit: 'Modifier',
    cancel: 'Annuler',
  },
  noCategory: 'Aucune catégorie',
  projectTypeOptions: {
    software: 'Logiciel',
    business: 'Business',
  },
}
export default projectPage
