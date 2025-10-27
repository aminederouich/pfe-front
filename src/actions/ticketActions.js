import ticketService from '../services/ticketService'

export const TOGGLE_CREATE_TICKET_MODAL_OPEN = 'TOGGLE_CREATE_TICKET_MODAL_OPEN'
export const TOGGLE_CREATE_TICKET_MODAL_CLOSE = 'TOGGLE_CREATE_TICKET_MODAL_CLOSE'

export const TOGGLE_EDIT_TICKET_MODAL_OPEN = 'TOGGLE_EDIT_TICKET_MODAL_OPEN'
export const TOGGLE_EDIT_TICKET_MODAL_CLOSE = 'TOGGLE_EDIT_TICKET_MODAL_CLOSE'

export const TOGGLE_ASSIGN_TICKET_MODAL_OPEN = 'TOGGLE_ASSIGN_TICKET_MODAL_OPEN'
export const TOGGLE_ASSIGN_TICKET_MODAL_CLOSE = 'TOGGLE_ASSIGN_TICKET_MODAL_CLOSE'

export const TICKET_TO_VIEW = 'TICKET_TO_VIEW'

export const GET_ALL_TICKETS_REQUEST = 'GET_ALL_TICKETS_REQUEST'
export const GET_ALL_TICKETS_SUCCESS = 'GET_ALL_TICKETS_SUCCESS'
export const GET_ALL_TICKETS_FAILURE = 'GET_ALL_TICKETS_FAILURE'

export const ADD_NEW_TICKET_REQUEST = 'ADD_NEW_TICKET_REQUEST'
export const ADD_NEW_TICKET_SUCCESS = 'ADD_NEW_TICKET_SUCCESS'
export const ADD_NEW_TICKET_FAILURE = 'ADD_NEW_TICKET_FAILURE'

export const UPDATE_TICKET_REQUEST = 'UPDATE_TICKET_REQUEST'
export const UPDATE_TICKET_SUCCESS = 'UPDATE_TICKET_SUCCESS'
export const UPDATE_TICKET_FAILURE = 'UPDATE_TICKET_FAILURE'

export const UPDATE_ASSIGN_TICKET_IN_JIRA_REQUEST = 'UPDATE_ASSIGN_TICKET_IN_JIRA_REQUEST'
export const UPDATE_ASSIGN_TICKET_IN_JIRA_SUCCESS = 'UPDATE_ASSIGN_TICKET_IN_JIRA_SUCCESS'
export const UPDATE_ASSIGN_TICKET_IN_JIRA_FAILURE = 'UPDATE_ASSIGN_TICKET_IN_JIRA_FAILURE'

export const GET_ISSUE_DETAILS_FROM_JIRA_REQUEST = 'GET_ISSUE_DETAILS_FROM_JIRA_REQUEST'
export const GET_ISSUE_DETAILS_FROM_JIRA_SUCCESS = 'GET_ISSUE_DETAILS_FROM_JIRA_SUCCESS'
export const GET_ISSUE_DETAILS_FROM_JIRA_FAILURE = 'GET_ISSUE_DETAILS_FROM_JIRA_FAILURE'

export const toggleCreateTicketModalOpen = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CREATE_TICKET_MODAL_OPEN,
  })
}

export const toggleCreateTicketModalClose = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CREATE_TICKET_MODAL_CLOSE,
  })
}

export const toggleEditTicketModalOpen = () => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_TICKET_MODAL_OPEN,
  })
}

export const toggleEditTicketModalClose = () => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_TICKET_MODAL_CLOSE,
  })
}

export const toggleAssignTicketModalOpen = () => (dispatch) => {
  dispatch({
    type: TOGGLE_ASSIGN_TICKET_MODAL_OPEN,
  })
}

export const toggleAssignTicketModalClose = () => (dispatch) => {
  dispatch({
    type: TOGGLE_ASSIGN_TICKET_MODAL_CLOSE,
  })
}

export const ticketToView = (ticket) => (dispatch) => {
  dispatch({
    type: TICKET_TO_VIEW,
    payload: ticket,
  })
}

export const getAllTicketAPI = () => (dispatch) => {
  dispatch({
    type: GET_ALL_TICKETS_REQUEST,
  })
  return ticketService
    .getAllTickets()
    .then((response) => {
      if (response.error) {
        dispatch({
          type: GET_ALL_TICKETS_FAILURE,
          payload: response.error,
        })
        throw new Error(response.error)
      } else {
        dispatch({
          type: GET_ALL_TICKETS_SUCCESS,
          payload: response.data.results,
        })
        return response
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_TICKETS_FAILURE,
        payload: error,
      })
      throw new Error(error)
    })
}

export const addNewTicketAPI = (ticketData) => (dispatch) => {
  dispatch({
    type: ADD_NEW_TICKET_REQUEST,
  })
  return ticketService
    .addNewTicket(ticketData)
    .then((response) => {
      if (response.error) {
        dispatch({
          type: ADD_NEW_TICKET_FAILURE,
          payload: response.error,
        })
        throw new Error(response.error)
      } else {
        dispatch({
          type: ADD_NEW_TICKET_SUCCESS,
        })
        return response
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_NEW_TICKET_FAILURE,
        payload: error,
      })
      throw new Error(error)
    })
}

export const updateTicketAPI = (ticketUpdated) => (dispatch) => {
  dispatch({
    type: UPDATE_TICKET_REQUEST,
  })
  return ticketService
    .updateTicket(ticketUpdated)
    .then((response) => {
      if (response.error) {
        dispatch({
          type: UPDATE_TICKET_FAILURE,
          payload: response.error,
        })
        throw new Error(response.error)
      } else {
        dispatch({
          type: UPDATE_TICKET_SUCCESS,
        })
        return response
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_TICKET_FAILURE,
        payload: error,
      })
      throw new Error(error)
    })
}

export const getIssueDetailsFromJiraAPI = (issueId, config) => (dispatch) => {
  dispatch({
    type: GET_ISSUE_DETAILS_FROM_JIRA_REQUEST,
  })
  return ticketService
    .getIssueDetailsFromJira(issueId, config)
    .then((response) => {
      if (response.error) {
        dispatch({
          type: GET_ISSUE_DETAILS_FROM_JIRA_FAILURE,
          payload: response.error,
        })
        throw new Error(response.error)
      } else {
        dispatch({
          type: GET_ISSUE_DETAILS_FROM_JIRA_SUCCESS,
          payload: response.data,
        })
        return response
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ISSUE_DETAILS_FROM_JIRA_FAILURE,
        payload: error,
      })
      throw new Error(error)
    })
}

export const updateAssignTicketInJiraAPI = (ticketKey, jiraId, config) => (dispatch) => {
  dispatch({
    type: UPDATE_ASSIGN_TICKET_IN_JIRA_REQUEST,
  })
  return ticketService
    .assignIssueExterne(ticketKey, jiraId, config)
    .then((response) => {
      if (response.error) {
        dispatch({
          type: UPDATE_ASSIGN_TICKET_IN_JIRA_FAILURE,
          payload: response.error,
        })
        throw new Error(response.error)
      } else {
        dispatch({
          type: UPDATE_ASSIGN_TICKET_IN_JIRA_SUCCESS,
        })
        dispatch(getIssueDetailsFromJiraAPI(ticketKey, config))
        return response
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_ASSIGN_TICKET_IN_JIRA_FAILURE,
        payload: error,
      })
      throw new Error(error)
    })
}
