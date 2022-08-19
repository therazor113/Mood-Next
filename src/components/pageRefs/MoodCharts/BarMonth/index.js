import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import EntriesList from 'components/pageRefs/EntriesList'

import classes from './styles.module.scss'

const BarMonth = ({ title, stats, moods, updateStats }) => {
  const [cardIndex, setCardIndex] = useState(null)
  const [cardData, setCardData] = useState([])
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
        bodyFont: {
          size: 15,
          weight: 600
        },
        callbacks: {
          title: (item) => {
            return moods[item[0].dataIndex]?.mood + '\'s'
          },
          labelColor: (item) => {
            return {
              borderColor: item.dataset.colors[item.dataIndex],
              backgroundColor: item.dataset.colors[item.dataIndex]
            }
          },
          labelTextColor: (item) => {
            return item.dataset.colors[item.dataIndex]
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
      label: 'Click to show entries',
      entry: stats,
      data: moods.map(o => o?.count)
    }]
  }

  const handleClick = (e) => {
    const item = getElementAtEvent(chartRef.current, e)
    if (!item.length) return
    if (cardIndex === item[0].index) {
      setCardIndex(null)
    } else {
      setCardIndex(item[0].index)
      setCardData(moods[item[0]?.index]?.mood)
    }
  }

  return (
    <>
      <div className={classes.container}>
        <Chart options={options} data={data} onClick={handleClick} ref={chartRef} />
      </div>
       <EntriesList
          statsArr={stats}
          updateStats={updateStats}
          cardIndex={cardIndex}
          cardData={cardData}
        />
    </>
  )
}

export default BarMonth
