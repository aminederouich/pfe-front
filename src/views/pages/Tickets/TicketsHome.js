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
  CIcon,
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
} from '@coreui/react'
import { cilDataTransferDown } from '@coreui/icons'
import { getAllTicketAPI, toggleCreateTicketModalOpen } from '../../../actions/ticketActions'

const Tickets = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isFirstRender = useRef(true)
  const { ticketList, loading } = useSelector((state) => state.ticket)

  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

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
    content += tickets.map((ticket) => [
      ticket.configId ? 'External' : 'Internal',
      ticket.key,
      ticket.fields.summary,
      ticket.fields.status.name,
      ticket.fields.assignee?.displayName || 'Unassigned',
      ticket.fields.reporter?.displayName || 'Unknown',
    ].join('\t')).join('\n')

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

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner size="sm" />

      </div>
    )
  }

  return (
    <CContainer>
      <CRow className="mb-3">
        <CCol sm={6}>
          <h4 className="fw-bold">My Tickets</h4>
        </CCol>
        <CCol sm={6} className="text-end">
          <CDropdown>
            <CDropdownToggle color="light">
              <CIcon icon={cilDataTransferDown} className="me-2" /> Export
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => exportToXML(filteredTickets)}>Export as XML</CDropdownItem>
              <CDropdownItem onClick={() => exportToWord(filteredTickets)}>Export as Word</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <CButton color="primary" className="ms-2" onClick={handleClickAjouterTicket}>
            Create
          </CButton>
        </CCol>
      </CRow>

      {/* Filters */}
      <CRow className="mb-3 align-items-end">
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
          <CFormSelect label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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
          <CFormInput label="Contains text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </CCol>
        <CCol md={1}>
          <CButton color="primary">Search</CButton>
        </CCol>
      </CRow>

      {/* Ticket Table */}
      <CTable bordered hover responsive align="middle">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell scope="col">Origin</CTableHeaderCell>
            <CTableHeaderCell scope="col">Key</CTableHeaderCell>
            <CTableHeaderCell scope="col">Summary</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Assignee</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reporter</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredTickets.map((ticket, index) => (
            <CTableRow
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => handleRowClick(ticket)}
            >
              <CTableDataCell>
                <CBadge color={ticket.configId ? 'info' : 'secondary'} shape="rounded-pill">
                  {ticket.configId ? 'External' : 'Internal'}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>{ticket.key}</CTableDataCell>
              <CTableDataCell>{ticket.fields.summary}</CTableDataCell>
              <CTableDataCell>
                <CBadge color={getStatusColor(ticket.fields.status.name)}>
                  {ticket.fields.status.name.toUpperCase()}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>{ticket.fields.assignee?.displayName || 'Unassigned'}</CTableDataCell>
              <CTableDataCell>{ticket.fields.reporter?.displayName || 'Unknown'}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  )
}

// Fonction pour colorer selon le statut
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'à faire':
    case 'todo':
      return 'secondary'
    case 'in progress':
    case 'en cours':
      return 'warning'
    case 'done':
    case 'terminé':
    case 'closed':
      return 'success'
    default:
      return 'light'
  }
}

export default Tickets
