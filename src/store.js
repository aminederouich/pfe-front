import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import authReducer from './reducers/authReducer'
import dataReducer from './reducers/appReducer'
import jiraReducer from './reducers/jiraReducer'
import ticketReducer from './reducers/ticketReducer'
import userReducer from './reducers/userReducer'
import projectReducer from './reducers/projectReducer'
import scoreReducer from './reducers/scoreReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  jira: jiraReducer,
  ticket: ticketReducer,
  user: userReducer,
  project: projectReducer,
  score: scoreReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

StoreProvider.propTypes = {
  children: PropTypes.node,
}
export default StoreProvider
