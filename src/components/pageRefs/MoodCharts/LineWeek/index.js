import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import EntriesList from 'components/pageRefs/EntriesList'

import classes from './styles.module.scss'

const LineWeek = ({ title, stats, moods, updateStats }) => {
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
      }
    },
    datasets: {
      line: {
        borderColor: 'teal',
        backgroundColor: (item) => {
          return item.dataset.colors[Math.round(item.raw)]
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
            const entryList = []
            for (let i = 0; i < item.dataset.entry[item.dataIndex].entries.length; i++) {
              entryList.push(i + 1 + ': ' + item.dataset.entry[item.dataIndex].entries[i].journal)
            }
            return `Entries: ${entryList.join('\r\n')}`
          },
          labelColor: (item) => {
            return {
              borderColor: item.dataset.colors[Math.round(item.raw)],
              backgroundColor: item.dataset.colors[Math.round(item.raw)]
            }
          },
          labelTextColor: (item) => {
            return item.dataset.colors[item.raw - 1]
          }
        }
      }
    }
  }
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const colors = ['red', 'pink', 'orange', 'blue', 'lightblue', 'purple', 'teal', 'lightgreen', 'green']

  const data = {
    labels,
    datasets: [{
      colors,
      type: 'line',
      entry: stats,
      data: moods.map(o => o.avg)
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
        <EntriesList
          statsArr={stats}
          updateStats={updateStats}
          cardIndex={cardIndex}
        />
    </>
  )
}

export default LineWeek
