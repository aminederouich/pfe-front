import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
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
} from '@coreui/react'
import { addNewTicketAPI, toggleCreateTicketModalClose } from '../../actions/ticketActions'
import BugIssueForm from './ModalBody/BugIssueForm'
import TaskIssueForm from './ModalBody/TaskIssueForm'
import StoryIssueForm from './ModalBody/StoryIssueForm'
import { projects, issueTypes } from '../../utils/TicketsConsts'
import { emptyIssue } from '../../utils/emptyIssue'
import { getEnabledConfigJiraAPI } from '../../actions/jiraActions'

const ModalCreateTicket = () => {
  const { isCreateTicketModalOpen } = useSelector((state) => state.ticket)
  const location = useLocation()
  const [project, setProject] = useState(projects[0].value)
  const [issueType, setIssueType] = useState(issueTypes[0].value)
  const [newIssue, setNewIssue] = useState(emptyIssue)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  const jiraConfigList = useSelector((state) => state.jira.jiraConfigList)

  const getProjectFromPath = () => {
    const pathSegments = location.pathname.split('/')
    const projectCodeFromPath = pathSegments.find((segment) =>
      projects.some(
        (p) => p.value === segment || p.label.toLowerCase().includes(segment.toLowerCase()),
      ),
    )
    if (projectCodeFromPath) {
      const foundProject = projects.find(
        (p) =>
          p.value === projectCodeFromPath ||
          p.label.toLowerCase().includes(projectCodeFromPath.toLowerCase()),
      )
      return foundProject ? foundProject.value : projects[0].value
    }
    return projects[0].value
  }

  const handleClose = () => {
    setNewIssue(emptyIssue)
    setProject(projects[0].value)
    setIssueType(issueTypes[0].value)
    setIsSubmitting(false)
    dispatch(toggleCreateTicketModalClose())
  }

  const handleSubmitTicket = async () => {
    if (project === 'externe') {
      window.open(newIssue.fields.externalLink, '_blank')
      handleClose()
    } else {
      if (!newIssue.fields?.summary?.trim()) {
        alert('Le résumé est obligatoire')
        return
      }

      if (project === 'externe' && !newIssue.fields?.externalLink?.trim()) {
        alert('Le lien externe est obligatoire pour un projet externe.')
        return
      }

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
  }

  const generateId = () => {
    let id = ''
    for (let i = 0; i < 8; i++) {
      id += Math.floor(Math.random() * 10)
    }
    return id
  }

  useEffect(() => {
    if (isCreateTicketModalOpen) {
      const projectFromPath = getProjectFromPath()
      setProject(projectFromPath)
    }
  }, [isCreateTicketModalOpen, location.pathname])

  useEffect(() => {
    const now = new Date().toISOString()
    const selectedHost = (() => {
      try {
        return newIssue.fields.externalLink
          ? new URL(newIssue.fields.externalLink).host
          : projects.find((p) => p.value === project)?.label || project
      } catch {
        return projects.find((p) => p.value === project)?.label || project
      }
    })()

    setNewIssue((prevIssue) => ({
      ...prevIssue,
      id: generateId(),
      fields: {
        ...prevIssue.fields,
        created: now,
        lastViewed: now,
        updated: now,
        statuscategorychangedate: now,
        project: {
          key: project,
          name: selectedHost,
        },
      },
    }))
  }, [isCreateTicketModalOpen, project, newIssue.fields.externalLink])

  useEffect(() => {
    if (project !== 'externe') {
      setNewIssue((prevIssue) => {
        let updatedIssue = { ...prevIssue }
        switch (issueType) {
          case 'Bug':
            updatedIssue.fields.issuetype = {
              id: '10002',
              name: 'Bug',
              description: 'Un problème ou une erreur.',
              subtask: false,
            }
            break
          case 'Task':
            updatedIssue.fields.issuetype = {
              id: '10001',
              name: 'Tâche',
              description: 'Une tâche distincte.',
              subtask: false,
            }
            break
          case 'Story':
            updatedIssue.fields.issuetype = {
              id: '10003',
              name: 'Story',
              description: 'Une fonctionnalité utilisateur.',
              subtask: false,
            }
            break
          case 'Epic':
            updatedIssue.fields.issuetype = {
              id: '10004',
              name: 'Epic',
              description: 'Une collection d’issues.',
              subtask: false,
            }
            break
          default:
            break
        }
        return updatedIssue
      })
    }
  }, [issueType, project])

  useEffect(() => {
    if (project === 'externe') {
      dispatch(getEnabledConfigJiraAPI())
    }
  }, [project, dispatch])

  return (
    <CModal
      visible={isCreateTicketModalOpen}
      onClose={handleClose}
      backdrop="static"
      size="lg"
      scrollable
    >
      <CModalHeader>
        <CModalTitle>Créer un nouveau ticket</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCallout color="info" className="mb-3">
          Les champs obligatoires sont marqués d&apos;un astérisque *
        </CCallout>

        <CForm>
          <CRow className="mb-3">
            <CCol md={3}>
              <CFormLabel className="fw-bold">Projet*</CFormLabel>
            </CCol>
            <CCol md={5}>
              <CFormSelect value={project} onChange={(e) => setProject(e.target.value)}>
                {projects.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          {project === 'externe' ? (
            <CRow className="mb-3">
              <CCol md={3}>
                <CFormLabel className="fw-bold">Configuration Jira*</CFormLabel>
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
                  <option value="">-- Sélectionnez une configuration Jira --</option>
                  {jiraConfigList.map((conf) => (
                    <option key={conf.id} value={`${conf.protocol}://${conf.host}`}>
                      {conf.host} ({conf.username})
                    </option>
                  ))}
                </CFormSelect>
                <small className="form-text text-muted">
                  Veuillez sélectionner une configuration Jira.
                </small>
              </CCol>
            </CRow>
          ) : (
            <>
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormLabel className="fw-bold">Type d&apos;issue*</CFormLabel>
                </CCol>
                <CCol md={5}>
                  <CFormSelect value={issueType} onChange={(e) => setIssueType(e.target.value)}>
                    {issueTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              <hr />

              {issueType === 'Bug' && (
                <BugIssueForm newIssue={newIssue} setNewIssue={setNewIssue} />
              )}
              {issueType === 'Task' && (
                <TaskIssueForm newIssue={newIssue} setNewIssue={setNewIssue} />
              )}
              {issueType === 'Story' && (
                <StoryIssueForm newIssue={newIssue} setNewIssue={setNewIssue} />
              )}
              {issueType === 'Epic' && (
                <div className="alert alert-info">Formulaire Epic à implémenter</div>
              )}
            </>
          )}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose} disabled={isSubmitting}>
          Annuler
        </CButton>
        <CButton color="primary" onClick={handleSubmitTicket} disabled={isSubmitting}>
          {isSubmitting ? 'Création...' : 'Créer'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalCreateTicket
