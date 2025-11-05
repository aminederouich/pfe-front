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

import {
  calculateScoreTicketsListAPI,
  getAllScores,
  toggleCalculateScoreModalClose,
} from '../../actions/scoreAction'
const ITEMS_PER_PAGE = 10 // Nombre d'éléments par page pour la pagination
const ModalCalculateScore = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { isCalculateScoreModalOpen, allScores } = useSelector((state) => state.score)
  const { ticketList } = useSelector((state) => state.ticket)

  const [currentPage, setCurrentPage] = useState(1)
  // Liste des IDs des tickets sélectionnés
  const [selectedTicketIds, setSelectedTicketIds] = useState([]) // [ticket.id]
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

  useEffect(() => {
    if (isCalculateScoreModalOpen) dispatch(getAllScores())
    // Réinitialiser la sélection quand le modal se ferme
    if (!isCalculateScoreModalOpen) setSelectedTicketIds([])
  }, [dispatch, isCalculateScoreModalOpen])

  const handleCalculateScores = () => {
    // Calcul des scores pour la liste des IDs sélectionnés
    console.log('Calculating scores for ticket IDs:', selectedTicketIds)
    dispatch(calculateScoreTicketsListAPI(selectedTicketIds)).then(() => {
      dispatch(getAllScores())
    })
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
          <CTabs defaultActiveItemKey={1}>
            <CTabList variant="tabs" layout="fill">
              <CTab aria-controls="home-tab-pane" itemKey={1}>
                <strong>par Ticket</strong>
              </CTab>
              <CTab aria-controls="profile-tab-pane" itemKey={2}>
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
                Profile tab content
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
