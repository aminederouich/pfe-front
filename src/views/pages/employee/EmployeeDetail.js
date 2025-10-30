import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CBadge,
  CSpinner,
  CContainer,
  CImage,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUidAPI } from '../../../actions/userActions'
import { getScoreByOwnerIdAPI } from '../../../actions/scoreAction'
import UserScoreWidgetStats from '../../../components/charts/userScoreWidgetStats'
import { getAllWeeklyTopScoresAPI } from '../../../actions/weeklyTopScoresActions'
import best from '../../../assets/images/best.png'
import middle from '../../../assets/images/middle.png'
import last from '../../../assets/images/last.png'
const EmployeeDetail = () => {
  const { uid } = useParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isFirstRender = useRef(true)
  const { user, loading } = useSelector((state) => state.user)
  const { weeklyScores } = useSelector((state) => state.weeklyTopScores)
  const [userWeeklyScores, setUserWeeklyScores] = useState([])

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getUserByUidAPI(uid))
      dispatch(getAllWeeklyTopScoresAPI())

      isFirstRender.current = false
    }
  }, [dispatch, uid])

  useEffect(() => {
    if (user?.jiraId) {
      dispatch(getScoreByOwnerIdAPI(user.jiraId))
    }
  }, [dispatch, user])

  useEffect(() => {
    if (user && weeklyScores && Array.isArray(weeklyScores)) {
      const userScores = weeklyScores
        .filter(
          (score) =>
            Array.isArray(score.leaderboard) &&
            score.leaderboard.some((lb) => lb.id === user.jiraId),
        )
        .map((score) => {
          const userLb = score.leaderboard.find((lb) => lb.id === user.jiraId)
          // Calculate position type: 'best', 'middle', 'last'
          let positionType = null
          let maxScore = null
          if (userLb) {
            const scores = score.leaderboard.map((lb) => lb.score)
            maxScore = Math.max(...scores)
            const minScore = Math.min(...scores)
            if (userLb.score === maxScore) {
              positionType = 'best'
            } else if (userLb.score === minScore) {
              positionType = 'last'
            } else {
              positionType = 'middle'
            }
          }
          return {
            startWeek: score.startOfWeek,
            endWeek: score.endOfWeek,
            score: userLb ? userLb.score : null,
            maxScore: maxScore,
            positionType,
          }
        })
      setUserWeeklyScores(userScores)
      // Do something with userWeeklyScores, e.g. set state or log
    }
  }, [user, weeklyScores])

  if (loading) {
    return (
      <div className="text-center">
        <CSpinner />
      </div>
    )
  }

  if (!user) return <p>{t('employeePage.detail.notFound')}</p>

  const positionImageMap = { best, middle, last }

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
                  {user.isManager ? (
                    <CBadge color="danger">{t('employeePage.table.roles.manager')}</CBadge>
                  ) : user.isEmployee ? (
                    <CBadge color="info">{t('employeePage.table.roles.employee')}</CBadge>
                  ) : (
                    <CBadge color="secondary">{t('employeePage.table.roles.user')}</CBadge>
                  )}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <UserScoreWidgetStats />
      <CRow className="mt-4">
        <CCol>
          <h5 className="mb-3">{t('employeePage.detail.weeklyScores')}</h5>
          <CTable striped align="middle" responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">{t('employeePage.detail.position')}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{t('employeePage.detail.score')}</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {t('employeePage.detail.startWeek')}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">{t('employeePage.detail.endWeek')}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {userWeeklyScores.length > 0 ? (
                userWeeklyScores.map(({ startWeek, endWeek, score, maxScore, positionType }) => {
                  const imageSrc = positionType ? positionImageMap[positionType] : null
                  return (
                    <>
                      <CTableRow key={startWeek}>
                        <CTableDataCell>
                          {positionType && imageSrc ? (
                            <div className="d-flex align-items-center gap-2 text-capitalize">
                              <CImage src={imageSrc} alt={positionType} width={36} height={36} />
                              {positionType}
                            </div>
                          ) : (
                            '-'
                          )}
                        </CTableDataCell>
                        <CTableDataCell>{score ?? '-'}</CTableDataCell>
                        <CTableDataCell>
                          {startWeek ? new Date(startWeek).toLocaleDateString() : '-'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {endWeek
                            ? new Date(
                                new Date(endWeek).getTime() + 6 * 24 * 60 * 60 * 1000,
                              ).toLocaleDateString()
                            : '-'}
                        </CTableDataCell>
                      </CTableRow>
                    </>
                  )
                })
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={3} className="text-center text-muted">
                    {t('employeePage.detail.noWeeklyScores')}
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default EmployeeDetail
