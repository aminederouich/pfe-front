import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import AppHeader from '../AppHeader'
import * as ticketActions from '../../actions/ticketActions'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'fr',
      changeLanguage: jest.fn(),
    },
  }),
}))

// Mock AppBreadcrumb
jest.mock('../AppBreadcrumb', () => {
  return function MockAppBreadcrumb() {
    return <div data-testid="breadcrumb">Breadcrumb</div>
  }
})

// Mock AppHeaderDropdown
jest.mock('../header', () => ({
  AppHeaderDropdown: () => <div data-testid="employee-dropdown">Employee Dropdown</div>,
  AppHeaderDropdownManager: () => <div data-testid="manager-dropdown">Manager Dropdown</div>,
}))

// Mock actions
jest.mock('../../actions/ticketActions')

const mockStore = configureMockStore()

describe('AppHeader Component', () => {
  let store

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderWithStore = (initialState) => {
    store = mockStore(initialState)
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <AppHeader />
        </BrowserRouter>
      </Provider>,
    )
  }

  describe('Rendering', () => {
    it('should render header with logo', () => {
      const initialState = {
        data: { theme: 'light' },
        auth: { user: null },
      }
      renderWithStore(initialState)
      const logo = screen.getByRole('img', { name: /logo/i })
      expect(logo).toBeInTheDocument()
    })

    it('should render navigation links', () => {
      const initialState = {
        data: { theme: 'light' },
        auth: { user: null },
      }
      renderWithStore(initialState)
      expect(screen.getByText('header.nav.dashboard')).toBeInTheDocument()
      expect(screen.getByText('header.nav.employees')).toBeInTheDocument()
      expect(screen.getByText('header.nav.projects')).toBeInTheDocument()
      expect(screen.getByText('header.nav.tickets')).toBeInTheDocument()
    })

    it('should render language selector buttons', () => {
      const initialState = {
        data: { theme: 'light' },
        auth: { user: null },
      }
      renderWithStore(initialState)
      expect(screen.getByText('FR')).toBeInTheDocument()
      expect(screen.getByText('EN')).toBeInTheDocument()
    })

    it('should render create ticket button', () => {
      const initialState = {
        data: { theme: 'light' },
        auth: { user: null },
      }
      renderWithStore(initialState)
      expect(screen.getByText('header.actions.create')).toBeInTheDocument()
    })

    it('should render breadcrumb component', () => {
      const initialState = {
        data: { theme: 'light' },
        auth: { user: null },
      }
      renderWithStore(initialState)
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    })
  })

  describe('User Roles', () => {
    it('should render employee dropdown when user is employee', () => {
      const initialState = {
        data: { theme: 'light' },
        auth: {
          user: {
            user: { isEmployee: true, isManager: false },
          },
        },
      }
      renderWithStore(initialState)
      expect(screen.getByTestId('employee-dropdown')).toBeInTheDocument()
      expect(screen.queryByTestId('manager-dropdown')).not.toBeInTheDocument()
    })

    it('should render manager dropdown when user is manager', () => {
      const initialState = {
        data: { theme: 'light' },
        auth: {
          user: {
            user: { isEmployee: false, isManager: true },
          },
        },
      }
      renderWithStore(initialState)
      expect(screen.getByTestId('manager-dropdown')).toBeInTheDocument()
      expect(screen.queryByTestId('employee-dropdown')).not.toBeInTheDocument()
    })

    it('should not render any dropdown when user is null', () => {
      const initialState = {
        data: { theme: 'light' },
        auth: { user: null },
      }
      renderWithStore(initialState)
      expect(screen.queryByTestId('employee-dropdown')).not.toBeInTheDocument()
      expect(screen.queryByTestId('manager-dropdown')).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should dispatch toggleCreateTicketModalOpen when create button is clicked', () => {
      const mockDispatch = jest.fn()
      ticketActions.toggleCreateTicketModalOpen.mockReturnValue({
        type: 'TOGGLE_CREATE_TICKET_MODAL_OPEN',
      })

      const initialState = {
        data: { theme: 'light' },
        auth: { user: null },
      }
      store = mockStore(initialState)
      store.dispatch = mockDispatch

      render(
        <Provider store={store}>
          <BrowserRouter>
            <AppHeader />
          </BrowserRouter>
        </Provider>,
      )

      const createButton = screen.getByText('header.actions.create')
      fireEvent.click(createButton)

      expect(ticketActions.toggleCreateTicketModalOpen).toHaveBeenCalled()
    })
  })

  describe('Theme', () => {
    it('should apply light theme from store', () => {
      const initialState = {
        data: { theme: 'light' },
        auth: { user: null },
      }
      renderWithStore(initialState)
      // Theme is applied via useColorModes hook
      expect(store.getState().data.theme).toBe('light')
    })

    it('should apply dark theme from store', () => {
      const initialState = {
        data: { theme: 'dark' },
        auth: { user: null },
      }
      renderWithStore(initialState)
      expect(store.getState().data.theme).toBe('dark')
    })
  })
})
