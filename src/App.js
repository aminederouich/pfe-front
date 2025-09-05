import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
const ResetPassword = React.lazy(() => import('./views/pages/employee/ResetPassword'))
// Ajoute Register si tu en as un
// const Register = React.lazy(() => import('./views/pages/register/Register'))

const App = () => {
  const dispatch = useDispatch()
  const [isChecking, setIsChecking] = useState(true)
  const isFirstRender = useRef(true)

  const checkAuth = useCallback(async () => {
    try {
      const res = await dispatch(checkAuthentication())
      if (res.error) {
        console.log('User is not authenticated')
      } else {
        dispatch(getAllTicketAPI())
      }
    } catch (error) {
      console.error('Authentication check failed:', error)
    } finally {
      setIsChecking(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (isFirstRender.current) {
      checkAuth()
      isFirstRender.current = false
    }
  }, [checkAuth])

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
            <Route path="/login" name="Login Page" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* <Route path="/register" element={<Register />} /> */}
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
