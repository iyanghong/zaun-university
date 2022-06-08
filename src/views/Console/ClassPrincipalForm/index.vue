<template>
  <div class="class-principal-form">
    <data-form :data="form" v-model="formData" op="Edit" @handleUpdate="handleUpdate"></data-form>
  </div>
</template>

<script>
import {getAllTeacher} from "@/api/user";
import {updateClassGrade} from "@/api/classGrade";

export default {
  name: "ClassPrincipalForm",
  props: {
    data: {
      type: Object,
      required: null
    }
  },
  data() {
    return {
      formData: {},
      form: {
        rows: [
          {field: 'principal', label: '教师', type: 'select', search: true, data: this.handleLoadTeacher}
        ]
      }
    }
  },
  created() {
    this.formData.principal = this.data.principal
  },
  methods: {
    async handleLoadTeacher() {
      let data = [];
      await getAllTeacher().then(response => {
        if (response.success === true) {
          for (let item of response.data) {
            data.push({
              value: item.id,
              label: `${item.job}-${item.badgeNumber}-${item.sex}-${item.name}`
            })
          }
        }
      })
      return data;
    },
    handleUpdate(data) {
      let postData = {
        cid: this.data.cid,
        ...data
      }
      this.loading = true;
      updateClassGrade(postData).then(response => {
        if (response.success === true) {
          this.$Toast('任命成功', 'success');
          this.$emit('hide', true);
        } else {
          this.$Toast(response.message, 'error');
        }
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>

</style>
