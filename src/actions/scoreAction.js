import rulesService from '../services/rulesService'
import scoreService from '../services/scoreService'
import { store } from '../store'

// Actions Types
export const GET_SCORE_REQUEST = 'GET_SCORE_REQUEST'
export const GET_SCORE_SUCCESS = 'GET_SCORE_SUCCESS'
export const GET_SCORE_FAILURE = 'GET_SCORE_FAILURE'

export const ADD_SCORE_REQUEST = 'ADD_SCORE_REQUEST'
export const ADD_SCORE_SUCCESS = 'ADD_SCORE_SUCCESS'
export const ADD_SCORE_FAILURE = 'ADD_SCORE_FAILURE'

export const GET_SCORE_BY_ID_REQUEST = 'GET_SCORE_BY_ID_REQUEST'
export const GET_SCORE_BY_ID_SUCCESS = 'GET_SCORE_BY_ID_SUCCESS'
export const GET_SCORE_BY_ID_FAILURE = 'GET_SCORE_BY_ID_FAILURE'

export const GET_SCORE_BY_OWNER_ID_REQUEST = 'GET_SCORE_BY_OWNER_ID_REQUEST'
export const GET_SCORE_BY_OWNER_ID_SUCCESS = 'GET_SCORE_BY_OWNER_ID_SUCCESS'
export const GET_SCORE_BY_OWNER_ID_FAILURE = 'GET_SCORE_BY_OWNER_ID_FAILURE'

export const CALCULATE_SCORE_TICKET_DONE_REQUEST = 'CALCULATE_SCORE_TICKET_DONE_REQUEST'
export const CALCULATE_SCORE_TICKET_DONE_SUCCESS = 'CALCULATE_SCORE_TICKET_DONE_SUCCESS'
export const CALCULATE_SCORE_TICKET_DONE_FAILURE = 'CALCULATE_SCORE_TICKET_DONE_FAILURE'

export const CALCULATE_SCORE_TICKETS_LIST_REQUEST = 'CALCULATE_SCORE_TICKETS_LIST_REQUEST'
export const CALCULATE_SCORE_TICKETS_LIST_SUCCESS = 'CALCULATE_SCORE_TICKETS_LIST_SUCCESS'
export const CALCULATE_SCORE_TICKETS_LIST_FAILURE = 'CALCULATE_SCORE_TICKETS_LIST_FAILURE'

export const GET_SCORE_BY_TICKET_ID_REQUEST = 'GET_SCORE_BY_TICKET_ID_REQUEST'
export const GET_SCORE_BY_TICKET_ID_SUCCESS = 'GET_SCORE_BY_TICKET_ID_SUCCESS'
export const GET_SCORE_BY_TICKET_ID_FAILURE = 'GET_SCORE_BY_TICKET_ID_FAILURE'

export const TOGGLE_CALCULATE_SCORE_MODAL_OPEN = 'TOGGLE_CALCULATE_SCORE_MODAL_OPEN'
export const TOGGLE_CALCULATE_SCORE_MODAL_CLOSE = 'TOGGLE_CALCULATE_SCORE_MODAL_CLOSE'

export const toggleCalculateScoreModalOpen = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CALCULATE_SCORE_MODAL_OPEN,
  })
}

export const toggleCalculateScoreModalClose = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CALCULATE_SCORE_MODAL_CLOSE,
  })
}

export const getAllScores = () => async (dispatch) => {
  dispatch({ type: GET_SCORE_REQUEST })
  try {
    const response = await scoreService.getAllScores()
    dispatch({ type: GET_SCORE_SUCCESS, payload: response.data.data })
  } catch (error) {
    dispatch({ type: GET_SCORE_FAILURE, payload: error.message })
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

export const getScoreByOwnerIdAPI = (id) => async (dispatch) => {
  dispatch({ type: GET_SCORE_BY_OWNER_ID_REQUEST })
  try {
    const response = await scoreService.getScoreByOwnerId(id)
    dispatch({ type: GET_SCORE_BY_OWNER_ID_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: GET_SCORE_BY_OWNER_ID_FAILURE, payload: error.message })
  }
}

export const getScoresByTicketIdAPI = (ticketId) => async (dispatch) => {
  dispatch({ type: GET_SCORE_BY_TICKET_ID_REQUEST })
  try {
    const response = await scoreService.getScoresByTicketId(ticketId)
    dispatch({ type: GET_SCORE_BY_TICKET_ID_SUCCESS, payload: response.data.data[0] })
  } catch (error) {
    dispatch({ type: GET_SCORE_BY_TICKET_ID_FAILURE, payload: error.message })
  }
}

export const calculateScoreTicketDoneAPI = (ticket) => async (dispatch) => {
  dispatch({ type: CALCULATE_SCORE_TICKET_DONE_REQUEST })
  try {
    const state = store.getState()
    const userId = state.auth.user?.user?.managerId
    const ruleManager = await rulesService.getRuleByIdManager(userId)
    if (!ruleManager?.data?.data.id) {
      throw new Error('Rule manager not found')
    }
    const ruleId = ruleManager.data.data.id
    const response = await scoreService.calculateScoreTicketDone(ticket, ruleId)
    dispatch({ type: CALCULATE_SCORE_TICKET_DONE_SUCCESS, payload: response.data.data })
    return ruleManager.data
  } catch (error) {
    dispatch({ type: CALCULATE_SCORE_TICKET_DONE_FAILURE, payload: error.message })
    return Promise.reject(error)
  }
}

export const calculateScoreTicketsListAPI = (tickets) => async (dispatch) => {
  dispatch({ type: CALCULATE_SCORE_TICKETS_LIST_REQUEST })
  try {
    const state = store.getState()
    const userId = state.auth.user?.user?.managerId
    const ruleManager = await rulesService.getRuleByIdManager(userId)
    if (!ruleManager?.data?.data.id) {
      throw new Error('Rule manager not found')
    }
    const ruleId = ruleManager.data.data.id
    const response = await scoreService.calculateScoreTicketsList(tickets, ruleId)
    dispatch({ type: CALCULATE_SCORE_TICKETS_LIST_SUCCESS, payload: response.data.data })
    return ruleManager.data
  } catch (error) {
    dispatch({ type: CALCULATE_SCORE_TICKETS_LIST_FAILURE, payload: error.message })
    return Promise.reject(error)
  }
}
