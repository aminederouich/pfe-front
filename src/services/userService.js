import axios from 'axios'

const API_URL = 'http://localhost:8081/user/'

const getAllUsers = () => {
  return axios
    .get(`${API_URL}getAllUsers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching all users:', error)
      return error
    })
}

const sendInvite = (userData) => {
  return axios.post(
    `${API_URL}invite-employee`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
}

export default {
  getAllUsers,
  sendInvite,
}
