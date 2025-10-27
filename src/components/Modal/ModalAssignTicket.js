import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCol,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'

import {
  toggleAssignTicketModalClose,
  updateAssignTicketInJiraAPI,
  updateTicketAPI,
} from '../../actions/ticketActions'
import { emptyIssue } from '../../utils/emptyIssue'
import { getAllUsersAPI } from '../../actions/userActions'
import { toast } from 'react-toastify'
import { getConfigJiraByIdAPI } from '../../actions/jiraActions'

const ModalAssignTicket = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { isAssignTicketModalOpen, ticketSelected } = useSelector((state) => state.ticket)
  const { user } = useSelector((state) => state.auth)
  const { usersList } = useSelector((state) => state.user)

  const [editIssue, setEditIssue] = useState(emptyIssue)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAssigneeChange = (event) => {
    const selectedUser = event.target.value
    const userObj = usersList.find((option) => option.uid === selectedUser) || {}

    setEditIssue({
      ...editIssue,
      fields: {
        assignee: {
          emailAddress: userObj.email,
          accountId: userObj.uid,
          jiraId: userObj.jiraId,
          displayName: userObj.firstName + ' ' + userObj.lastName,
          accountType: 'takeit',
          timeZone: 'Etc/GMT-1',
          active: true,
        },
      },
    })
  }

  const handleMeAssignee = () => {
    if (user) {
      setEditIssue({
        ...editIssue,
        fields: {
          assignee: {
            emailAddress: user.user.email,
            accountId: user.user.uid,
            displayName: user.user.firstName + ' ' + user.user.lastName,
            accountType: 'takeit',
            timeZone: 'Etc/GMT-1',
            active: true,
          },
        },
      })
    }
  }

  const handleClose = () => {
    setIsSubmitting(false)
    dispatch(toggleAssignTicketModalClose())
  }

  const handleSubmitTicket = async () => {
    setIsSubmitting(true)
    if (editIssue.configId.length > 0) {
      try {
        const assignee = editIssue.fields.assignee || {}
        const { jiraId } = assignee
        const config = await dispatch(getConfigJiraByIdAPI(editIssue.configId))
        const updateTicket = await dispatch(
          updateAssignTicketInJiraAPI(editIssue.key, jiraId, config.data.data),
        )
        toast.success(updateTicket.message)
        handleClose()
      } catch (error) {
        toast.error(t('modal.assignTicket.errors.createFailed'))
      } finally {
        setIsSubmitting(false)
      }
    } else {
      console.log('else')
      try {
        await dispatch(updateTicketAPI(editIssue))
        handleClose()
      } catch (error) {
        console.error(t('modal.assignTicket.errors.createFailed'), error)
        toast.error(t('modal.assignTicket.errors.createFailed'))
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  useEffect(() => {
    dispatch(getAllUsersAPI())
  }, [dispatch])

  useEffect(() => {
    if (ticketSelected) {
      setEditIssue(ticketSelected)
    }
  }, [ticketSelected])
  return (
    <CModal
      visible={isAssignTicketModalOpen}
      onClose={handleClose}
      backdrop="static"
      size="lg"
      scrollable
    >
      <CModalHeader>
        <CModalTitle>{t('modal.assignTicket.title')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mt-3">
          <CRow className="mb-3">
            <CCol md={3}>
              <CFormLabel className="fw-bold">{t('modal.fields.assignee')}</CFormLabel>
            </CCol>
            <CCol md={6}>
              <CFormSelect
                value={editIssue.fields?.assignee?.accountId}
                defaultValue={user.user.uid}
                disabled={user.user.IsEmployee}
                onChange={handleAssigneeChange}
                aria-describedby="assignee-help"
              >
                {!user.user.IsEmployee && (
                  <option key="-1" value="-1">
                    {t('modal.fields.nonAssigned')}
                  </option>
                )}
                {usersList.map((option) => (
                  <option key={option.uid} value={option.uid}>
                    {option.firstName} {option.lastName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CButton
                color="primary"
                variant="outline"
                onClick={() => handleMeAssignee()}
                disabled={isSubmitting || user.user.IsEmployee}
              >
                {t('modal.actions.assigneeToMe')}
              </CButton>
            </CCol>
          </CRow>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose} disabled={isSubmitting}>
          {t('modal.actions.cancel')}
        </CButton>
        <CButton color="primary" onClick={handleSubmitTicket} disabled={isSubmitting}>
          {isSubmitting ? (
            <CSpinner animation="border" size="sm" />
          ) : (
            t('modal.assignTicket.submit')
          )}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAssignTicket
