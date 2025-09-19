import React from 'react'
import { AppFooter } from '../components/index'

const IncompletAccountLayout = () => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100">
        <div className="body flex-grow-1">
          <h1 style={{ textAlign: 'center', marginTop: '20%' }}>
            Please complete your account setup
          </h1>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default IncompletAccountLayout
