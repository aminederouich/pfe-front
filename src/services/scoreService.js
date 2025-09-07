import axios from 'axios'

const API_URL = 'http://localhost:8081/scores/'

const addScore = (data) => {
  return axios
    .post(`${API_URL}add`, data, {
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

const getAllScores = () => {
  return axios
    .get(`${API_URL}getAll`, {
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

const getScoreById = (id) => {
  return axios
    .get(`${API_URL}getScoreById/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching score by ID:', error)
      return error
    })
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

export default {
  addScore,
  getAllScores,
  getScoreById,
  calculateScoreTicketDone,
}
