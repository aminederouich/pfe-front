const scoreRules = {
  high: [
    {
      title: 'No Missed Deadlines',
      description: 'The employee must resolve all tickets before the due date.',
      points: 10,
    },
    {
      title: 'Resolved Tickets > 80%',
      description: 'More than 80% of assigned tickets must be marked as resolved.',
      points: 8,
    },
  ],
  medium: [
    {
      title: 'Resolved within 24h after deadline',
      description: 'Tickets resolved within 24 hours after the deadline still earn partial credit.',
      points: 5,
    },
    {
      title: 'Daily Status Updates',
      description: 'Employee regularly updates the status of assigned tickets.',
      points: 4,
    },
  ],
  low: [
    {
      title: 'Detailed Ticket Descriptions',
      description: 'Each ticket includes a clear description, labels, and reproduction steps.',
      points: 2,
    },
    {
      title: 'Participation in Team Tickets',
      description: 'Employee engages in team discussions or helps on other tickets.',
      points: 1,
    },
  ],
}

export default scoreRules
