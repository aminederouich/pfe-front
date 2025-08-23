import React, { useState, useEffect, useRef } from 'react'
import { CButton, CCardText, CCardTitle, CImage } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addRuleConfigAPI, getRuleByIdOwnerAPI } from '../../../actions/rulesActions'
import { toast } from 'react-toastify'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormCheck,
  CFormInput,
  CCallout,
  CContainer,
} from '@coreui/react'
import { cilAlarm, cilBug, cilWarning, cilGem, cilCalendarCheck, cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { issuetype, priorityConfig } from '../../../utils/TicketsConsts'
import classNames from 'classnames'

// Define deadline options (replace with your actual data as needed)
const deadline = [
  {
    id: 1,
    name: 'Before Deadline',
    untranslatedName: 'BeforeDeadline',
    iconUrl: cilGem,
    description: 'Partial score if resolved before the deadline.',
    statusColor: 'text-success',
  },
  {
    id: 2,
    name: 'On Deadline',
    untranslatedName: 'OnDeadline',
    iconUrl: cilCalendarCheck,
    description: 'Minimum score if resolved on the deadline.',
    statusColor: 'text-warning',
  },
]

const ScoreRules = () => {
  const dispatch = useDispatch()
  const isFirstRender = useRef(true)

  const { user } = useSelector((state) => state.auth)
  const { rule } = useSelector((state) => state.rules)

  const [ruleConfig, setRuleConfig] = useState({
    priority: {
      Highest: { checked: false, value: 0 },
      High: { checked: false, value: 0 },
      Medium: { checked: false, value: 0 },
      Low: { checked: false, value: 0 },
      Lowest: { checked: false, value: 0 },
    },
    issuetype: {
      Bug: { checked: false, value: 0 },
      Task: { checked: false, value: 0 },
      Story: { checked: false, value: 0 },
    },
    deadline: {
      BeforeDeadline: { checked: false, value: 0 },
      OnDeadline: { checked: false, value: 0 },
    },
    resolution: {
      Done: { checked: false, value: 0 },
    },
  })

  const [priorityEnabled, setPriorityEnabled] = useState(false)
  const [typeEnabled, setTypeEnabled] = useState(false)
  const [deadlineEnabled, setDeadlineEnabled] = useState(false)
  const [resolutionEnabled, setResolutionEnabled] = useState(false)

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getRuleByIdOwnerAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  useEffect(() => {
    setRuleConfig((prev) => ({
      ...prev,
      ownerId: user.user.uid,
    }))
  }, [user])

  useEffect(() => {
    if (rule) {
      if (
        Object.prototype.hasOwnProperty.call(rule, 'priority') &&
        Object.prototype.hasOwnProperty.call(rule, 'issuetype') &&
        Object.prototype.hasOwnProperty.call(rule, 'deadline') &&
        Object.prototype.hasOwnProperty.call(rule, 'resolution')
      ) {
        // Vérifier si au moins une priorité a checked: true
        const hasCheckedPriority = Object.values(rule.priority).some(
          (priority) => priority.checked === true,
        )
        setPriorityEnabled(hasCheckedPriority)

        const hasCheckedType = Object.values(rule.issuetype).some((type) => type.checked === true)
        setTypeEnabled(hasCheckedType)

        const hasCheckedDeadline = Object.values(rule.deadline).some(
          (deadline) => deadline.checked === true,
        )
        setDeadlineEnabled(hasCheckedDeadline)
        const hasCheckedResolution = Object.values(rule.resolution).some(
          (resolution) => resolution.checked === true,
        )
        setResolutionEnabled(hasCheckedResolution)
        setRuleConfig((prev) => ({
          ...prev,
          priority: {
            ...rule.priority,
          },
          issuetype: {
            ...rule.issuetype,
          },
          deadline: {
            ...rule.deadline,
          },
          resolution: {
            ...rule.resolution,
          },
        }))
      }
    }
  }, [rule])

  useEffect(() => {
    setRuleConfig((prev) => ({
      ...prev,
      priority: Object.keys(prev.priority).reduce((acc, key) => {
        acc[key] = {
          ...prev.priority[key],
          checked: priorityEnabled,
        }
        return acc
      }, {}),
    }))
  }, [priorityEnabled])

  useEffect(() => {
    setRuleConfig((prev) => ({
      ...prev,
      issuetype: Object.keys(prev.issuetype).reduce((acc, key) => {
        acc[key] = {
          ...prev.issuetype[key],
          checked: typeEnabled,
        }
        return acc
      }, {}),
    }))
  }, [typeEnabled])

  useEffect(() => {
    setRuleConfig((prev) => ({
      ...prev,
      deadline: Object.keys(prev.deadline).reduce((acc, key) => {
        acc[key] = {
          ...prev.deadline[key],
          checked: deadlineEnabled,
        }
        return acc
      }, {}),
    }))
  }, [deadlineEnabled])

  useEffect(() => {
    setRuleConfig((prev) => ({
      ...prev,
      resolution: Object.keys(prev.resolution).reduce((acc, key) => {
        acc[key] = {
          ...prev.resolution[key],
          checked: resolutionEnabled,
        }
        return acc
      }, {}),
    }))
  }, [resolutionEnabled])

  const handlePriorityChange = (priorityName, value) => {
    const numValue = parseInt(value) || 0
    if (priorityName === 'Highest') {
      setRuleConfig((prev) => ({
        ...prev,
        priority: {
          ...prev.priority,
          Highest: { ...prev.priority.Highest, value: numValue },
          High: { ...prev.priority.High, value: Math.round(numValue * 0.8) }, // 80%
          Medium: { ...prev.priority.Medium, value: Math.round(numValue * 0.6) }, // 60%
          Low: { ...prev.priority.Low, value: Math.round(numValue * 0.4) }, // 40%
          Lowest: { ...prev.priority.Lowest, value: Math.round(numValue * 0.2) }, // 20%
        },
      }))
    } else {
      setRuleConfig((prev) => ({
        ...prev,
        priority: {
          ...prev.priority,
          [priorityName]: {
            ...prev.priority[priorityName],
            value: numValue,
          },
        },
      }))
    }
  }

  const handleTypeChange = (typeName, value) => {
    const numValue = parseInt(value) || 0
    setRuleConfig((prev) => ({
      ...prev,
      issuetype: {
        ...(prev.issuetype || {}),
        [typeName]: {
          ...(prev.issuetype && prev.issuetype[typeName] ? prev.issuetype[typeName] : {}),
          value: numValue,
        },
      },
    }))
  }

  const handleDeadlineChange = (deadlineName, value) => {
    const numValue = parseInt(value) || 0
    setRuleConfig((prev) => ({
      ...prev,
      deadline: {
        ...(prev.deadline || {}),
        [deadlineName]: {
          ...(prev.deadline && prev.deadline[deadlineName] ? prev.deadline[deadlineName] : {}),
          value: numValue,
        },
      },
    }))
  }

  const handleResolutionChange = (resolutionName, value) => {
    const numValue = parseInt(value) || 0
    setRuleConfig((prev) => ({
      ...prev,
      resolution: {
        ...(prev.resolution || {}),
        [resolutionName]: {
          ...(prev.resolution && prev.resolution[resolutionName]
            ? prev.resolution[resolutionName]
            : {}),
          value: numValue,
        },
      },
    }))
  }

  const handleSaveScores = () => {
    dispatch(addRuleConfigAPI(ruleConfig))
      .then((res) => {
        // Vérifier si la réponse contient le message de succès
        if (res && res.success === true && res.operation === 'updated') {
          toast.info('Règle mise à jour avec succès')
        }

        if (res && res.success === true && res.operation === 'created') {
          toast.success('Règle créée avec succès')
        }

        console.log('Rule saved successfully:', res)
      })
      .catch((error) => {
        // Handle error
        toast.error('Erreur lors de la sauvegarde')
        console.error('Error saving rule:', error)
      })
  }

  return (
    <CContainer>
      <CRow>
        <CCol sm={10}>
          <h2>Score Rules Configuration</h2>
          <p className="text-medium-emphasis">
            Configure the scoring rules for different ticket attributes.
          </p>
        </CCol>
        <CCol sm={2} className="text-end">
          <CButton color="primary" className="mb-2" onClick={() => handleSaveScores()}>
            Save the rules
          </CButton>
        </CCol>
      </CRow>
      <CRow className="mb-4">
        {/* PRIORITY */}
        <CCol md={6}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ overflowY: 'auto' }}>
              <CCardTitle onClick={() => setPriorityEnabled(!priorityEnabled)}>
                <CFormCheck
                  id="enablePriority"
                  checked={priorityEnabled}
                  onChange={() => setPriorityEnabled(!priorityEnabled)}
                />
                <CIcon icon={cilWarning} className="mx-2" size="lg" />
                Priority Rules
              </CCardTitle>
              <CCardText>An issue has a priority level which indicates its importance.</CCardText>
              {priorityConfig.map((priority) => (
                <div className="d-flex flex-column mt-3" key={priority.id}>
                  <CRow>
                    <CCol xs={9}>
                      <div>
                        <div className="col-6 d-flex align-items-center">
                          <CImage src={priority.iconUrl} className="mx-2" />
                          <div className="fw-bold" style={{ color: priority.statusColor }}>
                            {priority.name}
                          </div>
                        </div>
                        <div className="text-muted small">{priority.description}</div>
                      </div>
                    </CCol>
                    <CCol xs={3}>
                      <CFormInput
                        name={`priority${priority.name}`}
                        type="number"
                        min="5"
                        step="1"
                        size="sm"
                        disabled={
                          !priorityEnabled || `priority${priority.name}` !== 'priorityHighest'
                        }
                        value={ruleConfig.priority[priority.name]?.value || 0}
                        onChange={(e) => handlePriorityChange(priority.name, e.target.value)}
                      />
                    </CCol>
                  </CRow>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>

        {/* TYPE */}
        <CCol md={6}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ overflowY: 'auto' }}>
              <CCardTitle onClick={() => setTypeEnabled(!typeEnabled)}>
                <CFormCheck
                  id="enableIssuetype"
                  checked={typeEnabled}
                  onChange={() => setTypeEnabled(!typeEnabled)}
                />
                <CIcon icon={cilBug} className="mx-2" size="lg" />
                Ticket Types
              </CCardTitle>
              <CCardText>An issue has a type which indicates its nature.</CCardText>
              {issuetype.map((type) => (
                <div className="d-flex flex-column mt-3" key={type.id}>
                  <CRow>
                    <CCol xs={9}>
                      <div>
                        <div className="col-6 d-flex align-items-center">
                          <CImage src={type.iconUrl} className="mx-2" />
                          <div className="fw-bold">{type.name}</div>
                        </div>
                        <div className="text-muted small">{type.description}</div>
                      </div>
                    </CCol>
                    <CCol xs={3}>
                      <CFormInput
                        name={`issuetype${type.untranslatedName}`}
                        type="number"
                        step="1"
                        size="sm"
                        disabled={!typeEnabled}
                        value={ruleConfig.issuetype[type.untranslatedName]?.value || 0}
                        onChange={(e) => handleTypeChange(type.untranslatedName, e.target.value)}
                      />
                    </CCol>
                  </CRow>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mb-4">
        {/* DEADLINE */}
        <CCol md={6}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ overflowY: 'auto' }}>
              <CCardTitle onClick={() => setDeadlineEnabled(!deadlineEnabled)}>
                <CFormCheck
                  id="enableDeadline"
                  checked={deadlineEnabled}
                  onChange={() => setDeadlineEnabled(!deadlineEnabled)}
                />
                <CIcon icon={cilAlarm} className="mx-2" size="lg" />
                Deadline Resolution
              </CCardTitle>
              <CCardText>Meeting deadlines is essential.</CCardText>
              {deadline.map((rule) => (
                <div className="d-flex flex-column mt-3" key={rule.id}>
                  <CRow>
                    <CCol xs={9}>
                      <div>
                        <div className="col-6 d-flex align-items-center">
                          <CIcon
                            icon={rule.iconUrl}
                            className={classNames('mx-2', rule.statusColor)}
                          />
                          <div className={classNames('fw-bold', rule.statusColor)}>{rule.name}</div>
                        </div>
                        <div className="text-muted small">{rule.description}</div>
                      </div>
                    </CCol>
                    <CCol xs={3}>
                      <CFormInput
                        name={`deadline${rule.untranslatedName}`}
                        type="number"
                        step="1"
                        size="sm"
                        disabled={!deadlineEnabled}
                        value={ruleConfig.deadline[rule.untranslatedName]?.value || 0}
                        onChange={(e) =>
                          handleDeadlineChange(rule.untranslatedName, e.target.value)
                        }
                      />
                    </CCol>
                  </CRow>
                </div>
              ))}
              <CCallout color="danger">
                <strong>After the dealine:</strong> No score. (Not editable)
              </CCallout>
            </CCardBody>
          </CCard>
        </CCol>

        {/* RESOLUTION */}
        <CCol md={6}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ overflowY: 'auto' }}>
              <CCardTitle onClick={() => setResolutionEnabled(!resolutionEnabled)}>
                <CFormCheck
                  id="enableResolution"
                  checked={resolutionEnabled}
                  onChange={() => setResolutionEnabled(!resolutionEnabled)}
                />
                <CIcon icon={cilAlarm} className="mx-2" size="lg" />
                Ticket Resolution
              </CCardTitle>
              <CCardText>Meeting deadlines is essential.</CCardText>
              <div className="d-flex flex-column mt-3">
                <CRow>
                  <CCol xs={9}>
                    <div>
                      <div className="col-6 d-flex align-items-center">
                        <CIcon icon={cilCheck} className="mx-2 text-success" />
                        <div className="fw-bold text-success">Terminé(e)</div>
                      </div>
                      <div className="text-muted small">bla bla</div>
                    </div>
                  </CCol>
                  <CCol xs={3}>
                    <CFormInput
                      name="resolutionDone"
                      type="number"
                      step="1"
                      size="sm"
                      disabled={!resolutionEnabled}
                      value={ruleConfig.resolution['Done']?.value || 0}
                      onChange={(e) => handleResolutionChange('Done', e.target.value)}
                    />
                  </CCol>
                </CRow>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ScoreRules
