import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import EntriesList from 'components/pageRefs/EntriesList'

import classes from './styles.module.scss'

const BarMonth = ({ title, stats, moods, updateStats }) => {
  const [cardIndex, setCardIndex] = useState(null)
  const [cardData, setCardData] = useState([])
  const chartRef = useRef()
  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        suggestedMax: 5,
        stepSize: 1,
        ticks: {
          precision: 0
        }
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
        text: title
      },
      tooltip: {
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
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const colors = ['red', 'orange', 'pink', 'blue', 'lightblue', 'purple', 'teal', 'lightgreen', 'green']

  const data = {
    labels,
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
