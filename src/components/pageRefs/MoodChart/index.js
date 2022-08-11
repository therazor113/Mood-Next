import { Chart } from 'react-chartjs-2'

import classes from './styles.module.scss'

const MoodChart = () => {
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
        label: 'Dataset 2',
        data: [3, 7, 8, 3, 2, 7, 6, 8],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderJoinStyle: 'round'
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
