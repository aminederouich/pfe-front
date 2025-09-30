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
import { useTranslation } from 'react-i18next'

const ModalAddUser = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { user } = useSelector((state) => state.auth)
  const { isAddUserModalOpen } = useSelector((state) => state.user)

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const accountId = user.user.accountId
    console.log(accountId)
    if (!accountId) {
      toast.error(t('user.add.errors.managerNotFound'))
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
      <CModalHeader>{t('user.add.title')}</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
              {t('user.add.email.label')}
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('user.add.email.placeholder')}
                required
              />
            </CCol>
          </CRow>
          <CModalFooter>
            <CButton type="submit" color="primary">
              {t('user.add.submit')}
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                dispatch(toggleAddUserModalClose())
                setEmail('')
              }}
            >
              {t('user.add.cancel')}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default ModalAddUser
