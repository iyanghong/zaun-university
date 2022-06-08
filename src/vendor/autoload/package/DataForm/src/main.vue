<script>
// import randomString from '@/providers/dataGenerate/modules/string.js';
import Validator from '@/providers/validator';
import {isEmpty} from '@/utils/ts-tool.js';
import {isArray, isObject, isFunction} from '@/utils/types.js';
import TFormItem from '../../DataFormItem';
import NoEditItem from './no-edit-item.vue';

export default {
  name: 'DataForm',
  components: {
    TFormItem,
    NoEditItem
  },
  model: {
    prop: 'form-data',
    event: 'change'
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    validate: {
      type: Boolean,
      default: true
    },
    showValidateError: {
      type: Boolean,
      default: true
    },
    'form-data': {
      name: 'formData',
      type: Object,
      default: null
    },
    defaultDataHandle: {
      type: Function,
      default: null
    },
    edit: {
      type: Boolean,
      default: true
    },
    op: {
      type: String,
      default: function () {
        return this.edit === false ? 'Detail' : 'Create';
      }
    },
    'btn-save-text': {
      name: 'btnSaveText',
      type: String,
      default: ''
    },
    'label-position': {
      name: 'labelPosition',
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      formKey: 'form',
      // noImages : noImages,
      //表单数据
      form: {},
      //验证规则
      rules: {},
      formLoading: this.loading,
      rows: []
    };
  },
  computed: {
    tempFormData() {
      return this.formData;
    }
  },
  watch: {
    formLoading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('update:loading', newValue);
      }
    },
    tempFormData: {
      handler(newValue) {
        if (isObject(newValue) && newValue !== this.form) {
          this.$set(this,'form',JSON.parse(JSON.stringify(newValue)))
          // this.form = JSON.parse(JSON.stringify(newValue));
        }
      },
      deep: true,
    },
    loading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.formLoading = this.loading;
      }
    }
    ,
    form(newValue) {
      if (isObject(this.formData) && newValue !== this.formData) {
        this.$emit('change', newValue);
        this.$emit('input',newValue)
      }
    }
  },
  created() {
    this.formKey = this.$guid();

    if (isObject(this.formData)) {
      this.form = JSON.parse(JSON.stringify(this.formData));
    } else if (isObject(this.data.data)) {
      this.form = JSON.parse(JSON.stringify(this.data.data));
    }

    if (this.data.rows instanceof Array) {
      this.rows = this.data.rows;
    }
    if (this.data.rules) {
      this.rules = this.data.rules;
    }
    if (isFunction(this.defaultDataHandle)) {
      this.execDefaultDataHandle();
    } else {
      setTimeout(() => {
        this.formLoading = false;
      }, 300);
    }
  }
  ,
  mounted() {
  }
  ,
  methods: {
    handleSave() {
      if (this.formLoading === true) {
        this.$Toast('请等待表单加载完成', 'error');
        return;
      }
      if (this.validate === true) {
        this.validateForm().then(({flag, msg}) => {
          if (flag === true) {
            this.handleAction();
          } else {
            this.$Toast(msg, 'error');
          }
        });
      } else {
        this.handleAction();
      }
    }
    ,
    handleAction() {
      let data = JSON.parse(JSON.stringify(this.form)),
          formData = {};
      for (let item of this.rows) {
        if (isArray(item)) {
          for (let rowItem of item) {
            if(isArray(rowItem)){
             for (let colItem of rowItem){
               formData[colItem.field] = data[colItem.field];
             }
            }else {
              formData[rowItem.field] = data[rowItem.field];
            }
          }
        } else if (!item.collapse) {
          formData[item.field] = data[item.field];
        }
      }
      switch (this.op) {
        case 'Create':
          this.$emit('handleCreate', formData, data);
          break;
        case 'Update':
          this.$emit('handleUpdate', formData, data);
          break;
        case 'Edit':
          this.$emit('handleUpdate', formData, data);
          break;
        case 'Detail':
          this.$emit('handleDetail', formData, data);
          break;
      }
    }
    ,
    async execDefaultDataHandle() {
      this.formLoading = true;
      try {
        let data = await this.defaultDataHandle(this.form);
        if (isObject(data)) {
          for (let key in data) {
            this.$set(this.form, key, data[key])
          }
        } else {
          this.$Toast('数据格式解析失败', 'error');
        }
      } catch (e) {
        console.log(e);
      }

      this.formLoading = false;
    }
    ,
    validateForm() {
      return new Promise((resolve, reject) => {
        let validater = new Validator();
        let rules = JSON.parse(JSON.stringify(this.getRuleList()));
        validater
            .handle(this.form, rules)
            .then(res => {
              if (this.showValidateError === true) {
                if (isArray(res.fail)) {
                  for (let item of res.fail) {
                    this.setFieldErrorMsg(item.field, item.message);
                  }
                } else {
                  this.setFieldErrorMsg(res.fail.field, res.msg);
                }
              }
              resolve(res);
            })
            .catch(res => {
              reject(res);
            });
      });
    }
    ,
    getRuleList() {
      let rules = [];
      for (let item of this.rows) {
        if (item instanceof Array) {
          rules = rules.concat(item);
        } else {
          rules.push(item);
        }
      }
      //加载额外验证规则
      if (isArray(this.rules) && this.rules.length > 0) {
        rules = rules.concat(this.rules);
      } else if (isObject(this.rules) && Object.keys(this.rules).length > 0) {
        /**
         * 判断是 {field : ''}还是{name : {},pwd : {}}
         */
        let firstItem = this.rules[Object.keys(this.rules)[0]];
        if (isObject(firstItem)) {
          for (let key in this.rules) {
            let item = this.rules[key];
            //解析是否有默认field
            if (!item.field && Object.prototype.toString.call(key) === '[object String]') {
              item.field = key;
            }
            rules.push(item);
          }
        } else {
          rules.push(this.rules);
        }
      }
      return rules;
    }
    ,
    /**
     * 显示错误信息
     * @param {Object} field
     * @param {Object} msg
     */
    setFieldErrorMsg(field, msg) {
      for (let index in this.$refs[this.formKey].fields) {
        let formItem = this.$refs[this.formKey].fields[index];
        if (formItem.prop === field) {
          this.$refs[this.formKey].fields[index].validateMessage = msg;
          this.$refs[this.formKey].fields[index].validateState = 'error';
          break;
        } else {
          this.$refs[this.formKey].fields[index].validateMessage = '';
          this.$refs[this.formKey].fields[index].validateState = 'success';
        }
      }
    }
    ,
    getRequiredErrorMessage(item) {
      let msg = '';
      if (item.rule && item.rule.indexOf('required') > -1) {
        let selectArray = ['date', 'radio', 'select', 'date:timestamp'];
        if (item.type && selectArray.indexOf(item.type) > -1) {
          msg = '请选择' + (item.label || item.field);
        } else if (item.type && item.type.indexOf('upload') > -1) {
          msg = '请上传' + (item.label || item.field);
        } else {
          msg = (item.label || item.field) + '不能为空';
        }
      }
      return msg;
    }
    ,
    /**
     * 获取宽度
     * @param {Object} item
     */
    getFormItemWodth(item) {
      let width = item.width;
      if (typeof width == 'number') {
        return `${width}px`;
      }
      return '';
    }
    ,
    checkShow(item) {
      if (typeof item.show === 'function') {
        return item.show.call(this, this.form);
      }
      return item.show;
    }
    ,
    getValue(key) {
      if (isEmpty(key)) return;
      return this.form[key];
    }
    ,
    setValue(key, value) {
      if (isEmpty(key)) return;
      this.$set(this.form, key, value)
    }
    ,
    isShow(item, row) {
      if (isFunction(item.show)) {
        return item.show.call(this, row)
      }
      return item.show;
    },
    getLangKey() {
      return this.langKey || this.data.langKey;
    },
    getLabel(item) {
      let lang = this.getLangKey()
      if (lang) {
        return this.$tl(`field.${lang}.${item.field}`, item.label || item.field);
      }
      return item.label || item.field
    },
    getLabelPosition() {
      if (this.labelPosition) {
        return this.labelPosition
      }
      return this.$_lang === 'en' ? 'top' : 'left'
    },
    handleVisibleCollapse(index) {
      this.$set(this.rows[index], 'visible', !this.rows[index].visible);
    },
    /**
     * 按钮点击事件
     * @param {Function} handle 事件方法
     */
    handleButtonClick(handle) {
      if (typeof handle == 'function') {
        handle.call(this, this.form);
      }
    },
  }
}
;
</script>

<template>
  <div class="t-form-panel">
    <el-form v-loading="formLoading" :ref="formKey" :label-position="getLabelPosition()" label-width="100px"
             :model="form"
             :validate-on-rule-change="false">
      <div v-for="(item, index) in rows" :key="index">
        <el-form-item
            v-if="!(item instanceof Array) && checkShow(item) !== false && !item.collapse"
            :label="getLabel(item)"
            :prop="item.field"
            :rules="{ required: !!(item.rule && item.rule.indexOf('required') > -1), message: getRequiredErrorMessage(item) }"
            :style="{ width: getFormItemWodth(item) }"
        >
          <no-edit-item
              v-if="edit === false || item.edit === false"
              :value="form[item.field]"
              :data="item"
              :lang-key="getLangKey()"
          ></no-edit-item>
          <t-form-item
              v-else
              :lang-key="getLangKey()"
              :value.sync="form[item.field]"
              :data="item"
          ></t-form-item>
        </el-form-item>
        <div
            class="collapse-body"
            v-else-if="!(item instanceof Array) && checkShow(item) !== false && item.collapse === true && item.list instanceof Array">
          <span class="collapse-divider" @click="handleVisibleCollapse(index)">
            <i :class="item.visible === true ? 'ts-icon-list-arrow-down':'ts-icon-list-arrow-right'"></i>
            <span v-text="(item.visible === true ? '收缩':'展开') + '更多设置'"></span>
          </span>
          <el-collapse-transition>
            <div v-show="item.visible !== undefined && item.visible === true">

              <div v-for="(collapseItem, rowIndex) in item.list" :key="rowIndex">
                <el-form-item
                    v-if="!(collapseItem instanceof Array) && checkShow(collapseItem) !== false"
                    :label="collapseItem.label || collapseItem.field"
                    :prop="collapseItem.field"
                    :required="!!(collapseItem.rule && collapseItem.rule.indexOf('required') > -1)"
                    :style="{ width: getFormItemWodth(item) }"
                >
                  <no-edit-item
                      v-if="edit === false || collapseItem.edit === false"
                      :value="form[collapseItem.field]"
                      :data="collapseItem"
                  ></no-edit-item>
                  <t-form-item
                      v-else
                      :value.sync="form[collapseItem.field]"
                      :data="collapseItem"
                      :lang-key="getLangKey()"
                  ></t-form-item>
                </el-form-item>
              </div>

            </div>
          </el-collapse-transition>
        </div>
        <div class="form-rows" v-else-if="item instanceof Array">
          <div v-for="(rowItem, rowIndex) in item" :key="rowIndex">
            <el-form-item
                v-if="!(rowItem instanceof Array) && checkShow(rowItem) !== false"
                :label="rowItem.label || rowItem.field"
                :prop="rowItem.field"
                :required="!!(rowItem.rule && rowItem.rule.indexOf('required') > -1)"
                :style="{ width: getFormItemWodth(item),'margin-right':'10px' }"
            >
              <no-edit-item
                  v-if="edit === false || rowItem.edit === false"
                  :value="form[rowItem.field]"
                  :data="rowItem"
              ></no-edit-item>
              <t-form-item
                  v-else
                  :value.sync="form[rowItem.field]"
                  :data="rowItem"
                  :lang-key="getLangKey()"
              ></t-form-item>
            </el-form-item>

            <div class="form-column-list" v-else-if="rowItem instanceof Array">
              <div v-for="(colItem, colIndex) in rowItem" :key="colIndex">
                <el-form-item
                    v-if="!(colItem instanceof Array) && checkShow(colItem) !== false"
                    :label="colItem.label || colItem.field"
                    :prop="colItem.field"
                    :required="!!(colItem.rule && colItem.rule.indexOf('required') > -1)"
                    :style="{ width: getFormItemWodth(item),'margin-right':'10px' }"
                >
                  <no-edit-item
                      v-if="edit === false || colItem.edit === false"
                      :value="form[colItem.field]"
                      :data="colItem"
                  ></no-edit-item>
                  <t-form-item
                      v-else
                      :value.sync="form[colItem.field]"
                      :data="colItem"
                      :lang-key="getLangKey()"
                  ></t-form-item>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
          type="primary"
          @click="handleSave"
          v-text="btnSaveText || (edit === false ? $t('close') : $t('save'))"
      ></el-button>
      <template v-if="data.button instanceof Array">
        <el-button
            v-for="(buttonItem, buttonIndex) in data.button"
            :key="buttonIndex"
            :type="buttonItem.type || ''"
            :icon="buttonItem.icon || ''"
            @click="handleButtonClick(buttonItem.handle)"
        >
          {{ buttonItem.label || $t(buttonItem.key) }}
        </el-button>
      </template>
      <el-button
          v-if="edit === true"
          v-text="$t('reset') || 'Reset'">
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload-images {
  border-radius: 10px;
  height: 120px;
  width: 120px;
}

.form-rows {
  display: flex;
  flex-wrap: nowrap;
}

.t-form-panel {
  width: 100%;

  & > form {
    width: 100%;
    box-sizing: border-box;
  }

  .collapse-body {
    .collapse-divider {
      font-size: 14px;
      color: #606266;
      display: block;
      cursor: pointer;
      margin-bottom: 12px;

      &:after {
        content: "";
        display: inline-block;
        background-color: #d8d8d8;
        width: calc(100% - 150px);
        height: 1px;
        margin: 0 12px;
        vertical-align: middle;
      }
    }
  }
}
</style>
