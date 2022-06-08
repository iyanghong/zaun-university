<template>
  <div
      class="table-contextmenu"
      :style="{
        top: positionRowContextmenu.top + 'px',
        left: positionRowContextmenu.left + 'px',
      }">
    <el-button class="button-item" size="mini" @click="handleRefresh">刷新</el-button>
    <div v-if="buttonList.length > 0" class="separator"></div>
    <template
        v-for="(item,index) in buttonList"
    >
      <el-button
          class="button-item"
          size="mini"
          v-if="isShowCallback(item,row)"
          :type="item.type || ''"
          @click="handleButtonClick(item.handle)"
          :key="index"
      >
        {{ item.label || $t(item.key) }}
      </el-button>
    </template>
  </div>
</template>

<script>
import {EventListener} from '@/utils/dom'

export default {
  name: "ContextButton",
  props: {
    buttonList: {
      type: Array
    },
    isShowCallback: {
      type: Function
    }
  },
  data() {
    return {
      contextmenuItemList: [],
      positionRowContextmenu: {
        top: 0,
        left: 0
      },
      row: {},
      column: {}
    }
  },
  created() {
  },
  methods: {
    init(row, column, e) {
      this.row = row;
      this.column = column;
      let left = e.clientX,
          top = e.clientY;
      this.positionRowContextmenu.left = left + 10;
      this.positionRowContextmenu.top = top - 20;
      let _cancelEvent = EventListener.listen(document, 'click', () => {
        this.$emit('close');
        _cancelEvent.remove();
      });
    },
    handleButtonClick(handle) {
      this.$emit("buttonClick", handle, this.row)
    },
    handleRefresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-contextmenu {
  width: 100px;
  margin: 0;
  background: #fff;
  position: fixed;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  z-index: 990602;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;

  .button-item {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    border-radius: 0;
  }

  .separator {
    height: 0;
    width: 80%;
    margin: 10px auto;
    border-bottom: 1px solid #eaecef
  }
}
</style>
