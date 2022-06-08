<template>
  <div>
    <data-form
        v-if="op==='Edit'"
        :data="form"
        v-model="formData"
        :loading="loading"
        @handleUpdate="handleUpdate"
        :defaultDataHandle="handleLoadData"
        op="Edit"
    ></data-form>
    <data-form
        v-else-if="op==='Create'"
        :data="form"
        v-model="formData"
        :loading="loading"
        @handleCreate="handleCreate"
        op="Create"
    ></data-form>

    <data-form
        v-else-if="op==='Detail'"
        :data="form"
        :edit="false"
        v-model="formData"
        :loading="loading"
        :defaultDataHandle="handleLoadData"
        op="Detail"
        @handleDetail="handleDetail"
    ></data-form>
  </div>
</template>

<script>
import {getAllProfessional} from "@/api/professional";
import {addStudent, getStudent, updateStudent} from "@/api/user";
import {generatePersonal} from "@/api/tool";
import {getAllClassGrade} from "@/api/classGrade";

export default {
  name: "StudentForm",
  props: {
    data: {
      type: Object,
      required: null
    },
    detail: {
      type: Boolean,
      default: false
    },
    cid: {
      required: null
    }
  },
  data() {
    return {
      op: 'Create',
      loading: false,
      formData: {},
      form: {
        button: [
          {
            label: '模拟',
            type: 'success',
            show: () => {
              return !this.detail
            },
            handle: () => {
              this.handleGenerate()
            }
          }
        ],
        rows: [
          [
            [{field: 'username', label: '用户名', rule: 'required'}, {
              field: 'name',
              label: '姓名',
              rule: 'required'
            }, {field: 'sex', label: '性别', type: 'radio', data: [{value: '男', label: '男'}, {value: '女', label: '女'}]}],
            {field: 'idPhoto', label: '证件照', type: 'upload:author'}
          ],

          [{field: 'phone', label: '手机号'}, {field: 'email', label: '邮箱'}],
          [{field: 'cardId', label: '身份证', rule: 'required'}, {field: 'address', type: 'address', label: '地址'}],
          {field: 'cid', label: '班级', rule: 'required', type: 'select', search: true, data: this.handleGetAllClassGrade}
        ]
      }
    }
  },
  created() {
    if (this.detail) this.op = 'Detail';
    else this.op = this.data == null ? 'Create' : 'Edit';

    if (this.cid) this.formData.cid = this.cid
  },
  methods: {
    handleGenerate() {
      generatePersonal().then(response => {
        if (response.success === true) {
          let ramInt = Math.floor(Math.random() * 100 + 1);
          ramInt = ('000' + ramInt).substr(-3);

          let data = {
            username: response.data.phone,
            name: response.data.name,
            cardId: response.data.carId,
            sex: response.data.sex,
            phone: response.data.phone,
            email: response.data.email,
            address: response.data.addressCode,
            idPhoto: `https://resources.iyanghong.cn/global/header/${ramInt}.jpg`,
            cid: this.cid || ''
          };

          this.$set(this, 'formData', data)
          // this.data = data;
        }
      })
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
    async handleGetAllClassGrade() {
      let data = [];
      await getAllClassGrade().then(response => {
        if (response.success === true) {
          for (let item of response.data) {
            if (this.$_user.role === 1 && item.principal !== this.$_user.id) continue;

            data.push({
              value: item.cid,
              label: item.cid + '-' + item.professionalName
            })
          }
        }
      })
      return data;
    },
    async handleLoadData() {
      let data = {};
      await getStudent(this.data.id).then(response => {
        if (response.success === true) {
          data = response.data;
        }
      })
      return data;
    },
    handleCreate(data) {
      this.loading = true;
      addStudent(data).then(response => {
        if (response.success === true) {
          this.$Toast('创建成功', 'success');
          this.$emit('hide', true);
        } else {
          this.$Toast(response.message, 'error');
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    handleUpdate(data) {
      let postData = {
        id: this.data.id,
        aid: this.data.aid,
        ...data
      }
      this.loading = true;
      updateStudent(postData).then(response => {
        if (response.success === true) {
          this.$Toast('修改成功', 'success');
          this.$emit('hide', true);
        } else {
          this.$Toast(response.message, 'error');
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    handleDetail() {
      this.$emit('hide', true);
    }
  }
}
</script>

<style scoped>

</style>
