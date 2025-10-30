import weeklyTopScoresService from '../services/weeklyTopScoresService'

export const GET_ALL_WEEKLY_TOP_SCORES_REQUEST = 'GET_ALL_WEEKLY_TOP_SCORES_REQUEST'
export const GET_ALL_WEEKLY_TOP_SCORES_SUCCESS = 'GET_ALL_WEEKLY_TOP_SCORES_SUCCESS'
export const GET_ALL_WEEKLY_TOP_SCORES_FAILURE = 'GET_ALL_WEEKLY_TOP_SCORES_FAILURE'

export const CALCULATE_WEEKLY_SCORES_REQUEST = 'CALCULATE_WEEKLY_SCORES_REQUEST'
export const CALCULATE_WEEKLY_SCORES_SUCCESS = 'CALCULATE_WEEKLY_SCORES_SUCCESS'
export const CALCULATE_WEEKLY_SCORES_FAILURE = 'CALCULATE_WEEKLY_SCORES_FAILURE'

export const getAllWeeklyTopScoresAPI = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_WEEKLY_TOP_SCORES_REQUEST,
  })
  try {
    const response = await weeklyTopScoresService.getAllWeeklyTopScores()
    dispatch({
      type: GET_ALL_WEEKLY_TOP_SCORES_SUCCESS,
      payload: response.data.data,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_WEEKLY_TOP_SCORES_FAILURE,
      payload: error,
    })
  }
}

export const calculateWeeklyScores = () => async (dispatch) => {
  dispatch({
    type: CALCULATE_WEEKLY_SCORES_REQUEST,
  })
  try {
    const response = await weeklyTopScoresService.calculateWeeklyScores()
    dispatch({
      type: CALCULATE_WEEKLY_SCORES_SUCCESS,
      payload: response.data.data,
    })
  } catch (error) {
    dispatch({
      type: CALCULATE_WEEKLY_SCORES_FAILURE,
      payload: error,
    })
  }
}
