import scoreService from '../services/scoreService'

// Actions Types
export const GET_SCORES_REQUEST = 'GET_SCORES_REQUEST'
export const GET_SCORES_SUCCESS = 'GET_SCORES_SUCCESS'
export const GET_SCORES_FAILURE = 'GET_SCORES_FAILURE'

export const ADD_SCORE_REQUEST = 'ADD_SCORE_REQUEST'
export const ADD_SCORE_SUCCESS = 'ADD_SCORE_SUCCESS'
export const ADD_SCORE_FAILURE = 'ADD_SCORE_FAILURE'

export const GET_SCORE_BY_ID_REQUEST = 'GET_SCORE_BY_ID_REQUEST'
export const GET_SCORE_BY_ID_SUCCESS = 'GET_SCORE_BY_ID_SUCCESS'
export const GET_SCORE_BY_ID_FAILURE = 'GET_SCORE_BY_ID_FAILURE'

export const getAllScores = () => async (dispatch) => {
  dispatch({ type: GET_SCORES_REQUEST })
  try {
    const response = await scoreService.getAllScores()
    dispatch({ type: GET_SCORES_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: GET_SCORES_FAILURE, payload: error.message })
  }
}

// Add Score
export const addScore = (data) => async (dispatch) => {
  dispatch({ type: ADD_SCORE_REQUEST })
  try {
    await scoreService.addScore(data)
    dispatch({ type: ADD_SCORE_SUCCESS })
    dispatch(getAllScores()) // Refresh list
  } catch (error) {
    dispatch({ type: ADD_SCORE_FAILURE, payload: error.message })
  }
}

export const getScoreByIdAPI = (id) => async (dispatch) => {
  dispatch({ type: GET_SCORE_BY_ID_REQUEST })
  try {
    const response = await scoreService.getScoreById(id)
    dispatch({ type: GET_SCORE_BY_ID_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: GET_SCORE_BY_ID_FAILURE, payload: error.message })
  }
}
