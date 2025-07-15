import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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
} from '@coreui/react'
import { getAllUsersAPI } from '../../../actions/userActions'

const EmployeeList = () => {
  const dispatch = useDispatch()
  const isFirstRender = useRef(true)
  const { usersList: users, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllUsersAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  return (
    <CCard className="mb-4 shadow-sm border-0">
      <CCardHeader className="bg-primary text-white fw-bold">Liste des employés</CCardHeader>
      <CCardBody>
        {loading ? (
          <div className="text-center">
            <CSpinner color="primary" />
          </div>
        ) : (
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
              {users.map((user) => (
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
                      <CBadge color="warning">Manager</CBadge>
                    ) : user.IsEmployee ? (
                      <CBadge color="info">Employé</CBadge>
                    ) : (
                      <CBadge color="secondary">Utilisateur</CBadge>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  )
}

export default EmployeeList
