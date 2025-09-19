import React, { useState } from 'react'
import { AppFooter } from '../../../components'
import {
  CAvatar,
  CButton,
  CCard,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CModal,
  CModalBody,
} from '@coreui/react'

import logo from '../../../assets/images/logoh.png'
import avatarList from '../../../assets/images/avatarList'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setPasswordAPI, updateUserAPI } from '../../../actions/userActions'

const IncompletAccountLayout = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [showModal, setShowModal] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(
    () => avatarList[Math.floor(Math.random() * avatarList.length)],
  )
  const [formData, setFormData] = useState({
    emailAddress: user?.user?.emailAddress || '',
    active: true,
    firstName: user?.user?.firstName || '',
    lastName: user?.user?.lastName || '',
    email: user?.user?.emailAddress || '',
    displayName: user?.user?.displayName || '',
    password: '',
    confirmPassword: '',
  })
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: 'Weak',
    percent: 0,
    color: 'danger',
  })

  const computePasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: 'Weak', percent: 0, color: 'danger' }
    let score = 0
    const length = pwd.length
    // length points
    if (length >= 8) score += 1
    if (length >= 9) score += 1
    if (length >= 11) score += 1
    // char classes
    const lower = /[a-z]/.test(pwd)
    const upper = /[A-Z]/.test(pwd)
    const digit = /[0-9]/.test(pwd)
    const symbol = /[^A-Za-z0-9]/.test(pwd)
    if (lower) score += 1
    if (upper) score += 1
    if (digit) score += 1
    if (symbol) score += 1
    const classes = [lower, upper, digit, symbol].filter(Boolean).length
    if (classes >= 3) score += 1
    if (classes === 4) score += 1
    // Map score -> label
    let label = 'Weak'
    let color = 'danger'
    if (score >= 3 && score <= 4) {
      label = 'Fair'
      color = 'warning'
    } else if (score === 5) {
      label = 'Good'
      color = 'info'
    } else if (score === 6 || score === 7) {
      label = 'Strong'
      color = 'primary'
    } else if (score >= 8) {
      label = 'Very strong'
      color = 'success'
    }
    const percent = Math.min(100, Math.round((score / 8) * 100))
    return { score, label, percent, color }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'password') {
      setPasswordStrength(computePasswordStrength(value))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validations basiques
    if (!formData.firstName || !formData.lastName) {
      toast.error('Veuillez remplir prénom, nom.')
      return
    }
    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.')
      return
    }

    const payload = {
      ...formData,
      avatarUrls: {
        '16x16': selectedAvatar,
        '24x24': selectedAvatar,
        '32x32': selectedAvatar,
        '48x48': selectedAvatar,
      },
      displayName: `${formData.firstName} ${formData.lastName}`,
    }
    const res = await dispatch(
      updateUserAPI(user?.user?.uid, {
        emailAddress: payload.emailAddress,
        active: true,
        avatarUrls: payload.avatarUrls,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        displayName: payload.displayName,
        password: payload.password,
      }),
    )
    if (!res.error) {
      const resp = await dispatch(setPasswordAPI(user?.user?.uid, payload.password))
      if (!resp.error) {
        window.location.reload() // redirection vers tableau de bord ou autre page
      }
    }
    // registerUser(payload)
    console.log('Payload inscription:', payload)
  }

  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100">
        <div className="body flex-grow-1">
          <div className="px-4">
            <CContainer>
              <CCard style={{ width: '30%' }} className="p-4 m-auto mt-5">
                <div className="d-flex flex-column align-items-center">
                  <CImage src={logo} alt="takeIT" style={{ width: '80%' }} className="pb-3" />
                  <strong className="pb-3">Inscrivez-vous pour rejoindre votre équipe</strong>
                </div>
                <div className="text-center mb-2" style={{ fontSize: '0.95rem', color: '#6c757d' }}>
                  Vous pouvez cliquer sur l&apos;avatar pour le changer.
                </div>
                <CAvatar
                  color="secondary"
                  size="xl"
                  className="mb-4 mx-auto"
                  src={selectedAvatar}
                  onClick={() => setShowModal(true)}
                  style={{ cursor: 'pointer' }}
                />
                <CForm onSubmit={handleSubmit}>
                  <span>Nom complet</span>
                  <div className="d-flex gap-3 mb-3 mt-2">
                    <CFormInput
                      type="text"
                      name="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      invalid={formData.firstName === '' || formData.firstName === '-1'}
                      valid={formData.firstName !== '' && formData.firstName !== '-1'}
                    />
                    <CFormInput
                      type="text"
                      name="lastName"
                      placeholder="Nom"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      invalid={formData.lastName === '' || formData.lastName === '-1'}
                      valid={formData.lastName !== '' && formData.lastName !== '-1'}
                    />
                  </div>
                  <CFormInput
                    className="mb-3"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="name@example.com"
                    value={formData.email}
                    autoComplete="email"
                    readOnly
                    disabled
                  />
                  <CFormInput
                    className="mb-3"
                    type="password"
                    name="password"
                    label="Mot de passe"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    invalid={formData.password === '' || formData.password === '-1'}
                    valid={formData.password !== '' && formData.password !== '-1'}
                  />
                  {formData.password && (
                    <div className="mb-3">
                      <div className="progress" style={{ height: '6px' }}>
                        <div
                          className={`progress-bar bg-${passwordStrength.color}`}
                          role="progressbar"
                          style={{ width: `${passwordStrength.percent}%` }}
                          aria-valuenow={passwordStrength.percent}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                      <div
                        className="d-flex justify-content-between"
                        style={{ fontSize: '0.7rem' }}
                      >
                        <span>Force: {passwordStrength.label}</span>
                        <span>{passwordStrength.percent}%</span>
                      </div>
                    </div>
                  )}
                  <CFormInput
                    className="mb-3"
                    type="password"
                    name="confirmPassword"
                    label="Confirmer le mot de passe"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    invalid={
                      formData.confirmPassword === '' ||
                      formData.confirmPassword === '-1' ||
                      formData.confirmPassword !== formData.password
                    }
                    valid={
                      formData.confirmPassword === formData.password &&
                      formData.confirmPassword !== '-1'
                    }
                  />
                  <div className="d-flex justify-content-end pt-3">
                    <CButton type="submit" className="btn btn-primary">
                      Continuer
                    </CButton>
                  </div>
                </CForm>
              </CCard>

              <CModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                alignment="center"
                size="lg"
              >
                <CModalBody>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(10, 1fr)',
                      gap: '0.5rem',
                      justifyItems: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {avatarList.map((avatar, idx) => (
                      <CAvatar
                        key={idx}
                        src={avatar}
                        size="lg"
                        title="Sélectionner"
                        onClick={() => {
                          setSelectedAvatar(avatar)
                          setShowModal(false)
                        }}
                        style={{
                          cursor: 'pointer',
                          border:
                            selectedAvatar === avatar
                              ? '2px solid var(--cui-primary,#0d6efd)'
                              : '2px solid transparent',
                          boxShadow:
                            selectedAvatar === avatar ? '0 0 0 2px rgba(13,110,253,.25)' : 'none',
                          transition: 'transform .15s ease',
                        }}
                        className="avatar-option"
                      />
                    ))}
                  </div>
                </CModalBody>
              </CModal>
            </CContainer>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default IncompletAccountLayout
