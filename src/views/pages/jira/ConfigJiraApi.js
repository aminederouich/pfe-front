import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  deleteConfigJiraAPI,
  editConfigJiraAPI,
  getAllConfigJiraAPI,
} from '../../../actions/jiraActions'
import { useDispatch, useSelector } from 'react-redux'
import {
  CTable,
  CButton,
  CCol,
  CRow,
  CContainer,
  CCollapse,
  CCard,
  CCardBody,
  CButtonGroup,
  CBadge,
} from '@coreui/react'
import AddNewConfigJira from '../../../components/forms/addNewConfigJira'
import { toast } from 'react-toastify'
import { toggleEditConfigJiraModalOpen } from '../../../actions/jiraActions'
import { useTranslation } from 'react-i18next'

// Columns will be built inside component to access translation hook
let columns = []

const ConfigJiraApi = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Build translated columns (stable reference when language changes)
  columns = [
    { key: 'status', label: t('jira.config.table.status'), _props: { scope: 'col' } },
    { key: 'Host', label: t('jira.config.table.host'), _props: { scope: 'col' } },
    { key: 'Username', label: t('jira.config.table.username'), _props: { scope: 'col' } },
    { key: 'Protocol', label: t('jira.config.table.protocol'), _props: { scope: 'col' } },
    { key: 'API Version', label: t('jira.config.table.apiVersion'), _props: { scope: 'col' } },
    { key: 'Actions', label: t('jira.config.table.actions'), _props: { scope: 'col' } },
  ]

  const isFirstRender = useRef(true)

  const { jiraConfigList } = useSelector((state) => state.jira)

  const [visible, setVisible] = useState(false)
  const [configItems, setConfigItems] = useState([])

  const handleClickAjouterConfiguration = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  const handleClickDeleteConfiguration = useCallback(
    (event) => {
      event.preventDefault()
      const configId = event.target.id.split('-')[1]
      // Call the delete action here
      const deleteList = []
      deleteList.push(configId)
      dispatch(deleteConfigJiraAPI(deleteList))
        .then((response) => {
          if (response) {
            if (response.data.error) {
              toast.error(t('jira.config.toast.deleteFailed'))
            } else {
              toast.success(t('jira.config.toast.deleteSuccess'))
            }
          }
        })
        .then(() => {
          dispatch(getAllConfigJiraAPI())
        })
        .catch(() => {
          // console.error('Error checking connection:', error)
          toast.error(t('jira.config.toast.connectionFailed'))
        })
    },
    [dispatch, t],
  )

  const handleChangeStatusConfiguration = useCallback(
    (event) => {
      event.preventDefault()
      const configId = event.target.id.split('-')[1]
      // Call the edit action here
      const configToEdit = jiraConfigList.find((config) => config.id === configId)
      dispatch(
        editConfigJiraAPI(
          configId,
          configToEdit.protocol,
          configToEdit.host,
          configToEdit.username,
          configToEdit.password,
          configToEdit.apiVersion,
          configToEdit.strictSSL,
          !configToEdit.enableConfig,
        ),
      )
        .then((response) => {
          if (response) {
            if (response.data.error) {
              toast.error(t('jira.config.toast.updateFailed'))
            } else {
              toast.success(t('jira.config.toast.updateSuccess'))
            }
          }
        })
        .then(() => {
          dispatch(getAllConfigJiraAPI())
        })
        .catch(() => {
          toast.error(t('jira.config.toast.connectionFailed'))
        })
    },
    [dispatch, jiraConfigList, t],
  )

  const handleClickEditConfiguration = useCallback(
    (event) => {
      event.preventDefault()
      const configId = event.target.id.split('-')[1]
      // Call the edit action here
      dispatch(toggleEditConfigJiraModalOpen(configId))
    },
    [dispatch],
  )

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllConfigJiraAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  useEffect(() => {
    if (jiraConfigList && jiraConfigList.length > 0) {
      const transformedItems = jiraConfigList.map((item) => ({
        id: item.id,
        status: item.enableConfig ? (
          <CBadge color="success">{t('jira.config.status.enabled')}</CBadge>
        ) : (
          <CBadge color="danger">{t('jira.config.status.disabled')}</CBadge>
        ),
        Host: item.host,
        Username: item.username,
        Protocol: item.protocol,
        'API Version': item.apiVersion,
        'Strict SSL': item.strictSSL,
        Actions: (
          <CButtonGroup size="sm" role="group" aria-label="Small button group">
            <CButton
              variant="ghost"
              color="danger"
              onClick={(e) => handleClickDeleteConfiguration(e)}
              id={`delete-${item.id}`}
            >
              {t('jira.config.actions.delete')}
            </CButton>
            <CButton
              variant="ghost"
              color="primary"
              onClick={(e) => handleClickEditConfiguration(e)}
              id={`edit-${item.id}`}
            >
              {t('jira.config.actions.edit')}
            </CButton>
            <CButton
              variant="ghost"
              color="success"
              onClick={(e) => handleChangeStatusConfiguration(e)}
              id={`status-${item.id}`}
            >
              {item.enableConfig
                ? t('jira.config.actions.disable')
                : t('jira.config.actions.enable')}
            </CButton>
          </CButtonGroup>
        ),
      }))
      setConfigItems(transformedItems)
    }
  }, [
    jiraConfigList,
    handleClickDeleteConfiguration,
    handleClickEditConfiguration,
    handleChangeStatusConfiguration,
    t,
  ])

  return (
    <CContainer>
      <CRow>
        <CCol sm={10}>
          <h2>{t('jira.config.pageTitle')}</h2>
          <p className="text-medium-emphasis">{t('jira.config.pageSubtitle')}</p>
        </CCol>
        <CCol sm={2} className="text-end">
          <CButton
            color="success"
            className="mb-2"
            onClick={(event) => handleClickAjouterConfiguration(event)}
          >
            {t('jira.config.addButton')}
          </CButton>
        </CCol>
      </CRow>
      <CCollapse visible={visible} className="mb-4">
        <CCard className="mt-3">
          <CCardBody>
            <AddNewConfigJira />
          </CCardBody>
        </CCard>
      </CCollapse>
      <div className="mb-4">
        <CTable columns={columns} items={configItems} striped bordered hover responsive />
      </div>
      {/* <div className="d-flex gap-2">
        <CButton color="primary">Edit Configuration</CButton>
        <CButton color="success">Test Connection</CButton>
      </div> */}
    </CContainer>
  )
}

export default React.memo(ConfigJiraApi)
