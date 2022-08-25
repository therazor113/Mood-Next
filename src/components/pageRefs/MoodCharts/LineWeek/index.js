import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import { colors, solidColors, icons, createGradient } from '../Variables'
import EntriesList from 'components/pageRefs/EntriesList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons'

const LineWeek = ({ classes, stats, moods, dateTitle, setCounter, updateStats }) => {
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
          callback: (item, index) => {
            return icons[index]
          }
        }
      },
      x: {
        ticks: {
          beginAtZero: true,
          suggestedMax: 7,
          font: {
            size: '15',
            weight: '600'
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
        right: 30
      }
    },
    datasets: {
      line: {
        backgroundColor: (item) => {
          return item.dataset.solidColors[Math.round(item.raw - 1)]
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
            return icons[Math.round(item[0].raw - 1)]
          },
          beforeBody: () => 'Click to show entries',
          label: () => {
            return undefined
          }
        }
      }
    }
  }

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        <h2>Weekly Moods</h2>
        <h3>{dateTitle}</h3>
      </div>
      {cardIndex !== null &&
        <div className={classes.entryContainer}>
          <div
            className={classes.blur}
            onClick={() => setCardIndex(null)}
          />
          <EntriesList
            type={'week'}
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
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={classes.prevArrow}
          onClick={() => {
            setCardIndex(null)
            setCounter(prev => { return { ...prev, week: prev.week - 7 } })
          }}
        />
        <Chart
          options={options}
          data={data}
          onClick={handleClick}
          ref={chartRef}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          className={classes.nextArrow}
          onClick={() => {
            setCardIndex(null)
            setCounter(prev => { return { ...prev, week: prev.week + 7 } })
          }}
        />
      </div>
    </div>
  )
}

export default LineWeek
