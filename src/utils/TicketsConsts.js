export const projects = [
  { label: 'Interne', value: 'interne' },
  { label: 'Externe', value: 'externe' },
]

export const issueTypes = [
  {
    value: 'Bug',
    label: 'Bug',
  },
  {
    value: 'Task',
    label: 'Task',
  },
  {
    value: 'Story',
    label: 'Story',
  },
  {
    value: 'Epic',
    label: 'Epic',
  },
  // {
  //   value: 'Sub-task',
  //   label: 'Sub-task',
  // },
  // {
  //   value: 'Improvement',
  //   label: 'Improvement',
  // },
  // {
  //   value: 'New Feature',
  //   label: 'New Feature',
  // },
  // {
  //   value: 'Test',
  //   label: 'Test',
  // },
  // {
  //   value: 'Documentation',
  //   label: 'Documentation',
  // },
  // {
  //   value: 'Test Execution',
  //   label: 'Test Execution',
  // },
  // {
  //   value: 'Pre-Condition',
  //   label: 'Pre-Condition',
  // },
  // {
  //   value: 'Test Plan',
  //   label: 'Test Plan',
  // },
  // {
  //   value: 'Incident',
  //   label: 'Incident',
  // },
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
      type: 'PROJECT',
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
]
