import axios from 'axios'
import ticketService from '../ticketService'

jest.mock('axios')

describe('Ticket Service', () => {
  const API_URL = 'http://localhost:8081/ticket/'

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem('token', 'test-token')
  })

  describe('getAllTickets', () => {
    it('should fetch all tickets successfully', async () => {
      const mockTickets = {
        data: {
          results: [
            { id: '1', title: 'Ticket 1' },
            { id: '2', title: 'Ticket 2' },
          ],
        },
      }
      axios.get.mockResolvedValue(mockTickets)

      const result = await ticketService.getAllTickets()

      expect(axios.get).toHaveBeenCalledWith(`${API_URL}getAllTicket`, {
        headers: {
          Authorization: 'Bearer test-token',
        },
      })
      expect(result).toEqual(mockTickets)
    })

    it('should return error when fetching tickets fails', async () => {
      const mockError = new Error('Network error')
      axios.get.mockRejectedValue(mockError)

      const result = await ticketService.getAllTickets()

      expect(result).toEqual(mockError)
    })
  })

  describe('addNewTicket', () => {
    it('should add new ticket successfully', async () => {
      const ticketData = {
        title: 'New Ticket',
        description: 'Test description',
        priority: 'high',
      }
      const mockResponse = {
        data: { success: true, id: '123' },
      }
      axios.post.mockResolvedValue(mockResponse)

      const result = await ticketService.addNewTicket(ticketData)

      expect(axios.post).toHaveBeenCalledWith(
        `${API_URL}addNewTicket`,
        { ticket: ticketData },
        {
          headers: {
            Authorization: 'Bearer test-token',
          },
        },
      )
      expect(result).toEqual(mockResponse)
    })

    it('should return error when adding ticket fails', async () => {
      const ticketData = { title: 'New Ticket' }
      const mockError = new Error('Failed to add ticket')
      axios.post.mockRejectedValue(mockError)

      const result = await ticketService.addNewTicket(ticketData)

      expect(result).toEqual(mockError)
    })
  })

  describe('updateTicket', () => {
    it('should update ticket successfully', async () => {
      const ticketData = {
        id: '1',
        title: 'Updated Ticket',
        status: 'completed',
      }
      const mockResponse = {
        data: { success: true },
      }
      axios.post.mockResolvedValue(mockResponse)

      const result = await ticketService.updateTicket(ticketData)

      expect(axios.post).toHaveBeenCalledWith(
        `${API_URL}updateTicket/`,
        { ticket: ticketData },
        {
          headers: {
            Authorization: 'Bearer test-token',
          },
        },
      )
      expect(result).toEqual(mockResponse)
    })

    it('should return error when updating ticket fails', async () => {
      const ticketData = { id: '1', title: 'Updated Ticket' }
      const mockError = new Error('Update failed')
      axios.post.mockRejectedValue(mockError)

      const result = await ticketService.updateTicket(ticketData)

      expect(result).toEqual(mockError)
    })
  })

  describe('getIssueDetailsFromJira', () => {
    const config = {
      protocol: 'https',
      host: 'jira.example.com',
      apiVersion: '3',
      username: 'testuser',
      password: 'testpass',
    }

    it('should fetch issue details from Jira successfully', async () => {
      const issueId = 'PROJ-123'
      const mockIssueData = {
        data: {
          id: issueId,
          key: issueId,
          fields: {
            summary: 'Test Issue',
            status: { name: 'In Progress' },
          },
        },
      }
      axios.get.mockResolvedValue(mockIssueData)

      const result = await ticketService.getIssueDetailsFromJira(issueId, config)

      expect(result).toEqual({
        success: true,
        data: mockIssueData.data,
        status: undefined,
      })
    })

    it('should build correct URL for localhost environment', async () => {
      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: { hostname: 'localhost' },
        writable: true,
      })

      const issueId = 'PROJ-123'
      axios.get.mockResolvedValue({ data: {} })

      await ticketService.getIssueDetailsFromJira(issueId, config)

      expect(axios.get).toHaveBeenCalledWith(
        `/jira/rest/api/3/issue/${issueId}`,
        expect.any(Object),
      )
    })

    it('should return error when fetching from Jira fails', async () => {
      const issueId = 'PROJ-123'
      const mockError = new Error('Jira API error')
      axios.get.mockRejectedValue(mockError)

      const result = await ticketService.getIssueDetailsFromJira(issueId, config)

      expect(result).toEqual({
        success: false,
        message: 'Failed to fetch issue details from Jira',
        error: 'Jira API error',
      })
    })
  })

  describe('assignIssueExterne', () => {
    const config = {
      protocol: 'https',
      host: 'jira.example.com',
      apiVersion: '3',
      username: 'testuser',
      password: 'testpass',
    }

    it('should assign issue successfully with 204 status', async () => {
      const issueId = 'PROJ-123'
      const jiraId = 'user123'
      const mockResponse = {
        status: 204,
        statusText: 'No Content',
      }
      axios.put.mockResolvedValue(mockResponse)

      const result = await ticketService.assignIssueExterne(issueId, jiraId, config)

      expect(result).toEqual({
        success: true,
        message: 'Issue assigned successfully',
        data: null,
        status: 204,
      })
    })

    it('should encode basic credentials correctly', async () => {
      const issueId = 'PROJ-123'
      const jiraId = 'user123'
      axios.put.mockResolvedValue({ status: 204 })

      await ticketService.assignIssueExterne(issueId, jiraId, config)

      const expectedAuth = `Basic ${btoa('testuser:testpass')}`
      expect(axios.put).toHaveBeenCalledWith(
        expect.any(String),
        { accountId: jiraId },
        {
          headers: {
            Authorization: expectedAuth,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
    })

    it('should return error when assignment fails', async () => {
      const issueId = 'PROJ-123'
      const jiraId = 'user123'
      const mockError = new Error('Assignment failed')
      axios.put.mockRejectedValue(mockError)

      const result = await ticketService.assignIssueExterne(issueId, jiraId, config)

      expect(result).toEqual({
        success: false,
        message: 'Jira connection test failed',
        error: 'Assignment failed',
      })
    })

    it('should build correct URL for localhost environment', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'localhost' },
        writable: true,
      })

      const issueId = 'PROJ-123'
      const jiraId = 'user123'
      axios.put.mockResolvedValue({ status: 204 })

      await ticketService.assignIssueExterne(issueId, jiraId, config)

      expect(axios.put).toHaveBeenCalledWith(
        `/jira/rest/api/3/issue/${issueId}/assignee`,
        expect.any(Object),
        expect.any(Object),
      )
    })
  })
})
