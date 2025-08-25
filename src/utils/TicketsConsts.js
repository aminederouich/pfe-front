export const projects = [
  { label: 'Interne', value: 'interne' },
  { label: 'Externe', value: 'externe' },
]

export const Prioritys = [
  {
    id: '1',
    name: 'Highest',
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/1',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/highest_new.svg',
  },
  {
    id: '2',
    name: 'High',
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/2',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/high_new.svg',
  },
  {
    id: '3',
    name: 'Medium',
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/3',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/medium_new.svg',
  },
  {
    id: '4',
    name: 'Low',
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/4',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/low_new.svg',
  },
  {
    id: '5',
    name: 'Lowest',
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/5',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/lowest_new.svg',
  },
]

export const priorityConfig = [
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/1',
    statusColor: '#d04437',
    description: 'This problem will block progress.',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/highest_new.svg',
    name: 'Highest',
    id: '1',
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/2',
    statusColor: '#f15C75',
    description: 'Serious problem that could block progress.',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/high_new.svg',
    name: 'High',
    id: '2',
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/3',
    statusColor: '#f79232',
    description: 'Has the potential to affect progress.',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/medium_new.svg',
    name: 'Medium',
    id: '3',
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/4',
    statusColor: '#707070',
    description: 'Minor problem or easily worked around.',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/low_new.svg',
    name: 'Low',
    id: '4',
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/priority/5',
    statusColor: '#999999',
    description: 'Trivial problem with little or no impact on progress.',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/images/icons/priorities/lowest_new.svg',
    name: 'Lowest',
    id: '5',
  },
]

export const issuetype = [
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/10003',
    id: '10003',
    description: "Une fonctionnalité exprimée sous la forme d'un objectif utilisateur.",
    iconUrl:
      'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
    name: 'Story',
    untranslatedName: 'Story',
    subtask: false,
    avatarId: 10315,
    hierarchyLevel: 0,
    scope: {
      type: 'PROJECT',
      project: {
        id: '10000',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/10002',
    id: '10002',
    description: 'Un problème ou une erreur.',
    iconUrl:
      'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
    name: 'Bug',
    untranslatedName: 'Bug',
    subtask: false,
    avatarId: 10303,
    hierarchyLevel: 0,
    scope: {
      type: 'INTERNE',
      project: {
        id: '10000',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/101111',
    id: '100111',
    description: 'Une nouvelle fonctionnalité.',
    iconUrl:
      'https://sesame-team-pfe.atlassian.net/rest/api/3/universal_avatar/view/type/issuetype/avatar/10311?size=medium',
    name: 'New Feature',
    untranslatedName: 'New-Feature',
    subtask: false,
    avatarId: 10311,
    hierarchyLevel: 0,
    scope: {
      type: 'INTERNE',
      project: {
        id: '10000',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/10001',
    id: '10001',
    description: 'Une tâche distincte.',
    iconUrl:
      'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
    name: 'Tâche',
    untranslatedName: 'Task',
    subtask: false,
    avatarId: 10318,
    hierarchyLevel: 0,
    scope: {
      type: 'PROJECT',
      project: {
        id: '10000',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/10005',
    id: '10005',
    description:
      "Les sous-tâches sont de petites unités de travail qui font partie d'une tâche plus importante.",
    iconUrl:
      'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10316?size=medium',
    name: 'Sous-tâche',
    untranslatedName: 'Sous-tâche',
    subtask: true,
    avatarId: 10316,
    hierarchyLevel: -1,
    scope: {
      type: 'PROJECT',
      project: {
        id: '10000',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/issuetype/10004',
    id: '10004',
    description: 'Une collection de bugs, stories et tâches connexes.',
    iconUrl:
      'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium',
    name: 'Epic',
    untranslatedName: 'Epic',
    subtask: false,
    avatarId: 10307,
    hierarchyLevel: 1,
    scope: {
      type: 'PROJECT',
      project: {
        id: '10000',
      },
    },
  },
]

export const status = [
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/status/10000',
    description: '',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/',
    name: 'À faire',
    untranslatedName: 'To Do',
    id: '10000',
    statusCategory: {
      self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/statuscategory/2',
      id: 2,
      key: 'new',
      colorName: 'blue-gray',
      name: 'A faire',
    },
    scope: {
      type: 'PROJECT',
      project: {
        id: '10000',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/status/10001',
    description: 'Ce ticket est en cours de traitement par la personne assignée.',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/',
    name: 'En cours',
    untranslatedName: 'In Progress',
    id: '10001',
    statusCategory: {
      self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/statuscategory/4',
      id: 4,
      key: 'indeterminate',
      colorName: 'yellow',
      name: 'En cours',
    },
    scope: {
      type: 'PROJECT',
      project: {
        id: '10000',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/status/10002',
    description: '',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/',
    name: 'Terminé(e)',
    untranslatedName: 'Done',
    id: '10002',
    statusCategory: {
      self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/statuscategory/3',
      id: 3,
      key: 'done',
      colorName: 'green',
      name: 'Terminé',
    },
    scope: {
      type: 'PROJECT',
      project: {
        id: '10000',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/status/10033',
    description: '',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/',
    name: 'en attend de validation',
    untranslatedName: 'en attend de validation',
    id: '10033',
    statusCategory: {
      self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/statuscategory/4',
      id: 4,
      key: 'indeterminate',
      colorName: 'yellow',
      name: 'En cours',
    },
    scope: {
      type: 'PROJECT',
      project: {
        id: '10000',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/status/10066',
    description: '',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/',
    name: 'À faire',
    untranslatedName: 'To Do',
    id: '10066',
    statusCategory: {
      self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/statuscategory/2',
      id: 2,
      key: 'new',
      colorName: 'blue-gray',
      name: 'A faire',
    },
    scope: {
      type: 'PROJECT',
      project: {
        id: '10033',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/status/10067',
    description: 'Ce ticket est en cours de traitement par la personne assignée.',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/',
    name: 'En cours',
    untranslatedName: 'In Progress',
    id: '10067',
    statusCategory: {
      self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/statuscategory/4',
      id: 4,
      key: 'indeterminate',
      colorName: 'yellow',
      name: 'En cours',
    },
    scope: {
      type: 'PROJECT',
      project: {
        id: '10033',
      },
    },
  },
  {
    self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/status/10068',
    description: '',
    iconUrl: 'https://sesame-team-pfe.atlassian.net/',
    name: 'Terminé(e)',
    untranslatedName: 'Done',
    id: '10068',
    statusCategory: {
      self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/statuscategory/3',
      id: 3,
      key: 'done',
      colorName: 'green',
      name: 'Terminé',
    },
    scope: {
      type: 'PROJECT',
      project: {
        id: '10033',
      },
    },
  },
]
