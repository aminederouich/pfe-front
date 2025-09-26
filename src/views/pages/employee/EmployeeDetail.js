import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CCard, CCardBody, CRow, CCol, CBadge, CSpinner, CContainer, CImage } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUidAPI } from '../../../actions/userActions'
import { getScoreByOwnerIdAPI } from '../../../actions/scoreAction'
import UserScoreWidgetStats from '../../../components/charts/userScoreWidgetStats'
const EmployeeDetail = () => {
  const { uid } = useParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isFirstRender = useRef(true)
  const { user, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getUserByUidAPI(uid))
      isFirstRender.current = false
    }
  }, [dispatch, uid])

  useEffect(() => {
    dispatch(getScoreByOwnerIdAPI(uid))
  }, [dispatch, uid, user])

  if (loading) {
    return (
      <div className="text-center">
        <CSpinner />
      </div>
    )
  }

  if (!user) return <p>{t('employeePage.detail.notFound')}</p>

  return (
    <CContainer>
      <CRow>
        <CCol sm={10}>
          <h2>{t('employeePage.detail.title')}</h2>
          <p className="text-medium-emphasis"></p>
        </CCol>
      </CRow>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol md={4} className="d-flex flex-column align-items-start">
              <CImage
                src={user.avatarUrls?.['48x48']}
                roundedCircle
                className="rounded-circle"
                alt="Profile Picture"
                width={120}
                height={120}
              />
              <h5 className="fw-bold mb-1">{user.displayName}</h5>
              <p className="text-muted mb-2">{user.email}</p>
            </CCol>
            <hr className="vr" />

            <CCol md={7}>
              <CRow>
                <CCol xs={6}>
                  <p className="mb-1 text-muted">{t('employeePage.detail.role')}</p>
                  {user.IsManager ? (
                    <CBadge color="warning">{t('employeePage.table.roles.manager')}</CBadge>
                  ) : (
                    <CBadge color="info">{t('employeePage.table.roles.employee')}</CBadge>
                  )}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <UserScoreWidgetStats />
    </CContainer>
  )
}

export default EmployeeDetail
