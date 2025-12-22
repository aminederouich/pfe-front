import ticketReducer from '../ticketReducer'
import * as types from '../../actions/ticketActions'

describe('Ticket Reducer', () => {
  const initialState = {
    ticketList: [],
    loading: false,
    ticketSelected: null,
    error: null,
    isCreateTicketModalOpen: false,
    isAssignTicketModalOpen: false,
    isEditTicketModalOpen: false,
  }

  it('should return the initial state', () => {
    expect(ticketReducer(undefined, {})).toEqual(initialState)
  })

  describe('Modal Toggle Actions', () => {
    it('should handle TOGGLE_CREATE_TICKET_MODAL_OPEN', () => {
      const action = { type: types.TOGGLE_CREATE_TICKET_MODAL_OPEN }
      const expectedState = {
        ...initialState,
        isCreateTicketModalOpen: true,
      }
      expect(ticketReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle TOGGLE_CREATE_TICKET_MODAL_CLOSE', () => {
      const stateWithOpenModal = {
        ...initialState,
        isCreateTicketModalOpen: true,
      }
      const action = { type: types.TOGGLE_CREATE_TICKET_MODAL_CLOSE }
      const expectedState = {
        ...initialState,
        isCreateTicketModalOpen: false,
      }
      expect(ticketReducer(stateWithOpenModal, action)).toEqual(expectedState)
    })

    it('should handle TOGGLE_EDIT_TICKET_MODAL_OPEN', () => {
      const action = { type: types.TOGGLE_EDIT_TICKET_MODAL_OPEN }
      const expectedState = {
        ...initialState,
        isEditTicketModalOpen: true,
      }
      expect(ticketReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle TOGGLE_EDIT_TICKET_MODAL_CLOSE', () => {
      const stateWithOpenModal = { ...initialState, isEditTicketModalOpen: true }
      const action = { type: types.TOGGLE_EDIT_TICKET_MODAL_CLOSE }
      const expectedState = {
        ...initialState,
        isEditTicketModalOpen: false,
      }
      expect(ticketReducer(stateWithOpenModal, action)).toEqual(expectedState)
    })

    it('should handle TOGGLE_ASSIGN_TICKET_MODAL_OPEN', () => {
      const action = { type: types.TOGGLE_ASSIGN_TICKET_MODAL_OPEN }
      const expectedState = {
        ...initialState,
        isAssignTicketModalOpen: true,
      }
      expect(ticketReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle TOGGLE_ASSIGN_TICKET_MODAL_CLOSE', () => {
      const stateWithOpenModal = {
        ...initialState,
        isAssignTicketModalOpen: true,
      }
      const action = { type: types.TOGGLE_ASSIGN_TICKET_MODAL_CLOSE }
      const expectedState = {
        ...initialState,
        isAssignTicketModalOpen: false,
      }
      expect(ticketReducer(stateWithOpenModal, action)).toEqual(expectedState)
    })
  })

  describe('Ticket Selection', () => {
    it('should handle TICKET_TO_VIEW', () => {
      const ticket = { id: '1', title: 'Test Ticket', status: 'open' }
      const action = {
        type: types.TICKET_TO_VIEW,
        payload: ticket,
      }
      const expectedState = {
        ...initialState,
        ticketSelected: ticket,
      }
      expect(ticketReducer(initialState, action)).toEqual(expectedState)
    })
  })

  describe('GET_ALL_TICKETS actions', () => {
    it('should handle GET_ALL_TICKETS_REQUEST', () => {
      const action = { type: types.GET_ALL_TICKETS_REQUEST }
      const expectedState = {
        ...initialState,
        loading: true,
      }
      expect(ticketReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle GET_ALL_TICKETS_SUCCESS', () => {
      const tickets = [
        { id: '1', title: 'Ticket 1' },
        { id: '2', title: 'Ticket 2' },
      ]
      const action = {
        type: types.GET_ALL_TICKETS_SUCCESS,
        payload: tickets,
      }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
        ticketList: tickets,
      }
      expect(ticketReducer(stateWithLoading, action)).toEqual(expectedState)
    })

    it('should handle GET_ALL_TICKETS_FAILURE', () => {
      const error = 'Failed to fetch tickets'
      const action = {
        type: types.GET_ALL_TICKETS_FAILURE,
        payload: error,
      }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
        error: error,
      }
      expect(ticketReducer(stateWithLoading, action)).toEqual(expectedState)
    })
  })

  describe('ADD_NEW_TICKET actions', () => {
    it('should handle ADD_NEW_TICKET_REQUEST', () => {
      const action = { type: types.ADD_NEW_TICKET_REQUEST }
      const expectedState = {
        ...initialState,
        loading: true,
      }
      expect(ticketReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle ADD_NEW_TICKET_SUCCESS', () => {
      const action = { type: types.ADD_NEW_TICKET_SUCCESS }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
      }
      expect(ticketReducer(stateWithLoading, action)).toEqual(expectedState)
    })

    it('should handle ADD_NEW_TICKET_FAILURE', () => {
      const error = 'Failed to add ticket'
      const action = {
        type: types.ADD_NEW_TICKET_FAILURE,
        payload: error,
      }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
        error: error,
      }
      expect(ticketReducer(stateWithLoading, action)).toEqual(expectedState)
    })
  })

  describe('UPDATE_TICKET actions', () => {
    it('should handle UPDATE_TICKET_REQUEST', () => {
      const action = { type: types.UPDATE_TICKET_REQUEST }
      const expectedState = {
        ...initialState,
        loading: true,
      }
      expect(ticketReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle UPDATE_TICKET_SUCCESS', () => {
      const action = { type: types.UPDATE_TICKET_SUCCESS }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
      }
      expect(ticketReducer(stateWithLoading, action)).toEqual(expectedState)
    })

    it('should handle UPDATE_TICKET_FAILURE', () => {
      const error = 'Failed to update ticket'
      const action = {
        type: types.UPDATE_TICKET_FAILURE,
        payload: error,
      }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
        error: error,
      }
      expect(ticketReducer(stateWithLoading, action)).toEqual(expectedState)
    })
  })

  describe('JIRA Integration actions', () => {
    it('should handle GET_ISSUE_DETAILS_FROM_JIRA_SUCCESS', () => {
      const existingTickets = [
        { id: '1', title: 'Ticket 1' },
        { id: '2', title: 'Ticket 2' },
      ]
      const updatedTicket = { id: '1', title: 'Updated Ticket 1', status: 'done' }
      const action = {
        type: types.GET_ISSUE_DETAILS_FROM_JIRA_SUCCESS,
        payload: updatedTicket,
      }
      const stateWithTickets = {
        ...initialState,
        ticketList: existingTickets,
        loading: true,
      }
      const expectedState = {
        ...initialState,
        loading: false,
        ticketSelected: updatedTicket,
        ticketList: [
          { id: '1', title: 'Updated Ticket 1', status: 'done' },
          { id: '2', title: 'Ticket 2' },
        ],
      }
      expect(ticketReducer(stateWithTickets, action)).toEqual(expectedState)
    })

    it('should handle UPDATE_ASSIGN_TICKET_IN_JIRA_REQUEST', () => {
      const action = { type: types.UPDATE_ASSIGN_TICKET_IN_JIRA_REQUEST }
      const expectedState = {
        ...initialState,
        loading: true,
      }
      expect(ticketReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle UPDATE_ASSIGN_TICKET_IN_JIRA_SUCCESS', () => {
      const action = { type: types.UPDATE_ASSIGN_TICKET_IN_JIRA_SUCCESS }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
      }
      expect(ticketReducer(stateWithLoading, action)).toEqual(expectedState)
    })

    it('should handle UPDATE_ASSIGN_TICKET_IN_JIRA_FAILURE', () => {
      const error = 'Failed to assign ticket in Jira'
      const action = {
        type: types.UPDATE_ASSIGN_TICKET_IN_JIRA_FAILURE,
        payload: error,
      }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
        error: error,
      }
      expect(ticketReducer(stateWithLoading, action)).toEqual(expectedState)
    })
  })
})
