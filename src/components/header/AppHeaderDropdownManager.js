import React from 'react'
import {
  CDropdownDivider,
  CDropdownToggle,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CAvatar,
  CCol,
} from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/homme_00.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../actions/authActions'
import { toggleAddUserModalOpen } from '../../actions/userActions'
import { useTranslation } from 'react-i18next'
import { calculateWeeklyScores } from '../../actions/weeklyTopScoresActions'

const AppHeaderDropdownManager = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { t } = useTranslation()

  const handleLogout = async (e) => {
    e.preventDefault()
    await dispatch(logout())
  }

  return (
    <>
      <CDropdown variant="nav-item">
        <CCol className="d-flex align-items-center">
          <div className="fw-semibold">{user?.user?.displayName || ''}</div>
          <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
            <CAvatar
              src={user?.user?.avatarUrls ? user.user.avatarUrls['48x48'] : avatar8}
              size="md"
              alt={t('header.dropdown.avatarAlt')}
            />
          </CDropdownToggle>
        </CCol>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
            {t('header.dropdown.settingsSection')}
          </CDropdownHeader>
          <CDropdownItem onClick={() => navigate('/jira/config-jira-api')}>
            {t('header.dropdown.jiraConfig')}
          </CDropdownItem>
          <CDropdownItem onClick={() => navigate('/rule/Config')}>
            {t('header.dropdown.rulesConfig')}
          </CDropdownItem>
          <CDropdownItem onClick={() => dispatch(calculateWeeklyScores())}>
            calculer les scores
          </CDropdownItem>
          <CDropdownItem onClick={() => dispatch(toggleAddUserModalOpen())}>
            {t('header.dropdown.addUser')}
          </CDropdownItem>

          <CDropdownDivider />
          <CDropdownItem onClick={handleLogout}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            {t('header.dropdown.logout')}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdownManager
