const jiraPage = {
  addConfig: {
    fields: {
      hostUrl: 'Host URL',
      placeholder: 'jira.somehost.com',
      help: 'what host is this tool connecting to for the jira instance? Ex: jira.somehost.com',
    },
    username: {
      label: 'Username',
      help: 'Specify the username for this tool to authenticate all requests with.',
    },
    password: {
      label: 'Password',
      help: 'Specify a password for this tool to authenticate all requests with. Cloud users need to generate an API token for this value.',
    },
    apiVersion: {
      label: 'API Version',
      help: 'What API version is this tool using for Jira? Ex: 2',
    },
    messages: {
      connectionFailed: 'Connection failed',
      connectionSuccess: 'Connection successful',
      addingFailed: 'Adding failed',
      addingSuccess: 'Adding successful',
      checkConnectionFirst: 'Please check the connection before adding a configuration',
    },
    alert: {
      warning:
        'Before adding a configuration, please make sure that the host url is reachable and the username and password are correct.',
      note: 'Please check the Connection before adding a configuration.',
    },
    buttons: {
      addConfig: 'Add Configuration',
      testConnection: 'Test Connection',
    },
  },
}
export default jiraPage
