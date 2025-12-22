import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import * as actions from '../ticketActions'
import ticketService from '../../services/ticketService'

jest.mock('../../services/ticketService')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Ticket Actions', () => {
  let store

  beforeEach(() => {
    store = mockStore({})
    jest.clearAllMocks()
  })

  describe('Modal Toggle Actions', () => {
    it('should dispatch TOGGLE_CREATE_TICKET_MODAL_OPEN', () => {
      const expectedAction = {
        type: actions.TOGGLE_CREATE_TICKET_MODAL_OPEN,
      }
      store.dispatch(actions.toggleCreateTicketModalOpen())
      expect(store.getActions()[0]).toEqual(expectedAction)
    })

    it('should dispatch TOGGLE_CREATE_TICKET_MODAL_CLOSE', () => {
      const expectedAction = {
        type: actions.TOGGLE_CREATE_TICKET_MODAL_CLOSE,
      }
      store.dispatch(actions.toggleCreateTicketModalClose())
      expect(store.getActions()[0]).toEqual(expectedAction)
    })

    it('should dispatch TOGGLE_EDIT_TICKET_MODAL_OPEN', () => {
      const expectedAction = {
        type: actions.TOGGLE_EDIT_TICKET_MODAL_OPEN,
      }
      store.dispatch(actions.toggleEditTicketModalOpen())
      expect(store.getActions()[0]).toEqual(expectedAction)
    })

    it('should dispatch TOGGLE_EDIT_TICKET_MODAL_CLOSE', () => {
      const expectedAction = {
        type: actions.TOGGLE_EDIT_TICKET_MODAL_CLOSE,
      }
      store.dispatch(actions.toggleEditTicketModalClose())
      expect(store.getActions()[0]).toEqual(expectedAction)
    })

    it('should dispatch TOGGLE_ASSIGN_TICKET_MODAL_OPEN', () => {
      const expectedAction = {
        type: actions.TOGGLE_ASSIGN_TICKET_MODAL_OPEN,
      }
      store.dispatch(actions.toggleAssignTicketModalOpen())
      expect(store.getActions()[0]).toEqual(expectedAction)
    })

    it('should dispatch TOGGLE_ASSIGN_TICKET_MODAL_CLOSE', () => {
      const expectedAction = {
        type: actions.TOGGLE_ASSIGN_TICKET_MODAL_CLOSE,
      }
      store.dispatch(actions.toggleAssignTicketModalClose())
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  })

  describe('ticketToView action', () => {
    it('should dispatch TICKET_TO_VIEW with ticket payload', () => {
      const ticket = { id: '1', title: 'Test Ticket', status: 'open' }
      const expectedAction = {
        type: actions.TICKET_TO_VIEW,
        payload: ticket,
      }
      store.dispatch(actions.ticketToView(ticket))
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  })

  describe('getAllTicketAPI action', () => {
    it('should dispatch GET_ALL_TICKETS_SUCCESS when fetching tickets succeeds', async () => {
      const mockTickets = [
        { id: '1', title: 'Ticket 1' },
        { id: '2', title: 'Ticket 2' },
      ]
      const mockResponse = { data: { results: mockTickets } }
      ticketService.getAllTickets.mockResolvedValue(mockResponse)

      const expectedActions = [
        { type: actions.GET_ALL_TICKETS_REQUEST },
        { type: actions.GET_ALL_TICKETS_SUCCESS, payload: mockTickets },
      ]

      await store.dispatch(actions.getAllTicketAPI())
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('should dispatch GET_ALL_TICKETS_FAILURE when fetching tickets fails', async () => {
      const error = new Error('Network error')
      ticketService.getAllTickets.mockRejectedValue(error)

      const expectedActions = [
        { type: actions.GET_ALL_TICKETS_REQUEST },
        { type: actions.GET_ALL_TICKETS_FAILURE, payload: error },
      ]

      await expect(store.dispatch(actions.getAllTicketAPI())).rejects.toThrow()
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('addNewTicketAPI action', () => {
    it('should dispatch ADD_NEW_TICKET_SUCCESS when adding ticket succeeds', async () => {
      const ticketData = { title: 'New Ticket', description: 'Test' }
      const mockResponse = { data: { success: true } }
      ticketService.addNewTicket.mockResolvedValue(mockResponse)

      const expectedActions = [
        { type: actions.ADD_NEW_TICKET_REQUEST },
        { type: actions.ADD_NEW_TICKET_SUCCESS },
      ]

      await store.dispatch(actions.addNewTicketAPI(ticketData))
      expect(store.getActions()).toEqual(expectedActions)
      expect(ticketService.addNewTicket).toHaveBeenCalledWith(ticketData)
    })

    it('should dispatch ADD_NEW_TICKET_FAILURE when adding ticket fails', async () => {
      const ticketData = { title: 'New Ticket' }
      const error = new Error('Failed to add ticket')
      ticketService.addNewTicket.mockRejectedValue(error)

      const expectedActions = [
        { type: actions.ADD_NEW_TICKET_REQUEST },
        { type: actions.ADD_NEW_TICKET_FAILURE, payload: error },
      ]

      await expect(store.dispatch(actions.addNewTicketAPI(ticketData))).rejects.toThrow()
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('updateTicketAPI action', () => {
    it('should dispatch UPDATE_TICKET_SUCCESS when updating ticket succeeds', async () => {
      const ticketData = { id: '1', title: 'Updated Ticket' }
      const mockResponse = { data: { success: true } }
      ticketService.updateTicket.mockResolvedValue(mockResponse)

      const expectedActions = [
        { type: actions.UPDATE_TICKET_REQUEST },
        { type: actions.UPDATE_TICKET_SUCCESS },
      ]

      await store.dispatch(actions.updateTicketAPI(ticketData))
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('should dispatch UPDATE_TICKET_FAILURE when updating ticket fails', async () => {
      const ticketData = { id: '1', title: 'Updated Ticket' }
      const error = new Error('Update failed')
      ticketService.updateTicket.mockRejectedValue(error)

      const expectedActions = [
        { type: actions.UPDATE_TICKET_REQUEST },
        { type: actions.UPDATE_TICKET_FAILURE, payload: error },
      ]

      await expect(store.dispatch(actions.updateTicketAPI(ticketData))).rejects.toThrow()
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('getIssueDetailsFromJiraAPI action', () => {
    it('should dispatch GET_ISSUE_DETAILS_FROM_JIRA_SUCCESS when fetching succeeds', async () => {
      const issueId = 'PROJ-123'
      const config = { apiVersion: '3', username: 'test', password: 'pass' }
      const mockIssueData = { id: issueId, summary: 'Test Issue' }
      const mockResponse = { data: mockIssueData }
      ticketService.getIssueDetailsFromJira.mockResolvedValue(mockResponse)

      const expectedActions = [
        { type: actions.GET_ISSUE_DETAILS_FROM_JIRA_REQUEST },
        {
          type: actions.GET_ISSUE_DETAILS_FROM_JIRA_SUCCESS,
          payload: mockIssueData,
        },
      ]

      await store.dispatch(actions.getIssueDetailsFromJiraAPI(issueId, config))
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('should dispatch GET_ISSUE_DETAILS_FROM_JIRA_FAILURE when fetching fails', async () => {
      const issueId = 'PROJ-123'
      const config = { apiVersion: '3' }
      const error = new Error('Jira API error')
      ticketService.getIssueDetailsFromJira.mockRejectedValue(error)

      const expectedActions = [
        { type: actions.GET_ISSUE_DETAILS_FROM_JIRA_REQUEST },
        { type: actions.GET_ISSUE_DETAILS_FROM_JIRA_FAILURE, payload: error },
      ]

      await expect(
        store.dispatch(actions.getIssueDetailsFromJiraAPI(issueId, config)),
      ).rejects.toThrow()
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('updateAssignTicketInJiraAPI action', () => {
    it('should dispatch UPDATE_ASSIGN_TICKET_IN_JIRA_SUCCESS and fetch issue details', async () => {
      const ticketKey = 'PROJ-123'
      const jiraId = 'user123'
      const config = { apiVersion: '3', username: 'test', password: 'pass' }
      const mockResponse = { data: { success: true } }
      const mockIssueData = { id: ticketKey, assignee: jiraId }

      ticketService.assignIssueExterne.mockResolvedValue(mockResponse)
      ticketService.getIssueDetailsFromJira.mockResolvedValue({
        data: mockIssueData,
      })

      await store.dispatch(actions.updateAssignTicketInJiraAPI(ticketKey, jiraId, config))

      const dispatchedActions = store.getActions()
      expect(dispatchedActions[0]).toEqual({
        type: actions.UPDATE_ASSIGN_TICKET_IN_JIRA_REQUEST,
      })
      expect(dispatchedActions[1]).toEqual({
        type: actions.UPDATE_ASSIGN_TICKET_IN_JIRA_SUCCESS,
      })
      expect(dispatchedActions[2]).toEqual({
        type: actions.GET_ISSUE_DETAILS_FROM_JIRA_REQUEST,
      })
    })

    it('should dispatch UPDATE_ASSIGN_TICKET_IN_JIRA_FAILURE when assignment fails', async () => {
      const ticketKey = 'PROJ-123'
      const jiraId = 'user123'
      const config = { apiVersion: '3' }
      const error = new Error('Assignment failed')
      ticketService.assignIssueExterne.mockRejectedValue(error)

      const expectedActions = [
        { type: actions.UPDATE_ASSIGN_TICKET_IN_JIRA_REQUEST },
        {
          type: actions.UPDATE_ASSIGN_TICKET_IN_JIRA_FAILURE,
          payload: error,
        },
      ]

      await expect(
        store.dispatch(actions.updateAssignTicketInJiraAPI(ticketKey, jiraId, config)),
      ).rejects.toThrow()
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
