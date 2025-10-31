const initialState = {
  weeklyAllScores: [],
  loading: false,
  error: null,
}

import {
  GET_ALL_WEEKLY_SCORES_REQUEST,
  GET_ALL_WEEKLY_SCORES_SUCCESS,
  GET_ALL_WEEKLY_SCORES_FAILURE,
} from '../actions/weeklyAllScoresActions'

const weeklyAllScoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WEEKLY_SCORES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ALL_WEEKLY_SCORES_SUCCESS:
      return {
        ...state,
        loading: false,
        weeklyAllScores: action.payload,
      }
    case GET_ALL_WEEKLY_SCORES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default weeklyAllScoresReducer
