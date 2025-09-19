import React, { use, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CCollapse,
  CContainer,
  CRow,
  CTable,
  CSpinner,
} from '@coreui/react'

import {
  getAllProjectAPI,
  deleteProjectAPI,
  toggleEditProjectModalOpen,
} from '../../../actions/projectActions'
import AddNewProject from '../../../components/forms/addNewProject'
import { useTranslation } from 'react-i18next'

const columns = [
  {
    key: 'projectName',
    label: 'Project Name',
    _props: { scope: 'col' },
  },
  {
    key: 'key',
    label: 'Key',
    _props: { scope: 'col' },
  },
  {
    key: 'projectType',
    label: 'Project Type',
    _props: { scope: 'col' },
  },
  {
    key: 'projectLead',
    label: 'Project Lead',
    _props: { scope: 'col' },
  },
  {
    key: 'projectCategory',
    label: 'Project Category',
    _props: { scope: 'col' },
  },
  {
    key: 'actions',
    label: 'Actions',
    _props: { scope: 'col' },
  },
]

const Projet = () => {
  const { t } = useTranslation()
  const { projectList, loading } = useSelector((state) => state.project)
  const isFirstRender = useRef(true)
  const [visible, setVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [projectItems, setProjectItems] = useState([])
  const [columnsTable, setColumnsTable] = useState(columns)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllProjectAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  const handleClickDelete = useCallback(
    (event) => {
      event.preventDefault()
      const projectId = event.target.id.split('-')[1]
      const deleteList = []
      deleteList.push(projectId)
      dispatch(deleteProjectAPI(deleteList))
    },
    [dispatch],
  )

  const handleClickEdit = useCallback(
    (event) => {
      event.preventDefault()
      const projectId = event.target.id.split('-')[1]
      dispatch(toggleEditProjectModalOpen(projectId))
    },
    [dispatch],
  )

  useEffect(() => {
    if (projectList && projectList.length > 0) {
      const transformedItems = projectList.map((item) => ({
        id: item.id,
        projectName: item.projectName,
        key: item.key,
        projectType: item.projectType,
        projectLead: item.projectLead.firstName.concat(' ', item.projectLead.lastName),
        projectCategory: item.projectCategory,
        actions: (
          <CButtonGroup size="sm" role="group" aria-label="Small button group">
            <CButton
              variant="ghost"
              color="danger"
              onClick={(e) => handleClickDelete(e)}
              id={`delete-${item.id}`}
            >
              {t('projectPage.actions.delete')}
            </CButton>
            <CButton
              variant="ghost"
              color="primary"
              onClick={(e) => handleClickEdit(e)}
              id={`edit-${item.id}`}
            >
              {t('projectPage.actions.edit')}
            </CButton>
          </CButtonGroup>
        ),
      }))
      const transformedColumns = columns.map((column) => ({
        ...column,
        label: t(`projectPage.fields.${column.key}`),
      }))
      setProjectItems(transformedItems)
      setColumnsTable(transformedColumns)
      setVisible(false)
    }
  }, [projectList, setProjectItems, handleClickDelete, handleClickEdit, t])

  const handleClickAjouterProject = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner />
      </div>
    )
  }

  // Pagination state

  // Calculate paginated items
  const paginatedItems = projectItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const totalPages = Math.ceil(projectItems.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <CContainer>
      <CRow>
        <CCol sm={10}>
          <h2>{t('projectPage.allProjects')}</h2>
          <p className="text-medium-emphasis">{t('projectPage.description')}</p>
        </CCol>
        <CCol sm={2} className="text-end">
          <CButton color="success" className="mb-2" onClick={handleClickAjouterProject}>
            {t('projectPage.actions.add')}
          </CButton>
        </CCol>
      </CRow>
      <CCollapse visible={visible} className="mb-4">
        <CCard className="mt-3">
          <CCardBody>
            <AddNewProject />
          </CCardBody>
        </CCard>
      </CCollapse>
      <CTable columns={columnsTable} items={paginatedItems} bordered hover responsive />
      <CRow>
        <CCol className="d-flex justify-content-end">
          <CButtonGroup>
            <CButton
              color="secondary"
              disabled={totalPages <= 1 || currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              &#171;
            </CButton>
            <CButton
              color="secondary"
              disabled={totalPages <= 1 || currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </CButton>
            {[...Array(totalPages)].map((_, idx) => (
              <CButton
                key={idx + 1}
                color={currentPage === idx + 1 ? 'primary' : 'secondary'}
                disabled={totalPages <= 1}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </CButton>
            ))}
            <CButton
              color="secondary"
              disabled={totalPages <= 1 || currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </CButton>
            <CButton
              color="secondary"
              disabled={totalPages <= 1 || currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
            >
              &#187;
            </CButton>
          </CButtonGroup>
          <select
            className="form-select ms-3"
            style={{ width: 'auto', display: 'inline-block' }}
            value={itemsPerPage}
            onChange={(e) => {
              setCurrentPage(1)
              setItemsPerPage(Number(e.target.value))
            }}
            disabled={projectItems.length === 0}
          >
            {[1, 5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Projet
