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

export default {
  getAllTickets,
  addNewTicket,
  updateTicket,
}
