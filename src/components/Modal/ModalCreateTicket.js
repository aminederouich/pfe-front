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
// import EpicIssueForm from './ModalBody/EpicIssueForm' // À créer si nécessaire
import { projects, issueTypes } from '../../utils/TicketsConsts'
import { emptyIssue } from '../../utils/emptyIssue'

const ModalCreateTicket = () => {
  const { isCreateTicketModalOpen } = useSelector((state) => state.ticket)
  const location = useLocation()
  const [project, setProject] = useState(projects[0].value)
  const [issueType, setIssueType] = useState(issueTypes[0].value)
  const [newIssue, setNewIssue] = useState(emptyIssue)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()

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
          name: projects.find((p) => p.value === project)?.label || project,
        },
      },
    }))
  }, [isCreateTicketModalOpen, project])

  useEffect(() => {
    setNewIssue((prevIssue) => {
      let updatedIssue = { ...prevIssue }

      switch (issueType) {
        case 'Bug':
          updatedIssue.fields.issuetype = {
            id: '10002',
            name: 'Bug',
            description: 'Un problème ou une erreur.',
            iconUrl:
              'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
            hierarchyLevel: 0,
            subtask: false,
          }
          break
        case 'Task':
          updatedIssue.fields.issuetype = {
            id: '10001',
            name: 'Tâche',
            description: 'Une tâche distincte.',
            iconUrl:
              'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
            hierarchyLevel: 0,
            subtask: false,
          }
          break
        case 'Story':
          updatedIssue.fields.issuetype = {
            id: '10003',
            name: 'Story',
            description: "Une fonctionnalité exprimée sous forme d'objectif utilisateur.",
            iconUrl:
              'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
            hierarchyLevel: 0,
            subtask: false,
          }
          break
        case 'Epic':
          updatedIssue.fields.issuetype = {
            id: '10004',
            name: 'Epic',
            description: 'Une collection de tâches, bugs ou stories.',
            iconUrl:
              'https://sesame-team-pfe.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium',
            hierarchyLevel: 1,
            subtask: false,
          }
          break
        default:
          break
      }

      return updatedIssue
    })
  }, [issueType])

  return (
    <CModal visible={isCreateTicketModalOpen} onClose={handleClose} backdrop="static" size="lg" scrollable>
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
              <CFormSelect
                value={project}
                onChange={(event) => setProject(event.target.value)}
                aria-describedby="project-help"
              >
                {projects.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              <small id="project-help" className="form-text text-muted">
                Veuillez sélectionner votre projet
              </small>
            </CCol>
          </CRow>

          {project === 'externe' && (
            <CRow className="mb-3">
              <CCol md={3}>
                <CFormLabel className="fw-bold">Lien externe*</CFormLabel>
              </CCol>
              <CCol md={9}>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://exemple.com"
                  value={newIssue.fields.externalLink || ''}
                  onChange={(e) =>
                    setNewIssue((prev) => ({
                      ...prev,
                      fields: { ...prev.fields, externalLink: e.target.value },
                    }))
                  }
                />
                <small className="form-text text-muted">
                  Veuillez renseigner le lien externe lié à ce ticket.
                </small>
              </CCol>
            </CRow>
          )}

          <CRow className="mb-3">
            <CCol md={3}>
              <CFormLabel className="fw-bold">Type d&apos;issue*</CFormLabel>
            </CCol>
            <CCol md={5}>
              <CFormSelect
                value={issueType}
                onChange={(event) => setIssueType(event.target.value)}
                aria-describedby="issue-type-help"
              >
                {issueTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              <small id="issue-type-help" className="form-text text-muted">
                Veuillez sélectionner le type d&apos;issue
              </small>
            </CCol>
          </CRow>
        </CForm>

        <hr />

        {issueType === 'Bug' && <BugIssueForm newIssue={newIssue} setNewIssue={setNewIssue} />}
        {issueType === 'Task' && <TaskIssueForm newIssue={newIssue} setNewIssue={setNewIssue} />}
        {issueType === 'Story' && <StoryIssueForm newIssue={newIssue} setNewIssue={setNewIssue} />}
        {issueType === 'Epic' && (
          <div className="alert alert-info">Formulaire Epic à implémenter</div>
        )}
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
