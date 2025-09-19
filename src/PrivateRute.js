/* eslint-disable prettier/prettier */
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const isActive = user?.user?.active

    // Règle demandée: il est strictement interdit d'accéder à /incomplete-account
    // si isAuthenticated === false ET user?.user?.active === false.
    // Cette route est déjà dans la zone PublicLayout. Ici on protège les routes privées :
    // - Non authentifié -> /login
    // - Authentifié mais compte inactif -> /incomplete-account

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (!isActive) {
        return <Navigate to="/incomplete-account" replace />
    }

    return <Outlet />
}

export default PrivateRoute
