/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import ticketService from '../../../services/ticketService'

const EditTicketModal = ({ visible, setVisible, ticket, refresh }) => {
  const { t } = useTranslation()
  const [summary, setSummary] = useState(ticket?.fields?.summary || '')
  const [description, setDescription] = useState(ticket?.fields?.description || '')
  const [status, setStatus] = useState(
    ticket?.fields?.status?.name || t('ticketPage.editModal.statusOptions.todo'),
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedTicket = {
      ...ticket,
      fields: {
        ...ticket.fields,
        summary,
        description,
        status: {
          ...ticket.fields.status,
          name: status,
        },
      },
      updatedAt: new Date(),
    }

    await ticketService.updateTicket(ticket.key, updatedTicket)
    refresh()
    setVisible(false)
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
      <CModalHeader>
        {t('ticketPage.editModal.title')} {ticket?.key}
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CFormLabel>{t('ticketPage.editModal.labels.summary')}</CFormLabel>
          <CFormInput value={summary} onChange={(e) => setSummary(e.target.value)} />

          <CFormLabel className="mt-3">{t('ticketPage.editModal.labels.description')}</CFormLabel>
          <CFormInput value={description} onChange={(e) => setDescription(e.target.value)} />

          <CFormLabel className="mt-3">{t('ticketPage.editModal.labels.status')}</CFormLabel>
          <CFormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>{t('ticketPage.editModal.statusOptions.todo')}</option>
            <option>{t('ticketPage.editModal.statusOptions.inProgress')}</option>
            <option>{t('ticketPage.editModal.statusOptions.done')}</option>
          </CFormSelect>

          <div className="mt-4 d-flex justify-content-end">
            <CButton color="secondary" className="me-2" onClick={() => setVisible(false)}>
              {t('ticketPage.editModal.buttons.cancel')}
            </CButton>
            <CButton color="primary" type="submit">
              {t('ticketPage.editModal.buttons.save')}
            </CButton>
          </div>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default EditTicketModal
