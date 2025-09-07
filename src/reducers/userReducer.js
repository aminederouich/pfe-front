const initialState = {
  usersList: [],
  user: [],
  loading: false,
  error: null,
}

import {
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_USER_BY_UID_REQUEST,
  GET_USER_BY_UID_SUCCESS,
  GET_USER_BY_UID_FAILURE,
} from '../actions/userActions'

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        usersList: action.payload,
      }
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case GET_USER_BY_UID_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_USER_BY_UID_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case GET_USER_BY_UID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
