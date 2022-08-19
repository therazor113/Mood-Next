import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import SingleEntry from 'components/pageRefs/SingleEntry'

import classes from './styles.module.scss'

const LineDay = ({ title, stats, moods, updateStats }) => {
  const [cardIndex, setCardIndex] = useState(null)
  const chartRef = useRef()
  const colors = [
    'rgba(255, 0, 0, 0.7)',
    'rgba(255, 68, 0, 0.7)',
    'rgba(255, 119, 0, 0.7)',
    'rgba(255, 204, 0, 0.7)',
    'rgba(255, 255, 0, 0.7)',
    'rgba(200, 225, 0, 0.7)',
    'rgba(120, 200, 0, 0.7)',
    'rgba(55, 225, 0, 0.7)',
    'rgba(0, 200, 0, 0.9)'
  ]
  const solidColors = [
    'rgba(255, 0, 0)',
    'rgba(255, 68, 0)',
    'rgba(255, 119, 0)',
    'rgba(255, 204, 0)',
    'rgba(255, 255, 0)',
    'rgba(200, 225, 0)',
    'rgba(120, 200, 0)',
    'rgba(55, 225, 0)',
    'rgba(0, 200, 0)'
  ]
  const icons = [
    '\uf567',
    '\uf5b3',
    '\uf119',
    '\uf57a',
    '\uf11a',
    '\uf118',
    '\uf5b8',
    '\uf582',
    '\uf59a'
  ]
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        suggestedMax: 9,
        stepSize: 1,
        ticks: {
          padding: 10,
          font: {
            size: '25'
          },
          color: (item) => {
            return colors[item.index]
          },
          callback: (item, index) => {
            return icons[index]
          }
        }
      },
      x: {
        beginAtZero: true,
        suggestedMax: 9,
        stepSize: 1,
        ticks: {
          font: {
            size: '15',
            weight: '600'
          },
          callback: function (item) {
            if (stats[item]) {
              if (stats[item]?.time <= 12) {
                return `${stats[item]?.time} AM`
              } else if (stats[item]?.time > 12) {
                return `${stats[item]?.time - 12} PM`
              }
            }
          }
        }
      }
    },
    elements: {
      point: {
        borderWidth: 0,
        radius: 5,
        backgroundColor: 'rgba(0,0,0,0)'
      }
    },
    layout: {
      padding: {
        left: 13,
        bottom: 15,
        right: 20
      }
    },
    datasets: {
      line: {
        backgroundColor: (item) => {
          return item.dataset.solidColors[item.raw - 1]
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title,
        font: {
          size: '18'
        }
      },
      tooltip: {
        bodyFont: {
          size: 15,
          weight: 600
        },
        callbacks: {
          label: (item) => {
            return `Entry: ${item.dataset.entry[item.dataIndex].journal}`
          },
          labelColor: (item) => {
            return {
              borderColor: item.dataset.colors[item.raw - 1],
              backgroundColor: item.dataset.colors[item.raw - 1]
            }
          },
          labelTextColor: (item) => {
            return item.dataset.colors[item.raw - 1]
          }
        }
      }
    }
  }

  const createGradient = (ctx, area) => {
    const colorStart = 'rgb(255, 0, 0)'
    const colorMid = 'rgba(200, 225, 0)'
    const colorEnd = 'rgb(0, 200, 0)'
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)
    gradient.addColorStop(0, colorStart)
    gradient.addColorStop(0.5, colorMid)
    gradient.addColorStop(1, colorEnd)

    return gradient
  }

  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [{
      colors,
      solidColors,
      type: 'line',
      entry: stats,
      data: moods,
      segment: {
        borderColor: () => createGradient(chartRef.current.ctx, chartRef.current.chartArea)
      }
    }]
  }

  const handleClick = (e) => {
    const item = getElementAtEvent(chartRef.current, e)
    if (!item.length) return
    if (cardIndex === item[0].index) {
      setCardIndex(null)
    } else {
      setCardIndex(item[0].index)
    }
  }
  return (
    <>
      <div className={classes.container}>
        <Chart options={options} data={data} onClick={handleClick} ref={chartRef} />
      </div>
      <SingleEntry
        statEntry={stats[cardIndex]}
        updateStats={updateStats}
      />
    </>
  )
}

export default LineDay
