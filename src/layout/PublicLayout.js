import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <Outlet />
    </div>
  )
}

export default PublicLayout
