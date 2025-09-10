import {
  GET_SCORE_REQUEST,
  GET_SCORE_SUCCESS,
  GET_SCORE_FAILURE,
  ADD_SCORE_REQUEST,
  ADD_SCORE_SUCCESS,
  ADD_SCORE_FAILURE,
  GET_SCORE_BY_ID_REQUEST,
  GET_SCORE_BY_ID_SUCCESS,
  GET_SCORE_BY_ID_FAILURE,
  GET_SCORE_BY_OWNER_ID_REQUEST,
  GET_SCORE_BY_OWNER_ID_SUCCESS,
  GET_SCORE_BY_OWNER_ID_FAILURE,
  CALCULATE_SCORE_TICKET_DONE_REQUEST,
  CALCULATE_SCORE_TICKET_DONE_SUCCESS,
  CALCULATE_SCORE_TICKET_DONE_FAILURE,
} from '../actions/scoreAction'

const initialState = {
  score: [],
  loading: false,
  error: null,
}

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCORE_REQUEST:
      return { ...state, loading: true }
    case GET_SCORE_SUCCESS:
      return { ...state, loading: false, score: action.payload }
    case GET_SCORE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case ADD_SCORE_REQUEST:
      return { ...state, loading: true }
    case ADD_SCORE_SUCCESS:
      return { ...state, loading: false }
    case ADD_SCORE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case GET_SCORE_BY_ID_REQUEST:
      return { ...state, loading: true }
    case GET_SCORE_BY_ID_SUCCESS:
      return { ...state, loading: false, score: action.payload }
    case GET_SCORE_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case GET_SCORE_BY_OWNER_ID_REQUEST:
      return { ...state, loading: true }
    case GET_SCORE_BY_OWNER_ID_SUCCESS:
      return { ...state, loading: false, score: action.payload }
    case GET_SCORE_BY_OWNER_ID_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case CALCULATE_SCORE_TICKET_DONE_REQUEST:
      return { ...state, loading: true }
    case CALCULATE_SCORE_TICKET_DONE_SUCCESS:
      return { ...state, loading: false }
    case CALCULATE_SCORE_TICKET_DONE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default scoreReducer
