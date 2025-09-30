import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem,
  useColorModes,
  CButton,
  CImage,
  CNavbarBrand,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown, AppHeaderDropdownManager } from './header/index'
import { toggleCreateTicketModalOpen } from '../actions/ticketActions'
import Logo from '../assets/images/logoh.png'

const AppHeader = () => {
  const { t, i18n } = useTranslation()
  const headerRef = useRef()
  const { setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.data)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  useEffect(() => {
    setColorMode(theme)
  }, [theme, setColorMode])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CNavbarBrand>
          <CImage src={Logo} alt="Logo" height={45} />
        </CNavbarBrand>
        <CHeaderNav className="d-none d-md-flex ms-4">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              {t('header.nav.dashboard')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/employees/list" as={NavLink}>
              {t('header.nav.employees')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/projet/list" as={NavLink}>
              {t('header.nav.projects')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/tickets/list" as={NavLink}>
              {t('header.nav.tickets')}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        {/* Sélecteur de langue */}
        <CHeaderNav>
          <CNavItem>
            <CButton
              color={i18n.language === 'fr' ? 'secondary' : 'light'}
              size="sm"
              onClick={() => i18n.changeLanguage('fr')}
              className="me-2"
            >
              FR
            </CButton>
          </CNavItem>
          <CNavItem>
            <CButton
              color={i18n.language === 'en' ? 'secondary' : 'light'}
              size="sm"
              onClick={() => i18n.changeLanguage('en')}
            >
              EN
            </CButton>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink onClick={() => dispatch(toggleCreateTicketModalOpen())}>
              <CButton color="primary " size="sm">
                {t('header.actions.create')}
              </CButton>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#"
              aria-label={t('header.actions.notifications')}
              title={t('header.actions.notifications')}
            >
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#"
              aria-label={t('header.actions.tasks')}
              title={t('header.actions.tasks')}
            >
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#"
              aria-label={t('header.actions.messages')}
              title={t('header.actions.messages')}
            >
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          {user !== null && user.user.isEmployee && !user.user.isManager ? (
            <AppHeaderDropdown />
          ) : user !== null && !user.user.isEmployee && user.user.isManager ? (
            <AppHeaderDropdownManager />
          ) : null}
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
