const jiraPage = {
  addConfig: {
    fields: {
      hostUrl: "URL de l'hôte",
      placeholder: 'jira.somehost.com',
      help: "À quel hôte cet outil se connecte-t-il pour l'instance Jira ? Ex: jira.somehost.com",
    },
    username: {
      label: "Nom d'utilisateur",
      help: "Spécifiez le nom d'utilisateur pour que cet outil authentifie toutes les requêtes.",
    },
    password: {
      label: 'Mot de passe',
      help: 'Spécifiez un mot de passe pour que cet outil authentifie toutes les requêtes. Les utilisateurs cloud doivent générer un token API pour cette valeur.',
    },
    apiVersion: {
      label: 'Version API',
      help: "Quelle version de l'API Jira cet outil utilise-t-il ? Ex: 2",
    },
    messages: {
      connectionFailed: 'Échec de la connexion',
      connectionSuccess: 'Connexion réussie',
      addingFailed: "Échec de l'ajout",
      addingSuccess: 'Ajout réussi',
      checkConnectionFirst: "Veuillez vérifier la connexion avant d'ajouter une configuration",
    },
    alert: {
      warning:
        "Avant d'ajouter une configuration, assurez-vous que l'URL de l'hôte est accessible et que le nom d'utilisateur et le mot de passe sont corrects.",
      note: "Veuillez vérifier la connexion avant d'ajouter une configuration.",
    },
    buttons: {
      addConfig: 'Ajouter une configuration',
      testConnection: 'Tester la connexion',
    },
  },
  editConfig: {
    title: 'Modifier configuration Jira',
    fields: {
      strictSSL: 'Strict SSL',
    },
    messages: {
      checkConnectionFirst: 'Veuillez vérifier la connexion avant de modifier une configuration',
    },
    alert: {
      warning:
        "Avant de modifier une configuration, assurez-vous que l'URL de l'hôte est accessible et que le nom d'utilisateur et le mot de passe sont corrects.",
      noteLabel: 'Note :',
      note: 'Veuillez vérifier la connexion avant de modifier une configuration.',
    },
    buttons: {
      editConfig: 'Modifier la configuration',
      testConnection: 'Tester la connexion',
    },
  },
}
export default jiraPage
