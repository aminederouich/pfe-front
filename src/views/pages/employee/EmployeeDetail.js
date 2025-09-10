import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CBadge,
  CSpinner,
  CContainer,
  CImage,
  CWidgetStatsB,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUidAPI } from '../../../actions/userActions'
import userimg from '../../../assets/images/avatars/1.jpg'
import { getScoreByOwnerIdAPI } from '../../../actions/scoreAction'
import UserScoreWidgetStats from '../../../components/charts/userScoreWidgetStats'
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

  if (!user) return <p>Employé introuvable</p>

  return (
    <CContainer>
      <CRow>
        <CCol sm={10}>
          <h2>Détails de l&apos;employé</h2>
          <p className="text-medium-emphasis"></p>
        </CCol>
      </CRow>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol md={4} className="d-flex flex-column align-items-start">
              <CImage
                src={user.imgURL || userimg}
                roundedCircle
                className="rounded-circle"
                alt="Profile Picture"
                width={120}
                height={120}
              />
              <h5 className="fw-bold mb-1">
                {user.FirstName} {user.LastName}
              </h5>
              <p className="text-muted mb-2">{user.email}</p>
            </CCol>
            <hr className="vr" />

            <CCol md={7}>
              <CRow>
                <CCol xs={6}>
                  <p className="mb-1 text-muted">Role</p>
                  {user.IsManager ? (
                    <CBadge color="warning">Manager</CBadge>
                  ) : (
                    <CBadge color="info">Employé</CBadge>
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
