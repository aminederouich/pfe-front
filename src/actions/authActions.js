import React from 'react'
import authService from '../services/authService'

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
})

export const loginSuccess = (user, role) => ({
  type: 'LOGIN_SUCCESS',
  payload: { user, role },
})

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
})

export const logoutRequest = () => ({
  type: 'LOGOUT_REQUEST',
})

export const logoutSuccess = (user) => ({
  type: 'LOGOUT_SUCCESS',
  payload: user,
})

export const logoutFailure = (error) => ({
  type: 'LOGOUT_FAILURE',
  payload: error,
})

export const login = (username, password) => (dispatch) => {
  dispatch(loginRequest())
  return authService
    .login(username, password)
    .then((response) => {
      if (response.error) {
        dispatch(loginFailure(response.error))
        throw new Error(response.error)
      } else {
        const user = response.user

        localStorage.setItem('userId', user.uid)

        if (user.IsEmployee && user.IsManager === false) {
          dispatch(loginSuccess(response, 'employee'))
        }
        if (user.IsManager && user.IsEmployee === false) {
          dispatch(loginSuccess(response, 'manager'))
        }

        return response
      }
    })
    .catch((error) => {
      dispatch(loginFailure(error))
      throw new Error(error)
    })
}

export const logout = () => async (dispatch) => {
  dispatch(logoutRequest())
  try {
    const user = await authService.logout()
    dispatch(logoutSuccess(user))
  } catch (error) {
    dispatch(logoutFailure(error))
    console.error('Error logging out:', error)
  }
}

export const checkAuthRequest = () => ({
  type: 'AUTH_CHECK_REQUEST',
})

export const checkAuthSuccess = (data) => ({
  type: 'AUTH_CHECK_SUCCESS',
  payload: data,
})

export const checkAuthFailure = () => ({
  type: 'AUTH_CHECK_FAILURE',
})

export const checkAuthentication = () => async (dispatch) => {
  dispatch(checkAuthRequest())
  try {
    const response = await authService.checkAuth()
    dispatch(checkAuthSuccess(response.data))
    return response
  } catch (error) {
    dispatch(checkAuthFailure())
    const errorMsg = error.response?.data?.error || 'Erreur inconnue'
    throw new Error(errorMsg)
  }
}
