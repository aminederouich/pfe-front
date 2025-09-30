import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CForm,
  CFormInput,
  CFormCheck,
  CCallout,
} from '@coreui/react'
import {
  editConfigJiraAPI,
  checkConnectionJiraAPI,
  getAllConfigJiraAPI,
  toggleEditConfigJiraModalClose,
} from '../../actions/jiraActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ModalEditConfigJira = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { configCanbeAdded, isEditConfigJiraModalOpen, configIdToEdit, jiraConfigList } =
    useSelector((state) => state.jira)

  const [FormControlInputHostURL, setFormControlInputHostURL] = useState('')
  const [RadioOptionProtocol, setRadioOptionProtocol] = useState('https')
  const [FormControlInputUsername, setFormControlInputUsername] = useState('')
  const [FormControlInputPassword, setFormControlInputPassword] = useState('')
  const [FormControlInputAPIVersion, setFormControlInputAPIVersion] = useState(2)
  const [CheckStrictSSL, setCheckStrictSSL] = useState(true)
  const [enableConfig, setEnableConfig] = useState(true)

  useEffect(() => {
    if (configIdToEdit !== null) {
      const configToEdit = jiraConfigList.find((config) => config.id === configIdToEdit)
      if (configToEdit) {
        console.log(configToEdit)
        setFormControlInputHostURL(configToEdit.host)
        setRadioOptionProtocol(configToEdit.protocol)
        setFormControlInputUsername(configToEdit.username)
        setFormControlInputPassword(configToEdit.password)
        setFormControlInputAPIVersion(configToEdit.apiVersion)
        setCheckStrictSSL(configToEdit.strictSSL)
        setEnableConfig(configToEdit.enableConfig)
      }
    }
  }, [configIdToEdit, jiraConfigList])

  const checkConnection = (e) => {
    e.preventDefault()
    dispatch(
      checkConnectionJiraAPI(
        RadioOptionProtocol,
        FormControlInputHostURL,
        FormControlInputUsername,
        FormControlInputPassword,
        FormControlInputAPIVersion,
        CheckStrictSSL,
      ),
    )
      .then((response) => {
        if (response) {
          if (response.data.error) {
            toast.error(t('jira.addConfig.messages.connectionFailed'))
          } else {
            toast.success(t('jira.addConfig.messages.connectionSuccess'))
          }
        }
      })
      .catch((error) => {
        console.error('Error checking connection:', error)
        toast.error(t('jira.addConfig.messages.connectionFailed'))
      })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (configCanbeAdded) {
      dispatch(
        editConfigJiraAPI(
          configIdToEdit,
          RadioOptionProtocol,
          FormControlInputHostURL,
          FormControlInputUsername,
          FormControlInputPassword,
          FormControlInputAPIVersion,
          CheckStrictSSL,
          enableConfig,
        ),
      )
        .then((response) => {
          if (response) {
            console.log(response)
            if (response.data.error) {
              toast.error(t('jira.config.toast.updateFailed'))
            } else {
              toast.success(t('jira.config.toast.updateSuccess'))
              dispatch(toggleEditConfigJiraModalClose())
            }
          }
        })
        .then(() => {
          dispatch(getAllConfigJiraAPI())
        })
        .catch((error) => {
          console.error('Error checking connection:', error)
          toast.error(t('jira.addConfig.messages.connectionFailed'))
        })
    } else {
      toast.error(t('jira.editConfig.messages.checkConnectionFirst'))
    }
  }
  return (
    <CModal
      visible={isEditConfigJiraModalOpen}
      onClose={() => dispatch(toggleEditConfigJiraModalClose())}
      backdrop="static"
      aria-labelledby="ScrollingLongContentExampleLabel LiveDemoExampleLabel"
      scrollable
      alignment="center"
    >
      <CModalHeader onClose={() => dispatch(toggleEditConfigJiraModalClose())}>
        {t('jira.editConfig.title')}
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            type="text"
            id="EditInputHostURL"
            label={t('jira.addConfig.fields.hostUrl')}
            placeholder={t('jira.addConfig.fields.placeholder')}
            text={t('jira.addConfig.fields.help')}
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setFormControlInputHostURL(e.target.value)}
            value={FormControlInputHostURL}
          />
          <CFormCheck
            checked={RadioOptionProtocol === 'http'}
            inline
            type="radio"
            name="RadioOptionProtocol"
            id="EditCheckboxhttp"
            value="http"
            label="http"
            required
            onChange={(e) => setRadioOptionProtocol(e.target.value)}
          />
          <CFormCheck
            checked={RadioOptionProtocol === 'https'}
            inline
            type="radio"
            name="RadioOptionProtocol"
            id="EditCheckboxhttps"
            value="https"
            label="https"
            required
            onChange={(e) => setRadioOptionProtocol(e.target.value)}
          />
          <br />
          <CFormInput
            type="text"
            id="EditInputUsername"
            label={t('jira.addConfig.username.label')}
            text={t('jira.addConfig.username.help')}
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setFormControlInputUsername(e.target.value)}
            value={FormControlInputUsername}
          />
          <CFormInput
            type="password"
            id="EditInputPassword"
            label={t('jira.addConfig.password.label')}
            placeholder="*********"
            text={t('jira.addConfig.password.help')}
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setFormControlInputPassword(e.target.value)}
            value={FormControlInputPassword}
          />
          <CFormInput
            type="number"
            id="EditInputAPIVersion"
            label={t('jira.addConfig.apiVersion.label')}
            text={t('jira.addConfig.apiVersion.help')}
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setFormControlInputAPIVersion(e.target.value)}
            value={FormControlInputAPIVersion}
          />
          <CFormCheck
            id="EditCheckStrictSSL"
            label={t('jira.editConfig.fields.strictSSL')}
            required
            onChange={(e) => setCheckStrictSSL(e.target.checked)}
            checked={CheckStrictSSL}
          />
          <CCallout color="danger">
            {t('jira.editConfig.alert.warning')} <br />
            <strong>{t('jira.editConfig.alert.noteLabel')}</strong>{' '}
            {t('jira.editConfig.alert.note')}
          </CCallout>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={(e) => checkConnection(e)}>
          {t('jira.editConfig.buttons.testConnection')}
        </CButton>
        <CButton color="primary" onClick={(e) => handleFormSubmit(e)}>
          {t('jira.editConfig.buttons.editConfig')}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEditConfigJira
