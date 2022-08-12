import { Chart } from 'react-chartjs-2'

import classes from './styles.module.scss'

const MoodChart = ({ stats }) => {
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Mood by month'
      }
    }
  }
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: stats,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }
  return (
    <div className={classes.container}>
      <Chart type='line' options={options} data={data} />
    </div>
  )
}

export default MoodChart
