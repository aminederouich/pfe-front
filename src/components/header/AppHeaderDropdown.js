import React from 'react'
import {
  CDropdownDivider,
  CDropdownToggle,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CAvatar,
  CBadge,
  CCol,
} from '@coreui/react'
import {
  cilCommentSquare,
  cilAccountLogout,
  cilEnvelopeOpen,
  cilCreditCard,
  cilSettings,
  cilBell,
  cilFile,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/homme_00.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/authActions'
import { useTranslation } from 'react-i18next'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { user } = useSelector((state) => state.auth)
  const handleLogout = async (e) => {
    e.preventDefault()
    await dispatch(logout())
    // await dispatch(checkAuthentication())
  }
  return (
    <CDropdown variant="nav-item">
      <CCol className="d-flex align-items-center">
        <div className="fw-semibold">{user.user.displayName}</div>
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar
            src={user?.user?.avatarUrls ? user.user.avatarUrls['48x48'] : avatar8}
            size="md"
            alt="avatar"
          />
        </CDropdownToggle>
      </CCol>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          {t('header.dropdown.account')}
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          {t('header.dropdown.updates')}
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          {t('header.dropdown.messages')}
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          {t('header.dropdown.tasks')}
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          {t('header.dropdown.comments')}
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
          {t('header.dropdown.settingsSection')}
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          {t('header.dropdown.profile')}
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          {t('header.dropdown.settings')}
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          {t('header.dropdown.logout')}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
