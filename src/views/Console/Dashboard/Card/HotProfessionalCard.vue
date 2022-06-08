<template>
  <div class="hot-professional-card panel-w" v-if="!loading">
    <span class="title-l">热门专业</span>
    <hot-professional-bar :chart-data="chartData"></hot-professional-bar>
  </div>
</template>

<script>
import HotProfessionalBar from "@/views/Console/Dashboard/Chart/HotProfessionalBar";
import {getHotProfessional} from "@/api/statistics";

export default {
  name: "HotProfessionalCard",
  components: {HotProfessionalBar},
  data() {
    return {
      chartData: [],
      loading: true
    }
  },
  created() {
    getHotProfessional().then(response => {
      if (response.success === true) {
        this.chartData = response.data
        this.loading = false;
      }
    })
  }
}
</script>

<style scoped>
.hot-professional-card{
  padding-bottom: 30px;
}
</style>
