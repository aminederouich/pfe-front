const ticketPage = {
  title: 'Page de ticket',
  allTickets: 'Tous les tickets',
  description:
    'Ceci est la page de gestion des tickets. Vous pouvez voir, ajouter, modifier ou supprimer des tickets ici.',
  fields: {
    internal: 'Interne',
    external: 'Externe',
    ticketName: 'Nom du ticket',
    key: 'Clé',
    ticketType: 'Type de ticket',
    ticketLead: 'Responsable du ticket',
    ticketCategory: 'Catégorie du ticket',
    actions: 'Actions',
  },
  fieldsHelper: {
    ticketName: 'Entrez le nom du ticket',
    key: 'Entrez la clé du ticket',
    ticketType: 'Sélectionnez le type de ticket',
    ticketLead:
      "Le responsable du ticket est automatiquement défini sur l'utilisateur qui crée le ticket",
    ticketCategory: 'Sélectionnez la catégorie du ticket',
  },
  toast: {
    add: 'Ticket ajouté avec succès',
    delete: 'Ticket supprimé avec succès',
    edit: 'Ticket modifié avec succès',
    fill: 'Veuillez remplir tous les champs obligatoires',
    key: 'La clé doit comporter au moins 3 caractères',
    keyUppercase: 'La clé ne doit contenir que des lettres majuscules',
  },
  other: {
    show: 'Afficher',
    elementsPerPage: 'éléments par page',
    noTickets: 'Aucun ticket trouvé',
    loading: 'Chargement des tickets...',
  },
  actions: {
    add: 'Ajouter un ticket',
    delete: 'Supprimer',
    edit: 'Modifier',
  },
}
export default ticketPage
