const modalCreateTicketEn = {
  title: 'Create a new ticket',
  description: 'The required fields are marked with an asterisk.',
  fields: {
    projectType: 'Project type *',
    configJira: 'Jira configuration *',
    projectName: 'Project name *',
    issueType: 'Issue type *',
    summary: 'Summary *',
    description: 'Description',
    priority: 'Priority *',
    assignee: 'Assignee *',
    nonAssigned: 'Non assigned',
    startDate: 'Start date *',
    endDate: 'Deadline *',
  },
  fieldsHelper: {
    project: 'Select the project this ticket belongs to.',
    summary: 'Summary of the ticket...',
    description: 'Detailed description of the ticket...',
    priority: 'Select the priority level for this ticket...',
    configJira: 'Select a Jira configuration...',
    configJiraHelper: 'Please select a Jira configuration.',
    projectName: 'Select the project name...',
  },
  fieldsErrors: {
    externalLink: 'The external link is required for an external project.',
    project: 'The project is required for an internal project.',
    issuetype: 'The issue type is required for an internal project.',
    summary: 'The summary is required for an internal project.',
    priority: 'The priority is required for an internal project.',
    sameStartEndDate: 'The start date and end date cannot be the same.',
  },
  projectTypeOptions: {
    interne: 'Internal',
    externe: 'External',
  },
  errors: {
    createFailed: 'Error creating ticket',
  },
  actions: {
    assigneeToMe: 'Assign it to me',
    create: 'Create',
    creating: 'Creating...',
    cancel: 'Cancel',
  },
}

export default modalCreateTicketEn
