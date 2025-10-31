import axios from 'axios'

const API_URL = 'http://localhost:8081/weeklyscores/'

const getAllWeeklyScores = () => {
  return axios
    .get(`${API_URL}getAllWeeklyScores`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching all weekly top scores:', error)
      return error
    })
}

export default {
  getAllWeeklyScores,
}
