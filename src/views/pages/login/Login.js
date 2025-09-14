import React from 'react'
import { AppProvider } from '@toolpad/core/AppProvider'
import { SignInPage } from '@toolpad/core/SignInPage'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { login, checkAuthentication } from '../../../actions/authActions'
import { providers } from '../../../utils/authProviders'
import logo from '../../../assets/images/logo.png'

const BRANDING = {
  logo: <img src={logo} alt="Takeit logo" style={{ height: 60 }} />,
  title: 'Takeit',
}

const Login = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const redirect = (user) => {
    if (user.IsEmployee || user.IsManager) {
      navigate('/')
    }
  }

  return (
    <AppProvider theme={theme} branding={BRANDING}>
      <SignInPage
        signIn={async (provider, formData) => {
          if (provider.id === 'credentials') {
            try {
              const email = formData.get('email')
              const password = formData.get('password')
              const loginResponse = await dispatch(login(email, password))

              if (loginResponse.error) {
                return { error: t('loginPage.error.invalidCredentials') }
              }

              await dispatch(checkAuthentication())

              if (loginResponse && loginResponse.user) {
                redirect(loginResponse.user)
                return { success: true, user: loginResponse.user }
              }

              return { error: 'Unexpected response format' }
            } catch (error) {
              return { error: 'Authentication failed' }
            }
          }

          return { error: t('loginPage.error.invalidFeature') }
        }}
        slotProps={{
          form: { noValidate: false },
          emailField: { variant: 'standard', autoFocus: false },
          passwordField: { variant: 'standard' },
          submitButton: { variant: 'outlined' },
          oAuthButton: { variant: 'contained' },
        }}
        providers={providers}
      />
    </AppProvider>
  )
}

export default Login
