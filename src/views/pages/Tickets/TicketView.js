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
  toggleAssignTicketModalOpen,
  updateTicketAPI,
} from '../../../actions/ticketActions'
import { status } from '../../../utils/TicketsConsts'
import { toast } from 'react-toastify'
import { calculateScoreTicketDoneAPI, getScoresByTicketIdAPI } from '../../../actions/scoreAction'
import { useTranslation } from 'react-i18next'
import { Editor } from '@tinymce/tinymce-react'

const TicketView = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Récupérer le ticket depuis le store
  const { ticketList, ticketSelected, loading } = useSelector((state) => state.ticket)
  const { scoreByTicketId } = useSelector((state) => state.score)

  // Pour l'édition du summary au hover
  // const [ticket, setTicket] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Met à jour le ticket affiché lorsqu'on change de ticket ou que la liste des tickets est modifiée
  useEffect(() => {
    const ticketSelectedFromList = ticketList.find((t) => t.id === code)
    // setTicket(ticketSelectedFromList)
    dispatch(ticketToView(ticketSelectedFromList))
    dispatch(getScoresByTicketIdAPI(ticketSelectedFromList.id))
  }, [code, dispatch, ticketList])

  // Logique de pagination
  const totalItems = ticketList.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTickets = ticketList.slice(startIndex, endIndex)

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

  if (!ticketSelected) {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CCard>
              <CCardBody className="text-center">
                <h4>{t('ticketPage.ticketView.notFound.title')}</h4>
                <p>{t('ticketPage.ticketView.notFound.message')}</p>
                <CButton color="primary" onClick={handleGoBack}>
                  <CIcon icon={cilArrowLeft} className="me-2" />
                  {t('ticketPage.ticketView.notFound.backButton')}
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
    let ticketUpdated = {}
    ticketUpdated = {
      ...ticket,
      fields: { [field]: editValue },
    }
    if (field === 'status') {
      if (editValue.name === 'Terminé(e)') {
        ticketUpdated = {
          ...ticket,
          fields: {
            ...ticketUpdated.fields,
            resolution: {
              id: '10000',
              self: 'https://sesame-team-pfe.atlassian.net/rest/api/2/resolution/10000',
              description: 'Ce ticket a été traité.',
              name: 'Terminé',
            },
            resolutiondate: new Date().toISOString(),
          },
        }
      }

      if (editValue.name !== 'Terminé(e)') {
        ticketUpdated = {
          ...ticket,
          fields: {
            ...ticketUpdated.fields,
            resolution: {},
            resolutiondate: null,
          },
        }
      }
    }
    const res = await dispatch(updateTicketAPI(ticketUpdated))
    if (res?.data?.success) {
      toast.success(t('ticketPage.other.updateSuccess'))

      const tickets = await dispatch(getAllTicketAPI())
      if (tickets?.data?.results) {
        if (field === 'status') {
          dispatch(calculateScoreTicketDoneAPI(ticket))
        }
      }
    }
  }

  const handleAssign = () => {
    dispatch(toggleAssignTicketModalOpen())
  }

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm={3}>
          <CCard>
            <CTable hover responsive align="middle">
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
                        ? ticket.fields.summary.slice(0, 40) + ' ...'
                        : ticket.fields.summary}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Contrôles de pagination inférieurs */}
            <CRow>
              <CCol sm={3}>
                <div className="d-flex align-items-center">
                  <span className="mx-2">{t('ticketPage.other.show')}</span>
                  <CFormSelect
                    size="sm"
                    style={{ width: 'auto' }}
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </CFormSelect>
                </div>
              </CCol>
              <CCol sm={9}>
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
                          {t('ticketPage.other.pagination')}
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
          </CCard>
        </CCol>
        <CCol sm={9}>
          <CRow>
            <CCol sm={8}>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <CCol sm={7}>
                      <CRow>
                        <small className="mb-0">
                          {ticketSelected.key} / {ticketSelected.id}
                        </small>
                      </CRow>
                      <CRow>
                        <h2 className="mb-3">{ticketSelected.fields?.summary}</h2>
                      </CRow>
                    </CCol>
                    <CCol sm={4}>
                      {scoreByTicketId?.score !== undefined ? (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                          }}
                        >
                          <CButton
                            color="info"
                            size="sm"
                            className="mb-0"
                            style={{
                              '--cui-btn-padding-y': '.1rem',
                              '--cui-btn-padding-x': '.5rem',
                              '--cui-btn-font-size': '.8rem',
                            }}
                            onClick={() => dispatch(calculateScoreTicketDoneAPI(ticketSelected))}
                          >
                            Recalculate
                          </CButton>
                          <small className="text-muted">
                            {t('ticketPage.ticketView.fields.score')}
                          </small>
                          <h4 className="mb-0">{scoreByTicketId?.score}</h4>
                        </div>
                      ) : (
                        <CButton
                          color="info"
                          size="sm"
                          className="mb-0"
                          style={{
                            '--cui-btn-padding-y': '.1rem',
                            '--cui-btn-padding-x': '.5rem',
                            '--cui-btn-font-size': '.8rem',
                          }}
                          onClick={() => dispatch(calculateScoreTicketDoneAPI(ticketSelected))}
                        >
                          calculate score
                        </CButton>
                      )}
                    </CCol>
                    <CCol sm={1} className="d-flex justify-content-end align-items-start">
                      <CBadge
                        color={ticketSelected.configId ? 'primary' : 'secondary'}
                        shape="rounded-pill"
                      >
                        {ticketSelected.configId
                          ? t('ticketPage.ticketView.values.external')
                          : t('ticketPage.ticketView.values.internal')}
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
                      <CIcon icon={cilPen} /> {t('ticketPage.ticketView.actions.edit')}
                    </CButton>
                    <CButton color="secondary" size="sm" className="me-2">
                      <CIcon icon={cilCommentBubble} />{' '}
                      {t('ticketPage.ticketView.actions.addComment')}
                    </CButton>
                    <CButton
                      color="secondary"
                      size="sm"
                      className="me-1"
                      onClick={() => handleAssign()}
                    >
                      {t('ticketPage.ticketView.actions.assign')}
                    </CButton>

                    <CDropdown variant="btn-group" className="ms-1">
                      <CButton
                        color={getStatusColor(ticketSelected.fields?.status?.statusCategory.key)}
                        size="sm"
                      >
                        {ticketSelected.fields?.status?.name}
                      </CButton>
                      <CDropdownToggle
                        size="sm"
                        split
                        color={getStatusColor(ticketSelected.fields?.status?.statusCategory.key)}
                      />
                      <CDropdownMenu>
                        {status.map((stat, index) => (
                          <CDropdownItem
                            key={index}
                            onClick={() => {
                              handleEditTicketField(ticketSelected, stat, 'status')
                            }}
                          >
                            {stat.name}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                  <h5 className="mt-2">{t('ticketPage.ticketView.sections.details')}</h5>
                  <CRow>
                    <CCol sm={2} className="fw-bold">
                      {t('ticketPage.ticketView.fields.type')}
                    </CCol>
                    <CCol sm={4}>
                      <img
                        src={ticketSelected.fields?.issuetype?.iconUrl}
                        alt={ticketSelected.fields?.issuetype?.name}
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                      />
                      {ticketSelected.fields?.issuetype?.name}
                    </CCol>
                    <CCol sm={2} className="fw-bold">
                      {t('ticketPage.ticketView.fields.resolution')}:
                    </CCol>
                    <CCol sm={4}>
                      {ticketSelected.fields?.resolution?.name ? (
                        <CBadge color="success">{ticketSelected?.fields?.resolution?.name}</CBadge>
                      ) : (
                        t('ticketPage.ticketView.values.unresolved')
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={2} className="fw-bold">
                      {t('ticketPage.ticketView.fields.priority')}
                    </CCol>
                    <CCol sm={10}>
                      <img
                        src={ticketSelected.fields?.priority?.iconUrl}
                        alt={ticketSelected.fields?.priority?.name}
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                      />
                      {ticketSelected.fields?.priority?.name}
                    </CCol>
                  </CRow>
                  <CRow>
                    <h5 className="mt-2">{t('ticketPage.ticketView.sections.description')}</h5>
                    <CCol sm={12}>
                      {ticketSelected.fields?.description ? (
                        <Editor
                          apiKey="pgeao7zzbo9u4uoozk1nlccidje7yemdafe1egcax1afrsz8"
                          initialValue={ticketSelected.fields.description}
                          inline
                          readonly
                          plugins={[
                            'advlist',
                            'anchor',
                            'autolink',
                            'charmap',
                            'code',
                            'fullscreen',
                            'help',
                            'image',
                            'insertdatetime',
                            'link',
                            'lists',
                            'media',
                            'preview',
                            'searchreplace',
                            'table',
                            'visualblocks',
                          ]}
                          toolbar="undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
                          init={{
                            menubar: false,
                          }}
                        />
                      ) : (
                        <em>{t('ticketPage.ticketView.values.noComments')}</em>
                      )}
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol sm={4}>
              <CCard>
                <CCardHeader>
                  <h6 className="mb-0">{t('ticketPage.ticketView.sections.detailsPanel')}</h6>
                </CCardHeader>
                <CCardBody>
                  <CTable small borderless>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell className="fw-bold">
                          {t('ticketPage.ticketView.fields.status')}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={getStatusColor(ticketSelected.fields?.status?.name)}>
                            {ticketSelected.fields?.status?.name || 'N/A'}
                          </CBadge>
                        </CTableDataCell>
                      </CTableRow>

                      {ticketSelected.fields?.priority && (
                        <CTableRow>
                          <CTableDataCell className="fw-bold">
                            {t('ticketPage.ticketView.fields.priority')}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CBadge color={getPriorityColor(ticketSelected.fields.priority.name)}>
                              {ticketSelected.fields.priority.name}
                            </CBadge>
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      <CTableRow>
                        <CTableDataCell className="fw-bold">
                          {t('ticketPage.ticketView.fields.assignedTo')}
                        </CTableDataCell>
                        {ticketSelected.fields?.assignee ? (
                          <CTableDataCell>
                            <div className="d-flex align-items-center">
                              {ticketSelected.fields.assignee.avatarUrls && (
                                <img
                                  src={ticketSelected.fields.assignee.avatarUrls['24x24']}
                                  alt={ticketSelected.fields.assignee.displayName}
                                  className="rounded-circle me-2"
                                  style={{ width: '24px', height: '24px' }}
                                />
                              )}
                              <div>
                                <div>{ticketSelected.fields.assignee.displayName}</div>
                              </div>
                            </div>
                          </CTableDataCell>
                        ) : (
                          <CTableDataCell>
                            <CBadge color="warning">
                              {t('ticketPage.ticketView.fields.assignedTo')}
                            </CBadge>
                          </CTableDataCell>
                        )}
                      </CTableRow>

                      {ticketSelected.fields?.reporter && (
                        <CTableRow>
                          <CTableDataCell className="fw-bold">
                            {t('ticketPage.ticketView.fields.reporter')}
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="d-flex align-items-center">
                              {/* {ticketSelected.fields.reporter.avatarUrls && (
                                <img
                                  src={ticketSelected.fields.reporter.avatarUrls['24x24']}
                                  alt={ticketSelected.fields.reporter.displayName}
                                  className="rounded-circle me-2"
                                  style={{ width: '24px', height: '24px' }}
                                />
                              )} */}
                              <div>
                                <div>{ticketSelected.fields.reporter.displayName}</div>
                                {/* {ticketSelected.fields.reporter.emailAddress && (
                                  <small className="text-muted">
                                    {ticketSelected.fields.reporter.emailAddress}
                                  </small>
                                )} */}
                              </div>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      {ticketSelected.fields?.project && (
                        <CTableRow>
                          <CTableDataCell className="fw-bold">
                            {t('ticketPage.ticketView.fields.project')}
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="d-flex align-items-center">
                              {/* {ticketSelected.fields.project.avatarUrls && (
                                <img
                                  src={ticketSelected.fields.project.avatarUrls['24x24']}
                                  alt={ticketSelected.fields.project.name}
                                  className="me-2"
                                  style={{ width: '20px', height: '20px' }}
                                />
                              )} */}
                              <div>
                                <div>{ticketSelected.fields.project.name}</div>
                                <small className="text-muted">
                                  {ticketSelected.fields.project.key}
                                </small>
                              </div>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      {ticketSelected.fields?.resolution && (
                        <CTableRow>
                          <CTableDataCell className="fw-bold">
                            {t('ticketPage.ticketView.fields.resolution')}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CBadge color="success">{ticketSelected.fields.resolution.name}</CBadge>
                            {ticketSelected.fields.resolution.description && (
                              <div>
                                <small className="text-muted">
                                  {ticketSelected.fields.resolution.description}
                                </small>
                              </div>
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      {ticketSelected.fields?.timeestimate && (
                        <CTableRow>
                          <CTableDataCell className="fw-bold">
                            {t('ticketPage.ticketView.fields.estimate')}
                          </CTableDataCell>
                          <CTableDataCell>
                            {Math.round(ticketSelected.fields.timeestimate / 3600)}{' '}
                            {t('ticketPage.ticketView.values.hours')}
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      {ticketSelected.fields?.timespent && (
                        <CTableRow>
                          <CTableDataCell className="fw-bold">
                            {t('ticketPage.ticketView.fields.timeSpent')}
                          </CTableDataCell>
                          <CTableDataCell>
                            {Math.round(ticketSelected.fields.timespent / 3600)}{' '}
                            {t('ticketPage.ticketView.values.hours')}
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      {ticketSelected.fields?.duedate && (
                        <CTableRow>
                          <CTableDataCell className="fw-bold">
                            {t('ticketPage.ticketView.fields.dueDate')}
                          </CTableDataCell>
                          <CTableDataCell>
                            <span
                              className={
                                new Date(ticketSelected.fields.duedate) < new Date()
                                  ? 'text-danger'
                                  : ''
                              }
                            >
                              {formatDate(ticketSelected.fields.duedate)}
                            </span>
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      {ticketSelected.fields?.resolutiondate && (
                        <CTableRow>
                          <CTableDataCell className="fw-bold">
                            {t('ticketPage.ticketView.fields.resolutionDate')}
                          </CTableDataCell>
                          <CTableDataCell>
                            {formatDate(ticketSelected.fields.resolutiondate)}
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      <CTableRow>
                        <CTableDataCell className="fw-bold">
                          {t('ticketPage.ticketView.fields.created')}
                        </CTableDataCell>
                        <CTableDataCell>
                          {formatDate(ticketSelected.fields?.created)}
                        </CTableDataCell>
                      </CTableRow>

                      <CTableRow>
                        <CTableDataCell className="fw-bold">
                          {t('ticketPage.ticketView.fields.updated')}
                        </CTableDataCell>
                        <CTableDataCell>
                          {formatDate(ticketSelected.fields?.updated)}
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default TicketView
