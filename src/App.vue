<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import ResizeHandle from "./mixins/resizeHandle";
import Initialize from "./mixins/initialize";
export default {
  mixins: [ResizeHandle, Initialize],
  created() {
  },
  mounted() {
    document
        .querySelector("html")
        .setAttribute("night", this.$store.state.app.isNightTheme);
  },
};
</script>
<style lang="scss">
html {
  --background: #fff;
  --active-backgroud: #fff6f7;
  --main: #333333;
  --content: #606266;
  --info: #909399;
  --seat: #c0c4cc;
  --classA: #dcdfe6;
  --classB: #e4e7ed;
  --divider: #ebeef5;
  --border: #ebeef5;
  --classD: #080a0e;

  &[night="true"] body {
    --background: #232425;
    --active-backgroud: rgba(71, 76, 80, 0.3);
    --main: #999;
    --content: #888;
    --info: #777;
    --seat: #666;
    --classA: #515253;
    --classB: #454545;
    --divider: #414243;
    --border: #414243;
    --classD: #303030;

    .el-drawer {
      background-color: var(--background);
    }

    .el-backtop,
    .el-table,
    .el-input__inner,
    .el-table tr,
    .el-table th,
    .el-loading-parent--relative,
    .el-table__expanded-cell .el-textarea__inner {
      background-color: var(--active-backgroud);
      border-color: var(--border);

      &.el-table__row:hover {
        background: var(--backgroud);
      }
    }

    .el-table {
      width: 100%;
      border-spacing: 0;
      background-color: #0f1c3e;
      color: #c8cfdd;
      border-radius: 10px;

      thead tr {
        background: #142143;
        height: 60px;

        th {
          text-align: center;
        }
      }

      tbody {
        background: #0f1c3e;

        .tr {
          // color: #0F1C3E;
          height: 60px;
          width: 100%;

          td {
            text-align: center;
            // border-bottom: 1px solid #1b273f;
          }
        }
      }

      tr:nth-child(2n) {
        background: #142143;
      }
    }

    .trNone {
      width: 100%;
      text-align: center;
      line-height: 80px;
      color: #999;
    }

    td,
    th {
      min-width: 3vw;
      max-width: 10vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

  }

  body {
    background: #eeeeee;

    .el-divider {
      background-color: var(--divider);
    }
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    /*color: #2c3e50;*/
    color: var(--main);
  }
}

* {
  margin: 0;
  padding: 0;
}
</style>
