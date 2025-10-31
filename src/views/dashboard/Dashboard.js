import React from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'

import UserScoreWidgetStats from '../../components/charts/userScoreWidgetStats'
import { AllTicketsTypeStats } from '../../components/charts/AllTicketsTypeStats'
import { AllTicketsStatusStats } from '../../components/charts/AllTicketsStatusStats'
import { AllTicketsPrioriteStats } from '../../components/charts/AllTicketsPrioriteStats'

const Dashboard = () => {
  return (
    <CContainer>
      <UserScoreWidgetStats forMe />
      <CRow>
        <CCol md={4}>
          <AllTicketsTypeStats />
        </CCol>
        <CCol md={4}>
          <AllTicketsPrioriteStats />
        </CCol>
        <CCol md={4}>
          <AllTicketsStatusStats />
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Dashboard
