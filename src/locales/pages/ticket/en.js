const ticketPage = {
  title: 'Ticket Page',
  allTickets: 'All tickets',
  description:
    'This is the ticket management page. You can view, add, edit, or delete tickets here.',
  fields: {
    internal: 'Internal',
    external: 'External',
    ticketName: 'Ticket Name',
    key: 'Key',
    ticketType: 'Ticket Type',
    ticketLead: 'Ticket Lead',
    ticketCategory: 'Ticket Category',
    actions: 'Actions',
  },
  fieldsHelper: {
    ticketName: 'Enter the ticket name',
    key: 'Enter the ticket key',
    ticketType: 'Select the ticket type',
    ticketLead: 'The Ticket Lead is automatically set to the user who creates the ticket',
    ticketCategory: 'Select the ticket category',
  },
  toast: {
    add: 'Ticket added successfully',
    delete: 'Ticket deleted successfully',
    edit: 'Ticket edited successfully',
    fill: 'Please fill in all required fields',
    key: 'Key must be at least 3 characters long',
    keyUppercase: 'Key must contain only uppercase letters',
  },
  other: {
    show: 'Show',
    elementsPerPage: 'Elements per page',
    noTickets: 'No tickets found',
    loading: 'Loading tickets...',
  },
  actions: {
    add: 'Add Ticket',
    delete: 'Delete',
    edit: 'Edit',
  },
}
export default ticketPage
