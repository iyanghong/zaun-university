<template>
  <div class="welcome panel-w">
    <div class="welcome-content">
      <span v-text="$tl('field.welcome.welcome')"></span>
      <span v-text="getRoleName()"></span>：
      <span class="user-name" v-text="user.name || user.username"></span>
      <span v-text="$tl('field.welcome.nowDate') "></span>：
      <span v-text="nowDate"></span>
    </div>
  </div>
</template>

<script>
import {getDate} from "@/utils/ts-tool";

export default {
  name: "Welcome",
  data() {
    return {
      nowDate: getDate('y-m-d h:i:s'),
    }
  },
  created() {
  },
  computed: {
    user() {
      return this.$store.state.account.user
    },
  },
  methods: {
    getRoleName() {
      switch (this.user.role) {
        case 0:
          return '学生';
        case 1:
          return this.user.job || '老师';
        default:
          return '超级管理员'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.welcome {
  margin-bottom: 20px;
  padding: 10px;

  .welcome-content {
    border-left: 3px solid #5fb878;
    padding-left: 10px;

    .user-name {
      color: red;
      margin-right: 10px;
    }
  }
}
</style>
