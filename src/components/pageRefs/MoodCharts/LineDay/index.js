import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import { colors, solidColors, icons, createGradient } from '../Variables'
import EntriesList from 'components/pageRefs/EntriesList'

import classes from './styles.module.scss'

const LineDay = ({ title, stats, moods, updateStats }) => {
  const [cardIndex, setCardIndex] = useState(null)
  const chartRef = useRef()

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 1,
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
        titleColor: (item) => {
          return item.tooltip.labelColors[0].backgroundColor
        },
        titleFont: {
          size: 20
        },
        bodyFont: {
          size: 15,
          weight: 600
        },
        bodyColor: '',
        callbacks: {
          title: (item) => {
            return icons[item[0].raw - 1]
          },
          beforeBody: (item) => {
            return `Entry: ${item[0].dataset.entry[item[0].dataIndex].journal}`
          },
          label: () => {
            return undefined
          }
        }
      }
    }
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
    <div className={classes.container}>
      {cardIndex !== null &&
        <div className={classes.entryContainer}>
          <div
            className={classes.blur}
            onClick={() => setCardIndex(null)}
          />
          <EntriesList
            type={'day'}
            statsArr={stats[cardIndex]}
            updateStats={updateStats}
          />
        </div>
      }
      <Chart options={options} data={data} onClick={handleClick} ref={chartRef} />
    </div>
  )
}

export default LineDay
