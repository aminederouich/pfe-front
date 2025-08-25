import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCallout,
  CFormInput,
} from '@coreui/react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Editor } from '@tinymce/tinymce-react'
import { useTranslation } from 'react-i18next'

import { addNewTicketAPI, toggleCreateTicketModalClose } from '../../actions/ticketActions'
import { projects, Prioritys, issuetype, status } from '../../utils/TicketsConsts'
import { emptyIssue } from '../../utils/emptyIssue'
import { getAllConfigJiraAPI } from '../../actions/jiraActions'
import { getAllProjectAPI } from '../../actions/projectActions'

const ModalCreateTicket = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { isCreateTicketModalOpen } = useSelector((state) => state.ticket)
  const { projectList } = useSelector((state) => state.project)
  const { jiraConfigList } = useSelector((state) => state.jira)
  const { user } = useSelector((state) => state.auth)

  const [projectType, setProjectType] = useState(projects[0].value)
  const [projectName, setProjectName] = useState('')
  const [newIssue, setNewIssue] = useState(emptyIssue)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEditorChange = (content) => {
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        description: content,
      },
    })
  }

  const handleChangeIssueType = (selectedId) => {
    const selectedType = issuetype.find((option) => option.id === selectedId)
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        issuetype: selectedType || {},
      },
    })
  }

  const handleChangeSummary = (event) => {
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        summary: event.target.value,
      },
    })
  }

  const handlePriorityChange = (event) => {
    const selectedPriority = event.target.value
    const priorityObj = Prioritys.find((option) => option.id === selectedPriority) || {}
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        priority: priorityObj,
      },
    })
  }

  const handleStartDateChange = (date) => {
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        customfield_10015: date ? date : null,
      },
    })
  }

  const handleEndDateChange = (date) => {
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        duedate: date ? date : null,
      },
    })
  }

  const handleClose = () => {
    setNewIssue(emptyIssue)
    setProjectType('')
    setIsSubmitting(false)
    dispatch(toggleCreateTicketModalClose())
  }

  const handleSubmitTicket = async () => {
    if (!newIssue.fields?.summary?.trim()) {
      alert('Le résumé est obligatoire')
      return
    }

    // Traitement des projets externes
    if (projectType === 'externe') {
      if (!newIssue.fields?.externalLink?.trim()) {
        alert('Le lien externe est obligatoire pour un projet externe.')
        return
      }
      window.open(newIssue.fields.externalLink, '_blank')
      handleClose()
      return
    }

    // Traitement des projets internes
    setIsSubmitting(true)
    try {
      await dispatch(addNewTicketAPI(newIssue))
      handleClose()
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error)
      alert('Erreur lors de la création du ticket')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateId = () => {
    const timestamp = Date.now()
    const randomNum = Math.floor(Math.random() * 1000000)
    return `${timestamp}${randomNum}`
  }

  useEffect(() => {
    const now = new Date().toISOString()
    setNewIssue((prevIssue) => {
      let newKey = projectType
      if (projectType === 'externe') {
        newKey = 'externe'
      }
      return {
        ...prevIssue,
        id: generateId(),
        key: newKey,
        fields: {
          ...prevIssue.fields,
          status: status[0],
          statusCategory: status[0].statusCategory,
          customfield_10015: now,
          created: now,
          lastViewed: now,
          updated: now,
          statuscategorychangedate: now,
          creator: {
            displayName: `${user.user.FirstName} ${user.user.LastName}`,
            timeZone: 'Etc/GMT-1',
            accountType: 'takeit',
            active: true,
            emailAddress: user.user.email,
            self: '',
            accountId: user.user.uid,
          },
          reporter: {
            self: '',
            emailAddress: user.user.email,
            accountType: 'takeit',
            accountId: user.user.uid,
            timeZone: 'Etc/GMT-1',
            active: true,
            displayName: `${user.user.FirstName} ${user.user.LastName}`,
          },
        },
      }
    })
  }, [isCreateTicketModalOpen, projectType, user])

  useEffect(() => {
    if (projectType === 'externe') {
      dispatch(getAllConfigJiraAPI())
    }
    if (projectType === 'interne') {
      dispatch(getAllProjectAPI())
    }
  }, [projectType, dispatch])

  useEffect(() => {
    if (projectName && projectName !== '-1') {
      const selectedProject = projectList.find((p) => p.projectName === projectName)
      if (selectedProject) {
        setNewIssue((prev) => ({
          ...prev,
          key: selectedProject.key,
          fields: {
            ...prev.fields,
            project: {
              id: selectedProject.id,
              name: selectedProject.projectName,
              key: selectedProject.key,
              projectTypeKey: selectedProject.projectType,
            },
          },
        }))
      }
    }
  }, [projectName, projectType, projectList])

  return (
    <CModal
      visible={isCreateTicketModalOpen}
      onClose={handleClose}
      backdrop="static"
      size="lg"
      scrollable
    >
      <CModalHeader>
        <CModalTitle>{t('modal.title')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCallout color="info" className="mb-3">
          {t('modal.description')}
        </CCallout>

        <CForm>
          <CRow className="mb-3">
            <CCol md={3}>
              <CFormLabel className="fw-bold">{t('modal.fields.projectType')}</CFormLabel>
            </CCol>
            <CCol md={5}>
              <CFormSelect
                value={projectType}
                onChange={(event) => setProjectType(event.target.value)}
                aria-describedby="project-help"
              >
                {projects.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              <small id="project-help" className="form-text text-muted">
                {t('modal.fieldsHelper.project')}
              </small>
            </CCol>
          </CRow>

          {projectType === 'externe' ? (
            <CRow className="mb-3">
              <CCol md={3}>
                <CFormLabel className="fw-bold">{t('modal.fields.configJira')}</CFormLabel>
              </CCol>
              <CCol md={9}>
                <CFormSelect
                  value={newIssue.fields.externalLink || ''}
                  onChange={(e) => {
                    const selectedUrl = e.target.value
                    const selectedHost = new URL(selectedUrl).host
                    setNewIssue((prev) => ({
                      ...prev,
                      fields: {
                        ...prev.fields,
                        externalLink: selectedUrl,
                        summary: selectedHost,
                        project: {
                          key: 'externe',
                          name: selectedHost,
                        },
                      },
                    }))
                  }}
                >
                  <option value="">{t('modal.fieldsHelper.configJira')}</option>
                  {jiraConfigList.map((conf) => (
                    <option key={conf.id} value={`${conf.protocol}://${conf.host}`}>
                      {conf.host} ({conf.username})
                    </option>
                  ))}
                </CFormSelect>
                <small className="form-text text-muted">
                  {t('modal.fieldsHelper.configJiraHelper')}
                </small>
              </CCol>
            </CRow>
          ) : (
            <>
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormLabel className="fw-bold">{t('modal.fields.projectName')}</CFormLabel>
                </CCol>
                <CCol md={5}>
                  <CFormSelect value={projectName} onChange={(e) => setProjectName(e.target.value)}>
                    <option key="-1" value="-1"></option>
                    {projectList.map((option) => (
                      <option key={option.key} value={option.projectName}>
                        {option.projectName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormLabel className="fw-bold">{t('modal.fields.issueType')}</CFormLabel>
                </CCol>
                <CCol md={5}>
                  <CFormSelect
                    value={newIssue.fields.issuetype.id}
                    onChange={(e) => handleChangeIssueType(e.target.value)}
                  >
                    <option key="-1" value="-1"></option>
                    {issuetype.map(
                      (option) =>
                        option.scope.type === 'INTERNE' && (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ),
                    )}
                  </CFormSelect>
                </CCol>
              </CRow>
              <hr />
              <div className="mt-3">
                <CRow className="mb-3">
                  <CCol md={3}>
                    <CFormLabel className="fw-bold">{t('modal.fields.summary')}</CFormLabel>
                  </CCol>
                  <CCol md={9}>
                    <CFormInput
                      type="text"
                      placeholder={t('modal.fieldsHelper.summary')}
                      value={newIssue.fields.summary || ''}
                      onChange={(event) => handleChangeSummary(event)}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={3}>
                    <CFormLabel className="fw-bold">{t('modal.fields.description')}</CFormLabel>
                  </CCol>
                  <CCol md={9}>
                    <Editor
                      apiKey="pgeao7zzbo9u4uoozk1nlccidje7yemdafe1egcax1afrsz8"
                      initialValue=""
                      init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link charmap preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table code help wordcount',
                        ],
                        toolbar:
                          'undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={3}>
                    <CFormLabel className="fw-bold">{t('modal.fields.priority')}</CFormLabel>
                  </CCol>
                  <CCol md={9}>
                    <CFormSelect
                      value={newIssue.fields.priority.id}
                      onChange={handlePriorityChange}
                      aria-describedby="priority-help"
                    >
                      {Prioritys.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <small id="priority-help" className="form-text text-muted">
                      {t('modal.fieldsHelper.priority')}
                    </small>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={3}>
                    <CFormLabel className="fw-bold">{t('modal.fields.startDate')}</CFormLabel>
                  </CCol>
                  <CCol md={9}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={new Date(newIssue.fields.customfield_10015)}
                        onChange={handleStartDateChange}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: 'outlined',
                            size: 'small',
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={3}>
                    <CFormLabel className="fw-bold">{t('modal.fields.endDate')}</CFormLabel>
                  </CCol>
                  <CCol md={9}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={new Date(newIssue.fields.duedate)}
                        onChange={handleEndDateChange}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: 'outlined',
                            size: 'small',
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </CCol>
                </CRow>
              </div>
            </>
          )}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose} disabled={isSubmitting}>
          {t('modal.actions.cancel')}
        </CButton>
        <CButton color="primary" onClick={handleSubmitTicket} disabled={isSubmitting}>
          {isSubmitting ? t('modal.actions.creating') : t('modal.actions.create')}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalCreateTicket
