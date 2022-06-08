<template>
  <div>
    <div class="input-list-item" v-for="(value,index) in list" :key="index">
      <el-input class="data-item-input" v-model="list[index]" size="mini"></el-input>
      <el-button icon="el-icon-close" type="danger" size="mini" @click="handleDeleteItem(index)"></el-button>
    </div>
    <div class="input-list-item">
      <el-input class="data-item-input" v-model="newValue" size="mini"></el-input>
      <el-button icon="el-icon-plus" size="mini" @click="handlePush"></el-button>
    </div>

  </div>
</template>

<script>
import {isString} from "@/utils/types";

export default {
  name: "InputList",
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      list: [],
      newValue: ''
    }
  },
  watch: {
    value(newValue) {
      if (newValue) {

        this.list = JSON.parse(newValue)
      }
    },
    list(newValue) {
      this.$emit('input', JSON.stringify(newValue))
    }
  },
  created() {
    if (isString(this.value)) {
      this.list = JSON.parse(this.value)
    }
  },
  methods: {
    handlePush() {
      if (this.newValue) {
        this.list.push(this.newValue);
        this.newValue = '';
      }
    },
    handleDeleteItem(index) {
      this.list.splice(index, 1)
    },
  }
}
</script>

<style lang="scss" scoped>
.input-list-item {

  display: flex;
  flex-wrap: nowrap;
  height: 30px;
  line-height: 30px;
  margin: 6px 0;

  .data-item-input {
    width: 90%;
  }

}
</style>
