import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import { colors, icons } from '../Variables'
import EntriesList from 'components/pageRefs/EntriesList'

import classes from './styles.module.scss'

const BarMonth = ({ title, stats, moods, updateStats }) => {
  const [cardData, setCardData] = useState(null)
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
    if (cardData === item[0].index + 1) {
      setCardData(null)
    } else {
      setCardData(moods[item[0]?.index]?.mood)
    }
  }

  return (
    <div className={classes.container}>
      {cardData !== null &&
        <div className={classes.entryContainer}>
          <div
            className={classes.blur}
            onClick={() => setCardData(null)}
          />
        <EntriesList
          type={'month'}
          statsArr={stats}
          updateStats={updateStats}
          cardData={cardData}
        />
        </div>
      }
      <Chart options={options} data={data} onClick={handleClick} ref={chartRef} />
    </div>
  )
}

export default BarMonth
