import userService from '../services/userService'

// Cette fonction ne fait pas directement d'affichage (alert/toast) afin de laisser
// la couche UI gérer la traduction via les clés: employee.invite.success / employee.invite.errorSend
// Retour: { ok: true, data } ou { ok: false, error }
export const sendInviteEmail = (data) => async () => {
  try {
    const response = await userService.sendInvite(data)
    return { ok: true, data: response }
  } catch (error) {
    // Log technique (ne pas traduire ici)
    console.error('sendInviteEmail error:', error)
    return { ok: false, error }
  }
}
