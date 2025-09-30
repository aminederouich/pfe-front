import React from 'react'
import { useLocation, matchPath } from 'react-router-dom'
import routes from '../routes'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { useTranslation } from 'react-i18next'

const AppBreadcrumb = () => {
  const location = useLocation()
  const currentLocation = location.pathname

  const { t } = useTranslation()

  const getRouteName = (pathname, routes) => {
    for (const route of routes) {
      const match = matchPath({ path: route.path, end: true }, pathname)
      if (match) {
        // Prefer translation key if provided
        if (route.tKey) return t(route.tKey)
        return route.name
      }
    }
    return null
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    const pathnames = location.split('/').filter(Boolean)

    pathnames.reduce((prevPath, currSegment, index) => {
      const currentPath = `${prevPath}/${currSegment}`.replace(/\/+/g, '/')
      const routeName = getRouteName(currentPath, routes)

      if (routeName) {
        breadcrumbs.push({
          pathname: currentPath,
          name: routeName,
          active: index === pathnames.length - 1,
        })
      }

      return currentPath
    }, '')

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">{t('routes.home')}</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => (
        <CBreadcrumbItem
          key={index}
          {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
        >
          {breadcrumb.name}
        </CBreadcrumbItem>
      ))}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
