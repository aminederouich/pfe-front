import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const EmployeeList = React.lazy(() => import('./views/pages/employee/EmployeeList'))
const EmployeeDetail = React.lazy(() => import('./views/pages/employee/EmployeeDetail'))

const Tickets = React.lazy(() => import('./views/pages/Tickets/TicketsHome'))
const TicketView = React.lazy(() => import('./views/pages/Tickets/TicketView'))
const EditTicket = React.lazy(() => import('./views/pages/Tickets/EditTicket'))

const ConfigJiraApi = React.lazy(() => import('./views/pages/jira/ConfigJiraApi'))

const Projet = React.lazy(() => import('./views/pages/projet/Projet'))
const ConfigRules = React.lazy(() => import('./views/pages/rule/RulesIndex'))

const Login = React.lazy(() => import('./views/pages/login/Login'))

const routes = [
  { path: '/', exact: true, name: 'Home', tKey: 'routes.home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard, tKey: 'routes.dashboard' },
  { path: '/login', name: 'Login', element: Login, tKey: 'routes.login' },

  {
    path: '/employees',
    name: 'employés',
    element: EmployeeList,
    exact: true,
    tKey: 'routes.employees',
  },
  {
    path: '/employees/list',
    name: 'Liste des employés',
    element: EmployeeList,
    tKey: 'routes.employeeList',
  },
  {
    path: '/employees/:uid',
    name: 'Détail Employé',
    element: EmployeeDetail,
    tKey: 'routes.employeeDetail',
  },

  {
    path: '/tickets',
    name: 'Tickets',
    element: Tickets,
    exact: true,
    tKey: 'routes.tickets',
  },
  {
    path: '/tickets/list',
    name: 'liste des Tickets',
    element: Tickets,
    tKey: 'routes.ticketsList',
  },
  {
    path: '/ticket/:code',
    name: 'Ticket View',
    element: TicketView,
    tKey: 'routes.ticketView',
  },
  {
    path: '/ticket/edit/:code',
    name: 'Edit Ticket',
    element: EditTicket,
    tKey: 'routes.ticketEdit',
  },

  {
    path: '/jira',
    name: 'Jira',
    element: ConfigJiraApi,
    exact: true,
    tKey: 'routes.jira',
  },
  {
    path: '/jira/config-jira-api',
    name: 'Configuration Jira API',
    element: ConfigJiraApi,
    tKey: 'routes.jiraConfig',
  },

  {
    path: '/projet',
    element: Projet,
    name: 'Projet',
    exact: true,
    tKey: 'routes.projet',
  },
  {
    path: '/projet/list',
    name: 'liste des projets',
    element: Projet,
    tKey: 'routes.projetList',
  },

  {
    path: '/rule',
    name: 'Rule',
    element: ConfigRules,
    exact: true,
    tKey: 'routes.rule',
  },
  {
    path: '/rule/Config',
    name: 'Configuration des rules ',
    element: ConfigRules,
    tKey: 'routes.ruleConfig',
  },
]

export default routes
