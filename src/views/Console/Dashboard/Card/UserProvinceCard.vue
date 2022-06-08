<template>
  <div class="user-province-card panel-w">
    <!--        <span class="title-l">用户省份分布图</span>-->
    <user-province-chart v-if="!loading" :chart-data="chartData"></user-province-chart>
  </div>
</template>

<script>
import {getProvinceTotal} from "@/api/statistics";
import UserProvinceChart from "@/views/Console/Dashboard/Chart/UserProvinceChart";

export default {
  name: "UserProvinceCard",
  components: {
    UserProvinceChart
  },
  data() {
    return {
      chartData: [],
      loading: true
    }
  },
  created() {
    getProvinceTotal().then(response => {
      if (response.success) {
        this.chartData = response.data;
        this.loading = false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.user-province-card {
  margin-top: 20px;
}
</style>
