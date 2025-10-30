import React from 'react'
import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import authReducer from './reducers/authReducer'
import dataReducer from './reducers/appReducer'
import jiraReducer from './reducers/jiraReducer'
import ticketReducer from './reducers/ticketReducer'
import userReducer from './reducers/userReducer'
import projectReducer from './reducers/projectReducer'
import scoreReducer from './reducers/scoreReducer'
import rulesReducer from './reducers/rulesReducer'
import weeklyTopScoresReducer from './reducers/weeklyTopScoresReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  rules: rulesReducer,
  auth: authReducer,
  data: dataReducer,
  jira: jiraReducer,
  ticket: ticketReducer,
  user: userReducer,
  project: projectReducer,
  score: scoreReducer,
  weeklyTopScores: weeklyTopScoresReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

StoreProvider.propTypes = {
  children: PropTypes.node,
}

export { store }
export default StoreProvider
