<template>
  <div :class="{ sidebar: true, hideSidebar: isCollapse, showSidebar: !isCollapse, 'sidebar-mobile': isMobile }"
       :style="{ width: width + 'px' }">
    <logo :collapse="isCollapse"></logo>
    <t-sidebar-menu :data="leftMenuData" :height="menuPanelHeight" :collapse="isCollapse"></t-sidebar-menu>
    <!--		<el-scrollbar wrap-class="scrollbar-wrapper" class="sidebar-scrollbar">
          <el-menu
            :default-active="defaultActive"
            :default-openeds="defaultOpeneds"
            class="layout-console-sidebar"
            :collapse-transition="false"
            mode="vertical"
            :collapse="isCollapse"
          >
            <sidebar-item v-for="(item, index) in leftMenuData" :key="index" :data="item" :baseIndex="index.toString()" />
          </el-menu>
        </el-scrollbar>-->

  </div>
</template>

<script>
// import SidebarItem from './SidebarItem.vue';
import TSidebarMenu from '@/components/SidebarMenu'
import InitLeftMenu from '../../mixins/InitLeftMenu.js';
import Logo from './Logo.vue';

export default {
  props: {},
  components: {
    TSidebarMenu,
    // SidebarItem,
    Logo
  },
  computed: {
    leftMenuData() {
      return this.$store.state.consoleLayout.leftMenuData || [];
    },
    menuPanelWidth() {
      return this.width + 22 + 'px';
    },
    menuPanelHeight() {
      return this.$_height - 70 + 'px';
    },
    width() {
      return this.$store.state.consoleLayout.sidebarCover ? 200 : 40;
    },
    isCollapse() {
      return !this.$store.state.consoleLayout.sidebarCover;
    },
    isMobile() {
      return this.$store.state.app.isMobile;
    }
  },
  mixins: [InitLeftMenu],
  data() {
    return {
      defaultOpeneds: [],
      defaultActive: ''
    };
  },
  created() {
    this.initDefaultOpeneds();
    this.initActive();
  },
  methods: {
    initRoute() {
      for (let item of this.leftMenuData) {
        if (item.view !== '') {
          if (this.$route.path !== item.view) {
            this.$toMap(item.view);
          }
          return;
        }
        if (item.child) {
          for (let child of item) {
            if (child.view !== '') {
              if (this.$route.path !== child.view) {
                this.$toMap(child.view);
              }
              return;
            }
          }
        }
      }
    },
    initDefaultOpeneds() {
      for (let i in this.leftMenuData) {
        if (this.leftMenuData[i].show) {
          this.defaultOpeneds.push(i);
        }
      }
    },
    initActive() {
      let path = this.$route.path;
      for (let i in this.leftMenuData) {
        if (this.leftMenuData[i].view && this.leftMenuData[i].view === path) {
          this.defaultActive = this.leftMenuData[i].view;
          return;
        }
        if (this.leftMenuData[i].child instanceof Array) {
          let child = this.leftMenuData[i].child;
          for (let j in child) {
            if (child[j].view && child[j].view === path) {
              this.defaultActive = child[j].view;
              return;
            }
          }
        }
      }
    },
    doAction(item) {
      if (item.view) {
        if (item.view === this.$route.path) {
          this.$router.replace({path: '/redirect' + item.view});
        } else {
          this.$router.push(item.view);
        }
        return;
      }
      if (typeof item.callback == 'function') {
        item.callback(this);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../styles/sidebar.scss';
</style>
<style lang="scss" scoped>
.sidebar {
  transition: width 0.28s;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  background: var(--background);
  z-index: 666;

  .sidebar-scrollbar {
    height: 100%;
  }

  .layout-console-sidebar {
    transition: width 0.28s;

    &:not(.el-menu--collapse) {
      transition: width 0.28s;
      min-height: 400px;
      height: 100%;
    }

    &.el-menu--collapse > div {
      overflow: hidden;
    }

    &.el-menu--collapse .el-submenu__icon-arrow.el-icon-arrow-right,
    &.el-menu--collapse [slot='title'] {
      display: none;
    }
  }

  .el-submenu__title,
  .el-menu-item {
    text-align: left;
    padding-left: 20px;
  }

  .el-submenu__title i {
    margin-right: 10px;
  }

}
</style>
