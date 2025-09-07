import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  const isFirstRender = useRef(true)

  const { usersList, loading } = useSelector((state) => state.user)

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     dispatch(getAllUsersAPI())
  //     isFirstRender.current = false
  //   }
  // }, [dispatch])

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
      <CTable striped hover responsive bordered align="middle">
        <CTableHead color="light">
          <CTableRow className="text-center">
            <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
            <CTableHeaderCell scope="col">Prénom</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Rôle</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {usersList && usersList.length > 0 ? (
            usersList.map((user) => (
              <CTableRow
                key={user.uid}
                className="text-center align-middle"
                style={{ cursor: 'pointer' }}
                onClick={() => (window.location.href = `/employees/${user.uid}`)}
              >
                <CTableDataCell>
                  <span className="text-dark fw-semibold">{user.LastName || '-'}</span>
                </CTableDataCell>
                <CTableDataCell>{user.FirstName || '-'}</CTableDataCell>
                <CTableDataCell>{user.email || '-'}</CTableDataCell>
                <CTableDataCell>
                  {user.IsManager ? (
                    <CBadge color="danger">Manager</CBadge>
                  ) : user.IsEmployee ? (
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
