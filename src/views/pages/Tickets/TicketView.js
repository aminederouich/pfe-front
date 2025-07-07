import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import ticketService from '../../../services/ticketService'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilPencil } from '@coreui/icons'
import { toggleEditTicketModalOpen } from '../../../actions/ticketActions'

const TicketView = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Récupérer le ticket depuis le store
  const { ticketList, loading } = useSelector((state) => state.ticket)
  const ticket = ticketList.find((t) => t.key === code)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editedDescription, setEditedDescription] = useState(ticket?.fields?.description || '')
  const [visibleEditModal, setVisibleEditModal] = useState(false)

  useEffect(() => {
    // Si le ticket n'est pas dans la liste, vous pourriez faire un appel API
    if (!ticket && !loading) {
      console.log('Récupération du ticket:', code)
    }
  }, [code, ticket, loading, dispatch])

  const handleGoBack = () => {
    navigate('/tickets')
  }
  const handleEditTicket = () => {
    dispatch(toggleEditTicketModalOpen())
  }

  const handleSaveDescription = async () => {
    try {
      const updatedTicket = {
        ...ticket,
        fields: {
          ...ticket.fields,
          description: editedDescription, // 🔁 ici
        },
      }
      const response = await ticketService.updateTicket(ticket.key, updatedTicket)
      if (response.status === 200) {
        window.location.reload()

        setVisibleEditModal(false)
      } else {
        alert('Erreur lors de la mise à jour.')
      }
    } catch (error) {
      console.error('Erreur API updateTicket:', error)
      alert('Erreur serveur lors de la mise à jour.')
    }
  }

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner size="3rem" />
      </div>
    )
  }

  if (!ticket) {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CCard>
              <CCardBody className="text-center">
                <h4>Ticket non trouvé</h4>
                <p>Le ticket avec la clé &quot;{code}&quot; n&apos;a pas été trouvé.</p>
                <CButton color="primary" onClick={handleGoBack}>
                  <CIcon icon={cilArrowLeft} className="me-2" />
                  Retour à la liste
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'done':
      case 'terminé':
        return 'success'
      case 'in progress':
      case 'en cours':
        return 'warning'
      case 'to do':
      case 'à faire':
        return 'secondary'
      default:
        return 'primary'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'highest':
      case 'très haute':
        return 'danger'
      case 'high':
      case 'haute':
        return 'warning'
      case 'medium':
      case 'moyenne':
        return 'info'
      case 'low':
      case 'basse':
        return 'secondary'
      default:
        return 'primary'
    }
  }

  return (
    <CContainer>
      <CRow className="mb-4">
        <CCol>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <CButton variant="ghost" color="primary" onClick={handleGoBack} className="me-2">
                <CIcon icon={cilArrowLeft} className="me-1" />
                Retour
              </CButton>
              <span className="text-muted">/ Tickets / {ticket.key}</span>
            </div>
            <CButton color="primary" onClick={handleEditTicket}>
              <CIcon icon={cilPencil} className="me-2" />
              Éditer
            </CButton>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol lg={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{ticket.key}</h5>
                <CBadge color={ticket.configId ? 'primary' : 'secondary'} shape="rounded-pill">
                  {ticket.configId ? 'Externe' : 'Interne'}
                </CBadge>
              </div>
            </CCardHeader>
            <CCardBody>
              <h4 className="mb-3">{ticket.fields?.summary || 'Pas de résumé'}</h4>

              {/* Description modifiable */}
              <div className="mb-3">
                <h6>Description</h6>
                {isEditingDescription ? (
                  <textarea
                    className="form-control"
                    rows={4}
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    onBlur={() => setIsEditingDescription(false)}
                    autoFocus
                  />
                ) : (
                  <p
                    className="text-muted"
                    style={{ whiteSpace: 'pre-line', cursor: 'pointer' }}
                    onClick={() => setIsEditingDescription(true)}
                  >
                    {editedDescription || 'Cliquez pour ajouter une description'}
                  </p>
                )}
              </div>

              {ticket.fields?.issuetype && (
                <div className="mb-3">
                  <h6>Type d&apos;issue</h6>
                  <div className="d-flex align-items-center">
                    {ticket.fields.issuetype.iconUrl && (
                      <img
                        src={ticket.fields.issuetype.iconUrl}
                        alt={ticket.fields.issuetype.name}
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                      />
                    )}
                    <span>{ticket.fields.issuetype.name}</span>
                    {ticket.fields.issuetype.description && (
                      <span className="text-muted ms-2">
                        - {ticket.fields.issuetype.description}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Informations supplémentaires */}
              {ticket.fields?.environment && (
                <div className="mb-3">
                  <h6>Environnement</h6>
                  <p className="text-muted">{ticket.fields.environment}</p>
                </div>
              )}

              {ticket.fields?.components && ticket.fields.components.length > 0 && (
                <div className="mb-3">
                  <h6>Composants</h6>
                  <div>
                    {ticket.fields.components.map((component, index) => (
                      <CBadge key={index} color="info" className="me-1">
                        {component.name}
                      </CBadge>
                    ))}
                  </div>
                </div>
              )}

              {ticket.fields?.labels && ticket.fields.labels.length > 0 && (
                <div className="mb-3">
                  <h6>Labels</h6>
                  <div>
                    {ticket.fields.labels.map((label, index) => (
                      <CBadge key={index} color="secondary" className="me-1">
                        {label}
                      </CBadge>
                    ))}
                  </div>
                </div>
              )}

              {ticket.fields?.fixVersions && ticket.fields.fixVersions.length > 0 && (
                <div className="mb-3">
                  <h6>Versions de correction</h6>
                  <div>
                    {ticket.fields.fixVersions.map((version, index) => (
                      <CBadge key={index} color="success" className="me-1">
                        {version.name}
                      </CBadge>
                    ))}
                  </div>
                </div>
              )}

              {ticket.fields?.affectedVersions && ticket.fields.affectedVersions.length > 0 && (
                <div className="mb-3">
                  <h6>Versions affectées</h6>
                  <div>
                    {ticket.fields.affectedVersions.map((version, index) => (
                      <CBadge key={index} color="warning" className="me-1">
                        {version.name}
                      </CBadge>
                    ))}
                  </div>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={4}>
          <CCard>
            <CCardHeader>
              <h6 className="mb-0">Détails</h6>
            </CCardHeader>
            <CCardBody>
              <CTable small borderless>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell className="fw-bold">Statut</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={getStatusColor(ticket.fields?.status?.name)}>
                        {ticket.fields?.status?.name || 'N/A'}
                      </CBadge>
                    </CTableDataCell>
                  </CTableRow>

                  {ticket.fields?.priority && (
                    <CTableRow>
                      <CTableDataCell className="fw-bold">Priorité</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getPriorityColor(ticket.fields.priority.name)}>
                          {ticket.fields.priority.name}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {ticket.fields?.assignee && (
                    <CTableRow>
                      <CTableDataCell className="fw-bold">Assigné à</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex align-items-center">
                          {ticket.fields.assignee.avatarUrls && (
                            <img
                              src={ticket.fields.assignee.avatarUrls['24x24']}
                              alt={ticket.fields.assignee.displayName}
                              className="rounded-circle me-2"
                              style={{ width: '24px', height: '24px' }}
                            />
                          )}
                          <div>
                            <div>{ticket.fields.assignee.displayName}</div>
                            {ticket.fields.assignee.emailAddress && (
                              <small className="text-muted">
                                {ticket.fields.assignee.emailAddress}
                              </small>
                            )}
                          </div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {ticket.fields?.reporter && (
                    <CTableRow>
                      <CTableDataCell className="fw-bold">Rapporteur</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex align-items-center">
                          {ticket.fields.reporter.avatarUrls && (
                            <img
                              src={ticket.fields.reporter.avatarUrls['24x24']}
                              alt={ticket.fields.reporter.displayName}
                              className="rounded-circle me-2"
                              style={{ width: '24px', height: '24px' }}
                            />
                          )}
                          <div>
                            <div>{ticket.fields.reporter.displayName}</div>
                            {ticket.fields.reporter.emailAddress && (
                              <small className="text-muted">
                                {ticket.fields.reporter.emailAddress}
                              </small>
                            )}
                          </div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {ticket.fields?.project && (
                    <CTableRow>
                      <CTableDataCell className="fw-bold">Projet</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex align-items-center">
                          {ticket.fields.project.avatarUrls && (
                            <img
                              src={ticket.fields.project.avatarUrls['24x24']}
                              alt={ticket.fields.project.name}
                              className="me-2"
                              style={{ width: '20px', height: '20px' }}
                            />
                          )}
                          <div>
                            <div>{ticket.fields.project.name}</div>
                            <small className="text-muted">{ticket.fields.project.key}</small>
                          </div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {ticket.fields?.resolution && (
                    <CTableRow>
                      <CTableDataCell className="fw-bold">Résolution</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="success">{ticket.fields.resolution.name}</CBadge>
                        {ticket.fields.resolution.description && (
                          <div>
                            <small className="text-muted">
                              {ticket.fields.resolution.description}
                            </small>
                          </div>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {ticket.fields?.timeestimate && (
                    <CTableRow>
                      <CTableDataCell className="fw-bold">Estimation</CTableDataCell>
                      <CTableDataCell>
                        {Math.round(ticket.fields.timeestimate / 3600)} heures
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {ticket.fields?.timespent && (
                    <CTableRow>
                      <CTableDataCell className="fw-bold">Temps passé</CTableDataCell>
                      <CTableDataCell>
                        {Math.round(ticket.fields.timespent / 3600)} heures
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {ticket.fields?.duedate && (
                    <CTableRow>
                      <CTableDataCell className="fw-bold">Date d&apos;échéance</CTableDataCell>
                      <CTableDataCell>
                        <span
                          className={
                            new Date(ticket.fields.duedate) < new Date() ? 'text-danger' : ''
                          }
                        >
                          {formatDate(ticket.fields.duedate)}
                        </span>
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {ticket.fields?.resolutiondate && (
                    <CTableRow>
                      <CTableDataCell className="fw-bold">Date de résolution</CTableDataCell>
                      <CTableDataCell>{formatDate(ticket.fields.resolutiondate)}</CTableDataCell>
                    </CTableRow>
                  )}

                  <CTableRow>
                    <CTableDataCell className="fw-bold">Créé</CTableDataCell>
                    <CTableDataCell>{formatDate(ticket.fields?.created)}</CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell className="fw-bold">Mis à jour</CTableDataCell>
                    <CTableDataCell>{formatDate(ticket.fields?.updated)}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Section Commentaires */}
      {ticket.fields?.comment &&
        ticket.fields.comment.comments &&
        ticket.fields.comment.comments.length > 0 && (
          <CRow className="mt-4">
            <CCol>
              <CCard>
                <CCardHeader>
                  <h6 className="mb-0">Commentaires ({ticket.fields.comment.comments.length})</h6>
                </CCardHeader>
                <CCardBody>
                  {ticket.fields.comment.comments.map((comment, index) => (
                    <div key={index} className="mb-3 pb-3 border-bottom">
                      <div className="d-flex align-items-center mb-2">
                        {comment.author?.avatarUrls && (
                          <img
                            src={comment.author.avatarUrls['24x24']}
                            alt={comment.author.displayName}
                            className="rounded-circle me-2"
                            style={{ width: '24px', height: '24px' }}
                          />
                        )}
                        <div>
                          <strong>{comment.author?.displayName || 'Anonyme'}</strong>
                          <small className="text-muted ms-2">{formatDate(comment.created)}</small>
                        </div>
                      </div>
                      <div className="ps-4">
                        <p className="mb-0">{comment.body}</p>
                        {comment.updated && comment.updated !== comment.created && (
                          <small className="text-muted">
                            Modifié le {formatDate(comment.updated)}
                          </small>
                        )}
                      </div>
                    </div>
                  ))}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}

      {/* Section Historique */}
      {ticket.changelog && ticket.changelog.histories && ticket.changelog.histories.length > 0 && (
        <CRow className="mt-4">
          <CCol>
            <CCard>
              <CCardHeader>
                <h6 className="mb-0">Historique des modifications</h6>
              </CCardHeader>
              <CCardBody>
                {ticket.changelog.histories.slice(0, 10).map((history, index) => (
                  <div key={index} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex align-items-center mb-2">
                      {history.author?.avatarUrls && (
                        <img
                          src={history.author.avatarUrls['24x24']}
                          alt={history.author.displayName}
                          className="rounded-circle me-2"
                          style={{ width: '20px', height: '20px' }}
                        />
                      )}
                      <div>
                        <strong>{history.author?.displayName || 'Système'}</strong>
                        <small className="text-muted ms-2">{formatDate(history.created)}</small>
                      </div>
                    </div>
                    <div className="ps-4">
                      {history.items?.map((item, itemIndex) => (
                        <div key={itemIndex} className="small">
                          <strong>{item.field}</strong> modifié
                          {item.fromString && (
                            <span>
                              {' '}
                              de <span className="text-muted">{item.fromString}</span>
                            </span>
                          )}
                          {item.toString && (
                            <span>
                              {' '}
                              vers <span className="text-success">{item.toString}</span>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      {/* Section Liens et Relations */}
      {ticket.fields?.issuelinks && ticket.fields.issuelinks.length > 0 && (
        <CRow className="mt-4">
          <CCol>
            <CCard>
              <CCardHeader>
                <h6 className="mb-0">Tickets liés</h6>
              </CCardHeader>
              <CCardBody>
                {ticket.fields.issuelinks.map((link, index) => (
                  <div key={index} className="mb-2 d-flex align-items-center">
                    <CBadge color="info" className="me-2">
                      {link.type?.name || 'Lié'}
                    </CBadge>
                    {link.outwardIssue && (
                      <span>
                        <strong>{link.outwardIssue.key}</strong> -{' '}
                        {link.outwardIssue.fields?.summary}
                        <CBadge
                          color={getStatusColor(link.outwardIssue.fields?.status?.name)}
                          className="ms-2"
                        >
                          {link.outwardIssue.fields?.status?.name}
                        </CBadge>
                      </span>
                    )}
                    {link.inwardIssue && (
                      <span>
                        <strong>{link.inwardIssue.key}</strong> - {link.inwardIssue.fields?.summary}
                        <CBadge
                          color={getStatusColor(link.inwardIssue.fields?.status?.name)}
                          className="ms-2"
                        >
                          {link.inwardIssue.fields?.status?.name}
                        </CBadge>
                      </span>
                    )}
                  </div>
                ))}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      {/* Section Sous-tâches */}
      {ticket.fields?.subtasks && ticket.fields.subtasks.length > 0 && (
        <CRow className="mt-4">
          <CCol>
            <CCard>
              <CCardHeader>
                <h6 className="mb-0">Sous-tâches ({ticket.fields.subtasks.length})</h6>
              </CCardHeader>
              <CCardBody>
                <CTable hover responsive>
                  <CTableBody>
                    {ticket.fields.subtasks.map((subtask, index) => (
                      <CTableRow key={index} style={{ cursor: 'pointer' }}>
                        <CTableDataCell>
                          <img
                            src={subtask.fields?.issuetype?.iconUrl}
                            alt={subtask.fields?.issuetype?.name}
                            style={{ width: '16px', height: '16px', marginRight: '8px' }}
                          />
                          <strong>{subtask.key}</strong>
                        </CTableDataCell>
                        <CTableDataCell>{subtask.fields?.summary}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={getStatusColor(subtask.fields?.status?.name)}>
                            {subtask.fields?.status?.name}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          {subtask.fields?.assignee?.displayName || 'Non assigné'}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </CContainer>
  )
}

export default TicketView
