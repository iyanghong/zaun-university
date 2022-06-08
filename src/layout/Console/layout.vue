<template>
  <!-- 控制台视图容器 -->
  <div
    id="layout-console-body"
    :class="{ mobile: $_isMobile }"
    :style="{
      'min-height': parseInt(this.height) - 5 + 'px',
      background: $_isNightTheme ? 'rgb(52,57,59)' : wallBg,
    }"
  >
    <div
      v-if="isMobile && sidebarCover"
      class="drawer-bg"
      @click="hideSidebarCover"
    ></div>
    <sidebar />
    <div
      class="console-body"
      :style="{
        width: $_isMobile ? 'auto' : consoleBodyWitdh + 'px',
        'margin-left': sidebarWidth + 'px',
      }"
    >
      <div class="console-body-header" :style="{ left: sidebarWidth + 'px' }">
        <navbar />
        <tag-view />
      </div>
      <!-- <router-view></router-view> router-view改放在tab-body里 -->
      <tab-body></tab-body>
    </div>
    <div
      v-if="!isMobile"
      class="console-footer"
      :style="{ 'padding-left': sidebarCover ? '210px' : '50px' }"
    >
      Copyright © 孤鸿渺影 All Rights Reserved 备案号:桂ICP备19005303号-1
    </div>
  </div>
</template>

<script>
import Sidebar from "./package/Sidebar";
import TabBody from "./package/TabBody.vue";
import Navbar from "./package/Navbar";
import TagView from "./package/TagView";
import ResizeHandle from "./mixins/ResizeHandle";
import WallBackground from "@/assets/images/wall-bj.png";

export default {
  name: "ConsoleLayout",
  components: { Sidebar, TabBody, Navbar, TagView },
  data() {
    return {
      dataList: [],
      wallBg: "#ecedf0 url(" + WallBackground + ") fixed",
    };
  },
  created() {
    if (this.$_isMobile) {
      this.$store.dispatch("consoleLayout/changeSidebarCover", false);
    }
    this.$store.dispatch("account/readCacheUser");
  },
  mixins: [ResizeHandle],
  methods: {
    hideSidebarCover() {
      this.$store.dispatch("consoleLayout/changeSidebarCover", false);
    },
    handleQuery: function () {},
  },
};
</script>
<style>
body {
  background: var(--background);
}
</style>
<style lang="scss">
@import "./styles/index.scss";
</style>
<style lang="scss" scoped>
@import "./styles/mixin.scss";

.layout-console-body {
  overflow: hidden;
}

.console-body {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  transition: margin-left 0.28s;
  box-sizing: border-box;
  padding-bottom: 30px;
  overflow: hidden;
}

.console-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  left: 0;
  line-height: 30px;
  background: var(--background);
  text-align: left;
  // padding-left: 20px;
  box-sizing: border-box;
  transition: padding-left 0.28s;
  z-index: 1;
}

.console-body-header {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 666;
  transition: left 0.28s;
}

.console-tab-body {
  margin-top: 100px;
  padding-right: 20px;
  transition: width 0.28s;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 8888;
}
</style>
