import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import { colors, solidColors, icons, createGradient } from '../Variables'
import EntriesList from 'components/pageRefs/EntriesList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faXmark } from '@fortawesome/free-solid-svg-icons'

const LineDay = ({ title, classes, stats, moods, updateStats }) => {
  const [cardIndex, setCardIndex] = useState(null)
  const [showChart, setShowChart] = useState(true)
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
          callback: (_, index) => {
            return icons[index]
          }
        }
      },
      x: {
        beginAtZero: true,
        suggestedMax: 8,
        stepSize: 1,
        ticks: {
          font: {
            size: '15',
            weight: '600'
          },
          callback: function (item) {
            if (stats[item]) {
              const time =
              stats[item]?.time === '0'
                ? '12 AM'
                : stats[item]?.time < 12
                  ? `${stats[item]?.time} AM`
                  : stats[item]?.time === '12'
                    ? `${stats[item]?.time} PM`
                    : `${stats[item]?.time - 12} PM`
              return time
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
      legend: { display: false },
      title: { display: false },
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
            if (item[0].dataset.entry[item[0].dataIndex].journal.length > 15) {
              return `Entry: ${item[0].dataset.entry[item[0].dataIndex].journal.slice(0, 15)}...`
            } else {
              return `Entry: ${item[0].dataset.entry[item[0].dataIndex].journal}`
            }
          },
          label: () => {
            return undefined
          }
        }
      }
    }
  }

  const data = {
    labels: moods.length < 8 ? [1, 2, 3, 4, 5, 6, 7, 8] : moods,
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
    <div
      className={classes.chartContainer}
      style={!showChart ? { height: '3rem' } : {}}
    >
      <div className={classes.chartHeader}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={classes.dropDown}
          onClick={() => setShowChart(!showChart)}
          rotation={showChart ? 270 : 0}
        />
        <h2>Todays Moods</h2>
      </div>
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
          <FontAwesomeIcon
            icon={faXmark}
            className={classes.exitButton}
            onClick={() => setCardIndex(null)}
          />
        </div>
      }
      <div
        className={classes.chartDiv}
        style={!showChart ? { transform: 'scaleY(0)', opacity: 0 } : {}}
      >
      <Chart
        options={options}
        data={data}
        onClick={handleClick}
        ref={chartRef}
      />
      </div>
    </div>
  )
}

export default LineDay
