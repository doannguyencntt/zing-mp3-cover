<template>
  <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
      ref="line-chart"
  />
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartData: {
        labels: [
          '16:00',
          '18:00',
          '20:00',
          '22:00',
          '00:00',
          '02:00',
          '04:00',
          '06:00',
          '08:00',
          '10:00',
          '12:00',
          '14:00'
        ],
        datasets: [
          {
            label: "Có Chơi Có Chịu",
            borderColor: "#27BD9C",
            pointBackgroundColor: "white",
            borderWidth: 1.5,
            lineTension: .5,
            pointBorderColor: "#27BD9C",
            data: [40, 39, 10, 40, 39, 80, 40, 11, 22, 65, 97, 10]
          },
          {
            label: "Sao Cũng Được",
            borderColor: "#4A90E2",
            pointBackgroundColor: "white",
            pointBorderColor: "#4A90E2",
            borderWidth: 1.5,
            lineTension: .7, 
            data: [60, 55, 32, 10, 2, 12, 53, 6, 23, 11, 32, 45, 99]
          },
          {
            label: "Hy Vọng Sai Lầm",
            borderColor: "#E35050",
            pointBackgroundColor: "white",
            pointBorderColor: "#E35050",
            borderWidth: 1.5,
            lineTension: .7, 
            data: [11, 2, 17, 44, 62, 23, 86, 1, 34, 3, 21, 22, 98]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              min: 0,
              max: 100,
              steps: 20,
              grid: {
                display: true
              }
            },
          }
      }
    }
  }
}
</script>
<style lang="scss">
  #line-chart { border-radius: 6px; }
</style>