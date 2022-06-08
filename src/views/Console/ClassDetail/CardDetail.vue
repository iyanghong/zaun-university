<template>
  <div class="card-detail" :class="nowUserId === data.id && 'is-me'">
    <div class="detail-role" :class="data.role !== 0 && 'is-teacher'" v-text="data.role === 0?'学生':'教师'"></div>
    <div class="detail-data">
      <el-image class="detail-header" :src="data.idPhoto"></el-image>
      <div class="detail-data-right">
        <div class="data-item">
          <label v-text="data.role === 0?'学号：':'工号：'"></label>
          <span v-text="data.badgeNumber"></span>
        </div>
        <div class="data-item">
          <label>姓名：</label>
          <span v-text="data.name"></span>
        </div>
        <div class="data-item">
          <label>手机：</label>
          <span v-text="data.phone"></span>
        </div>
        <div class="data-item" v-if="data.job">
          <label>职位：</label>
          <span v-text="data.job"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardDetail",
  props: {
    data: {
      type: Object
    },
    nowUserId: {
      required: null
    }
  }
}
</script>

<style lang="scss" scoped>
.card-detail {
  width: 300px;
  height: 110px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 5px;
  margin: 10px;
  background-color: var(--background);
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;

  &.is-me {
    border: 1px solid #FC5531;

    box-shadow: rgba(252,85,49, 0.19) 0px 10px 20px, rgba(252,85,49, 0.8) 0px 6px 6px;
  }

  .detail-role {
    background-color: #1E9FFF;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #eeeeee;
    position: absolute;
    right: -15px;
    top: 5px;
    font-size: 14px;
    transform: rotate(45deg);

    &.is-teacher {
      background-color: #FC5531;
    }
  }

  .detail-data {
    display: flex;
    flex-wrap: nowrap;
    padding: 10px;

    .detail-header {
      width: 80px;
      height: 80px;
      margin-right: 10px;
    }

    .data-item {
      span {
        color: #909399;
      }
    }
  }

}
</style>
