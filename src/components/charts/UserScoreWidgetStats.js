import React, { useEffect } from 'react'
import { CCard, CCardBody, CCol, CRow, CWidgetStatsB } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getScoreByOwnerIdAPI } from '../../actions/scoreAction'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const UserScoreWidgetStats = ({ forMe }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { user: authUser } = useSelector((state) => state.auth)
  const { score: scoreList = [] } = useSelector((state) => state.score)
  // const userId = forMe ? user?.uid : null

  useEffect(() => {
    if (forMe) {
      const userId = authUser?.user?.jiraId
      dispatch(getScoreByOwnerIdAPI(userId))
    }
  }, [authUser, authUser?.user?.jiraId, dispatch, forMe])

  // Helper: convert Firestore timestamp to JS Date
  const toDate = (ts) => {
    if (!ts) return null
    if (ts instanceof Date) return ts
    if (typeof ts === 'object' && ts.seconds) return new Date(ts.seconds * 1000)
    return null
  }

  // Sort scores by dateAffection desc
  const sortedScores = [...scoreList].sort((a, b) => {
    const da = toDate(a.dateAffection)
    const db = toDate(b.dateAffection)
    return db - da
  })

  // 1. Dernier score et sa date
  const lastScoreObj = sortedScores[0]
  const lastScore = lastScoreObj?.score ?? 0
  const lastScoreDate = lastScoreObj?.dateAffection
    ? toDate(lastScoreObj.dateAffection).toLocaleDateString()
    : '-'
  // (objectif supprimé, pourcentage calculé sur le totalScore)

  // 2. Score de la semaine en cours
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay()) // dimanche
  startOfWeek.setHours(0, 0, 0, 0)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)
  const weekScore = sortedScores
    .filter((s) => {
      const d = toDate(s.dateAffection)
      return d && d >= startOfWeek && d < endOfWeek
    })
    .reduce((sum, s) => sum + (s.score || 0), 0)
  // (objectif supprimé, pourcentage calculé sur le totalScore)

  // 3. Score de la dernière semaine
  const startOfLastWeek = new Date(startOfWeek)
  startOfLastWeek.setDate(startOfWeek.getDate() - 7)
  const endOfLastWeek = new Date(startOfWeek)
  const lastWeekScore = sortedScores
    .filter((s) => {
      const d = toDate(s.dateAffection)
      return d && d >= startOfLastWeek && d < endOfLastWeek
    })
    .reduce((sum, s) => sum + (s.score || 0), 0)
  // (objectif supprimé, pourcentage calculé sur le totalScore)

  // 4. Score total (somme de tous les scores)
  const totalScore = sortedScores.reduce((sum, s) => sum + (s.score || 0), 0)
  // Pourcentage de chaque score par rapport au totalScore (plus grand value)
  const percentOf = (val) => (totalScore > 0 ? Math.round((val / totalScore) * 100) : 0)
  const lastScorePercent = percentOf(lastScore)
  const weekScorePercent = percentOf(weekScore)
  const lastWeekScorePercent = percentOf(lastWeekScore)
  const totalScorePercent = percentOf(totalScore) // sera toujours 100%
  return (
    <CCard className="mt-4">
      <CCardBody>
        <CRow>
          <CCol xs={3}>
            <CWidgetStatsB
              className="mb-3"
              color="primary"
              inverse
              progress={{ value: lastScorePercent }}
              text={t('scoreWidget.lastScore.text', {
                date: lastScoreDate,
                percent: lastScorePercent,
              })}
              title={t('scoreWidget.lastScore.title')}
              value={lastScore || '-'}
            />
          </CCol>
          <CCol xs={3}>
            <CWidgetStatsB
              className="mb-3"
              color="danger"
              inverse
              progress={{ value: weekScorePercent }}
              text={t('scoreWidget.weekScore.text', { percent: weekScorePercent })}
              title={t('scoreWidget.weekScore.title')}
              value={weekScore || '-'}
            />
          </CCol>
          <CCol xs={3}>
            <CWidgetStatsB
              className="mb-3"
              color="info"
              inverse
              progress={{ value: lastWeekScorePercent }}
              text={t('scoreWidget.lastWeekScore.text', { percent: lastWeekScorePercent })}
              title={t('scoreWidget.lastWeekScore.title')}
              value={lastWeekScore || '-'}
            />
          </CCol>
          <CCol xs={3}>
            <CWidgetStatsB
              className="mb-3"
              color="success"
              inverse
              progress={{ value: totalScorePercent }}
              text={t('scoreWidget.totalScore.text', { percent: totalScorePercent })}
              title={t('scoreWidget.totalScore.title')}
              value={totalScore || '-'}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}
UserScoreWidgetStats.propTypes = {
  forMe: PropTypes.bool.isRequired,
}

export default UserScoreWidgetStats
