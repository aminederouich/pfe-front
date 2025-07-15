import {
  GET_SCORES_REQUEST,
  GET_SCORES_SUCCESS,
  GET_SCORES_FAILURE,
  ADD_SCORE_REQUEST,
  ADD_SCORE_SUCCESS,
  ADD_SCORE_FAILURE,
} from '../actions/scoreAction'

const initialState = {
  scores: [],
  loading: false,
  error: null,
}

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCORES_REQUEST:
    case ADD_SCORE_REQUEST:
      return { ...state, loading: true }

    case GET_SCORES_SUCCESS:
      return { ...state, loading: false, scores: action.payload }

    case ADD_SCORE_SUCCESS:
      return { ...state, loading: false }

    case GET_SCORES_FAILURE:
    case ADD_SCORE_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default scoreReducer
