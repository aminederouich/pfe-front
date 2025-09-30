import React, { useState } from 'react'
import { CButton, CCallout, CForm, CFormCheck, CFormInput } from '@coreui/react'
import {
  addNewConfigJiraAPI,
  checkConnectionJiraAPI,
  getAllConfigJiraAPI,
} from '../../actions/jiraActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const AddNewConfigJira = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { configCanbeAdded } = useSelector((state) => state.jira)

  const [FormControlInputHostURL, setFormControlInputHostURL] = useState('')
  const [RadioOptionProtocol, setRadioOptionProtocol] = useState('https')
  const [FormControlInputUsername, setFormControlInputUsername] = useState('')
  const [FormControlInputPassword, setFormControlInputPassword] = useState('')
  const [FormControlInputAPIVersion, setFormControlInputAPIVersion] = useState(2)
  const [CheckStrictSSL, setCheckStrictSSL] = useState(true)

  const checkConnection = () => {
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
        addNewConfigJiraAPI(
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
            console.log(response)
            if (response.data.error) {
              toast.error(t('jira.addConfig.messages.addingFailed'))
            } else {
              toast.success(t('jira.addConfig.messages.addingSuccess'))
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
      toast.error(t('jira.addConfig.messages.checkConnectionFirst'))
    }
  }
  return (
    <CForm>
      <CFormInput
        type="text"
        id="FormControlInputHostURL"
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
        id="Checkboxhttp"
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
        id="Checkboxhttps"
        value="https"
        label="https"
        required
        onChange={(e) => setRadioOptionProtocol(e.target.value)}
      />
      <br />
      <CFormInput
        type="test"
        id="FormControlInputUsername"
        label={t('jira.addConfig.username.label')}
        text={t('jira.addConfig.username.help')}
        aria-describedby="exampleFormControlInputHelpInline"
        required
        onChange={(e) => setFormControlInputUsername(e.target.value)}
        value={FormControlInputUsername}
      />
      <CFormInput
        type="password"
        id="FormControlInputPassword"
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
        id="FormControlInputAPIVersion"
        label={t('jira.addConfig.apiVersion.label')}
        text={t('jira.addConfig.apiVersion.help')}
        aria-describedby="exampleFormControlInputHelpInline"
        required
        onChange={(e) => setFormControlInputAPIVersion(e.target.value)}
        value={FormControlInputAPIVersion}
      />
      <CFormCheck
        id="CheckStrictSSL"
        label="Strict SSL"
        required
        onChange={(e) => setCheckStrictSSL(e.target.checked)}
        checked={CheckStrictSSL}
      />
      <CCallout color="danger">
        {t('jira.addConfig.alert.warning')} <br />
        <strong>Note:</strong> {t('jira.addConfig.alert.note')}
      </CCallout>
      <div className="d-flex gap-2">
        <CButton color="primary" type="submit" onClick={(e) => handleFormSubmit(e)}>
          {t('jira.addConfig.buttons.addConfig')}
        </CButton>
        <CButton color="success" onClick={() => checkConnection()}>
          {t('jira.addConfig.buttons.testConnection')}
        </CButton>
      </div>
    </CForm>
  )
}

export default AddNewConfigJira
