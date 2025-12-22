import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import * as actions from '../authActions'
import authService from '../../services/authService'

jest.mock('../../services/authService')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Auth Actions', () => {
  let store

  beforeEach(() => {
    store = mockStore({})
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('Action Creators', () => {
    it('should create LOGIN_REQUEST action', () => {
      const expectedAction = { type: 'LOGIN_REQUEST' }
      expect(actions.loginRequest()).toEqual(expectedAction)
    })

    it('should create LOGIN_SUCCESS action with user and role', () => {
      const user = { uid: '123', email: 'test@test.com' }
      const role = 'employee'
      const expectedAction = {
        type: 'LOGIN_SUCCESS',
        payload: { user, role },
      }
      expect(actions.loginSuccess(user, role)).toEqual(expectedAction)
    })

    it('should create LOGIN_FAILURE action with error', () => {
      const error = 'Invalid credentials'
      const expectedAction = {
        type: 'LOGIN_FAILURE',
        payload: error,
      }
      expect(actions.loginFailure(error)).toEqual(expectedAction)
    })

    it('should create LOGOUT_REQUEST action', () => {
      const expectedAction = { type: 'LOGOUT_REQUEST' }
      expect(actions.logoutRequest()).toEqual(expectedAction)
    })

    it('should create LOGOUT_SUCCESS action with user', () => {
      const user = { uid: '123' }
      const expectedAction = {
        type: 'LOGOUT_SUCCESS',
        payload: user,
      }
      expect(actions.logoutSuccess(user)).toEqual(expectedAction)
    })

    it('should create LOGOUT_FAILURE action with error', () => {
      const error = 'Logout failed'
      const expectedAction = {
        type: 'LOGOUT_FAILURE',
        payload: error,
      }
      expect(actions.logoutFailure(error)).toEqual(expectedAction)
    })

    it('should create AUTH_CHECK_REQUEST action', () => {
      const expectedAction = { type: 'AUTH_CHECK_REQUEST' }
      expect(actions.checkAuthRequest()).toEqual(expectedAction)
    })

    it('should create AUTH_CHECK_SUCCESS action with data', () => {
      const data = { uid: '123', email: 'test@test.com' }
      const expectedAction = {
        type: 'AUTH_CHECK_SUCCESS',
        payload: data,
      }
      expect(actions.checkAuthSuccess(data)).toEqual(expectedAction)
    })

    it('should create AUTH_CHECK_FAILURE action', () => {
      const expectedAction = { type: 'AUTH_CHECK_FAILURE' }
      expect(actions.checkAuthFailure()).toEqual(expectedAction)
    })
  })

  describe('login async action', () => {
    it('dispatches LOGIN_SUCCESS for employee when login succeeds', async () => {
      const mockResponse = {
        user: { uid: '123', IsEmployee: true, IsManager: false },
        token: 'test-token',
      }
      authService.login.mockResolvedValue(mockResponse)

      const expectedActions = [
        { type: 'LOGIN_REQUEST' },
        {
          type: 'LOGIN_SUCCESS',
          payload: { user: mockResponse, role: 'employee' },
        },
      ]

      await store.dispatch(actions.login('test@test.com', 'password'))
      expect(store.getActions()).toEqual(expectedActions)
      // Verify localStorage was set by checking it was stored
      expect(localStorage.getItem('userId')).toBe('123')
    })

    it('dispatches LOGIN_SUCCESS for manager when login succeeds', async () => {
      const mockResponse = {
        user: { uid: '456', IsEmployee: false, IsManager: true },
        token: 'test-token',
      }
      authService.login.mockResolvedValue(mockResponse)

      const expectedActions = [
        { type: 'LOGIN_REQUEST' },
        {
          type: 'LOGIN_SUCCESS',
          payload: { user: mockResponse, role: 'manager' },
        },
      ]

      await store.dispatch(actions.login('manager@test.com', 'password'))
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('dispatches LOGIN_FAILURE when login fails', async () => {
      const error = new Error('Invalid credentials')
      authService.login.mockRejectedValue(error)

      const expectedActions = [{ type: 'LOGIN_REQUEST' }, { type: 'LOGIN_FAILURE', payload: error }]

      await expect(store.dispatch(actions.login('wrong@test.com', 'wrong'))).rejects.toThrow()

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('dispatches LOGIN_FAILURE when response contains error', async () => {
      const mockResponse = { error: 'Account locked' }
      authService.login.mockResolvedValue(mockResponse)

      const expectedActions = [
        { type: 'LOGIN_REQUEST' },
        { type: 'LOGIN_FAILURE', payload: 'Account locked' },
      ]

      await expect(store.dispatch(actions.login('test@test.com', 'password'))).rejects.toThrow()

      // Only one LOGIN_FAILURE should be dispatched when error is in response
      const actualActions = store.getActions()
      expect(actualActions).toEqual(expectedActions)
    })
  })

  describe('logout async action', () => {
    it('dispatches LOGOUT_SUCCESS when logout succeeds', async () => {
      const mockUser = { uid: '123' }
      authService.logout.mockResolvedValue(mockUser)

      const expectedActions = [
        { type: 'LOGOUT_REQUEST' },
        { type: 'LOGOUT_SUCCESS', payload: mockUser },
      ]

      await store.dispatch(actions.logout())
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('dispatches LOGOUT_FAILURE when logout fails', async () => {
      const error = new Error('Logout failed')
      authService.logout.mockRejectedValue(error)

      const expectedActions = [
        { type: 'LOGOUT_REQUEST' },
        { type: 'LOGOUT_FAILURE', payload: error },
      ]

      await store.dispatch(actions.logout())
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('checkAuthentication async action', () => {
    it('dispatches AUTH_CHECK_SUCCESS when check succeeds', async () => {
      const mockData = { uid: '123', email: 'test@test.com' }
      const mockResponse = { data: mockData }
      authService.checkAuth.mockResolvedValue(mockResponse)

      const expectedActions = [
        { type: 'AUTH_CHECK_REQUEST' },
        { type: 'AUTH_CHECK_SUCCESS', payload: mockData },
      ]

      await store.dispatch(actions.checkAuthentication())
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('dispatches AUTH_CHECK_FAILURE when check fails', async () => {
      const error = {
        response: { data: { error: 'Token expired' } },
      }
      authService.checkAuth.mockRejectedValue(error)

      const expectedActions = [{ type: 'AUTH_CHECK_REQUEST' }, { type: 'AUTH_CHECK_FAILURE' }]

      await expect(store.dispatch(actions.checkAuthentication())).rejects.toThrow()

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
