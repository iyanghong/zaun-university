<template>
  <div class="console-professional panel-w">
    <data-table :data="table" ref="professionalTable"></data-table>
    <popup-layer :visible.sync="visibleCreate" title="新增专业" width="400px">
      <professional-form v-if="visibleCreate" @hide="handleCreate"></professional-form>
    </popup-layer>
    <popup-layer :visible.sync="visibleEdit" title="修改专业" width="400px">
      <professional-form v-if="visibleEdit" :data="selectRow" @hide="handleUpdate"></professional-form>
    </popup-layer>

    <popup-layer :visible.sync="visibleCreateClassGrade" title="添加班级" width="400px">
      <class-grade-form v-if="visibleCreateClassGrade" :pid="selectRow.pid"
                        @hide="handleHideCreateClassGrade"></class-grade-form>
    </popup-layer>

  </div>
</template>

<script>
import {delProfessional, getProfessionalList} from "@/api/professional";
import ProfessionalForm from './ProfessionalForm'
import ClassGradeForm from '../ClassGrade/ClassGradeForm'
import {getAllCollege} from "@/api/college";
import {generateRandomClass} from "@/utils/generate-util";

export default {
  name: "Professional",
  components: {ProfessionalForm, ClassGradeForm},
  data() {
    return {
      visibleCreate: false,
      visibleEdit: false,
      visibleCreateClassGrade: false,
      selectRow: {},
      table: {
        handleApi: getProfessionalList,
        searchCols: [
          {field: 'professionalName', title: '专业名称', fast: true},
          {field: 'collegeId', title: '学院', fast: true, type: 'select', data: this.handleGetAllCollege},
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
          {field: 'pid', title: '编号', width: 80},
          {field: 'professionalName', title: '专业名称', width: 120},
          {field: 'collegeName', title: '所属学院', width: 160},
          {field: 'classTotal', title: '班级数量', width: 80},
          {field: 'studentTotal', title: '学生数量', width: 80},
          {
            title: '操作',
            button: [
              {
                label: '生成若干个班级',
                type: 'warning',
                show: () => {
                  return this.$_user.role === -1;
                },
                handle: row => {
                  generateRandomClass(row.pid).then(() => {
                    this.$refs.professionalTable.reload();
                  });
                }
              },
              {
                label: '添加班级',
                type: 'success',
                handle: row => {
                  this.selectRow = row;
                  this.visibleCreateClassGrade = true;
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
    async handleGetAllCollege() {
      let data = [];
      await getAllCollege().then(response => {
        if (response.success === true) {
          for (let item of response.data) {
            data.push({
              value: item.collegeId,
              label: item.collegeName
            })
          }
        }
      })
      return data;
    },
    handleDelete(row) {
      //执行删除
      this.$confirm(`是否删除专业"${row.professionalName}"?`, this.$tl('prompt', '提示'), {
        confirmButtonText: this.$tl('confirm', '确认'),
        cancelButtonText: this.$tl('cancel', '取消'),
        type: 'warning'
      }).then(() => {
        //执行删除
        delProfessional(row.pid).then(response => {
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
    handleHideCreateClassGrade() {
      this.visibleCreateClassGrade = false;
    }
  }
}
</script>

<style scoped>

</style>
