const projectPage = {
  title: 'Project Page',
  allProjects: 'All projects',
  description:
    'This is the project management page. You can view, add, edit, or delete projects here.',
  modifierConfigurationJira: 'Edit Jira Configuration',
  fields: {
    projectName: 'Project Name',
    key: 'Key',
    projectType: 'Project Type',
    projectLead: 'Project Lead',
    projectCategory: 'Project Category',
    actions: 'Actions',
  },
  fieldsHelper: {
    projectName: 'Enter the project name',
    key: 'Enter the project key',
    projectType: 'Select the project type',
    projectLead: 'The Project Lead is automatically set to the user who creates the project',
    projectCategory: 'Select the project category',
  },
  toast: {
    add: 'Project added successfully',
    delete: 'Project deleted successfully',
    edit: 'Project edited successfully',
    fill: 'Please fill in all required fields',
    key: 'Key must be at least 3 characters long',
    keyUppercase: 'Key must contain only uppercase letters',
  },
  actions: {
    add: 'Add Project',
    delete: 'Delete',
    edit: 'Edit',
  },
}
export default projectPage
