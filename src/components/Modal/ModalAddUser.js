import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { sendInviteEmail } from '../../actions/employeeActions'
import { toggleAddUserModalClose, sendInvitationEmailAPI } from '../../actions/userActions'

const ModalAddUser = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isAddUserModalOpen } = useSelector((state) => state.user)

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const accountId = user.user.accountId
    console.log(accountId)
    if (!accountId) {
      toast.error('Impossible d’envoyer l’invitation : identifiant manager introuvable.')
      return
    }
    try {
      const mailInvitation = await dispatch(sendInvitationEmailAPI(email))
      console.log(mailInvitation)
      //   toast.success('✅ Invitation envoyée avec succès.')
      //   dispatch(toggleAddUserModalClose())
    } catch (error) {
      //   console.error('Erreur lors de l’envoi de l’invitation :', error)
      //   toast.error("❌ Une erreur s'est produite lors de l'envoi de l'invitation.")
    }
  }

  return (
    <CModal visible={isAddUserModalOpen} onClose={() => dispatch(toggleAddUserModalClose())}>
      <CModalHeader>Ajouter un nouveau membre d&apos;équipe</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='par exemple : "maria@entreprise.com"'
                required
              />
            </CCol>
          </CRow>
          <CModalFooter>
            <CButton type="submit" color="primary">
              Envoyer l’invitation
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                dispatch(toggleAddUserModalClose())
                setEmail('')
              }}
            >
              Annuler
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default ModalAddUser
