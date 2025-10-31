import weeklyScoresService from '../services/weeklyScoresService'

export const GET_ALL_WEEKLY_SCORES_REQUEST = 'GET_ALL_WEEKLY_SCORES_REQUEST'
export const GET_ALL_WEEKLY_SCORES_SUCCESS = 'GET_ALL_WEEKLY_SCORES_SUCCESS'
export const GET_ALL_WEEKLY_SCORES_FAILURE = 'GET_ALL_WEEKLY_SCORES_FAILURE'

export const getAllWeeklyScoresAPI = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_WEEKLY_SCORES_REQUEST,
  })
  try {
    const response = await weeklyScoresService.getAllWeeklyScores()
    dispatch({
      type: GET_ALL_WEEKLY_SCORES_SUCCESS,
      payload: response.data.data,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_WEEKLY_SCORES_FAILURE,
      payload: error,
    })
  }
}
