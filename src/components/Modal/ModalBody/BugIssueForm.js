import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem, TextField } from '@material-ui/core'
import { Grid, Typography } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { Prioritys } from '../../../utils/TicketsConsts'

const BugIssueForm = ({ newIssue, setNewIssue }) => {
  const [Priority, setPriority] = React.useState(Prioritys[0].value)
  const handleEditorChange = (content, editor) => {
    console.log('Content:', content)
  }

  const handleChangeSummary = (event) => {
    console.log(event.target.value)
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        summary: event.target.value,
      },
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="overline">Summary*</Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 9 }}>
        <TextField
          id="standard-basic"
          variant="standard"
          fullWidth
          onChange={(event) => handleChangeSummary(event)}
          value={newIssue.fields.summary}
        />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="overline">Description*</Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 9 }}>
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
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="overline">Priority</Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 9 }}>
        <TextField
          id="standard-select-currency"
          select
          fullWidth
          value={Priority}
          onChange={(event) => setPriority(event.target.value)}
          helperText="Please select the issue Priority"
        >
          {Prioritys.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="overline">Date debut</Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 9 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker slotProps={{ textField: { variant: 'standard' } }} />
        </LocalizationProvider>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Typography variant="overline">Date fin</Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 9 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker slotProps={{ textField: { variant: 'standard' } }} />
        </LocalizationProvider>
      </Grid>
    </Grid>
  )
}

BugIssueForm.propTypes = {
  newIssue: PropTypes.object.isRequired,
  setNewIssue: PropTypes.func.isRequired,
}

export default BugIssueForm
