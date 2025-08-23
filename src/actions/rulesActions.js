import rulesService from '../services/rulesService'

export const ADD_RULE_REQUEST = 'ADD_RULE_REQUEST'
export const ADD_RULE_SUCCESS = 'ADD_RULE_SUCCESS'
export const ADD_RULE_FAILURE = 'ADD_RULE_FAILURE'

export const GET_RULE_REQUEST = 'GET_RULE_REQUEST'
export const GET_RULE_SUCCESS = 'GET_RULE_SUCCESS'
export const GET_RULE_FAILURE = 'GET_RULE_FAILURE'

// Add Rule
export const addRuleConfigAPI = (data) => async (dispatch) => {
  dispatch({ type: ADD_RULE_REQUEST })
  try {
    const response = await rulesService.addRule(data)
    console.log(response.data.data)
    dispatch({ type: ADD_RULE_SUCCESS, payload: response.data.data })
    return response.data
  } catch (error) {
    dispatch({ type: ADD_RULE_FAILURE, payload: error.message })
    return Promise.reject(error)
  }
}

export const getRuleByIdOwnerAPI = () => async (dispatch) => {
  dispatch({ type: GET_RULE_REQUEST })
  try {
    const response = await rulesService.getRuleByIdOwner()
    dispatch({ type: GET_RULE_SUCCESS, payload: response.data.data })
    return response.data
  } catch (error) {
    dispatch({ type: GET_RULE_FAILURE, payload: error.message })
    return Promise.reject(error)
  }
}