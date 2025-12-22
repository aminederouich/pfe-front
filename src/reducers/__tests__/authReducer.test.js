import authReducer from '../authReducer'

describe('Auth Reducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    role: null,
  }

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState)
  })

  describe('LOGIN actions', () => {
    it('should handle LOGIN_REQUEST', () => {
      const action = { type: 'LOGIN_REQUEST' }
      const expectedState = {
        ...initialState,
        loading: true,
      }
      expect(authReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle LOGIN_SUCCESS', () => {
      const mockUser = { uid: '123', email: 'test@test.com' }
      const action = {
        type: 'LOGIN_SUCCESS',
        payload: { user: mockUser, role: 'employee' },
      }
      const expectedState = {
        ...initialState,
        isAuthenticated: true,
        user: mockUser,
        role: 'employee',
        loading: false,
      }
      expect(authReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle LOGIN_FAILURE', () => {
      const action = {
        type: 'LOGIN_FAILURE',
        payload: 'Invalid credentials',
      }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
        isAuthenticated: false,
      }
      expect(authReducer(stateWithLoading, action)).toEqual(expectedState)
    })
  })

  describe('LOGOUT actions', () => {
    const authenticatedState = {
      isAuthenticated: true,
      user: { uid: '123', email: 'test@test.com' },
      loading: false,
      error: null,
      role: 'employee',
    }

    it('should handle LOGOUT_REQUEST', () => {
      const action = { type: 'LOGOUT_REQUEST' }
      const expectedState = {
        ...authenticatedState,
        loading: true,
      }
      expect(authReducer(authenticatedState, action)).toEqual(expectedState)
    })

    it('should handle LOGOUT_SUCCESS', () => {
      const action = {
        type: 'LOGOUT_SUCCESS',
        payload: { uid: '123' },
      }
      const expectedState = {
        ...authenticatedState,
        isAuthenticated: false,
        user: null,
        loading: false,
      }
      expect(authReducer(authenticatedState, action)).toEqual(expectedState)
    })

    it('should handle LOGOUT_FAILURE', () => {
      const action = {
        type: 'LOGOUT_FAILURE',
        payload: 'Logout failed',
      }
      const expectedState = {
        ...authenticatedState,
        loading: false,
        error: 'Logout failed',
      }
      expect(authReducer(authenticatedState, action)).toEqual(expectedState)
    })

    it('should handle LOGOUT action', () => {
      const action = { type: 'LOGOUT' }
      const expectedState = {
        ...authenticatedState,
        isAuthenticated: false,
        user: null,
      }
      expect(authReducer(authenticatedState, action)).toEqual(expectedState)
    })
  })

  describe('AUTH_CHECK actions', () => {
    it('should handle AUTH_CHECK_REQUEST', () => {
      const action = { type: 'AUTH_CHECK_REQUEST' }
      const expectedState = {
        ...initialState,
        loading: true,
      }
      expect(authReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle AUTH_CHECK_SUCCESS', () => {
      const mockUser = { uid: '123', email: 'test@test.com' }
      const action = {
        type: 'AUTH_CHECK_SUCCESS',
        payload: mockUser,
      }
      const expectedState = {
        ...initialState,
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      }
      expect(authReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle AUTH_CHECK_FAILURE', () => {
      const action = { type: 'AUTH_CHECK_FAILURE' }
      const stateWithLoading = { ...initialState, loading: true }
      const expectedState = {
        ...initialState,
        loading: false,
        isAuthenticated: false,
      }
      expect(authReducer(stateWithLoading, action)).toEqual(expectedState)
    })
  })

  describe('State transitions', () => {
    it('should maintain state when user logs in after being logged out', () => {
      const loggedOutState = authReducer(initialState, { type: 'LOGOUT' })
      const mockUser = { uid: '456', email: 'new@test.com' }
      const loginAction = {
        type: 'LOGIN_SUCCESS',
        payload: { user: mockUser, role: 'manager' },
      }
      const expectedState = {
        ...initialState,
        isAuthenticated: true,
        user: mockUser,
        role: 'manager',
        loading: false,
      }
      expect(authReducer(loggedOutState, loginAction)).toEqual(expectedState)
    })
  })
})
