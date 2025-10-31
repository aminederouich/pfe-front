import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './scss/style.scss'
import PrivateRoute from './PrivateRute'
import { checkAuthentication } from './actions/authActions'
import { CSpinner } from '@coreui/react'
import { getAllTicketAPI } from './actions/ticketActions'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const PublicLayout = React.lazy(() => import('./layout/PublicLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// Ajoute Register si tu en as un
const Register = React.lazy(() => import('./views/pages/register/Register'))

const IncompleteAccountGuard = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const isActive = user?.user?.active
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (isActive) return <Navigate to="/" replace />
  return children
}

IncompleteAccountGuard.propTypes = {
  children: PropTypes.node,
}

const LoginRedirectGuard = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  if (!isAuthenticated) return children
  const isActive = user?.user?.active
  if (isActive) return <Navigate to="/" replace />
  return <Navigate to="/incomplete-account" replace />
}

LoginRedirectGuard.propTypes = {
  children: PropTypes.node,
}

const App = () => {
  const dispatch = useDispatch()
  const [isChecking, setIsChecking] = useState(false)
  const isFirstRender = useRef(true)

  const checkAuth = useCallback(async () => {
    setIsChecking(true)
    try {
      const res = await dispatch(checkAuthentication())
      if (!res.error) {
        const ticketRes = await dispatch(getAllTicketAPI())
        if (!ticketRes.error) {
          setIsChecking(false)
        }
      } else {
        setIsChecking(false)
      }
    } catch (error) {
      setIsChecking(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (isFirstRender.current) {
      checkAuth()
      isFirstRender.current = false
    }
  }, [dispatch, checkAuth])

  if (isChecking) {
    return (
      <div className="pt-3 text-center">
        <CSpinner />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner />
          </div>
        }
      >
        <Routes>
          {/* Public routes (sans header/sidebar) */}
          <Route element={<PublicLayout />}>
            <Route
              path="/login"
              name="Login Page"
              element={
                <LoginRedirectGuard>
                  <Login />
                </LoginRedirectGuard>
              }
            />
            <Route
              path="/incomplete-account"
              element={
                <IncompleteAccountGuard>
                  <Register />
                </IncompleteAccountGuard>
              }
            />
          </Route>

          {/* Private routes (avec header/sidebar) */}
          <Route element={<PrivateRoute />}>
            <Route path="*" element={<DefaultLayout />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
