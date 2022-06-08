<template>
  <div class="t-sidebar--container" :style="{height:height}">
    <t-scrollbar style="width: calc(100%);height: calc(100%)">
      <div class="t-sidebar--menu" :class="collapse && 'is-collapse'">
        <div
            class="menu-item"
            v-for="(item,index) in data"
            :key="index"
            :class="isActive(item) && 'is-active'"
        >
          <div class="menu-data" @click="handleClickMenu(item,index)">
            <el-tooltip :content="item.title" placement="right-start">
                 <span>
                      <i class="menu-item-icon" v-if="item.icon" :class="item.icon"></i>
                 </span>
            </el-tooltip>


            <span class="menu-title" v-text="item.title"></span>
            <i
                class="menu-item-last"
                v-if="item.child && item.child.length > 0"
                :class="showList.indexOf(index) > -1 ? 't-icon-list-arrow-top':'t-icon-list-arrow-down' "
            ></i>
          </div>
          <div
              class="menu-children"
              v-if="item.child && item.child.length > 0"
              :style="{height:getChildrenHeight(index)}"
          >
            <div
                class="menu-children-item"
                v-for="(child,childIndex) in item.child"
                :key="childIndex"
                @click="doAction(child)"
                :class="isActive(child) && 'is-active'"
            >
            <span>
              <i class="menu-item-icon" v-if="child.icon" :class="child.icon"></i>
            </span>
              <span class="menu-child-title" v-text="child.title"></span>
            </div>
          </div>
        </div>
      </div>
    </t-scrollbar>
  </div>
</template>

<script>
import TScrollbar from "@/components/scrollbar/src/scrollbar";

export default {
  name: "TSidebarMenu",
  components: {
    TScrollbar
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    height: {
      default: '100%'
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showList: []
    }
  },
  watch: {
    '$route'(route) {
      this.handleFindActiveMenu(route);
    }
  },
  mounted() {
    //给个定时间延迟，让展开栏出现展开动画
    setTimeout(() => {
      this.handleFindActiveMenu(this.$route);
    });
  },
  methods: {
    /**
     * 顶级菜单栏点击
     * @param menu
     * @param index
     */
    handleClickMenu(menu, index) {
      if (menu.child && menu.child.length > 0) {
        if (this.showList.indexOf(index) > -1) {
          this.showList.splice(this.showList.indexOf(index), 1)
        } else {
          this.showList.push(index);
        }
      }
      this.doAction(menu)
    },
    /**
     * 获取子菜单的高度
     * @param index
     * @returns {string|number}
     */
    getChildrenHeight(index) {
      if (this.showList.indexOf(index) > -1) {
        return (this.data[index].child.length || 0) * 30 + 'px'
      }
      return 0;
    },
    /**
     * 判断是否 激活状态
     * @param item
     * @returns {boolean}
     */
    isActive(item) {
      if (item.view && item.view === this.$route.fullPath) return true;
      return false;

    },
    /**
     * 切换路由
     * @param item
     */
    doAction(item) {
      //如果是在手机端则关闭遮罩层并收缩菜单栏
      if (this.$store.state.app.isMobile && (item.view || item.callback)) {
        this.$store.dispatch('consoleLayout/changeSidebarCover', false);
      }
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
    },
    /**
     * 监听路由变化自动展开对应侧边栏
     * @param route
     */
    handleFindActiveMenu(route) {
      for (let i = 0; i < this.data.length; i++) {
        let item = this.data[i];
        if (item.child && item.child.length > 0) {
          for (let child of item.child) {
            if (child.view && child.view === route.fullPath) {
              if (this.showList.indexOf(i) === -1) this.showList.push(i);
              return;
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.t-sidebar--container {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  letter-spacing: 0.5px;
  position: relative;
  min-height: 100vh;
  padding: 6px 0;
  box-sizing: border-box;
  width: 100%;

  .t-sidebar--menu {
    padding-bottom: 40px;

    .menu-item {
      transition: all 0.3s;

      &.is-active {
        .menu-data {
          background: var(--active-backgroud);
          color: #1890ff;
        }
      }

      .menu-data {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        cursor: pointer;
        line-height: 40px;
        padding: 0 12px;
        box-sizing: border-box;

        .menu-item-last {
          line-height: 40px;
        }

        & > span:first-child {
          margin-right: 5px;
        }

        .menu-title {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:hover {
          background: var(--background);
          color: #1890ff;
        }
      }
    }

    .menu-children {
      height: 0;
      overflow: hidden;
      transition: height 0.2s;
      display: flex;
      flex-wrap: wrap;
      background: var(--active-backgroud);

      .menu-children-item {
        width: 100%;
        text-indent: 20px;
        line-height: 30px;
        border-radius: 2px;

        &.is-active, &:hover {
          color: #1890ff;
          cursor: pointer;
        }
      }

      .menu-child-title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &.is-collapse {
      .menu-item {
        height: 40px;
        line-height: 40px;
        width: 40px;
        transition: all 0.3s;

        .menu-title, .menu-item-last {
          display: none;
        }
      }

      .menu-children {
        display: none;
      }
    }
  }


}
</style>
