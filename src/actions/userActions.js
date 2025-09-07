import ticketService from '../services/userService'
import { store } from '../store'

export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST'
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS'
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE'

export const GET_USER_BY_UID_REQUEST = 'GET_USER_BY_UID_REQUEST'
export const GET_USER_BY_UID_SUCCESS = 'GET_USER_BY_UID_SUCCESS'
export const GET_USER_BY_UID_FAILURE = 'GET_USER_BY_UID_FAILURE'

export const getUserByUidAPI = (uid) => async (dispatch) => {
  dispatch({
    type: GET_USER_BY_UID_REQUEST,
  })
  try {
    const response = await ticketService.getUserById(uid)
    console.log(response.data)
    dispatch({
      type: GET_USER_BY_UID_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: GET_USER_BY_UID_FAILURE,
      payload: error,
    })
  }
}

export const getAllUsersAPI = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_USERS_REQUEST,
  })
  try {
    const response = await ticketService.getAllUsers()
    const allUsers = response?.data?.users
    const state = store.getState()
    const managerId = state.auth.user?.user?.managerId
    const listUser = allUsers.filter((user) => user.managerId === managerId)
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: listUser,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAILURE,
      payload: error,
    })
  }
}
