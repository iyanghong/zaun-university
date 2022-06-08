<template>
  <div class="data-total">
    <div class="panel-group el-row">
      <div v-for="(item,index) in data" :key="index"
           class="card-panel-col el-col el-col-24 el-col-xs-12 el-col-sm-12 el-col-lg-6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">


            <svg-icon v-if="item.iconType === 'svg'" :icon="item.icon" iconClass="svg-icon card-panel-icon"></svg-icon>
            <i v-else class="card-panel-icon" :class="item.icon"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text" v-text="item.title"></div>
            <span class="card-panel-num" v-text="item.value"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDataTotal} from "@/api/statistics";

export default {
  name: "DataTotal",
  data() {
    return {
      data: {
        professionalTotal: {
          value: 0,
          title: '专业数',
          icon: 'el-icon-menu'
        },
        classTotal: {
          value: 0,
          title: '班级数',
          icon: 'el-icon-s-flag'
        },
        teacherTotal: {
          value: 0,
          title: '教师数',
          icon: 'el-icon-s-custom'
        },
        studentTotal: {
          value: 0,
          title: '学生数',
          icon: 'el-icon-user'
        }
      }
    }
  },
  created() {
    getDataTotal().then(response => {
      if (response.success === true) {
        for (let key in response.data) {
          this.data[key].value = response.data[key]
        }
      }
    })
  },
  methods: {
    getIcon() {

    },

  }


}
</script>

<style lang="scss" scoped>
.data-total {
  .card-panel-col {
    margin-bottom: 32px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    //color: #666;
    color: var(--content);
    background: var(--background);
    box-shadow: rgba(50, 50, 105, 0.15) 0 2px 5px 0, rgba(0, 0, 0, 0.05) 0 1px 1px 0;
    /*box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);*/
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    .card-panel-icon-wrapper {
      margin: 14px 0 0 14px;
      padding: 16px;
      -webkit-transition: all 0.38s ease-out;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      color: var(--content);
    }

    .card-panel-icon {
      font-size: 48px;
    }

    .card-panel-description {
      /*float: right;*/
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: var(--main);
        //color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }

  &.mobile {
    .card-panel {
      flex-wrap: wrap;

      .card-panel-icon {
        font-size: 22px;
      }

      .card-panel-description {
        margin: 0;
      }

      .card-panel-description {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
  }

}
</style>
