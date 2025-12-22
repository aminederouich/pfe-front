import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import AppBreadcrumb from '../AppBreadcrumb'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}))

// Mock routes
jest.mock('../../routes', () => [
  { path: '/dashboard', name: 'Dashboard', tKey: 'routes.dashboard' },
  { path: '/employees/list', name: 'Employees', tKey: 'routes.employees' },
  { path: '/tickets/list', name: 'Tickets', tKey: 'routes.tickets' },
])

const mockStore = configureMockStore()

describe('AppBreadcrumb Component', () => {
  let store

  beforeEach(() => {
    store = mockStore({})
  })

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)
    return render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>,
    )
  }

  it('should render home breadcrumb on root path', () => {
    renderWithRouter(<AppBreadcrumb />, { route: '/' })
    expect(screen.getByText('routes.home')).toBeInTheDocument()
  })

  it('should render breadcrumbs for dashboard route', () => {
    renderWithRouter(<AppBreadcrumb />, { route: '/dashboard' })
    expect(screen.getByText('routes.home')).toBeInTheDocument()
    expect(screen.getByText('routes.dashboard')).toBeInTheDocument()
  })

  it('should render breadcrumbs for nested route', () => {
    renderWithRouter(<AppBreadcrumb />, { route: '/employees/list' })
    expect(screen.getByText('routes.home')).toBeInTheDocument()
    expect(screen.getByText('routes.employees')).toBeInTheDocument()
  })

  it('should mark last breadcrumb as active', () => {
    const { container } = renderWithRouter(<AppBreadcrumb />, {
      route: '/tickets/list',
    })
    const activeItem = container.querySelector('.breadcrumb-item.active')
    expect(activeItem).toBeInTheDocument()
    expect(activeItem).toHaveTextContent('routes.tickets')
  })

  it('should render correctly with no matching route', () => {
    renderWithRouter(<AppBreadcrumb />, { route: '/unknown' })
    expect(screen.getByText('routes.home')).toBeInTheDocument()
  })
})
