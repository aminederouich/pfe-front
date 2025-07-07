import axios from 'axios'

const API_URL = 'http://localhost:8081/ticket/'

const getAllTickets = () => {
  return axios
    .get(`${API_URL}getAllTicket`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching all config Jira:', error)
      return error
    })
}
const updateTicket = (ticketKey, ticketData) => {
  return axios
    .put(
      `${API_URL}updateTicket/${ticketKey}`,
      { ticket: ticketData },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .then((response) => response)
    .catch((error) => {
      console.error('Erreur mise à jour ticket:', error)
      return error
    })
}

const addNewTicket = (ticketData) => {
  return axios
    .post(
      `${API_URL}addNewTicket`,
      { ticket: ticketData },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching all config Jira:', error)
      return error
    })
}

export default {
  getAllTickets,
  addNewTicket,
   updateTicket,
}
