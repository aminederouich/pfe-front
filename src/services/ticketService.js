import axios from 'axios'

const API_URL = 'http://localhost:8081/ticket/'

const getAllTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}getAllTicket`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response
  } catch (error) {
    console.error('Error fetching all config Jira:', error)
    return error
  }
}
const updateTicket = async (ticketData) => {
  try {
    const response = await axios.post(
      `${API_URL}updateTicket/`,
      { ticket: ticketData },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Erreur mise à jour ticket:', error)
    return error
  }
}

const addNewTicket = async (ticketData) => {
  try {
    const response = await axios.post(
      `${API_URL}addNewTicket`,
      { ticket: ticketData },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Error fetching all config Jira:', error)
    return error
  }
}

const encodeBasicCredentials = (value) => {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(unescape(encodeURIComponent(value)))
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value).toString('base64')
  }
  throw new Error('No base64 encoder available in the current environment')
}

const buildAssigneeUrl = (issueId, config) => {
  const path = `/rest/api/${config.apiVersion}/issue/${issueId}/assignee`
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return `/jira${path}`
  }
  return `${config.protocol}://${config.host}${path}`
}

const assignIssueExterne = async (issueId, jiraId, config) => {
  const url = buildAssigneeUrl(issueId, config)
  const headers = {
    Authorization: `Basic ${encodeBasicCredentials(`${config.username}:${config.password}`)}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  try {
    const response = await axios.put(url, { accountId: jiraId }, { headers })
    // Jira often returns 204 No Content for successful assignment.
    const NO_CONTENT_STATUS = 204
    if (response.status !== NO_CONTENT_STATUS) {
      throw new Error(`Failed to assign issue: ${response.status} ${response.statusText}`)
    }
    let parsed = null
    // Safely attempt to parse JSON only if there appears to be a body
    if (response.status !== NO_CONTENT_STATUS) {
      const text = await response.text()
      if (text && text.trim().length > 0) {
        try {
          parsed = JSON.parse(text)
        } catch (parseErr) {
          return {
            success: false,
            message: 'Received non-JSON response body when JSON expected',
            error: parseErr.message,
            raw: text,
            status: response.status,
          }
        }
      }
    }
    return {
      success: true,
      message: 'Issue assigned successfully',
      data: parsed,
      status: response.status,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Jira connection test failed',
      error: error.message,
    }
  }
}

const buildIssueUrl = (issueId, config) => {
  const path = `/rest/api/${config.apiVersion}/issue/${issueId}`
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return `/jira${path}`
  }
  return `${config.protocol}://${config.host}${path}`
}

const getIssueDetailsFromJira = async (issueId, config) => {
  const url = buildIssueUrl(issueId, config)
  const headers = {
    Authorization: `Basic ${encodeBasicCredentials(`${config.username}:${config.password}`)}`,
    Accept: 'application/json',
  }
  try {
    const response = await axios.get(url, { headers })
    return {
      success: true,
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch issue details from Jira',
      error: error.message,
    }
  }
}

export default {
  getAllTickets,
  addNewTicket,
  updateTicket,
  getIssueDetailsFromJira,
  assignIssueExterne,
}
