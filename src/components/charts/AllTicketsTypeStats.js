import React, { useEffect, useRef } from 'react'
import { getStyle } from '@coreui/utils'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js'
import { CCard, CCardBody } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { issuetype } from '../../utils/TicketsConsts'
// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController)

export const AllTicketsTypeStats = () => {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)
  const navigate = useNavigate()
  const { ticketList } = useSelector((state) => state.ticket)

  const generatorOfData = () => {
    const labels = []
    const data = []

    issuetype.forEach((type) => {
      labels.push(type.name)
    })
    ticketList.forEach((ticket) => {
      const type = issuetype.find((t) => t.id === ticket.fields.issuetype?.id)
      if (type) {
        const index = labels.indexOf(type.name)
        if (index !== -1) {
          data[index] = (data[index] || 0) + 1
        }
      }
    })

    return { labels, data }
  }

  useEffect(() => {
    const canvas = chartRef.current
    if (!canvas) return

    // Destroy existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    const ctx = canvas.getContext('2d')
    console.log(generatorOfData())
    const { labels, data: datasetData } = generatorOfData()
    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',
            '#00D8FF',
            '#DD1B16',
            '#FFCE56',
            '#36A2EB',
            '#FF6384',
          ],
          data: datasetData,
          borderWidth: 0,
        },
      ],
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: { size: 13 },
            color: getStyle('--cui-body-color'),
            usePointStyle: true,
            padding: 15,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
        },
      },
      cutout: '60%',
    }

    // Create new chart instance
    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'doughnut',
      data: data,
      options: options,
    })

    const handleColorSchemeChange = () => {
      if (chartInstanceRef.current) {
        const { options } = chartInstanceRef.current

        if (options.plugins?.legend?.labels) {
          options.plugins.legend.labels.color = getStyle('--cui-body-color')
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
  }, [])

  return (
    <CCard className="mt-3 p-3">
      <CCardBody>
        <h6 className="fw-bold mb-1">Vue d&apos;ensemble par type</h6>
        <p className="text-muted mb-2">
          Obtenez un instantané de la répartition des types de tickets.{' '}
          <a onClick={() => navigate('/tickets/list')}>Afficher tous les tickets</a>
        </p>
        <div style={{ position: 'relative', height: '300px' }}>
          <canvas ref={chartRef} />
        </div>
      </CCardBody>
    </CCard>
  )
}
