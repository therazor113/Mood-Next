import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import { colors, icons } from '../Variables'
import EntriesList from 'components/pageRefs/EntriesList'

const BarMonth = ({ title, classes, stats, moods, updateStats }) => {
  const [cardIndex, setCardIndex] = useState(null)
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
    if (cardIndex === item[0].index + 1) {
      setCardIndex(null)
    } else {
      setCardIndex(moods[item[0]?.index]?.mood)
    }
  }

  return (
    <div className={classes.chartContainer}>
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
        </div>
      }
      <Chart options={options} data={data} onClick={handleClick} ref={chartRef} />
    </div>
  )
}

export default BarMonth
