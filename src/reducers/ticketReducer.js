import {
  TOGGLE_CREATE_TICKET_MODAL_CLOSE,
  TOGGLE_CREATE_TICKET_MODAL_OPEN,
  TOGGLE_EDIT_TICKET_MODAL_CLOSE,
  TOGGLE_EDIT_TICKET_MODAL_OPEN,
  TOGGLE_ASSIGN_TICKET_MODAL_CLOSE,
  TOGGLE_ASSIGN_TICKET_MODAL_OPEN,
  TICKET_TO_VIEW,
  GET_ALL_TICKETS_FAILURE,
  GET_ALL_TICKETS_REQUEST,
  GET_ALL_TICKETS_SUCCESS,
  ADD_NEW_TICKET_REQUEST,
  ADD_NEW_TICKET_SUCCESS,
  ADD_NEW_TICKET_FAILURE,
  UPDATE_TICKET_REQUEST,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAILURE,
} from '../actions/ticketActions'

const initialState = {
  ticketList: [],
  loading: false,
  ticketSelected: null,
  error: null,
  isCreateTicketModalOpen: false,
  isAssignTicketModalOpen: false,
  isEditTicketModalOpen: false,
}

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CREATE_TICKET_MODAL_OPEN:
      return {
        ...state,
        isCreateTicketModalOpen: true,
      }
    case TOGGLE_CREATE_TICKET_MODAL_CLOSE:
      return {
        ...state,
        isCreateTicketModalOpen: false,
      }
    case TOGGLE_EDIT_TICKET_MODAL_OPEN:
      return {
        ...state,
        isEditTicketModalOpen: true,
      }
    case TOGGLE_EDIT_TICKET_MODAL_CLOSE:
      return {
        ...state,
        isEditTicketModalOpen: false,
      }
    case TOGGLE_ASSIGN_TICKET_MODAL_OPEN:
      return {
        ...state,
        isAssignTicketModalOpen: true,
      }
    case TOGGLE_ASSIGN_TICKET_MODAL_CLOSE:
      return {
        ...state,
        isAssignTicketModalOpen: false,
      }
    case TICKET_TO_VIEW:
      return {
        ...state,
        ticketSelected: action.payload,
      }
    case GET_ALL_TICKETS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ALL_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        ticketList: action.payload,
      }
    case GET_ALL_TICKETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case ADD_NEW_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ADD_NEW_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case ADD_NEW_TICKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPDATE_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case UPDATE_TICKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default ticketReducer
