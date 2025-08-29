import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const EmployeeList = React.lazy(() => import('./views/pages/employee/EmployeeList'))
const EmployeeDetail = React.lazy(() => import('./views/pages/employee/EmployeeDetail'))
const ResetPassword = React.lazy(() => import('./views/pages/employee/ResetPassword'))
const Tickets = React.lazy(() => import('./views/pages/Tickets/TicketsHome'))
const TicketView = React.lazy(() => import('./views/pages/Tickets/TicketView'))
const EditTicket = React.lazy(() => import('./views/pages/Tickets/EditTicket'))

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

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

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },

  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },

  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
