import React from 'react'
import PropTypes from 'prop-types'
import { CCol, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { Editor } from '@tinymce/tinymce-react'
import { Prioritys } from '../../../utils/TicketsConsts'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const EpicIssueForm = ({ newIssue, setNewIssue }) => {
  const [Priority, setPriority] = React.useState(Prioritys[0].value)
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const [epicName, setEpicName] = React.useState('')

  const handleEditorChange = (content) => {
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        description: content,
      },
    })
  }

  const handleChangeSummary = (event) => {
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        summary: event.target.value,
      },
    })
  }

  const handleEpicNameChange = (event) => {
    const value = event.target.value
    setEpicName(value)

    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        customfield_10011: value, // Epic Name field
      },
    })
  }

  const handlePriorityChange = (event) => {
    const selectedPriority = event.target.value
    setPriority(selectedPriority)

    // Trouve l'objet priority complet basé sur la valeur sélectionnée
    const priorityObj = Prioritys.find((p) => p.value === selectedPriority)

    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        priority: priorityObj,
      },
    })
  }

  const handleStartDateChange = (date) => {
    setStartDate(date)
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        customfield_10015: date ? date.toISOString() : null, // Date de début
      },
    })
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        customfield_10016: date ? date.toISOString() : null, // Date de fin
      },
    })
  }

  return (
    <div className="mt-3">
      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Summary*</CFormLabel>
        </CCol>
        <CCol md={9}>
          <CFormInput
            type="text"
            placeholder="Résumé de l'epic..."
            value={newIssue.fields.summary || ''}
            onChange={handleChangeSummary}
          />
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Nom de l'Epic*</CFormLabel>
        </CCol>
        <CCol md={9}>
          <CFormInput
            type="text"
            placeholder="Nom court de l'epic..."
            value={epicName}
            onChange={handleEpicNameChange}
          />
          <small className="form-text text-muted">
            Nom court pour identifier l'epic (utilisé pour les libellés)
          </small>
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Description*</CFormLabel>
        </CCol>
        <CCol md={9}>
          <Editor
            apiKey="pgeao7zzbo9u4uoozk1nlccidje7yemdafe1egcax1afrsz8"
            initialValue=""
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={handleEditorChange}
          />
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Priorité</CFormLabel>
        </CCol>
        <CCol md={9}>
          <CFormSelect
            value={Priority}
            onChange={handlePriorityChange}
            aria-describedby="priority-help"
          >
            {Prioritys.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CFormSelect>
          <small id="priority-help" className="form-text text-muted">
            Veuillez sélectionner la priorité de l'epic
          </small>
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Date début</CFormLabel>
        </CCol>
        <CCol md={9}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={startDate}
              onChange={handleStartDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  size: 'small',
                },
              }}
            />
          </LocalizationProvider>
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Date fin</CFormLabel>
        </CCol>
        <CCol md={9}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={endDate}
              onChange={handleEndDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  size: 'small',
                },
              }}
            />
          </LocalizationProvider>
        </CCol>
      </CRow>
    </div>
  )
}

EpicIssueForm.propTypes = {
  newIssue: PropTypes.object.isRequired,
  setNewIssue: PropTypes.func.isRequired,
}

export default EpicIssueForm
