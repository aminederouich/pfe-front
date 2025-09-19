/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const IncompleteAccountRoute = ({ redirectActiveTo = '/' }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const isActive = user?.user?.active
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (isActive) return <Navigate to={redirectActiveTo} replace />
  return <Outlet />
}

IncompleteAccountRoute.propTypes = {
  redirectActiveTo: PropTypes.string,
}

export default IncompleteAccountRoute
