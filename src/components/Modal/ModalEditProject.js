import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleEditProjectModalClose, editProjectAPI } from '../../actions/projectActions'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ModalEditProject = () => {
  const { t } = useTranslation()
  const { user } = useSelector((state) => state.auth.user)

  const dispatch = useDispatch()
  const { projectIdToEdit, projectList, isEditProjectModalOpen } = useSelector(
    (state) => state.project,
  )

  const [key, setKey] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('')
  const [projectCategory, setProjectCategory] = useState('No category')
  const [projectLead, setProjectLead] = useState('')

  useEffect(() => {
    if (projectIdToEdit !== null) {
      const projectToEdit = projectList.find((config) => config.id === projectIdToEdit)
      if (projectToEdit) {
        setKey(projectToEdit.key)
        setProjectName(projectToEdit.projectName)
        setProjectType(projectToEdit.projectType)
        setProjectCategory(projectToEdit.projectCategory)
        setProjectLead(projectToEdit.projectLead)
      }
    }
  }, [projectIdToEdit, projectList])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!projectName || !projectType) {
      toast.error(t('projectPage.toast.fill'))
      return
    }
    dispatch(
      editProjectAPI(projectIdToEdit, {
        projectName,
        key,
        projectType,
        projectCategory: 'No category',
        projectLead: user.uid,
      }),
    )
  }
  return (
    <CModal
      visible={isEditProjectModalOpen}
      onClose={() => dispatch(toggleEditProjectModalClose())}
      backdrop="static"
      aria-labelledby="ScrollingLongContentExampleLabel LiveDemoExampleLabel"
      scrollable
      alignment="center"
    >
      <CModalHeader onClose={() => dispatch(toggleEditProjectModalClose())}>
        {t('projectPage.editModalTitle')}
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm={8}>
              <CFormInput
                type="text"
                id="FormControlInputHostURL"
                label={t('projectPage.fields.projectName')}
                placeholder={t('projectPage.fieldsHelper.projectName')}
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
                disabled
                value={key}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormSelect
                id="FormControlSelectProjectType"
                label={t('projectPage.fields.projectType')}
                aria-label={t('projectPage.fields.projectType')}
                options={[
                  { label: '' },
                  { label: t('projectPage.projectTypeOptions.software'), value: 'software' },
                  { label: t('projectPage.projectTypeOptions.business'), value: 'business' },
                ]}
                onChange={(e) => e.target.value && setProjectType(e.target.value)}
                value={projectType}
              />
            </CCol>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="FormControlInputUsername"
                label={t('projectPage.fields.projectCategory')}
                aria-describedby="exampleFormControlInputHelpInline"
                required
                value={
                  projectCategory === 'No category' ? t('projectPage.noCategory') : projectCategory
                }
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
            value={
              projectLead && projectLead.firstName && projectLead.lastName
                ? projectLead.firstName.concat(' ', projectLead.lastName)
                : ''
            }
            disabled
            text={t('projectPage.fieldsHelper.projectLead')}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => dispatch(toggleEditProjectModalClose())}>
          {t('projectPage.actions.cancel')}
        </CButton>
        <CButton color="primary" onClick={(e) => handleFormSubmit(e)}>
          {t('projectPage.actions.edit')}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEditProject
