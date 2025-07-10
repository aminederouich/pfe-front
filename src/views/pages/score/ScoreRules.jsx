import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormCheck,
  CFormInput,
  CBadge,
  CCallout,
} from '@coreui/react'
import { FaExclamationCircle, FaBug, FaClock, FaCheckCircle } from 'react-icons/fa'

const ScoreRules = () => {
  const [priorityEnabled, setPriorityEnabled] = useState(false)
  const [p1Score, setP1Score] = useState('')
  const [p2Score, setP2Score] = useState('')
  const [p3Score, setP3Score] = useState('')
  const [p1Checked, setP1Checked] = useState(false)
  const [p2Checked, setP2Checked] = useState(false)
  const [p3Checked, setP3Checked] = useState(false)

  const [typeEnabled, setTypeEnabled] = useState(false)
  const [typeChecks, setTypeChecks] = useState({
    bug: false,
    epic: false,
    story: false,
    task: false,
  })
  const [typeScores, setTypeScores] = useState({ bug: '', epic: '', story: '', task: '' })

  const [deadlineEnabled, setDeadlineEnabled] = useState(false)
  const [deadlineChecks, setDeadlineChecks] = useState({ rule1: false, rule2: false })
  const [deadlineScores, setDeadlineScores] = useState({ rule1: '', rule2: '' })

  const [resolutionEnabled, setResolutionEnabled] = useState(false)
  const [resolutionChecks, setResolutionChecks] = useState({
    fixed: false,
    wontFix: false,
    duplicate: false,
    cannotReproduce: false,
    done: false,
    wontDo: false,
  })
  const [resolutionScores, setResolutionScores] = useState({
    fixed: '',
    wontFix: '',
    duplicate: '',
    cannotReproduce: '',
    done: '',
    wontDo: '',
  })

  useEffect(() => {
    setP1Checked(priorityEnabled)
    setP2Checked(priorityEnabled)
    setP3Checked(priorityEnabled)
  }, [priorityEnabled])

  useEffect(() => {
    const state = typeEnabled
    setTypeChecks({ bug: state, epic: state, story: state, task: state })
  }, [typeEnabled])

  useEffect(() => {
    const state = deadlineEnabled
    setDeadlineChecks({ rule1: state, rule2: state })
  }, [deadlineEnabled])

  useEffect(() => {
    const state = resolutionEnabled
    setResolutionChecks({
      fixed: state,
      wontFix: state,
      duplicate: state,
      cannotReproduce: state,
      done: state,
      wontDo: state,
    })
  }, [resolutionEnabled])

  const handleP1Change = (e) => {
    const value = parseInt(e.target.value)
    setP1Score(e.target.value)
    if (!isNaN(value)) {
      const p3 = Math.floor(value / 3)
      const p2 = Math.floor((value + p3) / 2)
      setP2Score(p2.toString())
      setP3Score(p3.toString())
    } else {
      setP2Score('')
      setP3Score('')
    }
  }

  const resolutionOptions = [
    { key: 'fixed', label: 'Fixed : A fix for this issue is checked into the tree and tested.' },
    {
      key: 'wontFix',
      label: "Won't Fix : The problem described is an issue which will never be fixed.",
    },
    { key: 'duplicate', label: 'Duplicate : The problem is a duplicate of an existing issue.' },
    {
      key: 'cannotReproduce',
      label:
        'Cannot Reproduce : All attempts at reproducing this issue failed, or not enough information was available to reproduce it.',
    },
    { key: 'done', label: 'Done : GreenHopper Managed Resolution.' },
    { key: 'wontDo', label: "Won't Do : This issue won't be actioned." },
  ]

  const renderItem = (
    key,
    label,
    value,
    setCheck,
    isChecked,
    isEnabled,
    scoreValue,
    onScoreChange,
    inputDisabled = false,
  ) => (
    <div className="d-flex flex-column mt-3" key={key}>
      <CRow>
        <CCol>
          <div>
            <div className="col-6 d-flex align-items-center">
              <CFormCheck
                className="me-2"
                checked={isChecked}
                onChange={() => setCheck((prev) => !prev)}
                disabled={!isEnabled}
              />
              <div className="fw-bold">{label.split(':')[0]}</div>
            </div>
            <div className="text-muted small">{label.split(':')[1]}</div>
          </div>
        </CCol>
        <CCol>
          {scoreValue !== null && (
            <CFormInput
              type="number"
              step="1"
              value={scoreValue}
              onChange={(e) => onScoreChange(key, e.target.value)}
              disabled={inputDisabled || !isEnabled}
              style={{ maxWidth: '100px', marginTop: '5px', marginLeft: '25px' }}
            />
          )}
        </CCol>
      </CRow>
    </div>
  )

  return (
    <div>
      <h3 className="mb-4">Score Rules Configuration</h3>

      <CRow className="mb-4">
        {/* PRIORITY */}
        <CCol md={6}>
          <CCard style={{ height: '100%' }}>
            <CCardHeader>
              <CFormCheck
                id="enablePriority"
                checked={priorityEnabled}
                onChange={() => setPriorityEnabled(!priorityEnabled)}
                label={
                  <span>
                    <FaExclamationCircle className="me-2" />
                    <strong>Priority Rules</strong>
                    <CBadge color="danger" className="ms-2 text-uppercase">
                      PRIORITY
                    </CBadge>
                  </span>
                }
              />
            </CCardHeader>

            <CCardBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <p>An issue has a priority level which indicates its importance.</p>
              {renderItem(
                'p1',
                'P1 - High: Blocks development and/or testing work.',
                p1Score,
                setP1Checked,
                p1Checked,
                priorityEnabled,
                p1Score,
                (k, v) => handleP1Change({ target: { value: v } }),
                false,
              )}
              {renderItem(
                'p2',
                'P2 - Medium: Crashes or major issues.',
                p2Score,
                setP2Checked,
                p2Checked,
                priorityEnabled,
                p2Score,
                () => {},
                true,
              )}
              {renderItem(
                'p3',
                'P3 - Low: Minor issues.',
                p3Score,
                setP3Checked,
                p3Checked,
                priorityEnabled,
                p3Score,
                () => {},
                true,
              )}
            </CCardBody>
          </CCard>
        </CCol>

        {/* TYPE */}
        <CCol md={6}>
          <CCard style={{ height: '100%' }}>
            <CCardHeader>
              <CFormCheck
                checked={typeEnabled}
                onChange={() => setTypeEnabled(!typeEnabled)}
                label={
                  <span>
                    <FaBug className="me-2" />
                    <strong>Ticket Types</strong>
                    <CBadge color="warning" className="ms-2 text-uppercase">
                      TYPE
                    </CBadge>
                  </span>
                }
              />
            </CCardHeader>

            <CCardBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <p>The currently defined issue types are listed below.</p>
              {[
                {
                  key: 'bug',
                  label: 'Bug: A problem which impairs or prevents the functions of the product.',
                },
                {
                  key: 'epic',
                  label:
                    'EpicCreated: Issue type for a big user story that needs to be broken down.',
                },
                {
                  key: 'story',
                  label: 'StoryCreated: Issue type for a user story.',
                },
                {
                  key: 'task',
                  label: 'Task: A task that needs to be done.',
                },
              ].map(({ key, label }) =>
                renderItem(
                  key,
                  label,
                  typeScores[key],
                  (val) => setTypeChecks({ ...typeChecks, [key]: val }),
                  typeChecks[key],
                  typeEnabled,
                  typeScores[key],
                  (k, v) => setTypeScores({ ...typeScores, [key]: v }),
                ),
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* DEADLINE + RESOLUTION */}
      <CRow className="mb-4">
        {/* DEADLINE */}
        <CCol md={6}>
          <CCard style={{ height: '100%' }}>
            <CCardHeader>
              <CFormCheck
                checked={deadlineEnabled}
                onChange={() => setDeadlineEnabled(!deadlineEnabled)}
                label={
                  <span>
                    <FaClock className="me-2" />
                    <strong>Deadline Resolution</strong>
                    <CBadge color="info" className="ms-2 text-uppercase">
                      DATE
                    </CBadge>
                  </span>
                }
              />
            </CCardHeader>

            <CCardBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <p>Meeting deadlines is essential.</p>
              {renderItem(
                'rule1',
                'Before Deadline: Partial score.',
                deadlineScores.rule1,
                (val) => setDeadlineChecks({ ...deadlineChecks, rule1: val }),
                deadlineChecks.rule1,
                deadlineEnabled,
                deadlineScores.rule1,
                (k, v) => setDeadlineScores({ ...deadlineScores, rule1: v }),
              )}
              {renderItem(
                'rule2',
                'On Deadline: Minimum score.',
                deadlineScores.rule2,
                (val) => setDeadlineChecks({ ...deadlineChecks, rule2: val }),
                deadlineChecks.rule2,
                deadlineEnabled,
                deadlineScores.rule2,
                (k, v) => setDeadlineScores({ ...deadlineScores, rule2: v }),
              )}
              <CCallout color="danger">
                <strong>After the dealine:</strong> No score. (Not editable)
              </CCallout>
            </CCardBody>
          </CCard>
        </CCol>

        {/* RESOLUTION */}
        <CCol md={6}>
          <CCard style={{ height: '100%' }}>
            <CCardHeader>
              <CFormCheck
                checked={resolutionEnabled}
                onChange={() => setResolutionEnabled(!resolutionEnabled)}
                label={
                  <span>
                    <FaCheckCircle className="me-2" />
                    <strong>Ticket Resolution Types</strong>
                    <CBadge color="success" className="ms-2 text-uppercase">
                      RESOLUTION
                    </CBadge>
                  </span>
                }
              />
            </CCardHeader>

            <CCardBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <p>Resolutions available for ticket closing:</p>
              {resolutionOptions.map(({ key, label }) =>
                renderItem(
                  key,
                  label,
                  resolutionScores[key],
                  (val) => setResolutionChecks({ ...resolutionChecks, [key]: val }),
                  resolutionChecks[key],
                  resolutionEnabled,
                  resolutionScores[key],
                  (k, v) => setResolutionScores({ ...resolutionScores, [key]: v }),
                ),
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default ScoreRules
