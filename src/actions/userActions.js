import ticketService from '../services/userService'
import { store } from '../store'

export const GET_ALL_USERS_REQUEST = () => ({
  type: 'GET_ALL_USERS_REQUEST',
})

export const GET_ALL_USERS_SUCCESS = (users) => ({
  type: 'GET_ALL_USERS_SUCCESS',
  payload: users,
})

export const GET_ALL_USERS_FAILURE = (error) => ({
  type: 'GET_ALL_USERS_FAILURE',
  payload: error,
})

export const getAllUsersAPI = () => async (dispatch) => {
  dispatch(GET_ALL_USERS_REQUEST())

  try {
    const response = await ticketService.getAllUsers()
    const allUsers = response?.data?.users || response?.data?.results || response?.data || []

    // Filtrer les utilisateurs dont managerId correspond à l'id de l'utilisateur authentifié
    const state = store.getState()
    const userId = state.auth.user?.user?.uid
    const listUser = allUsers.filter((user) => user.managerId === userId)
    dispatch(GET_ALL_USERS_SUCCESS(listUser))
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des utilisateurs :', error)
    dispatch(GET_ALL_USERS_FAILURE(error.message || 'Erreur inconnue'))
  }
}
