const initialState = {
  usersList: [],
  user: [],
  loading: false,
  error: null,
  isAddUserModalOpen: false,
}

import {
  TOGGLE_ADD_USER_MODAL_OPEN,
  TOGGLE_ADD_USER_MODAL_CLOSE,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_USER_BY_UID_REQUEST,
  GET_USER_BY_UID_SUCCESS,
  GET_USER_BY_UID_FAILURE,
  SEND_INVITE_EMAIL_REQUEST,
  SEND_INVITE_EMAIL_SUCCESS,
  SEND_INVITE_EMAIL_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILURE,
} from '../actions/userActions'

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_USER_MODAL_OPEN:
      return {
        ...state,
        isAddUserModalOpen: true,
      }
    case TOGGLE_ADD_USER_MODAL_CLOSE:
      return {
        ...state,
        isAddUserModalOpen: false,
      }
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
    case SEND_INVITE_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SEND_INVITE_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case SEND_INVITE_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case SET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case SET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case UPDATE_USER_FAILURE:
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
