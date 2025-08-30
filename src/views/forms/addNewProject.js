import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addNewProjectAPI } from '../../actions/projectActions'
import { useTranslation } from 'react-i18next'

const AddNewProject = () => {
  const { t } = useTranslation()
  const { user } = useSelector((state) => state.auth.user)
  const [projectName, setProjectName] = useState('')
  const [key, setKey] = useState('')
  const [projectType, setProjectType] = useState('')
  const dispatch = useDispatch()
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!projectName || !key || !projectType) {
      toast.error(t('projectPage.toast.fill'))
      return
    }
    if (key.length < 3) {
      toast.error(t('projectPage.toast.key'))
      return
    }
    if (!/^[A-Z]+$/.test(key)) {
      toast.error(t('projectPage.toast.keyUppercase'))
      return
    }
    dispatch(
      addNewProjectAPI({
        projectName,
        key,
        projectType,
        projectCategory: 'No category',
        projectLead: {
          uid: user.uid,
          FirstName: user.FirstName,
          LastName: user.LastName,
          email: user.email,
        },
      }),
    )
  }

  return (
    <CForm>
      <CRow>
        <CCol sm={8}>
          <CFormInput
            type="text"
            id="FormControlInputHostURL"
            label={t('projectPage.fields.projectName')}
            placeholder={t('projectPage.fields.projectName')}
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
        </CCol>
        <CCol sm={4}>
          <CFormInput
            type="text"
            id="FormControlInputUsername"
            label={t('projectPage.fields.key')}
            aria-describedby="exampleFormControlInputHelpInline"
            required
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={4}>
          <CFormSelect
            id="FormControlSelectProjectType"
            label={t('projectPage.fields.projectType')}
            aria-label={t('projectPage.fields.projectType')}
            options={[
              { label: '' },
              { label: 'Software', value: 'software' },
              { label: 'Business', value: 'business' },
            ]}
            onChange={(e) => e.target.value && setProjectType(e.target.value)}
            value={projectType}
          />
        </CCol>
        <CCol sm={4}>
          <CFormInput
            type="text"
            id="FormControlInputUsername"
            label={t('projectPage.fields.projectCategory')}
            aria-describedby="exampleFormControlInputHelpInline"
            required
            value="No category"
            disabled
          />
        </CCol>
      </CRow>
      <CFormInput
        type="text"
        id="FormControlInputUsername"
        label={t('projectPage.fields.projectLead')}
        aria-describedby="exampleFormControlInputHelpInline"
        required
        value={user.FirstName.concat(' ', user.LastName)}
        disabled
        text={t('projectPage.fieldsHelper.projectLead')}
      />
      <br />
      <div className="d-flex gap-2">
        <CButton color="primary" type="submit" onClick={(e) => handleFormSubmit(e)}>
          {t('projectPage.actions.add')}
        </CButton>
      </div>
    </CForm>
  )
}
export default AddNewProject
