import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CBadge,
  CButton,
  CCol,
  CContainer,
  CFormSelect,
  CFormInput,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilDataTransferDown } from '@coreui/icons'
import { getAllTicketAPI, toggleCreateTicketModalOpen } from '../../../actions/ticketActions'
import { useTranslation } from 'react-i18next'

const Tickets = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isFirstRender = useRef(true)
  const { ticketList, loading } = useSelector((state) => state.ticket)

  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllTicketAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  const handleClickAjouterTicket = (event) => {
    event.preventDefault()
    dispatch(toggleCreateTicketModalOpen())
  }

  const handleRowClick = (ticket) => {
    navigate(`/ticket/${ticket.key}`)
  }

  const exportToXML = (tickets) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<tickets>'
    tickets.forEach((ticket) => {
      xml += `\n  <ticket>`
      xml += `\n    <origin>${ticket.configId ? 'External' : 'Internal'}</origin>`
      xml += `\n    <key>${ticket.key}</key>`
      xml += `\n    <summary>${ticket.fields.summary}</summary>`
      xml += `\n    <status>${ticket.fields.status.name}</status>`
      xml += `\n    <assignee>${ticket.fields.assignee?.displayName || 'Unassigned'}</assignee>`
      xml += `\n    <reporter>${ticket.fields.reporter?.displayName || 'Unknown'}</reporter>`
      xml += `\n  </ticket>`
    })
    xml += '\n</tickets>'

    const blob = new Blob([xml], { type: 'application/xml' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'tickets.xml'
    link.click()
  }

  const exportToWord = (tickets) => {
    let content = 'Origin\tKey\tSummary\tStatus\tAssignee\tReporter\n'
    content += tickets
      .map((ticket) =>
        [
          ticket.configId ? 'External' : 'Internal',
          ticket.key,
          ticket.fields.summary,
          ticket.fields.status.name,
          ticket.fields.assignee?.displayName || 'Unassigned',
          ticket.fields.reporter?.displayName || 'Unknown',
        ].join('\t'),
      )
      .join('\n')

    const blob = new Blob([content], { type: 'application/msword' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'tickets.doc'
    link.click()
  }

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

  // Fonctions de pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value))
    setCurrentPage(1) // Reset à la première page
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

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner size="3rem" />
      </div>
    )
  }
  return (
    <CContainer>
      <CRow>
        <CCol sm={9}>
          <h2>{t('ticketPage.title')}</h2>
          <p className="text-medium-emphasis">{t('ticketPage.description')}</p>
        </CCol>
        <CCol sm={3} className="text-end">
          {/* <CDropdown>
            <CDropdownToggle color="light">
              <CIcon icon={cilDataTransferDown} className="me-2" /> Export
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => exportToXML(filteredTickets)}>
                Export as XML
              </CDropdownItem>
              <CDropdownItem onClick={() => exportToWord(filteredTickets)}>
                Export as Word
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
          <CButton color="primary" className="ms-2" onClick={handleClickAjouterTicket}>
            {t('ticketPage.actions.add')}
          </CButton>
        </CCol>
      </CRow>

      {/* Filters */}
      {/* <CRow className="mb-3 align-items-end">
        <CCol md={2}>
          <CFormSelect label="Support" defaultValue="All">
            <option>All</option>
            <option>4YOU</option>
            <option>Other</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormSelect label="Issue Type" defaultValue="All">
            <option>All</option>
            <option>Bug</option>
            <option>Task</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormSelect
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="To do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormSelect label="Assignee" defaultValue="me">
            <option value="me">Current User</option>
            <option value="all">All</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormInput
            label="Contains text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </CCol>
        <CCol md={1}>
          <CButton color="primary">Search</CButton>
        </CCol>
      </CRow> */}
      <CTable hover responsive align="middle" small>
        <CTableBody>
          {currentTickets.map((ticket, index) => (
            <CTableRow
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => handleRowClick(ticket)}
            >
              <CTableDataCell>
                <CBadge color={ticket.configId ? 'info' : 'secondary'} shape="rounded-pill">
                  {ticket.configId
                    ? t('ticketPage.fields.external')
                    : t('ticketPage.fields.internal')}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <img src={ticket.fields.issuetype?.iconUrl} alt={ticket.fields.issuetype?.name} />
              </CTableDataCell>
              <CTableDataCell>{ticket.key}</CTableDataCell>
              <CTableDataCell>{ticket.fields.summary}</CTableDataCell>
              <CTableDataCell>
                <CBadge
                  color={getStatusColor(ticket.fields.status?.statusCategory?.key || '')}
                  shape="rounded-pill"
                >
                  {ticket.fields.status.name}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <img src={ticket.fields.priority?.iconUrl} alt={ticket.fields.priority?.name} />
              </CTableDataCell>
              <CTableDataCell>{ticket.fields.assignee?.displayName || 'Unassigned'}</CTableDataCell>
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
                <option value="5">5</option>
                <option value="10">10</option>
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
    </CContainer>
  )
}

export default Tickets
