import {
  ADD_RULE_REQUEST,
  ADD_RULE_SUCCESS,
  ADD_RULE_FAILURE,
  GET_RULE_REQUEST,
  GET_RULE_SUCCESS,
  GET_RULE_FAILURE,
} from '../actions/rulesActions'

const initialState = {
  rule: {},
  loading: false,
  error: null,
}

const rulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RULE_REQUEST:
      return { ...state, loading: true }
    case ADD_RULE_SUCCESS:
      return { ...state, loading: false, rule: action.payload }
    case ADD_RULE_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case GET_RULE_REQUEST:
      return { ...state, loading: true }
    case GET_RULE_SUCCESS:
      return { ...state, loading: false, rule: action.payload }
    case GET_RULE_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default rulesReducer
