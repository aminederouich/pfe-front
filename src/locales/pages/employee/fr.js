const employeePage = {
  title: 'Liste des utilisateurs',
  description: 'Description de la liste des utilisateurs',
  table: {
    headers: {
      lastName: 'Nom',
      firstName: 'Prénom',
      email: 'Email',
      role: 'Rôle',
    },
    roles: {
      manager: 'Manager',
      employee: 'Employé',
      user: 'Utilisateur',
    },
    noUsers: 'Aucun utilisateur trouvé.',
  },
  detail: {
    title: "Détails de l'employé",
    notFound: 'Employé introuvable',
    role: 'Rôle',
    weeklyScores: 'Scores hebdomadaires',
    noWeeklyScores: 'Aucun score hebdomadaire trouvé.',
    startWeek: 'Semaine de début',
    endWeek: 'Semaine de fin',
    score: 'Score',
    position: 'Position',
  },
}
export default employeePage
