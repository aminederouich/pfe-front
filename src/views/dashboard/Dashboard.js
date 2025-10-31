import React from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'

import UserScoreWidgetStats from '../../components/charts/userScoreWidgetStats'
import { AllTicketsTypeStats } from '../../components/charts/AllTicketsTypeStats'

const Dashboard = () => {
  return (
    <CContainer>
      <UserScoreWidgetStats forMe />
      <CRow>
        <CCol md={4}>
          <AllTicketsTypeStats />
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Dashboard
