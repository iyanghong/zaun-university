<template>
  <div class="console-professional panel-w">
    <data-table :data="table" ref="professionalTable"></data-table>
    <popup-layer :visible.sync="visibleCreate" title="新增班级" width="400px">
      <class-grade-form v-if="visibleCreate" @hide="handleCreate"></class-grade-form>
    </popup-layer>
    <popup-layer :visible.sync="visibleEdit" title="修改班级" width="400px">
      <class-grade-form v-if="visibleEdit" :data="selectRow" @hide="handleUpdate"></class-grade-form>
    </popup-layer>


    <popup-layer :visible.sync="visiblePrincipal" title="班主任" width="400px">
      <class-principal-form v-if="visiblePrincipal" :data="selectRow" @hide="handleUpdate"></class-principal-form>
    </popup-layer>

  </div>
</template>

<script>

import ClassGradeForm from './ClassGradeForm'
import ClassPrincipalForm from '../ClassPrincipalForm'
import {delClassGrade, getClassGradeList} from "@/api/classGrade";
import {generateRandomStudent} from "@/utils/generate-util";
import {getAllCollege} from "@/api/college";
import {getAllProfessional} from "@/api/professional";

export default {
  name: "ClassGrade",
  components: {ClassGradeForm, ClassPrincipalForm},
  data() {
    return {
      visibleCreate: false,
      visibleEdit: false,
      visiblePrincipal: false,
      selectRow: {},

      table: {
        handleApi: this.getClassGradeList,
        searchCols: [
          {field: 'cid', label: '班级号', fast: true},
          {field: 'pid', label: '专业', fast: true, type: 'select', data: this.handleGetAllProfessional},
          {field: 'collegeId', label: '学院', fast: true, type: 'select', data: this.handleGetAllCollege},
        ],
        toolbarButton: [
          {
            key: 'add',
            type: 'primary',
            handle: () => {
              this.visibleCreate = true
            }
          },
          {
            label: '本页模拟若干个学生',
            show: () => {
              return this.$_user.role === -1
            },
            type: 'info',
            handle: async () => {
              for (let row of this.$refs.professionalTable.getDataList()) {
                await generateRandomStudent(row.cid, 30, 56).then(() => {
                  this.$refs.professionalTable.reload();
                })
              }
              /**/
              // console.log(row)
            }
          },
        ],
        cols: [
          {field: 'grade', title: '年级', width: 80},
          {field: 'cid', title: '班级号', width: 100},
          {field: 'professionalName', title: '专业名称', width: 120},
          {field: 'principalName', title: '班主任', width: 80},
          {field: 'studentTotal', title: '学生人数', width: 80},
          {
            title: '操作',
            button: [
              {
                label: '进入',
                type: 'success',
                handle: row => {
                  this.$router.push({
                    name: 'ClassDetail',
                    params: {
                      id: row.cid
                    }
                  });
                  // console.log(row)
                }
              },
              {
                label: '模拟若干个学生',
                type: 'info',
                handle: row => {
                  generateRandomStudent(row.cid).then(() => {
                    this.$refs.professionalTable.reload();
                  })
                  // console.log(row)
                }
              },
              {
                label: '任命班主任',
                type: 'success',
                show: () => {
                  return this.$_user.role === -1
                },
                handle: row => {
                  this.selectRow = row;
                  this.visiblePrincipal = true
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
    getClassGradeList(data) {
      if (this.$_user.role === 1) {
        data.principal = this.$_user.id;
      }
      return getClassGradeList(data);
    },
    async handleGetAllProfessional() {
      let data = [];
      await getAllProfessional().then(response => {
        if (response.success === true) {
          for (let item of response.data) {
            data.push({
              value: item.pid,
              label: item.professionalName
            })
          }
        }
      })
      return data;
    },
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
      this.$confirm(`是否删除班级"${row.cid}"?`, this.$tl('prompt', '提示'), {
        confirmButtonText: this.$tl('confirm', '确认'),
        cancelButtonText: this.$tl('cancel', '取消'),
        type: 'warning'
      }).then(() => {
        //执行删除
        delClassGrade(row.cid).then(response => {
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
      this.visiblePrincipal = false
      this.visibleEdit = false
    }
  }
}
</script>

<style scoped>

</style>
