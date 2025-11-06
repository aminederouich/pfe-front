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
  GET_SCORE_BY_TICKET_ID_REQUEST,
  GET_SCORE_BY_TICKET_ID_SUCCESS,
  GET_SCORE_BY_TICKET_ID_FAILURE,
  CALCULATE_SCORE_TICKET_DONE_REQUEST,
  CALCULATE_SCORE_TICKET_DONE_SUCCESS,
  CALCULATE_SCORE_TICKET_DONE_FAILURE,
  TOGGLE_CALCULATE_SCORE_MODAL_OPEN,
  TOGGLE_CALCULATE_SCORE_MODAL_CLOSE,
  CALCULATE_SCORE_TICKETS_LIST_REQUEST,
  CALCULATE_SCORE_TICKETS_LIST_SUCCESS,
  CALCULATE_SCORE_TICKETS_LIST_FAILURE,
} from '../actions/scoreAction'

const initialState = {
  score: [],
  allScores: [],
  scoreByTicketId: {},
  loading: false,
  error: null,
  isCalculateScoreModalOpen: false,
}

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCORE_REQUEST:
      return { ...state, loading: true }
    case GET_SCORE_SUCCESS:
      return { ...state, loading: false, allScores: action.payload }
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
    case GET_SCORE_BY_TICKET_ID_REQUEST:
      return { ...state, loading: true }
    case GET_SCORE_BY_TICKET_ID_SUCCESS:
      return { ...state, loading: false, scoreByTicketId: action.payload }
    case GET_SCORE_BY_TICKET_ID_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case CALCULATE_SCORE_TICKET_DONE_REQUEST:
      return { ...state, loading: true }
    case CALCULATE_SCORE_TICKET_DONE_SUCCESS:
      return { ...state, loading: false }
    case CALCULATE_SCORE_TICKET_DONE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case TOGGLE_CALCULATE_SCORE_MODAL_OPEN:
      return { ...state, isCalculateScoreModalOpen: true }
    case TOGGLE_CALCULATE_SCORE_MODAL_CLOSE:
      return { ...state, isCalculateScoreModalOpen: false }
    case CALCULATE_SCORE_TICKETS_LIST_REQUEST:
      return { ...state, loading: true }
    case CALCULATE_SCORE_TICKETS_LIST_SUCCESS:
      return { ...state, loading: false }
    case CALCULATE_SCORE_TICKETS_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default scoreReducer
