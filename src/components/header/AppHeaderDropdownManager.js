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

const AppHeaderDropdownManager = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = async (e) => {
    e.preventDefault()
    await dispatch(logout())
  }

  return (
    <>
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
          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Settings</CDropdownHeader>
          <CDropdownItem onClick={() => navigate('/jira/config-jira-api')}>
            configuration des jira API
          </CDropdownItem>
          <CDropdownItem onClick={() => navigate('/rule/Config')}>
            configuration des rules
          </CDropdownItem>

          <CDropdownItem onClick={() => dispatch(toggleAddUserModalOpen())}>Add New</CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={handleLogout}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdownManager
