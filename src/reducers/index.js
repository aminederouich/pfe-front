/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import appReducer from './appReducer'
import jiraReducer from './jiraReducer'
import ticketReducer from './ticketReducer'
import rulesReducer from './rulesReducer'
import projectReducer from './projectReducer'
import scoreReducer from './scoreReducer'
import userReducer from './userReducer'
import weeklyAllScoresReducer from './weeklyAllScoresReducer'
import weeklyTopScoresReducer from './weeklyTopScoresReducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  jira: jiraReducer,
  project: projectReducer,
  rules: rulesReducer,
  score: scoreReducer,
  ticket: ticketReducer,
  user: userReducer,
  weeklyAllScores: weeklyAllScoresReducer,
  weeklyTopScores: weeklyTopScoresReducer,
})

export default rootReducer
