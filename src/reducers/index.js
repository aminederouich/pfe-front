/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import appReducer from './appReducer'
import jiraReducer from './jiraReducer'
import ticketReducer from './ticketReducer'
import rulesReducer from './rulesReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    jira: jiraReducer,
    ticket: ticketReducer,
    rules: rulesReducer,
})

export default rootReducer
