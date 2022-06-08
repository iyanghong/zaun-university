<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
// import * as echarts from 'echarts'
import {loadEcharts} from "@/providers/load-vernder";

/* require('echarts/theme/macarons')  */
import resize from "@/views/Console/Dashboard/mixins/resize";

export default {
  name: "HotProfessionalBar",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  created() {

  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    reload() {
      this.$nextTick(() => {
        this.initChart()
      });
    },
    initChart() {
      loadEcharts().then((echarts) => {
        this.chart = echarts.init(this.$el);
        this.setOptions(this.chartData)
      })
    },
    setOptions(data) {
      if (this.chart === null) return;
      let keys = [], values = [];
      for (let item of data) {
        keys.push(item.professionalName);
        values.push(item.total)
      }
      this.chart.setOption({
            tooltip: {
              show: true,
              formatter:'{b}：{c}人'
            },
            color: ['#2EB7BD', '#3CE1D9', '#FBBACB', '#4695D1'],
            xAxis: {
              type: 'category',
              data: keys,
              axisLabel: { //X轴字体倾斜设置
                interval: 0,
                rotate: -30 //倾斜的程度
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'bar',
                itemStyle: {
                  normal: {
                    label: {
                      formatter: "{c}" + "人",
                      show: true,
                      position: "top",
                      textStyle: {
                        fontWeight: "bolder",
                        fontSize: "12",
                        color: "#fff"
                      }
                    },
                    opacity: 1
                  }
                }
              }
            ]
          }
      )
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
