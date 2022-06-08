<template>
  <div class="ban-edit">
    <el-image v-if="getType() === 'images'" :src="value" class="images-detail"></el-image>
    <span v-else>{{ showValue }}</span>
  </div>
</template>

<script>
import date from '@/utils/date.js';
import {isArray, isFunction} from '@/utils/types.js';
import {loadAddressData} from "@/providers/load-vernder";
// import addressData from '/public/vendor/AddressData.js';


export default {
  name: 'NoEditItem',
  props: ['value', 'data'],
  data() {
    return {
      addressData: [],
      dataList: []
    };
  },
  created() {
    loadAddressData().then(addressData => {
      this.addressData = addressData
    })
    if (this.getType() !== 'images') {
      this.loadDataList();
    }
  },
  computed: {
    showValue() {
      if (typeof this.data.formatHandle == 'function') {
        return this.data.formatHandle.call(this, this.value);
      }
      switch (this.data.type) {
        case 'select':
          for (let dataItem of this.dataList) {
            if (dataItem.value === this.value) {
              return dataItem.label || dataItem.info || dataItem.name || this.value;
            }
          }
          break;
        case 'radio':
          if (isArray(this.data.data)) {
            for (let dataItem of this.data.data) {
              if (dataItem.value === this.value) {
                return dataItem.label || dataItem.info || dataItem.name || this.value;
              }
            }
          }
          break;
        case 'date': {
          let dateFormat = this.data.valueFormat ? this.data.valueFormat : 'yyyy-MM-dd';
          let d = new date(this.value),
              formatValue = d.get(dateFormat);
          if (formatValue) return formatValue;
        }
          break;
        case 'address': {
          return this.resolveAddress();
        }
      }
      return this.value;
    }
  },
  methods: {
    async loadDataList() {
      if (isFunction(this.data.data)) {
        this.dataList = await this.data.data();
      } else if (isArray(this.data.data)) {
        this.dataList = this.data.data;
      }
    },
    resolveAddress() {
      if (this.value > 0) {
        let value = this.value.toString(),
            length = value.length,
            address = [],
            provinces = '',
            city = '',
            area = '';
        if (length >= 2) {
          provinces = this.findAddress(this.addressData, value.substr(0, 2));
          provinces && address.push(provinces.label);
        }
        if (length >= 4 && provinces && provinces.children) {
          city = this.findAddress(provinces.children, value.substr(0, 4));
          city && address.push(city.label);
        }
        if (length >= 6 && city && city.children) {
          area = this.findAddress(city.children, value.substr(0, 6));
          area && address.push(area.label);
        }
        return address.join(' ');
      }
      return '';
    },
    findAddress(data, value) {
      for (let item of data) {
        if (item.value == value) {
          return item;
        }
      }
      return null;
    },
    getType() {
      switch (this.data.type) {
        case 'upload:author': {
          return 'images';
        }
        case 'upload:images': {
          return 'images';
        }
        default: {
          return this.data.type;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ban-edit {
  position: relative;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;

  .images-detail {
    border-radius: 10px;
    height: 120px;
    width: 120px;
  }
}

</style>
