import axios from 'axios'

const API_URL = 'http://localhost:8081/user/'

const getUserById = (uid) => {
  return axios
    .get(`${API_URL}getUserByUid/${uid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching user by ID:', error)
      return error
    })
}

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

const sendInvitationEmail = (userData) => {
  console.log(userData)
  return axios.post(`${API_URL}inviteUser`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
}

const updateUser = (uid, userData) => {
  return axios.post(`${API_URL}updateUser/${uid}`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
}

const setPassword = (uid, password) => {
  return axios.post(
    `${API_URL}setPassword/${uid}`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
}

export default {
  getUserById,
  getAllUsers,
  sendInvitationEmail,
  setPassword,
  updateUser,
}
