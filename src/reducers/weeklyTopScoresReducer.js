const initialState = {
  weeklyScores: [],
  loading: false,
  error: null,
}

import {
  GET_ALL_WEEKLY_TOP_SCORES_REQUEST,
  GET_ALL_WEEKLY_TOP_SCORES_SUCCESS,
  GET_ALL_WEEKLY_TOP_SCORES_FAILURE,
  CALCULATE_WEEKLY_SCORES_REQUEST,
  CALCULATE_WEEKLY_SCORES_SUCCESS,
  CALCULATE_WEEKLY_SCORES_FAILURE,
} from '../actions/weeklyTopScoresActions'

const weeklyTopScoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WEEKLY_TOP_SCORES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ALL_WEEKLY_TOP_SCORES_SUCCESS:
      return {
        ...state,
        loading: false,
        weeklyScores: action.payload,
      }
    case GET_ALL_WEEKLY_TOP_SCORES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CALCULATE_WEEKLY_SCORES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CALCULATE_WEEKLY_SCORES_SUCCESS:
      return {
        ...state,
        loading: false,
        // weeklyScores: action.payload,
      }
    case CALCULATE_WEEKLY_SCORES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default weeklyTopScoresReducer
