import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CBadge,
  CSpinner,
  CContainer,
  CAvatar,
  CImage,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUidAPI } from '../../../actions/userActions'
import { getScoreByOwnerIdAPI } from '../../../actions/scoreAction'
import UserScoreWidgetStats from '../../../components/charts/userScoreWidgetStats'

// Helper: construit une data URL si la valeur ressemble à du base64 brut
const getAvatarSrc = (avatarUrls) => {
  if (!avatarUrls) return undefined
  const raw = avatarUrls['48x48'] || avatarUrls
  if (!raw) return undefined
  // Si déjà une data URL ou une URL http(s), on retourne tel quel
  if (
    typeof raw === 'string' &&
    (raw.startsWith('data:') || raw.startsWith('http://') || raw.startsWith('https://'))
  ) {
    return raw
  }
  // Détecter base64 plausible (longueur multiple de 4, seulement chars base64 + éventuellement =)
  const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/
  if (typeof raw === 'string' && base64Regex.test(raw.replace(/\n|\r/g, ''))) {
    // Par défaut supposer image/png; ajuster si vous stockez aussi le mime ailleurs
    return `data:image/png;base64,${raw}`
  }
  return raw
}
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
