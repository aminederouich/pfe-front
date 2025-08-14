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
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { sendInviteEmail } from '../../../actions/employeeActions'
import { toast } from 'react-toastify'

const AddEmployeeModal = ({ visible, setVisible }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const uid = user.user.uid
    if (!uid) {
      alert('Impossible d’envoyer l’invitation : identifiant manager introuvable.')
      return
    }

    const dataToSend = {
      ...formData,
      managerId: uid,
  }

    console.log('Données envoyées au backend :', dataToSend)

    try {
      await dispatch(sendInviteEmail(dataToSend))
      toast.success('✅ Invitation envoyée avec succès.')
      setVisible(false)
      setFormData({ firstName: '', lastName: '', email: '' }) // reset form
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’invitation :', error)
      toast.error("❌ Une erreur s'est produite lors de l'envoi de l'invitation.")
    }
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>Ajouter un nouvel employé</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CFormLabel>Nom</CFormLabel>
          <CFormInput name="lastName" value={formData.lastName} onChange={handleChange} required />

          <CFormLabel className="mt-2">Prénom</CFormLabel>
          <CFormInput name="firstName" value={formData.firstName} onChange={handleChange} required />

          <CFormLabel className="mt-2">Email</CFormLabel>
          <CFormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <CModalFooter>
            <CButton type="submit" color="primary">
              Envoyer l’invitation
            </CButton>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Annuler
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default AddEmployeeModal
