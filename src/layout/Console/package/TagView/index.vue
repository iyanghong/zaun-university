<template>
  <div class="tag-view-list">
    <el-scrollbar ref="scrollContainer" wrap-class="scrollbar-wrapper" :vertical="false"
                  class="tag-view-list-scrollbar" @wheel.native.prevent="handleScroll">
      <router-link
          v-for="tag in visitedViews"
          ref="tag"
          :key="tag.path"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          tag="span"
          class="tags-view-item"
          @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        <span class="tag-title" v-text="getTitle(tag)"></span>
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>

      <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
        <li @click="refreshSelectedTag(selectedTag)">{{$t('layout.console.refresh')}}</li>
        <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">{{$t('layout.console.close')}}</li>
        <li @click="closeOthersTags">{{$t('layout.console.closeOthers')}}</li>
        <li @click="closeAllTags(selectedTag)">{{$t('layout.console.closeAll')}}</li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import ScrollPanel from '../../mixins/ScrollPanel.js'
import {isEmpty} from '@/utils/ts-tool'

export default {
  data() {
    return {
      visible: false,
      left: 0,
      top: 0,
      selectedTag: {}
    };
  },
  mixins: [ScrollPanel],
  computed: {
    visitedViews() {
      return this.$store.state.consoleLayout.visitedViews;
    },
    defaultTags() {
      return this.$store.state.consoleLayout.defaultTags;
    }
  },
  watch: {
    $route() {
      this.addTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    }
  },
  created() {
    this.$store.dispatch('consoleLayout/setDefaultTags',
        this.$config.consoleLayout.defaultTags || []);
  },
  mounted() {
    this.initTags();
    if ((this.$route.path === '/console' || this.$route.path === '/console/') && !isEmpty(this.defaultTags)) {
      this.$router.push(this.defaultTags[0])
    } else {
      this.addTag();
    }


  },
  methods: {
    /**
     * 初始化标签
     */
    initTags() {
      for (let item of this.defaultTags) {
        item.meta.affix = true;
        this.$store.dispatch('consoleLayout/addView', item);
      }
    },
    /**
     * 判断是不是当前标签页面
     * @param {Object} route
     */
    isActive(route) {
      return route.path === this.$route.path;
    },
    /**
     * 判断是不是固定标签
     * @param {Object} view
     */
    isAffix(view) {
      if (view && Object.keys(view).length === 0) return false;
      if (this.defaultTags.some(v => v.path === view.path)) {
        return true;
      }
      return false;
    },
    /**
     * 添加标签
     */
    addTag() {

      this.$store.dispatch('consoleLayout/addView', this.$route);
    },
    /**
     * 关闭其他标签
     */
    closeOthersTags() {
      if (this.selectedTag.fullPath !== this.$route.fullPath) {
        this.$router.push(this.selectedTag);
      }
      this.$store.dispatch('consoleLayout/delOthersViews', this.selectedTag).then(() => {
        this.initTags();
      });
    },
    /**
     * 关闭所选标签
     * @param {Object} view
     */
    closeSelectedTag(view) {
      this.$store.dispatch('consoleLayout/delView', view).then(({visitedViews}) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view);
        }
      });
    },
    /**
     * 关闭所有标签
     * @param {Object} view
     */
    closeAllTags(view) {
      this.$store.dispatch('consoleLayout/delAllViews').then(() => {
        this.initTags();
        this.toLastView(view);
      });
    },
    /**
     * 刷新当前标签页面
     * @param {Object} view
     */
    refreshSelectedTag(view) {
      this.$store.dispatch('consoleLayout/delCachedView', view).then(() => {
        const {fullPath} = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          });
          // this.$router.push(view);
        });
      });
    },

    /**
     * 打开菜单
     * @param {Object} tag
     * @param {Object} e
     */
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    /**
     * 关闭菜单
     */
    closeMenu() {
      this.visible = false;
    },
    /**
     * 跳转最后一个页面
     * @param {Object} view 当前页面
     */
    toLastView(view) {
      if (this.visitedViews.length > 0) {
        let lastView = this.visitedViews[this.visitedViews.length - 1];
        if (view && view.path === lastView.fullPath) {
          this.$router.replace({path: '/redirect' + view.fullPath});
        } else {
          this.$router.push(lastView.fullPath);
        }
      } else {
        this.$router.push('/');
      }
    },
    getTitle(tag) {
      if (tag.meta.lang) return this.$tl(`router.${tag.name}`, tag.title);
      return tag.title;
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-view-list {
  transition: width 0.28s;
  height: 40px;
  width: 100%;
  line-height: 40px;
  border-top: 1px solid var(--border);
  background: var(--background);

  .tag-view-list-scrollbar {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    top: -13px;
    width: 100%;

    ::v-deep {
      .el-scrollbar__bar {
        bottom: 0px;
      }

      .el-scrollbar__wrap {
        height: 62px;
      }
    }

    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      border-top: 1px solid var(--border);
      border-left: 1px solid var(--border);
      border-right: 1px solid var(--border);
      color: #495060;
      background: var(--active-background);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-bottom: 6px;
      // margin-top: 3px;
      &.active {
        background: var(--active-backgroud);
      }

      &.active .tag-title {
        color: #1e9fff;
      }

      .el-icon-close {
        margin-left: 3px;
      }
    }
  }

  .tags-view-item > span:hover {
    cursor: pointer;
    color: #1e9fff;
  }

  .contextmenu {
    margin: 0;
    background: var(--background);
    position: fixed;
    list-style-type: none;
    padding: 2px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    z-index: 990602;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 2px 16px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;

      &:hover {
        background: var(--active-backgroud);
      }
    }
  }

}
</style>
