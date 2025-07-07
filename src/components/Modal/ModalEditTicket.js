import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleEditTicketModalClose } from '../../actions/ticketActions'

const ModalEditTicket = () => {
  const { isEditTicketModalOpen } = useSelector((state) => state.ticket)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(toggleEditTicketModalClose())
  }

  const handleSave = async () => {
    // await dispatch(updateTicketAPI(ticket))
    // refresh()
    handleClose()
  }

  return (
    <CModal visible={isEditTicketModalOpen} onClose={() => handleClose()}>
      <CModalHeader closeButton>Modifier la description</CModalHeader>
      <CModalBody>
        <CFormTextarea
          rows={5}
          // value={editedDescription}
          // onChange={(e) => setEditedDescription(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClose(false)}>
          Annuler
        </CButton>
        {/* <CButton color="primary" onClick={handleSaveDescription}>
          Sauvegarder
        </CButton> */}
      </CModalFooter>
    </CModal>
  )
}

export default ModalEditTicket
