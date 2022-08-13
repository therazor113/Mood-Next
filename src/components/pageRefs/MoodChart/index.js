import { Chart } from 'react-chartjs-2'

import classes from './styles.module.scss'

const MoodChart = ({ stats, statMoods }) => {
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
        text: 'Today\'s Moods'
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
  const labels = ['8:00 AM', '10:00 AM', '12:00 AM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM', '10:00 PM']
  const colors = ['red', 'pink', 'orange', 'blue', 'lightblue', 'purple', 'teal', 'lightgreen', 'green']

  const data = {
    labels,
    datasets: [{
      colors,
      entry: stats,
      data: statMoods
    }]
  }
  return (
    <div className={classes.container}>
      <Chart type='line' options={options} data={data} />
    </div>
  )
}

export default MoodChart
