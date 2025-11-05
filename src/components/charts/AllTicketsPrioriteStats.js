import React, { useEffect, useRef } from 'react'
import { getStyle } from '@coreui/utils'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { CCard, CCardBody } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Prioritys } from '../../utils/TicketsConsts'
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend)

export const AllTicketsPrioriteStats = () => {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)
  const navigate = useNavigate()
  const { ticketList } = useSelector((state) => state.ticket)

  useEffect(() => {
    const generatorOfData = () => {
      const labels = []
      const data = []

      Prioritys.forEach((type) => {
        labels.push(type.name)
      })
      ticketList.forEach((ticket) => {
        const priority = Prioritys.find((t) => t.id === ticket.fields.priority?.id)
        if (priority) {
          const index = labels.indexOf(priority.name)
          if (index !== -1) {
            data[index] = (data[index] || 0) + 1
          }
        }
      })

      return { labels, data }
    }

    const canvas = chartRef.current
    if (!canvas) return

    // Destroy existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    const ctx = canvas.getContext('2d')
    const { labels, data: datasetData } = generatorOfData()
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Nombre de tickets',
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#FFCE56'],
          borderColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#FFCE56'],
          borderWidth: 1,
          data: datasetData,
        },
      ],
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Masquer la légende pour un bar chart plus propre
        },
        title: {
          display: true,
          text: 'Répartition des tickets par priorité',
          color: getStyle('--cui-body-color'),
          font: { size: 14, weight: 'bold' },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: getStyle('--cui-body-color'),
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: getStyle('--cui-border-color-translucent'),
          },
          ticks: {
            color: getStyle('--cui-body-color'),
            stepSize: 1,
          },
        },
      },
    }

    // Create new chart instance
    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: data,
      options: options,
    })

    const handleColorSchemeChange = () => {
      if (chartInstanceRef.current) {
        const { options } = chartInstanceRef.current

        if (options.plugins?.title) {
          options.plugins.title.color = getStyle('--cui-body-color')
        }

        if (options.scales?.x?.ticks) {
          options.scales.x.ticks.color = getStyle('--cui-body-color')
        }

        if (options.scales?.y?.ticks) {
          options.scales.y.ticks.color = getStyle('--cui-body-color')
        }

        if (options.scales?.y?.grid) {
          options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
        }

        chartInstanceRef.current.update()
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)

    // Cleanup function
    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [ticketList])

  return (
    <CCard className="mt-3 p-3">
      <CCardBody>
        <h6 className="fw-bold mb-1">Vue d&apos;ensemble par priorité</h6>
        <p className="text-muted mb-2">
          Obtenez un instantané de la répartition des priorités de tickets.{' '}
          <a onClick={() => navigate('/tickets/list')}>Afficher tous les tickets</a>
        </p>
        <div style={{ position: 'relative', height: '300px' }}>
          <canvas ref={chartRef} />
        </div>
      </CCardBody>
    </CCard>
  )
}
