import { toast } from 'react-toastify'
import userService from '../services/userService'
import { store } from '../store'
import i18n from '../i18n'

export const TOGGLE_ADD_USER_MODAL_OPEN = 'TOGGLE_ADD_USER_MODAL_OPEN'
export const TOGGLE_ADD_USER_MODAL_CLOSE = 'TOGGLE_ADD_USER_MODAL_CLOSE'

export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST'
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS'
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE'

export const GET_USER_BY_UID_REQUEST = 'GET_USER_BY_UID_REQUEST'
export const GET_USER_BY_UID_SUCCESS = 'GET_USER_BY_UID_SUCCESS'
export const GET_USER_BY_UID_FAILURE = 'GET_USER_BY_UID_FAILURE'

export const SEND_INVITE_EMAIL_REQUEST = 'SEND_INVITE_EMAIL_REQUEST'
export const SEND_INVITE_EMAIL_SUCCESS = 'SEND_INVITE_EMAIL_SUCCESS'
export const SEND_INVITE_EMAIL_FAILURE = 'SEND_INVITE_EMAIL_FAILURE'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

export const SET_PASSWORD_REQUEST = 'SET_PASSWORD_REQUEST'
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS'
export const SET_PASSWORD_FAILURE = 'SET_PASSWORD_FAILURE'

export const toggleAddUserModalOpen = () => (dispatch) => {
  dispatch({
    type: TOGGLE_ADD_USER_MODAL_OPEN,
  })
}

export const toggleAddUserModalClose = () => (dispatch) => {
  dispatch({
    type: TOGGLE_ADD_USER_MODAL_CLOSE,
  })
}
export const getUserByUidAPI = (uid) => async (dispatch) => {
  dispatch({
    type: GET_USER_BY_UID_REQUEST,
  })
  try {
    const response = await userService.getUserById(uid)
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
    const response = await userService.getAllUsers()
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

export const sendInvitationEmailAPI = (email) => async (dispatch) => {
  dispatch({
    type: SEND_INVITE_EMAIL_REQUEST,
  })
  try {
    const state = store.getState()
    const accountId = state.auth.user?.user?.accountId
    const response = await userService.sendInvitationEmail({ email, managerId: accountId })
    console.log({ response })
    toast.success(i18n.t('employee.invite.success'))
    dispatch({
      type: SEND_INVITE_EMAIL_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error(i18n.t('employee.invite.errorSend'))
    }
    dispatch({
      type: SEND_INVITE_EMAIL_FAILURE,
      payload: error,
    })
  }
}

export const updateUserAPI = (uid, userData) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  })
  try {
    const response = await userService.updateUser(uid, userData)
    toast.success(i18n.t('user.update.success'))
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error(i18n.t('user.update.error'))
    }
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error,
    })
    throw error
  }
}

export const setPasswordAPI = (uid, password) => async (dispatch) => {
  dispatch({
    type: SET_PASSWORD_REQUEST,
  })
  try {
    const response = await userService.setPassword(uid, password)
    toast.success(i18n.t('user.password.success'))
    dispatch({
      type: SET_PASSWORD_SUCCESS,
      payload: response.data,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error(i18n.t('user.password.error'))
    }
    dispatch({
      type: SET_PASSWORD_FAILURE,
      payload: error,
    })
  }
}
