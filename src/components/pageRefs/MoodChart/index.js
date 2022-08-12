import { Chart } from 'react-chartjs-2'

import classes from './styles.module.scss'

const MoodChart = ({ stats, statNumbers }) => {
  const options = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        suggestedMax: 4,
        stepSize: 1
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Mood by week'
      },
      tooltip: {
        callbacks: {
          label: (item) => {
            return `Entry: ${item.dataset.entry[item.dataIndex].journal}`
          },
          labelColor: (item) => {
            return {
              borderColor: item.dataset.color[item.raw - 1],
              backgroundColor: item.dataset.color[item.raw - 1]
            }
          },
          labelTextColor: (item) => {
            return item.dataset.color[item.raw - 1]
          }
        }
      }
    }
  }
  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const colors = ['red', 'pink', 'purple', 'blue', 'lightblue', 'teal', 'gray', 'lightgreen', 'green']

  const data = {
    labels,
    datasets: [{
      entry: stats,
      color: colors,
      data: statNumbers,
      tension: 0.1,
      borderColor: 'teal',
      backgroundColor: [
        colors[stats[0].number - 1],
        colors[stats[1].number - 1]
      ]
    }]
  }
  return (
    <div className={classes.container}>
      <Chart type='line' options={options} data={data} />
    </div>
  )
}

export default MoodChart
