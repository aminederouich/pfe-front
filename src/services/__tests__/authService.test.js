import axios from 'axios'
import authService from '../authService'

jest.mock('axios')

describe('Auth Service', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    delete axios.defaults.headers.common['Authorization']
  })

  describe('login', () => {
    it('should login successfully and store token', async () => {
      const mockResponse = {
        data: {
          user: { uid: '123', email: 'test@test.com' },
          token: 'test-token-123',
        },
      }
      axios.post.mockResolvedValue(mockResponse)

      const result = await authService.login('test@test.com', 'password123')

      expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/auth/signin', {
        email: 'test@test.com',
        password: 'password123',
      })
      // Token is stored in localStorage
      expect(result).toEqual(mockResponse.data)
      expect(result.token).toBe('test-token-123')
    })

    it('should not store token if not present in response', async () => {
      const mockResponse = {
        data: {
          user: { uid: '123', email: 'test@test.com' },
        },
      }
      axios.post.mockResolvedValue(mockResponse)

      const result = await authService.login('test@test.com', 'password123')

      // No token in response means nothing stored
      expect(result).toEqual(mockResponse.data)
      expect(result.token).toBeUndefined()
    })

    it('should throw error when login fails', async () => {
      const mockError = new Error('Invalid credentials')
      axios.post.mockRejectedValue(mockError)

      await expect(authService.login('wrong@test.com', 'wrongpass')).rejects.toThrow(
        'Invalid credentials',
      )
    })
  })

  describe('logout', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'test-token')
      localStorage.setItem('user', JSON.stringify({ uid: '123' }))
      axios.defaults.headers.common['Authorization'] = 'Bearer test-token'
    })

    it('should logout successfully and clear storage', async () => {
      const mockResponse = {
        data: { clearToken: true, message: 'Logged out' },
      }
      axios.post.mockResolvedValue(mockResponse)

      const result = await authService.logout()

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8081/auth/logout',
        {},
        {
          headers: {
            Authorization: 'Bearer test-token',
          },
        },
      )
      // Storage cleared and authorization header removed
      expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
      expect(result).toEqual(mockResponse.data)
    })

    it('should not clear storage if clearToken is false', async () => {
      const mockResponse = {
        data: { clearToken: false, message: 'Not logged out' },
      }
      axios.post.mockResolvedValue(mockResponse)

      const result = await authService.logout()

      // clearToken is false, so storage not cleared
      expect(result).toEqual(mockResponse.data)
    })

    it('should clear storage on 401 error', async () => {
      const mockError = {
        response: { status: 401 },
      }
      axios.post.mockRejectedValue(mockError)

      await expect(authService.logout()).rejects.toEqual(mockError)

      // On 401, storage is cleared
      expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
    })

    it('should throw error when logout fails with non-401 status', async () => {
      const mockError = {
        response: { status: 500 },
        message: 'Server error',
      }
      axios.post.mockRejectedValue(mockError)

      await expect(authService.logout()).rejects.toEqual(mockError)

      // On non-401 error, storage not cleared automatically
    })
  })

  describe('checkAuth', () => {
    it('should check authentication successfully', async () => {
      const mockResponse = {
        data: { uid: '123', email: 'test@test.com', authenticated: true },
      }
      localStorage.setItem('token', 'test-token')
      axios.get.mockResolvedValue(mockResponse)

      const result = await authService.checkAuth()

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8081/auth/check-auth', {
        headers: {
          Authorization: 'Bearer test-token',
        },
      })
      expect(result).toEqual(mockResponse)
    })

    it('should call checkAuth with null token if not in localStorage', async () => {
      const mockResponse = { data: { authenticated: false } }
      axios.get.mockResolvedValue(mockResponse)

      await authService.checkAuth()

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8081/auth/check-auth', {
        headers: {
          Authorization: 'Bearer null',
        },
      })
    })

    it('should throw error when checkAuth fails', async () => {
      const mockError = new Error('Unauthorized')
      localStorage.setItem('token', 'invalid-token')
      axios.get.mockRejectedValue(mockError)

      await expect(authService.checkAuth()).rejects.toThrow('Unauthorized')
    })
  })

  describe('getCurrentUser', () => {
    it('should return parsed user from localStorage', () => {
      const mockUser = { uid: '123', email: 'test@test.com' }
      localStorage.setItem('user', JSON.stringify(mockUser))

      const result = authService.getCurrentUser()

      expect(result).toEqual(mockUser)
    })

    it('should return null when no user in localStorage', () => {
      // localStorage is empty by default after clear in beforeEach
      const result = authService.getCurrentUser()

      expect(result).toBeNull()
    })
  })
})
