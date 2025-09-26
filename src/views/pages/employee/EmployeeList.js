import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
          <h2>{t('employeePage.title')}</h2>
          <p className="text-medium-emphasis">{t('employeePage.description')}</p>
        </CCol>
      </CRow>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow className="text-center">
            <CTableHeaderCell className="bg-body-tertiary">
              {t('employeePage.table.headers.lastName')}
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">
              {t('employeePage.table.headers.firstName')}
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">
              {t('employeePage.table.headers.email')}
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">
              {t('employeePage.table.headers.role')}
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {usersList && usersList.length > 0 ? (
            usersList.map((user) => (
              <CTableRow
                v-for="item in tableItems"
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
                  {user.IsManager ? (
                    <CBadge color="danger">{t('employeePage.table.roles.manager')}</CBadge>
                  ) : user.IsEmployee ? (
                    <CBadge color="info">{t('employeePage.table.roles.employee')}</CBadge>
                  ) : (
                    <CBadge color="secondary">{t('employeePage.table.roles.user')}</CBadge>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="4" className="text-center text-muted">
                {t('employeePage.table.noUsers')}
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </CContainer>
  )
}

export default EmployeeList
