<template>
  <div class="console-professional panel-w">
    <data-table :data="table" ref="professionalTable"></data-table>
    <popup-layer :visible.sync="visibleCreate" title="新增学院" width="400px">
      <college-form v-if="visibleCreate" @hide="handleCreate"></college-form>
    </popup-layer>
    <popup-layer :visible.sync="visibleEdit" title="修改学院" width="400px">
      <college-form v-if="visibleEdit" :data="selectRow" @hide="handleUpdate"></college-form>
    </popup-layer>

    <popup-layer :visible.sync="visibleCreateProfessional" title="添加专业" width="400px">
      <professional-form v-if="visibleCreateProfessional" :college-id="selectRow.collegeId"
                         @hide="handleHideCreateProfessional"></professional-form>
    </popup-layer>
  </div>
</template>

<script>
import {delCollege, getCollegeList} from "@/api/college";
import CollegeForm from './CollegeForm'
import ProfessionalForm from '../Professional/ProfessionalForm'

export default {
  name: "College",
  components: {CollegeForm, ProfessionalForm},
  data() {
    return {
      visibleCreate: false,
      visibleEdit: false,
      visibleCreateProfessional: false,
      selectRow: {},
      table: {
        handleApi: getCollegeList,
        searchCols: [
          {field: 'collegeName', title: '学院名称', fast: true},
          {field: 'startAndEndTime', type: 'startAndEndTime', label: '创建时间'}
        ],
        toolbarButton: [
          {
            key: 'add',
            type: 'primary',
            handle: () => {
              this.visibleCreate = true
            }
          }
        ],
        cols: [
          {field: 'collegeId', title: '编号'},
          {field: 'collegeName', title: '学院名称'},
          {
            title: '操作',
            button: [
              {
                label: '添加专业',
                type: 'success',
                handle: row => {
                  this.selectRow = row;
                  this.visibleCreateProfessional = true;
                }
              },
              {
                key: 'edit',
                type: 'primary',
                handle: row => {
                  this.selectRow = row;
                  this.visibleEdit = true
                }
              },
              {
                key: 'del',
                type: 'danger',
                handle: row => {
                  this.handleDelete(row)
                }
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleDelete(row) {
      //执行删除
      this.$confirm(`是否删除专业"${row.professionalName}"?`, this.$tl('prompt', '提示'), {
        confirmButtonText: this.$tl('confirm', '确认'),
        cancelButtonText: this.$tl('cancel', '取消'),
        type: 'warning'
      }).then(() => {
        //执行删除
        delCollege(row.pid).then(response => {
          if (response.success === true) {
            this.$Toast('删除成功', 'success');
            this.$refs.professionalTable.reload();
          } else {
            this.$Toast(response.message, 'error');
          }
        });
      });
    },
    handleCreate(flag) {
      if (flag) {
        this.$refs.professionalTable.reload();
      }
      this.visibleCreate = false
    },
    handleUpdate(flag) {
      if (flag) {
        this.$refs.professionalTable.reload();
      }
      this.visibleEdit = false
    },
    handleHideCreateProfessional() {
      this.visibleCreateProfessional = false
    }
  }
}
</script>

<style scoped>

</style>
