<template>
  <div v-loading="loading">
    <el-radio-group v-if="data.type === 'radio'" v-model="inputValue">
      <el-radio
          v-for="(radioItem, radioIndex) in option"
          :key="radioIndex"
          :label="radioItem.value"
      >
        {{ getOptionLabel(radioItem) }}
      </el-radio>
    </el-radio-group>

    <el-select
        v-else-if="data.type === 'select'"
        v-model="inputValue"
        :placeholder="$t('form.pleaseSelect') + getFieldTitle()"
        :filterable="data.search === true"
    >
      <el-option
          v-for="(selectItem, selectIndex) in option"
          :key="selectIndex"
          :value="selectItem.value"
          :label="getOptionLabel(selectItem)"
      ></el-option>
    </el-select>
    <el-checkbox-group
        v-else-if="data.type === 'checkbox'"
        v-model="inputValue"
    >
      <el-checkbox
          v-for="(checkboxItem, checkboxIndex) in option"
          :key="checkboxIndex"
          :label="checkboxItem.value"
      >
        {{getOptionLabel(checkboxItem) }}
      </el-checkbox>
    </el-checkbox-group>

    <div v-else-if="data.type === 'upload:author'">
      <Upload
          @change="uploadChange"
          :field="data.field"
          :type="data.mode || 'cache'"
          class="upload-images"
      >
        <el-image :src="(inputValue || noImages) | resources" class="upload-images"></el-image>
      </Upload>
      <el-tooltip effect="dark" :content="$t('form.chooseRecommendHead')" placement="top-start">
        <i class="fa fa-edge btn-system-header" @click="showSelectHeader"></i>
      </el-tooltip>
    </div>

    <div v-else-if="data.type === 'upload:images'">
      <Upload
          @change="uploadChange"
          :field="data.field"
          :type="data.mode || 'cache'"
          class="upload-images"
      >
        <el-image :src="(inputValue || noImages)" class="upload-images"></el-image>
      </Upload>
    </div>

    <el-cascader
        v-else-if="data.type === 'address'"
        v-model="inputValue"
        :options="addressData"
        :show-all-levels="false"
    ></el-cascader>
    <el-date-picker
        v-else-if="data.type === 'date'"
        v-model="inputValue"
        :value-format="data.valueFormat || 'timestamp'"
        type="date"
        :placeholder="$t('form.pleaseSelect') + getFieldTitle()"
    ></el-date-picker>
    <image-list v-else-if="data.type === 'image-list'" v-model="inputValue"></image-list>
    <el-input v-else-if="data.type === 'textarea'" type="textarea" v-model="inputValue"
              :placeholder="$t('form.pleaseEnter') + getFieldTitle()"></el-input>
    <el-input v-else-if="data.type === 'password'" type="password" v-model="inputValue"
              :placeholder="$t('form.pleaseEnter') + getFieldTitle()"></el-input>
    <el-switch v-else-if="data.type === 'switch'" :active-value="1" :inactive-value="0" v-model="inputValue"></el-switch>
    <input-list v-else-if="data.type === 'inputList'" v-model="inputValue"></input-list>
    <el-input
        v-else
        v-model="inputValue"
        :placeholder="$t('form.pleaseEnter') + getFieldTitle()"
    ></el-input>

    <el-dialog :title="$t('form.systemHeader')" v-if="visibleSelectHeader" :visible.sync="visibleSelectHeader"
               :modal="false"
               :width="$_isMobile ? '92%' : '600'">
      <SelectHeader @select="handleSelectHeader"></SelectHeader>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '../Upload';

const noImages = 'https://resources.iyanghong.cn/global/default_header_1.jpg';
import ImageList from "./ImageList";

import {loadAddressData} from "@/providers/load-vernder";
import SelectHeader from './SelectHeader.vue';
import InputList from './InputList.vue';

export default {
  props: ['value', 'data', 'lang-key'],
  components: {
    Upload,
    SelectHeader,
    ImageList,
    InputList
  },
  data() {
    return {
      noImages: noImages,
      inputValue: this.value,
      addressData: [],
      visibleSelectHeader: false,
      option: [],
      loading: false,
      change: null,
    };
  },
  computed: {
    optionHandle() {
      return this.data.data;
    }
  },
  watch: {
    inputValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('update:value', newValue);
      }

    },
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.inputValue = newValue;
      }

    },
    optionHandle(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.loadOptionData();
      }
    }
  },
  created() {
    this.loadOptionData();
    if (this.data.type === 'checkbox') {
      this.inputValue = [];
    }
    if (typeof this.data.change == 'function') {
      this.change = this.data.change
    }
    loadAddressData().then(data => {
      this.addressData = data;
    })
  },
  methods: {
    uploadChange(response) {
      if (response.success === true) {
        this.$Toast(this.$t('form.uploadSuccess'), 'success');
        setTimeout(() => {
          this.$set(this, 'inputValue', response.data);
        }, 100);
      }
    },
    showSelectHeader() {
      this.visibleSelectHeader = true;
    },
    handleSelectHeader(path) {
      this.inputValue = path;
      this.visibleSelectHeader = false;
    },
    changeEvemt(newValue, oldValue) {
      if (this.change) {
        this.change(newValue, oldValue);
      }
    },
    async loadOptionData() {
      if (typeof this.data.data === 'function') {
        this.loading = true;
        try {
          let data = await this.data.data();
          if (typeof data == 'object') {
            this.option = data;
          } else {
            this.$Toast(this.$t('form.parsingFail'), 'error');
          }
        } catch (e) {
          console.log(e);
        }
        this.loading = false;
      } else if (typeof this.data.data === 'object') {
        this.option = JSON.parse(JSON.stringify(this.data.data));
      } else {
        this.option = [];
      }
    },
    getOptionLabel(item) {
      if (!this.langKey || !this.data.lang) return item.label || item.value;
      let field = this.data.langKey ? this.data.langKey : this.data.field;
      return this.$t(`field.${this.langKey}.${field}_${item.value}`);
    },
    getFieldTitle() {
      if (!this.langKey) return this.data.title || this.data.label
      let field = this.data.langKey ? this.data.langKey : this.data.field;
      if (this.data.field) return this.$t(`field.${this.langKey}.${field}`);
    }
  },
  model: {
    prop: 'value'
  }
};
</script>

<style scoped>
.upload-images {
  border-radius: 10px;
  height: 120px;
  width: 120px;
}

.btn-system-header {
  cursor: pointer;
  position: absolute;
  left: 130px;
  bottom: 0;
}
</style>
