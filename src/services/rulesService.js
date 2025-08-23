import axios from 'axios'
import { store } from '../store'

const API_URL = 'http://localhost:8081/rules/'

const addRule = async (data) => {
  try {
    const response = await axios.post(`${API_URL}addRule`, data, {
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

const getRuleByIdOwner = async () => {
  try {
    // Récupérer l'ID utilisateur depuis Redux
    const state = store.getState()
    const userId = state.auth.user?.user?.uid

    if (!userId) {
      throw new Error('User ID not found in Redux store')
    }

    const response = await axios.get(`${API_URL}getRuleByIdOwner/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response
  } catch (error) {
    console.error('Error fetching rule by ID and owner:', error)
    return error
  }
}

export default {
  addRule,
  getRuleByIdOwner,
}
