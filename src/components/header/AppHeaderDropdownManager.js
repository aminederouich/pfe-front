import React, { useState } from 'react'
import AddEmployeeModal from '../../views/pages/employee/AddEmployeeModal'
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
  cilSettings,
  cilBell,
  cilTask,
  cilUser,
  cilChart,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/homme_00.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../actions/authActions'

const AppHeaderDropdownManager = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [visible, setVisible] = useState(false)

  const handleLogout = async (e) => {
    e.preventDefault()
    await dispatch(logout())
  }

  return (
    <>
      <CDropdown variant="nav-item">
        <CCol className="d-flex align-items-center">
          <div className="fw-semibold">
            {user.user.FirstName} {user.user.LastName}
          </div>
          <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
            <CAvatar src={avatar8} size="md" alt="avatar" />
          </CDropdownToggle>
        </CCol>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          {/* <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilBell} className="me-2" />
            Updates
            <CBadge color="info" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilEnvelopeOpen} className="me-2" />
            Messages
            <CBadge color="success" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilTask} className="me-2" />
            Tasks
            <CBadge color="danger" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilCommentSquare} className="me-2" />
            Comments
            <CBadge color="warning" className="ms-2">
              42
            </CBadge>
          </CDropdownItem> */}

          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Settings</CDropdownHeader>
          {/* <CDropdownItem href="#">Profile</CDropdownItem> */}
          {/* <CDropdownItem href="#">Settings</CDropdownItem> */}
          <CDropdownItem href="/jira/config-jira-api">configuration des jira API</CDropdownItem>
          {/* <CDropdownItem href="#">Projects</CDropdownItem> */}
          <CDropdownItem href="/rule/Config">configuration des rules</CDropdownItem>
          {/* ADD NEW visible uniquement si Manager */}
          {user?.user?.IsManager && (
            <CDropdownItem onClick={() => setVisible(true)}>Add New</CDropdownItem>
          )}

          <CDropdownDivider />
          <CDropdownItem onClick={handleLogout}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>

      {/* Modal d'ajout employé */}
      <AddEmployeeModal visible={visible} setVisible={setVisible} />
    </>
  )
}

export default AppHeaderDropdownManager
