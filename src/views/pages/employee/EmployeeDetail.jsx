import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CBadge, CSpinner } from '@coreui/react'
import axios from 'axios'

const EmployeeDetail = () => {
  const { uid } = useParams()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [ticketStats, setTicketStats] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/user/${uid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setEmployee(res.data)

        const stats = await axios.get(`http://localhost:8081/tickets/stats/${uid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setTicketStats(stats.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [uid])

  if (loading) {
    return (
      <div className="text-center">
        <CSpinner />
      </div>
    )
  }

  if (!employee) return <p>Employé introuvable</p>

  return (
    <CCard className="mb-4 shadow-sm border-0">
      <CCardHeader className="bg-info text-white fw-bold">Détails de l&apos;employé</CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <strong>Nom :</strong> {employee.LastName}
          </CCol>
          <CCol md={6}>
            <strong>Prénom :</strong> {employee.FirstName}
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={6}>
            <strong>Email :</strong> {employee.email}
          </CCol>
          <CCol md={6}>
            <strong>Téléphone :</strong> {employee.phoneNumber || 'Non renseigné'}
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={6}>
            <strong>Rôle :</strong>{' '}
            {employee.IsManager ? (
              <CBadge color="warning">Manager</CBadge>
            ) : (
              <CBadge color="info">Employé</CBadge>
            )}
          </CCol>
        </CRow>
        {ticketStats && (
          <>
            <hr />
            <h5 className="mt-3">Statistiques des tickets</h5>
            <p>
              <strong>Total :</strong> {ticketStats.total}
            </p>
            <p>
              <strong>Cette semaine :</strong> {ticketStats.weekly}
            </p>
            <p>
              <strong>Score global :</strong> {ticketStats.score}
            </p>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default EmployeeDetail
