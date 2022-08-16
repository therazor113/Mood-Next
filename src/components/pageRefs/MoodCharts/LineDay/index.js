import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import SingleEntry from 'components/pageRefs/SingleEntry'

import classes from './styles.module.scss'

const LineDay = ({ title, stats, moods, updateStats }) => {
  const [cardIndex, setCardIndex] = useState(null)
  const chartRef = useRef()
  const options = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        suggestedMax: 5,
        stepSize: 1,
        ticks: {
          precision: 0
        }
      },
      x: {
        ticks: {
          callback: function (item, index) {
            if (stats[0]?.journal) {
              return stats[index]?.time
            } else {
              return this.getLabelForValue(item)
            }
          }
        }
      }
    },
    datasets: {
      line: {
        borderColor: 'teal',
        backgroundColor: (item) => {
          return item.dataset.colors[item.raw - 1]
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title
      },
      tooltip: {
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
  const labels = [1, 2, 3, 4, 5, 6, 7, 8]
  const colors = ['red', 'pink', 'orange', 'blue', 'lightblue', 'purple', 'teal', 'lightgreen', 'green']

  const data = {
    labels,
    datasets: [{
      colors,
      type: 'line',
      entry: stats,
      data: moods
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
