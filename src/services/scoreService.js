import axios from 'axios'

const API_URL = 'http://localhost:8081/scores/'

const addScore = async (data) => {
  try {
    const response = await axios.post(`${API_URL}add`, data, {
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

const getAllScores = async () => {
  try {
    const response = await axios.get(`${API_URL}getAll`, {
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

const getScoreById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}getScoreById/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response
  } catch (error) {
    console.error('Error fetching score by ID:', error)
    return error
  }
}

const getScoreByOwnerId = async (ownerId) => {
  try {
    const response = await axios.get(`${API_URL}users/score/${ownerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response
  } catch (error) {
    console.error('Error fetching score by owner ID:', error)
    return error
  }
}

const calculateScoreTicketDone = async (ticket, ruleId) => {
  try {
    const response = await axios.post(
      `${API_URL}calculate`,
      { ticket, ruleId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Error calculating score for ticket done:', error)
    return error
  }
}

const calculateScoreTicketsList = async (tickets, ruleId) => {
  try {
    const response = await axios.post(
      `${API_URL}calculate-multiple`,
      { ticketIds: tickets, ruleId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Error calculating score for ticket done:', error)
    return error
  }
}

const getScoresByTicketId = async (ticketId) => {
  try {
    const response = await axios.get(`${API_URL}tickets/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response
  } catch (error) {
    console.error('Error fetching scores by ticket ID:', error)
    return error
  }
}

export default {
  addScore,
  getAllScores,
  getScoreById,
  getScoresByTicketId,
  getScoreByOwnerId,
  calculateScoreTicketDone,
  calculateScoreTicketsList,
}
