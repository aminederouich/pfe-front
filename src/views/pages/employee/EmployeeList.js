import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
  CBadge,
  CContainer,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'
import { getAllUsersAPI } from '../../../actions/userActions'
const EmployeeList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isFirstRender = useRef(true)

  const { usersList, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllUsersAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner />
      </div>
    )
  }

  return (
    <CContainer>
      <CRow>
        <CCol sm={9}>
          <h2>list of User</h2>
          <p className="text-medium-emphasis">Description of the user list</p>
        </CCol>
      </CRow>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow className="text-center">
            <CTableHeaderCell className="bg-body-tertiary">Nom</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Prénom</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Rôle</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {usersList && usersList.length > 0 ? (
            usersList.map((user) => (
              <CTableRow
                key={user.uid}
                className="text-center align-middle"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/employees/${user.uid}`)}
              >
                <CTableDataCell className="text-center">
                  <span className="text-dark fw-semibold">{user.lastName || '-'}</span>
                </CTableDataCell>
                <CTableDataCell className="text-center">{user.firstName || '-'}</CTableDataCell>
                <CTableDataCell className="text-center">{user.email || '-'}</CTableDataCell>
                <CTableDataCell className="text-center">
                  {user.isManager ? (
                    <CBadge color="danger">Manager</CBadge>
                  ) : user.isEmployee ? (
                    <CBadge color="info">Employé</CBadge>
                  ) : (
                    <CBadge color="secondary">Utilisateur</CBadge>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="4" className="text-center text-muted">
                Aucun utilisateur trouvé.
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </CContainer>
  )
}

export default EmployeeList
