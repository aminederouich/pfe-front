import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CBadge, CSpinner } from '@coreui/react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUidAPI } from '../../../actions/userActions'
import { getAllTicketAPI } from '../../../actions/ticketActions'

const EmployeeDetail = () => {
  const { uid } = useParams()
  const dispatch = useDispatch()
  const isFirstRender = useRef(true)
  const { user, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getUserByUidAPI(uid))
      isFirstRender.current = false
    }
  }, [dispatch, uid])

  if (loading) {
    return (
      <div className="text-center">
        <CSpinner />
      </div>
    )
  }

  if (!user) return <p>Employé introuvable</p>

  return (
    <CCard className="mb-4 shadow-sm border-0">
      <CCardHeader className="bg-info text-white fw-bold">Détails de l&apos;employé</CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <strong>Nom :</strong> {user.LastName}
          </CCol>
          <CCol md={6}>
            <strong>Prénom :</strong> {user.FirstName}
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={6}>
            <strong>Email :</strong> {user.email}
          </CCol>
          <CCol md={6}>
            <strong>Téléphone :</strong> {user.phoneNumber || 'Non renseigné'}
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={6}>
            <strong>Rôle :</strong>{' '}
            {user.IsManager ? (
              <CBadge color="warning">Manager</CBadge>
            ) : (
              <CBadge color="info">Employé</CBadge>
            )}
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default EmployeeDetail
