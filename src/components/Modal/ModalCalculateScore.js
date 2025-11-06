import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CBadge,
  CButton,
  CFormCheck,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPagination,
  CPaginationItem,
  CTab,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import {
  calculateScoreTicketsListAPI,
  getAllScores,
  toggleCalculateScoreModalClose,
} from '../../actions/scoreAction'
import { calculateWeeklyScores } from '../../actions/weeklyTopScoresActions'
const ITEMS_PER_PAGE = 10 // Nombre d'éléments par page pour la pagination
const ModalCalculateScore = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { isCalculateScoreModalOpen, allScores } = useSelector((state) => state.score)
  const { ticketList } = useSelector((state) => state.ticket)

  const [currentPage, setCurrentPage] = useState(1)
  // Liste des IDs des tickets sélectionnés
  const [selectedTicketIds, setSelectedTicketIds] = useState([]) // [ticket.id]

  // Date sélectionnée (un jour de la semaine cible)
  const [selectedWeekDate, setSelectedWeekDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState(2)

  // Logique de pagination
  const totalItems = ticketList.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentTickets = ticketList.slice(startIndex, endIndex)

  // Fonctions de pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const handleClose = () => {
    dispatch(toggleCalculateScoreModalClose())
  }

  // Toggle sélection d'un ticket par ID
  const toggleTicketSelection = (ticketId) => {
    setSelectedTicketIds((prev) =>
      prev.includes(ticketId) ? prev.filter((id) => id !== ticketId) : [...prev, ticketId],
    )
  }

  const checkhaveScore = (ticketId) => {
    {
      return allScores.some((score) => score.ticketId === ticketId)
    }
  }

  // --- Gestion des tickets par semaine ---
  const getWeekRange = (date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    const day = d.getDay() // 0 dimanche, 1 lundi, ...
    const diffToMonday = day === 0 ? -6 : 1 - day // ramener à lundi
    const monday = new Date(d)
    monday.setDate(d.getDate() + diffToMonday)
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    return { start: monday, end: sunday }
  }

  const weekRange = getWeekRange(selectedWeekDate)

  const weekTickets = ticketList.filter((ticket) => {
    const createdStr = ticket?.fields?.created
    if (!createdStr) return false
    const createdDate = new Date(createdStr)
    return createdDate >= weekRange.start && createdDate <= weekRange.end
  })

  const isAllWeekSelected =
    weekTickets.length > 0 && weekTickets.every((t) => selectedTicketIds.includes(t.id))

  const toggleSelectAllWeek = () => {
    if (isAllWeekSelected) {
      setSelectedTicketIds((prev) => prev.filter((id) => !weekTickets.some((t) => t.id === id)))
    } else {
      setSelectedTicketIds((prev) => {
        const toAdd = weekTickets.map((t) => t.id).filter((id) => !prev.includes(id))
        return [...prev, ...toAdd]
      })
    }
  }

  useEffect(() => {
    if (isCalculateScoreModalOpen) dispatch(getAllScores())
    // Réinitialiser la sélection quand le modal se ferme
    if (!isCalculateScoreModalOpen) setSelectedTicketIds([])
  }, [dispatch, isCalculateScoreModalOpen])

  const handleCalculateScores = () => {
    if (activeTab === 1) {
      // Calcul des scores pour la liste des IDs sélectionnés
      console.log('Calculating scores for ticket IDs:', selectedTicketIds)
      dispatch(calculateScoreTicketsListAPI(selectedTicketIds)).then(() => {
        dispatch(getAllScores())
      })
    } else if (activeTab === 2) {
      // Calcul des scores pour les tickets de la semaine sélectionnée
      const weekTicketIds = weekTickets.map((t) => t.id)
      console.log('Calculating scores for week ticket IDs:', weekTicketIds)
      dispatch(calculateScoreTicketsListAPI(weekTicketIds)).then(() => {
        dispatch(getAllScores())
        dispatch(calculateWeeklyScores(weekRange.start, weekRange.end))
      })
    }
  }

  return (
    <CModal
      visible={isCalculateScoreModalOpen}
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
          <CTabs activeItemKey={activeTab}>
            <CTabList variant="tabs" layout="fill">
              <CTab aria-controls="home-tab-pane" itemKey={1} onClick={() => setActiveTab(1)}>
                <strong>par Ticket</strong>
              </CTab>
              <CTab aria-controls="profile-tab-pane" itemKey={2} onClick={() => setActiveTab(2)}>
                <strong>par Semaine</strong>
              </CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel className="py-3" aria-labelledby="home-tab-pane" itemKey={1}>
                <CTable hover responsive align="middle">
                  <CTableBody>
                    {currentTickets.map((ticket, index) => (
                      <CTableRow
                        key={index}
                        style={{ cursor: 'pointer' }}
                        color={checkhaveScore(ticket.id) ? 'success' : 'danger'}
                        onClick={() => toggleTicketSelection(ticket.id)}
                      >
                        <CTableDataCell style={{ width: '5%' }}>
                          <CFormCheck
                            id={`ticket-select-${ticket.id}`}
                            checked={selectedTicketIds.includes(ticket.id)}
                            onChange={(e) => {
                              e.stopPropagation()
                              toggleTicketSelection(ticket.id)
                            }}
                          />
                        </CTableDataCell>
                        <CTableDataCell style={{ width: '5%' }}>
                          <CBadge
                            color={ticket.configId ? 'info' : 'secondary'}
                            shape="rounded-pill"
                          >
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
                        {/* <CTableDataCell style={{ width: '5%' }}>{ticket.key}</CTableDataCell> */}
                        <CTableDataCell style={{ width: '15%' }}>{ticket.id}</CTableDataCell>
                        <CTableDataCell>
                          {ticket.fields.summary.length > 40
                            ? ticket.fields.summary.slice(0, 40) + ' ...'
                            : ticket.fields.summary}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
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
              </CTabPanel>
              <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" itemKey={2}>
                <div className="mb-3">
                  <Calendar
                    onChange={(value) => setSelectedWeekDate(value)}
                    value={selectedWeekDate}
                    locale="fr-FR"
                    showWeekNumbers
                    onClickWeekNumber={(weekNumber, date) => {
                      // 'date' fourni par react-calendar correspond au début de la semaine (lundi)
                      setSelectedWeekDate(date)
                    }}
                    tileClassName={({ date, view }) => {
                      if (view === 'month') {
                        if (date >= weekRange.start && date <= weekRange.end) {
                          return 'week-selected'
                        }
                      }
                      return null
                    }}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    <strong>Semaine:</strong> {weekRange.start.toLocaleDateString()} -{' '}
                    {weekRange.end.toLocaleDateString()} ({weekTickets.length} tickets)
                  </div>
                  <CButton
                    size="sm"
                    color={isAllWeekSelected ? 'danger' : 'primary'}
                    disabled={!weekTickets.length}
                    onClick={toggleSelectAllWeek}
                  >
                    {isAllWeekSelected
                      ? 'Retirer tous les tickets'
                      : 'Sélectionner tous les tickets'}
                  </CButton>
                </div>
                <CTable hover responsive align="middle">
                  <CTableBody>
                    {weekTickets.length === 0 && (
                      <CTableRow>
                        <CTableDataCell colSpan={5} className="text-center">
                          Aucun ticket pour cette semaine.
                        </CTableDataCell>
                      </CTableRow>
                    )}
                    {weekTickets.map((ticket, index) => (
                      <CTableRow
                        key={`week-${index}`}
                        style={{ cursor: 'pointer' }}
                        color={checkhaveScore(ticket.id) ? 'success' : 'danger'}
                        onClick={() => toggleTicketSelection(ticket.id)}
                      >
                        <CTableDataCell style={{ width: '5%' }}>
                          <CFormCheck
                            id={`week-ticket-select-${ticket.id}`}
                            checked={selectedTicketIds.includes(ticket.id)}
                            onChange={(e) => {
                              e.stopPropagation()
                              toggleTicketSelection(ticket.id)
                            }}
                          />
                        </CTableDataCell>
                        <CTableDataCell style={{ width: '5%' }}>
                          <CBadge
                            color={ticket.configId ? 'info' : 'secondary'}
                            shape="rounded-pill"
                          >
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
                        <CTableDataCell style={{ width: '15%' }}>{ticket.id}</CTableDataCell>
                        <CTableDataCell>
                          {ticket.fields.summary.length > 40
                            ? ticket.fields.summary.slice(0, 40) + ' ...'
                            : ticket.fields.summary}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CTabPanel>
            </CTabContent>
          </CTabs>
          <div className="d-grid gap-2">
            <CButton
              color="primary"
              onClick={handleCalculateScores}
              disabled={!selectedTicketIds.length}
            >
              calculer les score des ticket selectionner
            </CButton>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>
          {t('modal.actions.cancel')}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalCalculateScore
