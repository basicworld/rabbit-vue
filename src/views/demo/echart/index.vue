<template>
  <div class="app-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

  </div>
</template>

<script>
import LineChart from './components/LineChart'
import { areYouOk } from '@/api/router'

export default {
  name: 'Echart',
  components: {
    LineChart
  },
  data() {
    return {
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      }
    }
  },
  created() {
    areYouOk()
  }

}
</script>
