import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import userService from '../../../services/userService'
import { logout } from '../../../actions/authActions' // adapte le chemin si besoin

const ResetPassword = () => {
  const location = useLocation()
  console.log(location)
  const dispatch = useDispatch()
  const queryParams = new URLSearchParams(location.search)
  const emailFromUrl = queryParams.get('email') || ''
  const [email, setEmail] = useState(emailFromUrl)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  // Déconnexion automatique à l'arrivée sur la page
  useEffect(() => {
    dispatch(logout())
    localStorage.removeItem('token')
    setEmail(emailFromUrl)
    // eslint-disable-next-line
  }, [dispatch, emailFromUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('❌ Les mots de passe ne correspondent pas.')
      return
    }

    try {
      await userService.setPassword({ email, password })
      setMessage('✅ Mot de passe défini avec succès. Vous pouvez maintenant vous connecter.')
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (error) {
      setMessage(`❌ Erreur : ${error.response?.data?.message || error.message}`)
    }
  }

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: '#fff'
      }}
    >
      <h2>Définir votre mot de passe</h2>
      {message && (
        <p style={{ color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email :</label>
          <input
            type="email"
            required
            value={email}
            disabled
            style={{ width: '100%', padding: '8px', background: '#f5f5f5' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Nouveau mot de passe :</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Confirmer le mot de passe :</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Définir le mot de passe
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
