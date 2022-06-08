<template>
  <div class="dashboard">
    <welcome></welcome>
    <data-total></data-total>
    <hot-professional-card></hot-professional-card>
    <user-province-card></user-province-card>
  </div>
</template>

<script>
import Welcome from "@/views/Console/Dashboard/Card/Welcome";
import DataTotal from "@/views/Console/Dashboard/Card/DataTotal";
import HotProfessionalCard from "@/views/Console/Dashboard/Card/HotProfessionalCard";
import UserProvinceCard from "@/views/Console/Dashboard/Card/UserProvinceCard";
export default {
  name: "Dashboard",
  components: {
    Welcome, DataTotal,HotProfessionalCard,UserProvinceCard
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
