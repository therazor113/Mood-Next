import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import { colors, icons } from '../Variables'
import EntriesList from 'components/pageRefs/EntriesList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons'

const BarMonth = ({ classes, stats, moods, dateTitle, setCounter, updateStats }) => {
  const [cardIndex, setCardIndex] = useState(null)
  const [showChart, setShowChart] = useState(true)
  const chartRef = useRef()

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 5,
        stepSize: 1,
        ticks: {
          precision: 0,
          font: {
            size: '18',
            weight: '500'
          }
        }
      },
      x: {
        beginAtZero: false,
        suggestedMax: 9,
        stepSize: 1,
        ticks: {
          color: (item) => {
            return colors[item.index]
          },
          font: {
            size: '25'
          },
          callback: (item, index) => {
            return icons[index]
          }
        }
      }
    },
    layout: {
      padding: {
        left: 25,
        bottom: 13,
        right: 30
      }
    },
    datasets: {
      bar: {
        backgroundColor: (item) => {
          return item.dataset.colors[item.index]
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
            return icons[item[0].dataIndex]
          },
          beforeBody: () => {
            return 'Click to show entries'
          },
          label: () => {
            return undefined
          }
        }
      }
    }
  }

  const data = {
    labels: icons,
    datasets: [{
      colors,
      type: 'bar',
      entry: stats,
      data: moods.map(o => o?.count)
    }]
  }

  const handleClick = (e) => {
    const item = getElementAtEvent(chartRef.current, e)
    if (!item.length) return
    if (cardIndex === item[0].index + 1) {
      setCardIndex(null)
    } else {
      setCardIndex(moods[item[0]?.index]?.mood)
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
        <h2>Monthly Stats</h2>
        <h3>{showChart && dateTitle}</h3>
      </div>
      {cardIndex !== null &&
        <div className={classes.entryContainer}>
          <div
            className={classes.blur}
            onClick={() => setCardIndex(null)}
          />
        <EntriesList
          type={'month'}
          statsArr={stats}
          updateStats={updateStats}
          cardIndex={cardIndex}
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
            setCounter(prev => { return { ...prev, month: prev.month - 1 } })
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
            setCounter(prev => { return { ...prev, month: prev.month + 1 } })
          }}
        />
      </div>
    </div>
  )
}

export default BarMonth
