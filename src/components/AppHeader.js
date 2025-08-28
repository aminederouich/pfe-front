import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
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
import { switchThemeMode } from '../actions/appActions'
import { toggleCreateTicketModalOpen } from '../actions/ticketActions'
import Logo from '../assets/images/logoh.png'

const AppHeader = () => {
  const { t, i18n } = useTranslation()
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.data)
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()

  // Liste des routes où on cache le menu utilisateur
  const hideUserHeaderRoutes = ['/reset-password', '/login', '/register']

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const switchColorMode = (color) => {
    dispatch(switchThemeMode(color))
  }

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
          {/* <CNavItem>
            <CNavLink>{t('welcome')}</CNavLink>
          </CNavItem> */}
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/employees/list" as={NavLink}>
              Employees
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/projet/list" as={NavLink}>
              Projects
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/tickets/list" as={NavLink}>
              Tickets
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
                Créer
              </CButton>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          {/* On affiche le menu utilisateur seulement si on n'est PAS sur une route à cacher */}
          {!hideUserHeaderRoutes.includes(location.pathname) &&
            (user !== null && user.user.IsEmployee && !user.user.IsManager ? (
              <AppHeaderDropdown />
            ) : user !== null && !user.user.IsEmployee && user.user.IsManager ? (
              <AppHeaderDropdownManager />
            ) : null)}
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
