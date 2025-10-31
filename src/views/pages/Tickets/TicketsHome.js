import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CBadge,
  CButton,
  CCol,
  CContainer,
  CFormSelect,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import {
  getAllTicketAPI,
  ticketToView,
  toggleCreateTicketModalOpen,
  updateTicketAPI,
} from '../../../actions/ticketActions'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import { cilActionUndo, cilCheck, cilPen } from '@coreui/icons'
import { toast } from 'react-toastify'

const Tickets = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isFirstRender = useRef(true)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')
  const { ticketList, loading } = useSelector((state) => state.ticket)
  // const [hoveredIndex, setHoveredIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    if (isFirstRender.current) {
      if (!ticketList.length) {
        dispatch(getAllTicketAPI())
      }
      isFirstRender.current = false
    }
  }, [dispatch, ticketList.length])

  const handleClickAjouterTicket = (event) => {
    event.preventDefault()
    dispatch(toggleCreateTicketModalOpen())
  }

  const handleRowClick = (ticket) => {
    dispatch(ticketToView(ticket))
    navigate(`/ticket/${ticket.id}`)
  }

  // Logique de pagination
  const totalItems = ticketList.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTickets = ticketList.slice(startIndex, endIndex)

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

  const handleEditTicket = (e, ticket, editValue, field) => {
    e.stopPropagation()
    const ticketUpdated = {
      ...ticket,
      fields: { [field]: editValue },
    }
    dispatch(updateTicketAPI(ticketUpdated)).then((res) => {
      if (res?.data?.success) {
        toast.success(t('ticketPage.other.updateSuccess'))
        setTimeout(() => {
          dispatch(getAllTicketAPI())
        }, 1000)
        setEditIndex(null)
      }
    })
  }

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner />
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
          <CButton color="primary" className="ms-2" onClick={handleClickAjouterTicket}>
            {t('ticketPage.actions.add')}
          </CButton>
        </CCol>
      </CRow>
      <CTable hover responsive align="middle" small>
        <CTableBody>
          {currentTickets.map((ticket, index) =>
            Object.prototype.hasOwnProperty.call(ticket, 'fields') ? (
              <CTableRow
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
                  <img src={ticket.fields.issuetype?.iconUrl} alt={ticket.fields.issuetype?.name} />
                </CTableDataCell>
                <CTableDataCell>{ticket.key}</CTableDataCell>
                <CTableDataCell>
                  <div
                    tabIndex={0}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    {editIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={editValue}
                          autoFocus
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditIndex(null)
                          }}
                          style={{ flex: 1 }}
                        />
                        <CIcon
                          icon={cilCheck}
                          style={{ cursor: 'pointer', marginLeft: 8 }}
                          onClick={(e) => {
                            handleEditTicket(e, ticket, editValue, 'summary')
                          }}
                        />
                        <CIcon
                          icon={cilActionUndo}
                          style={{ cursor: 'pointer', marginLeft: 8 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditIndex(null)
                          }}
                        />
                      </>
                    ) : (
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditIndex(index)
                          setEditValue(ticket.fields.summary)
                        }}
                      >
                        {ticket.fields.summary}
                        {hoveredIndex === index && (
                          <CIcon
                            icon={cilPen}
                            style={{ cursor: 'pointer', marginLeft: 8 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditIndex(index)
                              setEditValue(ticket.fields.summary)
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </CTableDataCell>
                <CTableDataCell style={{ width: '12%' }}>
                  <CBadge
                    color={getStatusColor(ticket.fields.status?.statusCategory?.key || '')}
                    shape="rounded-pill"
                  >
                    {ticket.fields.status.name}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell style={{ width: '2%' }}>
                  <img
                    src={ticket.fields.priority?.iconUrl}
                    alt={ticket.fields.priority?.name}
                    style={{ width: '-webkit-fill-available' }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  {ticket.fields.assignee?.displayName || t('ticketPage.other.unassigned')}
                </CTableDataCell>
              </CTableRow>
            ) : null,
          )}
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
      )}
    </CContainer>
  )
}

export default Tickets
