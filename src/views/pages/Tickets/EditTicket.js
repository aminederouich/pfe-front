/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CSpinner,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ticketService from '../../../services/ticketService'
import { getAllTicketAPI } from '../../../actions/ticketActions'

const EditTicketModal = ({ visible, setVisible, ticket, refresh }) => {
  const [summary, setSummary] = useState(ticket?.fields?.summary || '')
  const [description, setDescription] = useState(ticket?.fields?.description || '')
  const [status, setStatus] = useState(ticket?.fields?.status?.name || 'À faire')

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
      <CModalHeader>Modifier le ticket {ticket?.key}</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CFormLabel>Résumé</CFormLabel>
          <CFormInput value={summary} onChange={(e) => setSummary(e.target.value)} />

          <CFormLabel className="mt-3">Description</CFormLabel>
          <CFormInput value={description} onChange={(e) => setDescription(e.target.value)} />

          <CFormLabel className="mt-3">Statut</CFormLabel>
          <CFormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>À faire</option>
            <option>En cours</option>
            <option>Terminé(e)</option>
          </CFormSelect>

          <div className="mt-4 d-flex justify-content-end">
            <CButton color="secondary" className="me-2" onClick={() => setVisible(false)}>
              Annuler
            </CButton>
            <CButton color="primary" type="submit">
              Enregistrer
            </CButton>
          </div>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default EditTicketModal
