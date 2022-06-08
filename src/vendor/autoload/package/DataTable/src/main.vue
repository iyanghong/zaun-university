<script>
import date from '@/utils/date.js';
import {isEmpty} from '@/utils/ts-tool.js';
import DateTimeScope from '../../DateTimeScope';
import {isObject, isVNode, isArray} from '@/utils/types.js';
import DataFormItem from '../../DataFormItem';
import request from '@/providers/request.js';
import config from '@/config/request.js';
import {isFunction} from "@/utils/types";
// import Vue from 'vue'
import ImportExcel from "@/vendor/autoload/package/ImportExcel";
import {handleImport} from "@/vendor/autoload/package/DataTable/src/importer";
import ContextButton from './context-button'

export default {
  name: 'DataTable',
  components: {
    DateTimeScope,
    DataFormItem,
    ImportExcel,
    ContextButton
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    //搜索条件
    search: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    //模糊搜索条件
    fuzzySearch: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    page: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      loading: false,
      moreFilter: false,
      moreFilterLoading: false,
      nopage: this.data.nopage || false,
      dataList: [],
      total: 0,
      listQuery: {
        page: this.page || this.data.page || this.data.pageNumber || 1,
        limit: this.limit || this.data.limit || this.data.pageSize || 10
      },
      //查询条件
      searchQuery: {},
      //模糊查询条件
      fuzzySearchQuery: {},
      //搜索form渲染
      searchCols: [],
      //数据表列
      cols: [],
      importer: {
        open: false,
        visible: false,
        success: null,
        cols: []
      },
      //显示右键菜单
      visibleRowContextmenu: false
    };
  },
  computed: {
    width() {
      return this.$store.getters.clientWidth;
    },
    actionButtonList() {
      let list = this.cols.filter(item => !item.field && isArray(item.button));
      return list[0] ? list[0].button : [];
    }
  },
  created() {
    if (this.data.cols instanceof Array) {
      this.cols = this.data.cols;
    }
    if (Object.keys(this.search).length) {
      this.searchQuery = this.search;
    }
    if (Object.keys(this.fuzzySearch).length) {
      this.fuzzySearchQuery = this.fuzzySearch;
    }
    if (this.data.searchCols instanceof Array) {
      this.searchCols = this.data.searchCols;
    }
    this.getList();
    if (this.$store.state.app.isMobile) {
      this.moreFilter = true;
    }
    if (this.data.import) {
      this.resolveImport(this.data.import);   //解析导入规则

    }
  },
  methods: {
    getDataList() {
      return this.dataList
    },
    /**
     * 请求数据
     */
    getList() {
      let handle = this.data.handleApi || this.data.api;
      if (isEmpty(handle)) {
        this.$message({
          message: '未配置表格数据接口',
          type: 'error'
        });
        return false;
      }
      this.loading = true;
      let postData = JSON.parse(JSON.stringify(this.listQuery));

      let where = {};

      for (let key in this.searchQuery) {
        if (!isEmpty(this.searchQuery[key]) || this.searchQuery[key] === 0) {
          where[key] = this.searchQuery[key];
        }
      }

      if (!isEmpty(where)) {
        Object.assign(postData, where)
        // postData.where = JSON.stringify(where);
      }

      let like = {};

      for (let key in this.fuzzySearchQuery) {
        if (!isEmpty(this.fuzzySearchQuery[key])) {
          like[key] = this.fuzzySearchQuery[key];
        }
      }
      if (!isEmpty(like)) {
        Object.assign(postData, like)
        // postData.like = JSON.stringify(like);
      }
      if (typeof this.data.handleApi === 'function') {
        this.resolveResponse(this.data.handleApi, postData);
      } else if (typeof this.data.api === 'string' && this.data.api) {
        this.resolveResponse(this.handleApi, postData);
      } else {
        this.$message({
          message: '未配置表格数据接口',
          type: 'error'
        });
        return false;
      }
    },
    /**
     * 异步请求处理函数
     * @param {Promise} handle 请求方法体
     * @param {Object} data 请求参数
     */
    resolveResponse(handle, data) {
      try {
        handle(data)
            .then(response => {
              this.loading = false;
              if (response.success === true) {
                this.dataList = response.data.records;
                this.total = response.data.total;
              }
            })
            .catch(() => {
              this.dataList = [];
            })
            .finally(() => {
              this.loading = false;
            });
      } catch (e) {
        console.log(e);
        this.$message({
          message: '数据接口请求出错',
          type: 'error'
        });
        return false;
      }
    },
    /**
     * 构建请求方法体Promise
     * @param {Object} data 请求数据
     *
     */
    handleApi(data) {
      let method = config.config || 'POST';
      let requestData = {
        url: this.data.api
      };
      if (method === 'POST') {
        requestData.data = data;
      } else {
        requestData.params = data;
      }
      return request(requestData);
    },
    /**
     * 格式化过滤器FormItem数据
     * @param {Object} item 过滤项
     */
    formatterSearch(item) {
      let data = {
        ...item
      };
      data.label = this.getSearchLabel(data);
      return data;
    },
    /**
     * 格式化过滤器FormItem数据，快捷过滤器
     * @param {Object} item 过滤项
     */
    formatterFastSearch(item) {
      let data = {
        ...item
      };
      if (data.type === 'radio') data.type = 'select';
      data.label = this.getSearchLabel(data);
      return data;
    },
    /**
     * 格式化数据
     * @param {Object} value
     * @param {Object} item
     * @param {Object} row
     */
    formatData(value, item, row) {
      if (item.formatter) {
        if (typeof item.formatter == 'function' && item.type === 'node') {
          let node = item.formatter(value, this.$createElement, row);
          if (isVNode(node)) {
            this.$slots[item.field] = [node];
          }
          return item.field;
        } else if (typeof item.formatter == 'function' && item.type !== 'node') {
          return item.formatter(value, row);
        } else {
          switch (item.formatter) {
            case 'date': {
              if (value) {
                let d = new date(value);
                value = d.get();
              }
              break;
            }
            case "date:s": { //秒级
              if (value) {
                let d = new date(value * 1000);
                value = d.get();
              }
              break;
            }
            case 'diffDate': {
              if (value) {
                let d = new date(value);
                value = d.getDiffFormat();
              }
              break;
            }
          }
        }
      }
      return value;
    },
    /**
     * 获取Tag标签展示方式
     */
    getTagType(value, item) {
      if (typeof item.tagFormatter == 'function') {
        return item.tagFormatter(value);
      }
      return item.tagFormatter || '';
    },
    /**
     * 执行搜索
     */
    handleSearch() {
      //执行查询
      this.listQuery.page = 1;
      this.getList();
    },
    /**
     * 展示详细过滤器表单
     */
    showMoreFilter() {
      this.moreFilter = !this.moreFilter;
      this.moreFilterLoading = true;

      setTimeout(() => {
        this.moreFilterLoading = false;
      }, 200);
    },
    /**
     * 匹配获取当前过滤器名称
     * @param {Object} item
     */
    getSearchLabel(item) {
      let langKey = this.getLangKey();
      if (langKey && item.lang === true) {
        let field = item.langKey ? item.langKey : item.field;

        return this.$t(`field.${langKey}.${field}`);
      } else {
        if (!isEmpty(item.info)) return item.info;
        if (!isEmpty(item.label)) return item.label;
        for (let fieldCol of this.cols) {
          if (item.field === fieldCol.field) {
            return fieldCol.title || fieldCol.field;
          }
        }
        return item.field;
      }
    },
    /**
     * 按钮点击事件
     * @param {Function} handle 事件方法
     * @param {Object} row 当前行
     */
    handleButtonClick(handle, row) {
      this.visibleRowContextmenu = false;
      if (typeof handle == 'function') {
        handle.call(this, row);
      }
    },
    /**
     * 单元格点击事件
     * @param {Function} handle
     * @param {*} value 当前值
     * @param {Object} row 当前行
     */
    handleColClick(handle, value, row) {
      if (typeof handle == 'function') {
        handle.call(this, value, row);
      }
    },
    /**
     * 重载数据表格
     */
    reload(otherParam) {
      this.visibleRowContextmenu = false;
      if (isObject(otherParam)) {
        otherParam.page && (this.listQuery.page = otherParam.page);
        otherParam.limit && (this.listQuery.limit = otherParam.limit);

        if (isObject(otherParam.where)) {
          this.searchQuery = Object.assign(this.searchQuery, otherParam.where);
        }
        if (isObject(otherParam.like)) {
          this.fuzzySearchQuery = Object.assign(this.fuzzySearchQuery, otherParam.like);
        }
      }
      this.getList(otherParam);
    },
    /**
     * 下一页
     */
    next() {
      this.listQuery.page++;
      this.getList();
    },
    /**
     * 上一页
     */
    pre() {
      this.listQuery.page--;
      this.getList();
    },
    isShow(item, row) {
      if (isFunction(item.show)) {
        return item.show.call(this, row)
      }
      return item.show !== false;

    },
    getLangKey() {
      return this.langKey || this.data.langKey;
    },
    getColumnTitle(item, index) {
      let langKey = this.getLangKey();
      if (!langKey) return item.title || item.field || '列' + index
      if (isArray(item.button)) return this.$t('table.operation');
      if (item.field) return this.$t(`field.${langKey}.${item.field}`);
    },
    /**
     * 解析导入数据
     * */
    resolveImport(data) {
      if (isFunction(data.handle)) {
        this.importer.success = data.handle;
      } else {
        return false;
      }
      let list = [];
      if (isArray(data)) {
        list = data;
      } else if (isObject(data) && data.columns) {
        list = data.columns;
      }
      for (let column of list) {
        if (isObject(column)) {
          this.importer.cols.push({
            field: column.field,
            formatter: isFunction(column.formatter) ? column.formatter : null,
            rule: column.rule ? column.rule : null
          });
        } else {
          this.importer.cols.push({
            field: column,
            formatter: null,
            rule: null
          });
        }
      }
      if (isArray(this.data.toolbarButton)) {
        this.data.toolbarButton.push({
          key: 'import',
          type: 'primary',
          handle: () => {
            this.importer.visible = true
          }
        });
      } else {
        this.data.toolbarButton = [{
          key: 'import',
          type: 'primary',
          handle: () => {
            this.importer.visible = true
          }
        }];
      }
      this.importer.open = true;
    },
    /**
     * 开始导入数据
     */
    handleImportData({data, force, header} = {}) {
      if (!isArray(data)) {
        this.$Toast('请检查数据', 'error');
        return false;
      }
      // let dataLength = Object.keys(data[0]).length;

      if (this.importer.cols.length !== header.length) {
        this.$Toast('导入的列数不一致,应为' + this.importer.cols.length + '列', 'error');
        return false;
      }
      handleImport(data, header, force, this.importer.cols).then(res => {
        if (res.flag === false) {
          this.$Toast(res.message, 'error');
        } else {
          this.$Toast(res.fail.length + '行验证失败', 'error');
          this.importer.success(res.data);
        }
      })


    },
    handleRowContextmenu(row, column, e) {
      this.visibleRowContextmenu = false;
      this.visibleRowContextmenu = true;
      e.preventDefault();
      this.$nextTick(() => {
        this.$refs.rowContextButton.init(row, column, e);
      });
    },
    handleCloseContextMenu() {
      this.visibleRowContextmenu = false;
    }
  }
};
</script>
<template>
  <div class="table-panel">
    <div class="search-body" v-loading="moreFilterLoading" v-if="Object.keys(searchCols).length > 0">
      <div class="search-panel" v-if="moreFilter">
        <el-form label-position="right" label-width="80px" size="mini">
          <!-- 渲染过滤器列表 start -->
          <el-form-item v-for="(item, index) in searchCols" :key="index" :label="getSearchLabel(item)">
            <!-- 时间间隔选择器 -->
            <date-time-scope
                v-if="item.type === 'startAndEndTime'"
                :start.sync="searchQuery.startTime"
                :end.sync="searchQuery.endTime"
                :style="{'width' : $_width < 400 ? 'auto' : '280px'}"
            ></date-time-scope>
            <!-- 其它选择器 -->
            <data-form-item :lang-key="getLangKey()" v-else-if="item.fuzzy === true"
                            :value.sync="fuzzySearchQuery[item.field]"
                            :data="formatterSearch(item)"></data-form-item>
            <data-form-item :lang-key="getLangKey()" v-else :value.sync="searchQuery[item.field]"
                            :data="formatterSearch(item)"></data-form-item>
          </el-form-item>

          <div class="search-panel-button-list">
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search"
                       @click="handleSearch">{{ $t('search') }}
            </el-button>
            <template v-if="data.toolbarButton instanceof Array">
              <el-button
                  v-for="(buttonItem, buttonIndex) in data.toolbarButton"
                  :key="buttonIndex"
                  size="mini"
                  class="filter-item"
                  :type="buttonItem.type || ''"
                  :icon="buttonItem.icon || ''"
                  @click="handleButtonClick(buttonItem.handle)"
              >
                {{ buttonItem.label || $t(buttonItem.key) }}
              </el-button>
            </template>
          </div>
          <!-- 渲染过滤器列表 end -->
        </el-form>
      </div>
      <div class="search-panel search-panel-fast" v-else>
        <div v-for="(item, index) in searchCols" :key="index" class="search-fast-item">
          <!-- 时间间隔选择器 -->
          <date-time-scope
              v-if="item.type === 'startAndEndTime' && item.fast === true"
              :start.sync="searchQuery.startTime"
              :end.sync="searchQuery.endTime"
              :style="{'width' : $_width < 400 ? 'auto' : '280px'}"
          ></date-time-scope>
          <!-- 其它选择器 -->

          <data-form-item
              v-else-if="item.fuzzy === true && item.fast === true"
              :value.sync="fuzzySearchQuery[item.field]"
              :lang-key="getLangKey()"
              :data="formatterFastSearch(item)"
          ></data-form-item>
          <data-form-item
              v-else-if="item.fast === true"
              :value.sync="searchQuery[item.field]"
              :data="formatterFastSearch(item)"
              :lang-key="getLangKey()"
          ></data-form-item>
        </div>

        <div class="search-fast-panel-button-list">
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
            {{ $t('search') }}
          </el-button>
          <template v-if="data.toolbarButton instanceof Array">
            <el-button
                v-for="(buttonItem, buttonIndex) in data.toolbarButton"
                :key="buttonIndex"
                class="filter-item"
                :type="buttonItem.type || ''"
                :icon="buttonItem.icon || ''"
                @click="handleButtonClick(buttonItem.handle)"
            >
              {{ buttonItem.label || $t(buttonItem.key) }}
            </el-button>
          </template>
        </div>
      </div>
      <div class="btn-search-show" @click="showMoreFilter"><i
          :class="{ fa: true, 'fa-sort-down': !moreFilter, 'fa-sort-up': moreFilter }"></i></div>
    </div>


    <el-table v-loading="loading" :data="dataList" highlight-current-row style="width: 100%;"
              @row-contextmenu="handleRowContextmenu">
      <el-table-column
          v-for="(item, index) in cols"
          :key="index"
          :label="getColumnTitle(item,index)"
          :sortable="item.sort"
          :fixed="item.fixed || false"
          :width="item.width || 'auto'"
      >
        <template v-slot="scope">
          <el-avatar v-if="isShow(item,scope.row) && (item.type === 'author' || item.type === 'avatar')"
                     :src="scope.row[item.field] | resources"></el-avatar>
          <el-tag
              v-else-if="isShow(item,scope.row) && item.type === 'tag'"
              :type="getTagType(scope.row[item.field], item)"
              @click="handleColClick(item.click, scope.row[item.field], scope.row)"
              class="pointer"
          >
            {{ formatData(scope.row[item.field], item, scope.row) }}
          </el-tag>
          <div v-else-if="isShow(item,scope.row) && item.type === 'node'">
            <slot :name="formatData(scope.row[item.field], item,scope.row)"></slot>
          </div>
          <div class="table-col-action" v-else-if="isShow(item,scope.row) && !item.field && item.button">
            <div v-for="(buttonItem, buttonIndex) in item.button"
                 :key="buttonIndex" class="btn-item">
              <el-button
                  size="mini"
                  v-if="isShow(buttonItem,scope.row)"
                  :type="buttonItem.type || ''"
                  @click="handleButtonClick(buttonItem.handle, scope.row)"
              >
                {{ buttonItem.label || $t(buttonItem.key) }}
              </el-button>
            </div>
          </div>

          <tool-tip
              v-else-if="isShow(item)"
              :content="formatData(scope.row[item.field], item,scope.row)"
              :text="formatData(scope.row[item.field], item,scope.row)"
              @click="handleColClick(item.click, scope.row[item.field], scope.row)"
          ></tool-tip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-if="nopage === false"
        v-show="total > 0"
        style="margin-top: 15px;"
        background
        :small="width < 450"
        :current-page.sync="listQuery.page"
        :page-size.sync="listQuery.limit"
        layout="prev, pager, next,total"
        @current-change="getList"
        :total="total"
        :pager-total="10"
    ></el-pagination>

    <context-button
        v-if="visibleRowContextmenu"
        ref="rowContextButton"
        :button-list="actionButtonList"
        :is-show-callback="isShow"
        @buttonClick="handleButtonClick"
        @refresh="reload"
        @close="handleCloseContextMenu"
    ></context-button>
    <import-excel v-if="importer.open" :visible.sync="importer.visible" @success="handleImportData"></import-excel>
  </div>
</template>
<style lang="scss">
.el-table {
  .el-table__fixed {
    height: auto !important;
    bottom: 16px;

  }

  th > .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
<style lang="scss" scoped>
.table-panel {
  .btn-search-show {
    height: 16px;
    cursor: pointer;
    margin: 12px 0;
    border-bottom: 1px solid;
    padding-bottom: 3px;
    border-image: linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.1) 100%) 2 2;
    text-align: center;
  }

  .btn-search-show:hover {
    color: #1e9fff;
    border-image: linear-gradient(to right, rgba(0, 216, 247, 0) 0%, #00afed 50%, rgba(0, 216, 247, 0) 100%) 2 2;
  }

  .search-panel {
    width: 100%;
    box-sizing: border-box;

    & > form {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .search-panel-fast {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    & > div {
      margin-bottom: 5px;
    }

    .search-fast-item {
      margin-right: 5px;
    }
  }

  .table-col-action {
    display: flex;
    flex-wrap: nowrap;

    .btn-item {
      margin-right: 3px;
    }
  }

  .filter-item {
    margin-left: 5px;
  }

  .search-panel-button-list {
    display: flex;
    flex-wrap: nowrap;
  }

  .search-fast-panel-button-list, .search-panel-button-list {
    @media (max-width: 768px) {
      flex-wrap: wrap;
      button {
        margin: 6px 6px;
      }
    }
  }

  .search-panel-button-list div {
    display: flex;
    flex-wrap: nowrap;
  }


}
</style>
