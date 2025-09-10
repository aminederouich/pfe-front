import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const EmployeeList = React.lazy(() => import('./views/pages/employee/EmployeeList'))
const EmployeeDetail = React.lazy(() => import('./views/pages/employee/EmployeeDetail'))
const ResetPassword = React.lazy(() => import('./views/pages/employee/ResetPassword'))

const Tickets = React.lazy(() => import('./views/pages/Tickets/TicketsHome'))
const TicketView = React.lazy(() => import('./views/pages/Tickets/TicketView'))
const EditTicket = React.lazy(() => import('./views/pages/Tickets/EditTicket'))

const ConfigJiraApi = React.lazy(() => import('./views/pages/jira/ConfigJiraApi'))

const Projet = React.lazy(() => import('./views/pages/projet/Projet'))
const ConfigRules = React.lazy(() => import('./views/pages/rule/RulesIndex'))

const Login = React.lazy(() => import('./views/pages/login/Login'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/login', name: 'Login', element: Login },

  { path: '/employees', name: 'employés', element: EmployeeList, exact: true },
  { path: '/employees/list', name: 'Liste des employés', element: EmployeeList },
  { path: '/employees/:uid', name: 'Détail Employé', element: EmployeeDetail },
  { path: '/reset-password', name: 'Définir mot de passe', element: ResetPassword },

  { path: '/tickets', name: 'Tickets', element: Tickets, exact: true },
  { path: '/tickets/list', name: 'liste des Tickets', element: Tickets },
  { path: '/ticket/:code', name: 'Ticket View', element: TicketView },
  { path: '/ticket/edit/:code', name: 'Edit Ticket', element: EditTicket },

  { path: '/jira', name: 'Jira', element: ConfigJiraApi, exact: true },
  { path: '/jira/config-jira-api', name: 'Configuration Jira API', element: ConfigJiraApi },

  { path: '/projet', element: Projet, name: 'Projet', exact: true },
  { path: '/projet/list', name: 'liste des projets', element: Projet },

  { path: '/rule', name: 'Rule', element: ConfigRules, exact: true },
  { path: '/rule/Config', name: 'Configuration des rules ', element: ConfigRules },
]

export default routes
