import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormSelect,
  CPagination,
  CPaginationItem,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilCommentBubble, cilPen } from '@coreui/icons'
import {
  getAllTicketAPI,
  ticketToView,
  toggleEditTicketModalOpen,
  updateTicketAPI,
} from '../../../actions/ticketActions'
import { t } from 'i18next'
import { status } from '../../../utils/TicketsConsts'
import { toast } from 'react-toastify'
import { calculateScoreTicketDoneAPI } from '../../../actions/scoreAction'

const TicketView = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Récupérer le ticket depuis le store
  const { ticketList, ticketSelected, loading } = useSelector((state) => state.ticket)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  // Pour l'édition du summary au hover
  const [isEditingSummary, setIsEditingSummary] = useState(false)
  const [ticket, setTicket] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    const ticketSelected = ticketList.find((t) => t.id === code)
    setTicket(ticketSelected)
  }, [code, ticketList])

  useEffect(() => {
    // Si le ticket n'est pas dans la liste, vous pourriez faire un appel API
    if (!ticket && !loading) {
      console.log('Récupération du ticket:', code)
    }
  }, [code, ticket, loading, dispatch])
  const filteredTickets = ticketList.filter((ticket) => {
    const summaryMatch = ticket.fields.summary.toLowerCase().includes(searchText.toLowerCase())
    const statusName = ticket.fields.status.name.toLowerCase()

    const statusMatch =
      statusFilter === 'All' ||
      (statusFilter === 'To do' && ['à faire', 'todo'].includes(statusName)) ||
      (statusFilter === 'In Progress' && ['en cours', 'in progress'].includes(statusName)) ||
      (statusFilter === 'Done' && ['terminé(e)', 'done', 'closed'].includes(statusName))

    return summaryMatch && statusMatch
  })
  // Logique de pagination
  const totalItems = filteredTickets.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTickets = filteredTickets.slice(startIndex, endIndex)

  const handleRowClick = (ticket) => {
    dispatch(ticketToView(ticket))
    navigate(`/ticket/${ticket.id}`)
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value))
    setCurrentPage(1) // Reset à la première page
  }

  const handleGoBack = () => {
    navigate('/tickets')
  }
  const handleEditTicket = () => {
    dispatch(toggleEditTicketModalOpen())
  }
  // Fonctions de pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner />
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

  // Fonction pour colorer selon le statut
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'secondary'
      case 'indeterminate':
        return 'warning'
      case 'done':
        return 'success'
      default:
        return 'dark'
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

  const handleEditTicketField = async (ticket, editValue, field) => {
    const ticketUpdated = {
      ...ticket,
      fields: { [field]: editValue },
    }
    const res = await dispatch(updateTicketAPI(ticketUpdated))
    if (res?.data?.success) {
      toast.success('Ticket mis à jour avec succès')

      const tickets = await dispatch(getAllTicketAPI())
      if (tickets?.data?.results) {
        if (field === 'status') {
          dispatch(calculateScoreTicketDoneAPI(ticket.id))
        }
      }
    }
  }

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm={3}>
          <CCard>
            <CTable hover responsive align="middle" small>
              <CTableBody>
                {currentTickets.map((ticket, index) => (
                  <CTableRow
                    color={ticket.id === code ? 'secondary' : undefined}
                    // hover={ticket.id === ticketSelected}
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(ticket)}
                  >
                    <CTableDataCell style={{ width: '5%' }}>
                      <CBadge color={ticket.configId ? 'info' : 'secondary'} shape="rounded-pill">
                        {ticket.configId
                          ? t('ticketPage.fields.external')
                          : t('ticketPage.fields.internal')}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell style={{ width: '5%' }}>
                      <img
                        src={ticket.fields.issuetype?.iconUrl}
                        alt={ticket.fields.issuetype?.name}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {ticket.fields.summary.length > 40
                        ? ticket.fields.summary.slice(0, 40) + '...'
                        : ticket.fields.summary}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Contrôles de pagination inférieurs */}
            {totalPages > 1 && (
              <CRow>
                <CCol sm={3}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">{t('ticketPage.other.show')}</span>
                    <CFormSelect
                      size="sm"
                      style={{ width: 'auto' }}
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                    >
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </CFormSelect>
                    <span className="ms-2">{t('ticketPage.other.elementsPerPage')}</span>
                  </div>
                </CCol>

                <CCol sm={6}>
                  <CPagination className="justify-content-center" size="sm">
                    <CPaginationItem
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      &lt;
                    </CPaginationItem>

                    {/* Génération des numéros de page */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Afficher seulement quelques pages autour de la page actuelle
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                      ) {
                        return (
                          <CPaginationItem
                            key={page}
                            active={page === currentPage}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </CPaginationItem>
                        )
                      } else if (page === currentPage - 3 || page === currentPage + 3) {
                        return (
                          <CPaginationItem key={page} disabled>
                            ...
                          </CPaginationItem>
                        )
                      }
                      return null
                    })}

                    <CPaginationItem
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      &gt;
                    </CPaginationItem>
                  </CPagination>
                </CCol>
              </CRow>
            )}
          </CCard>
        </CCol>
        <CCol lg={9}>
          <CRow>
            <CCol lg={8}>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <CCol sm={11}>
                      <CRow>
                        <h7 className="mb-0">
                          {ticket.key} / {ticket.id}
                        </h7>
                      </CRow>
                      <CRow>
                        <h2 className="mb-3">{ticket.fields?.summary}</h2>
                      </CRow>
                    </CCol>
                    <CCol sm={1} className="d-flex justify-content-end align-items-start">
                      <CBadge
                        color={ticket.configId ? 'primary' : 'secondary'}
                        shape="rounded-pill"
                      >
                        {ticket.configId ? 'Externe' : 'Interne'}
                      </CBadge>
                    </CCol>
                  </CRow>
                  <CCol>
                    <CButton
                      color="secondary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditTicket()}
                    >
                      <CIcon icon={cilPen} /> Edit
                    </CButton>
                    <CButton color="secondary" size="sm" className="me-2">
                      <CIcon icon={cilCommentBubble} /> Add Comment
                    </CButton>
                    <CButton color="secondary" size="sm" className="me-1">
                      Assign
                    </CButton>

                    <CDropdown variant="btn-group" className="ms-1">
                      <CButton
                        color={getStatusColor(ticket.fields?.status?.statusCategory.key)}
                        size="sm"
                      >
                        {ticket.fields?.status?.name}
                      </CButton>
                      <CDropdownToggle
                        size="sm"
                        split
                        color={getStatusColor(ticket.fields?.status?.statusCategory.key)}
                      />
                      <CDropdownMenu>
                        {status.map((stat, index) => (
                          <CDropdownItem
                            key={index}
                            onClick={() => {
                              handleEditTicketField(ticket, stat, 'status')
                            }}
                          >
                            {stat.name}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                  <h5 className="mt-2">Details</h5>
                  <CRow>
                    <CCol sm={2} className="fw-bold">
                      Type:
                    </CCol>
                    <CCol sm={4}>
                      <img
                        src={ticket.fields?.issuetype?.iconUrl}
                        alt={ticket.fields?.issuetype?.name}
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                      />
                      {ticket.fields?.issuetype?.name}
                    </CCol>
                    <CCol sm={2} className="fw-bold">
                      Resolution:
                    </CCol>
                    <CCol sm={4}>
                      {ticket.fields?.resolution?.name ? (
                        <CBadge color="success">{ticket?.fields?.resolution?.name}</CBadge>
                      ) : (
                        'Unresolved'
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={2} className="fw-bold">
                      Priorité:
                    </CCol>
                    <CCol sm={10}>
                      <img
                        src={ticket.fields?.priority?.iconUrl}
                        alt={ticket.fields?.priority?.name}
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                      />
                      {ticket.fields?.priority?.name}
                    </CCol>
                  </CRow>

                  {/* {ticket.fields?.issuetype && (
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
                  )} */}

                  {/* Informations supplémentaires */}
                  {/* {ticket.fields?.environment && (
                    <div className="mb-3">
                      <h6>Environnement</h6>
                      <p className="text-muted">{ticket.fields.environment}</p>
                    </div>
                  )} */}

                  {/* {ticket.fields?.components && ticket.fields.components.length > 0 && (
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
                  )} */}

                  {/* {ticket.fields?.labels && ticket.fields.labels.length > 0 && (
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
                  )} */}

                  {/* {ticket.fields?.fixVersions && ticket.fields.fixVersions.length > 0 && (
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
                  )} */}

                  {/* {ticket.fields?.affectedVersions && ticket.fields.affectedVersions.length > 0 && (
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
                  )} */}
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
                          <CTableDataCell>
                            {formatDate(ticket.fields.resolutiondate)}
                          </CTableDataCell>
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
                      <h6 className="mb-0">
                        Commentaires ({ticket.fields.comment.comments.length})
                      </h6>
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
                              <small className="text-muted ms-2">
                                {formatDate(comment.created)}
                              </small>
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
          {ticket.changelog &&
            ticket.changelog.histories &&
            ticket.changelog.histories.length > 0 && (
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
                              <small className="text-muted ms-2">
                                {formatDate(history.created)}
                              </small>
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
                            <strong>{link.inwardIssue.key}</strong> -{' '}
                            {link.inwardIssue.fields?.summary}
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
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default TicketView
