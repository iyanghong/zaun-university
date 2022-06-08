<template>
  <div class="author-panel">
    <el-dropdown>
      <div class="el-dropdown-link">
        <el-avatar class="user-header"
                   :src="user.idPhoto || 'https://resources.iyanghong.cn/global/noheader.jpg'"></el-avatar>
        <span class="user-name" v-if="width > 300" v-text="user.name || user.username || user.id"></span>
        <i class="el-icon-arrow-down el-icon--right" v-if="width > 300"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled
                          v-text="user.phone||user.email||user.name || user.username || user.id"></el-dropdown-item>
        <el-dropdown-item>
          <span class="menu-item" @click="goAccountProfile" v-text="$t('layout.console.profile')"></span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span class="menu-item" v-text="$t('layout.console.safeSetting')"></span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span class="menu-item" @click="handleLogout" v-text="$t('layout.console.logout')"></span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    width() {
      return this.$store.getters.clientWidth;
    },
    user() {
      return this.$store.state.account.user || {};
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('account/logout');
    },
    goAccountProfile() {
      this.$toMap('/console/account');
    }
  }

}
</script>

<style lang="scss" scoped>
.author-panel {
  line-height: 50px;

  .el-dropdown-link {
    display: flex;
    flex-wrap: nowrap;
  }

  i {
    line-height: 50px;
  }

  .user-header {
    margin-top: 5px;
    vertical-align: middle;
    cursor: pointer;
  }

  .user-name {
    margin-left: 8px;
    cursor: pointer;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;
  }

  .menu-item {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
