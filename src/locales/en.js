const en = {
  translation: {
    welcome: 'Welcome',
    description: 'This is an example of i18next integration.',
    employees: 'Employees',
    projects: 'Projects',
    tickets: 'Tickets',
    create: 'Create',
    // Add more keys as needed
    //Modal Create Ticket
    modal: {
      title: 'Create a new ticket',
      description: 'The required fields are marked with an asterisk.',
      fields: {
        projectType: 'Project type *',
        configJira: 'Jira configuration *',
        projectName: 'Project name *',
        issueType: 'Issue type *',
        summary: 'Summary *',
        description: 'Description *',
        priority: 'Priority *',
        startDate: 'Start date *',
        endDate: 'End date *',
      },
      fieldsHelper: {
        project: 'Select the project this ticket belongs to.',
        summary: 'Summary of the ticket...',
        description: 'Detailed description of the ticket...',
        priority: 'Select the priority level for this ticket...',
        configJira: 'Select a Jira configuration...',
        configJiraHelper: 'Please select a Jira configuration.',
      },
      actions: {
        create: 'Create',
        creating: 'Creating...',
        cancel: 'Cancel',
      },
    },
  },
}

export default en
