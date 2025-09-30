import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

// routes config
import routes from '../routes'

const AppContent = () => {
  const { t } = useTranslation()
  return (
    <div className="px-4">
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
            }}
            aria-label={t('loading')}
          >
            <CircularProgress size={24} color="primary" />
            <span style={{ fontSize: '0.9rem' }}>{t('loading')}</span>
          </div>
        }
      >
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
