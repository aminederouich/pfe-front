import React, { useState } from 'react'
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
import { useTranslation } from 'react-i18next'

const ModalEditTicket = () => {
  const { isEditTicketModalOpen, ticketSelected } = useSelector((state) => state.ticket)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [editedDescription, setEditedDescription] = useState(
    ticketSelected?.fields?.description || '',
  )

  const handleClose = () => {
    dispatch(toggleEditTicketModalClose())
  }

  const handleSave = async () => {
    // TODO: implement update ticket description dispatch (e.g., updateTicketAPI) when backend ready
    // Example (uncomment when action exists):
    // await dispatch(updateTicketAPI({ ...ticketSelected, fields: { ...ticketSelected.fields, description: editedDescription } }))
    handleClose()
  }

  return (
    <CModal visible={isEditTicketModalOpen} onClose={() => handleClose()}>
      <CModalHeader closeButton>{t('ticketPage.editModal.editDescriptionTitle')}</CModalHeader>
      <CModalBody>
        <CFormTextarea
          rows={5}
          value={editedDescription}
          placeholder={t('ticketPage.editModal.labels.description')}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleClose(false)}>
          {t('ticketPage.editModal.buttons.cancel')}
        </CButton>
        <CButton color="primary" disabled={!editedDescription?.trim()} onClick={handleSave}>
          {t('ticketPage.editModal.buttons.save')}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEditTicket
