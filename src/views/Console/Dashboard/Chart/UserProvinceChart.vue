<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import {loadEcharts, loadChinaMapJson} from "@/providers/load-vernder";
import resize from "@/views/Console/Dashboard/mixins/resize";

export default {
  name: "UserProvinceChart",
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
      type: Array,
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
    initChart() {
      loadEcharts().then((echarts) => {
        loadChinaMapJson().then(chinaMapJson => {
          this.chart = echarts.init(this.$el);
          echarts.registerMap('china', chinaMapJson);
          this.setOptions(this.chartData, '')
        })

      })
    },
    reload() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    setOptions(data) {
      if (this.chart === null) return;
      let resolverData = [];
      let visualMapMax = 0;
      for (let item of data){
        if (item.total > visualMapMax) {
          visualMapMax = item.total;
        }
        resolverData.push({
          name: provinces[item.code],
          value: item.total
        });
      }

      /*let visualMapMax = 0;
      let toolboxShow = !this.$_isMobile;
      for (let item of data) {
        if (item.total > visualMapMax) {
          visualMapMax = item.total;
        }
        resolverData.push({
          name: this.resolverProvince(item.province_name),
          value: item.total
        });
      }*/
      this.chart.setOption({
        title: {
          text: '学生分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },

        visualMap: {
          min: 0,
          max: visualMapMax,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],           // 文本，默认为数值文本
          calculable: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '学生分布',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: resolverData
          }]
      }, true); // set option end
    },
    resolverProvince(value) {
      for (let i in provinces) {
        let itemName = provinces[i];
        if (value.indexOf(itemName) > -1) {
          return itemName;
        }
      }
    }
  }
}
const provinces = {
  11: "北京",
  12: "天津",
  13: "河北",
  14: "山西",
  15: "内蒙古",
  21: "辽宁",
  22: "吉林",
  23: "黑龙江",
  31: "上海",
  32: "江苏",
  33: "浙江",
  34: "安徽",
  35: "福建",
  36: "江西",
  37: "山东",
  41: "河南",
  42: "湖北",
  43: "湖南",
  44: "广东",
  45: "广西",
  46: "海南",
  50: "重庆",
  51: "四川",
  52: "贵州",
  53: "云南",
  54: "西藏",
  61: "陕西",
  62: "甘肃",
  63: "青海",
  64: "宁夏",
  65: "新疆",
  71: "台湾",
  81: "香港",
  82: "澳门",
  91: "国外"
};
</script>

<style lang="scss" scoped>

</style>
