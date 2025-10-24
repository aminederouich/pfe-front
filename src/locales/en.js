import modalCreateTicketEn from './modals/modalCreateTicket/en'
import loginPage from './pages/login/en.js'
import projectPage from './pages/project/en.js'
import ticketPage from './pages/ticket/en.js'
import employeePage from './pages/employee/en'
import jiraPage from './jira/en'

const en = {
  translation: {
    welcome: 'Welcome',
    description: 'This is an example of i18next integration.',
    employees: 'Employees',
    projects: 'Projects',
    tickets: 'Tickets',
    create: 'Create',
    loading: 'Loading...',
    header: {
      nav: {
        dashboard: 'Dashboard',
        employees: 'Employees',
        projects: 'Projects',
        tickets: 'Tickets',
      },
      actions: {
        create: 'Create',
        notifications: 'Notifications',
        tasks: 'Tasks',
        messages: 'Messages',
      },
      lang: {
        fr: 'FR',
        en: 'EN',
      },
      dropdown: {
        account: 'Account',
        updates: 'Updates',
        messages: 'Messages',
        tasks: 'Tasks',
        comments: 'Comments',
        settingsSection: 'Settings',
        profile: 'Profile',
        settings: 'Settings',
        payments: 'Payments',
        projects: 'Projects',
        logout: 'Logout',
        jiraConfig: 'Jira API configuration',
        rulesConfig: 'Rules configuration',
        addUser: 'Add user',
        avatarAlt: 'User avatar',
      },
    },
    loginPage: loginPage,
    projectPage: projectPage,
    ticketPage: ticketPage,
    employeePage: employeePage,
    //Modal Create Ticket
    modalCreateTicket: modalCreateTicketEn,
    // Jira Configuration Page
    jira: {
      config: {
        pageTitle: 'Jira API Configuration',
        pageSubtitle: 'Current Jira API configuration settings',
        addButton: 'Add Configuration',
        table: {
          status: 'Status',
          host: 'Host',
          username: 'Username',
          protocol: 'Protocol',
          apiVersion: 'API Version',
          actions: 'Actions',
        },
        status: {
          enabled: 'Enabled',
          disabled: 'Disabled',
        },
        actions: {
          delete: 'Delete',
          edit: 'Edit',
          enable: 'Enable',
          disable: 'Disable',
        },
        toast: {
          deleteFailed: 'Delete failed',
          deleteSuccess: 'Successfully deleted',
          updateFailed: 'Update failed',
          updateSuccess: 'Successfully updated',
          connectionFailed: 'Connection failed',
        },
      },
      // Reuse existing jira page (add configuration form) translations
      editConfig: jiraPage.editConfig,
      addConfig: jiraPage.addConfig,
    },
    // User Score Widget translations
    scoreWidget: {
      lastScore: {
        title: 'Last score',
        text: 'Date: {{date}} | % of total: {{percent}}%',
      },
      weekScore: {
        title: 'Week score',
        text: '% of total: {{percent}}%',
      },
      lastWeekScore: {
        title: 'Last week score',
        text: '% of total: {{percent}}%',
      },
      totalScore: {
        title: 'Total score',
        text: 'Global score ({{percent}}%)',
      },
    },
    nav: {
      dashboard: 'Dashboard',
      theme: 'Theme',
      colors: 'Colors',
      typography: 'Typography',
      components: 'Components',
      base: 'Base',
      accordion: 'Accordion',
      breadcrumb: 'Breadcrumb',
      cards: 'Cards',
      carousel: 'Carousel',
      collapse: 'Collapse',
      listGroup: 'List group',
      navsTabs: 'Navs & Tabs',
      pagination: 'Pagination',
      placeholders: 'Placeholders',
      popovers: 'Popovers',
      progress: 'Progress',
      spinners: 'Spinners',
      tables: 'Tables',
      tabs: 'Tabs',
      tooltips: 'Tooltips',
      buttons: 'Buttons',
      buttonsGroups: 'Buttons groups',
      dropdowns: 'Dropdowns',
      forms: 'Forms',
      formControl: 'Form Control',
      select: 'Select',
      checksRadios: 'Checks & Radios',
      range: 'Range',
      inputGroup: 'Input Group',
      floatingLabels: 'Floating Labels',
      layout: 'Layout',
      validation: 'Validation',
      charts: 'Charts',
      icons: 'Icons',
      coreuiFree: 'CoreUI Free',
      coreuiFlags: 'CoreUI Flags',
      coreuiBrands: 'CoreUI Brands',
      notifications: 'Notifications',
      alerts: 'Alerts',
      badges: 'Badges',
      modal: 'Modal',
      toasts: 'Toasts',
      widgets: 'Widgets',
      new: 'NEW',
    },
    routes: {
      home: 'Home',
      dashboard: 'Dashboard',
      login: 'Login',
      employees: 'Employees',
      employeeList: 'Employees list',
      employeeDetail: 'Employee detail',
      tickets: 'Tickets',
      ticketsList: 'Tickets list',
      ticketView: 'Ticket View',
      ticketEdit: 'Edit Ticket',
      jira: 'Jira',
      jiraConfig: 'Jira API Configuration',
      projet: 'Project',
      projetList: 'Projects list',
      rule: 'Rule',
      ruleConfig: 'Rules configuration',
    },
    employee: {
      invite: {
        success: 'Invitation sent successfully!',
        errorSend: 'Failed to send invitation',
      },
    },
    user: {
      update: {
        success: 'User updated successfully.',
        error: 'An error occurred while updating the user.',
      },
      password: {
        success: 'Password updated successfully.',
        error: 'An error occurred while updating the password.',
      },
      add: {
        title: 'Add a new team member',
        email: {
          label: 'Email',
          placeholder: 'e.g. "maria@company.com"',
        },
        submit: 'Send invitation',
        cancel: 'Cancel',
        errors: {
          managerNotFound: 'Cannot send invitation: manager identifier not found.',
        },
      },
    },
    modal: {
      assignTicket: {
        title: 'Assigned person',
        submit: 'Assign',
        errors: {
          createFailed: 'Error creating ticket',
        },
      },
      fields: {
        assignee: 'Assignee',
        nonAssigned: 'Unassigned',
      },
      actions: {
        assigneeToMe: 'Assign to me',
        cancel: 'Cancel',
      },
    },
  },
}

export default en
