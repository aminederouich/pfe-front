import ticketService from '../services/userService'

export const sendInviteEmail = (data) => async (dispatch) => {
  try {
    await ticketService.sendInvite(data)
    alert('Invitation envoyée avec succès !')
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’invitation :', error)
    alert('Échec de l’envoi de l’invitation')
  }
}