import axios from 'axios'

const API_URL = 'http://localhost:8081/weeklyscores/'

const getAllWeeklyTopScores = () => {
  return axios
    .get(`${API_URL}getAllWeeklyTopScores`, {
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

const calculateWeeklyScores = (startOfWeek, endOfWeek) => {
  return axios
    .post(
      `${API_URL}calculateweeklyscores`,
      {
        startOfWeek,
        endOfWeek,
      },
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
      console.error('Error fetching all weekly top scores:', error)
      return error
    })
}

export default {
  getAllWeeklyTopScores,
  calculateWeeklyScores,
}
