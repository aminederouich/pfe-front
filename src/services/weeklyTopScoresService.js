import axios from 'axios'

const API_URL = 'http://localhost:8081/weeklyscores/'
const SUNDAY_OFFSET = -6 // décalage pour que lundi soit le début de la semaine
const WEEK_LENGTH_DAYS = 6 // nombre de jours à ajouter pour fin de semaine (lundi +6 => dimanche)

const getAllWeeklyTopScores = () => {
  return axios
    .get(`${API_URL}getAllWeeklyTopScores`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching all weekly top scores:', error)
      return error
    })
}

const getStartOfWeek = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? SUNDAY_OFFSET : 1) // Lundi comme début de semaine
  return new Date(d.setDate(diff))
}

const computeWeekBounds = () => {
  const startOfWeek = getStartOfWeek(new Date())
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + WEEK_LENGTH_DAYS)
  return { startOfWeek, endOfWeek }
}

const calculateWeeklyScores = () => {
  const { startOfWeek, endOfWeek } = computeWeekBounds()
  return axios
    .post(
      `${API_URL}calculateweeklyscores`,
      {
        startOfWeek,
        endOfWeek,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching all weekly top scores:', error)
      return error
    })
}

export default {
  getAllWeeklyTopScores,
  calculateWeeklyScores,
}
