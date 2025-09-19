import React from 'react'
import { AppContent, AppFooter, AppHeader } from '../components/index'
import ModalCreateTicket from '../components/Modal/ModalCreateTicket'
import ModalEditConfigJira from '../components/Modal/ModalEditConfigJira'
import ModalEditProject from '../components/Modal/ModalEditProject'
import ModalEditTicket from '../components/Modal/ModalEditTicket'
import ModalAssignTicket from '../components/Modal/ModalAssignTicket'
import ModalAddUser from '../components/Modal/ModalAddUser'

const DefaultLayout = () => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
          <ModalAssignTicket />
          <ModalCreateTicket />
          <ModalEditTicket />
          <ModalEditProject />
          <ModalEditConfigJira />
          <ModalAddUser />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
