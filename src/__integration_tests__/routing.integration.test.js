import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import PrivateRoute from '../PrivateRute'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// Mock components
const DashboardComponent = () => <div>Dashboard Content</div>
const LoginComponent = () => <div>Login Page</div>
const IncompleteAccountComponent = () => <div>Incomplete Account Page</div>

describe('Routing Integration Tests', () => {
  describe('PrivateRoute', () => {
    it('should redirect to login when user is not authenticated', () => {
      const store = mockStore({
        auth: {
          isAuthenticated: false,
          user: null,
        },
      })

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Login Page')).toBeInTheDocument()
      expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument()
    })

    it('should redirect to incomplete-account when authenticated but account inactive', () => {
      const store = mockStore({
        auth: {
          isAuthenticated: true,
          user: {
            user: {
              uid: '123',
              active: false,
            },
          },
        },
      })

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/incomplete-account" element={<IncompleteAccountComponent />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Incomplete Account Page')).toBeInTheDocument()
      expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument()
    })

    it('should allow access when authenticated with active account', () => {
      const store = mockStore({
        auth: {
          isAuthenticated: true,
          user: {
            user: {
              uid: '123',
              active: true,
            },
          },
        },
      })

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
      expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
    })

    it('should handle nested private routes', () => {
      const TicketsComponent = () => <div>Tickets Page</div>
      const TicketDetailComponent = () => <div>Ticket Detail</div>

      const store = mockStore({
        auth: {
          isAuthenticated: true,
          user: {
            user: {
              uid: '123',
              active: true,
            },
          },
        },
      })

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/tickets/T123']}>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/tickets" element={<TicketsComponent />} />
                <Route path="/tickets/:code" element={<TicketDetailComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Ticket Detail')).toBeInTheDocument()
    })
  })

  describe('Route Navigation', () => {
    it('should navigate between authenticated routes', async () => {
      const EmployeesComponent = () => <div>Employees List</div>

      const store = mockStore({
        auth: {
          isAuthenticated: true,
          user: {
            user: {
              uid: '123',
              active: true,
            },
          },
        },
      })

      const { rerender } = render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardComponent />} />
                <Route path="/employees" element={<EmployeesComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Dashboard Content')).toBeInTheDocument()

      // Simulate navigation
      rerender(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/employees']}>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardComponent />} />
                <Route path="/employees" element={<EmployeesComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      await waitFor(() => {
        expect(screen.getByText('Employees List')).toBeInTheDocument()
      })
    })

    it('should handle route with parameters', () => {
      const EmployeeDetailComponent = () => {
        return <div>Employee Detail: 456</div>
      }

      const store = mockStore({
        auth: {
          isAuthenticated: true,
          user: {
            user: {
              uid: '123',
              active: true,
            },
          },
        },
      })

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/employees/456']}>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/employees/:uid" element={<EmployeeDetailComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Employee Detail: 456')).toBeInTheDocument()
    })
  })

  describe('Authentication State Changes', () => {
    it('should handle authentication state change during navigation', () => {
      let store = mockStore({
        auth: {
          isAuthenticated: true,
          user: {
            user: {
              uid: '123',
              active: true,
            },
          },
        },
      })

      const { rerender } = render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Dashboard Content')).toBeInTheDocument()

      // User logs out
      store = mockStore({
        auth: {
          isAuthenticated: false,
          user: null,
        },
      })

      rerender(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Login Page')).toBeInTheDocument()
    })

    it('should handle account activation during session', () => {
      let store = mockStore({
        auth: {
          isAuthenticated: true,
          user: {
            user: {
              uid: '123',
              active: false,
            },
          },
        },
      })

      const { rerender } = render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/incomplete-account" element={<IncompleteAccountComponent />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Incomplete Account Page')).toBeInTheDocument()

      // Account gets activated
      store = mockStore({
        auth: {
          isAuthenticated: true,
          user: {
            user: {
              uid: '123',
              active: true,
            },
          },
        },
      })

      rerender(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/incomplete-account" element={<IncompleteAccountComponent />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardComponent />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
    })
  })

  describe('Route Guards Integration', () => {
    it('should prevent direct access to protected routes', () => {
      const store = mockStore({
        auth: {
          isAuthenticated: false,
          user: null,
        },
      })

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/employees/123']}>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route element={<PrivateRoute />}>
                <Route path="/employees/:uid" element={<div>Employee Detail</div>} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Login Page')).toBeInTheDocument()
      expect(screen.queryByText('Employee Detail')).not.toBeInTheDocument()
    })

    it('should allow access after successful authentication', () => {
      const store = mockStore({
        auth: {
          isAuthenticated: true,
          user: {
            user: {
              uid: '123',
              active: true,
            },
          },
        },
      })

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/employees']}>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route element={<PrivateRoute />}>
                <Route path="/employees" element={<div>Employees Page</div>} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>,
      )

      expect(screen.getByText('Employees Page')).toBeInTheDocument()
      expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
    })
  })
})
