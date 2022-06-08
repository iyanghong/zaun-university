<template>
  <div class="input-item-image-list">
    <upload class="upload-panel" v-for="(imagePath,index) in images" :key="index" @change="handleChange($event,index)">
      <el-image class="upload-images" :src="imagePath | resources" @contextmenu.prevent.stop="handleDelete(index)"></el-image>
    </upload>
    <upload @change="handleChange($event,-1)">
      <el-button icon="el-icon-plus"></el-button>
    </upload>
  </div>
</template>

<script>
import Upload from '../Upload';

export default {
  name: "ImageList",
  props: {
    value: {
      type: String
    }
  },
  components: {
    Upload
  },
  data() {
    return {
      images: []
    }
  },
  watch: {
    value(newValue) {
      if (newValue) {
        this.images = newValue.split(',')
      }
    },
    images(newValue) {
      this.$emit('input', newValue.join(','))
    }
  },
  created() {
  },
  methods: {
    handleChange(response, index = -1) {
      if (response.success === true) {
        this.$Toast(this.$t('form.uploadSuccess'), 'success');
        setTimeout(() => {
          if (index > -1) {
            this.$set(this.images, index, response.data.url)
          } else {
            this.images.push(response.data.url)
          }
        }, 100);
      }
    },
    handleDelete(index) {
      console.log(index)
      this.images.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.input-item-image-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;

  & > div.upload-panel {
    height: 120px;
    width: 120px;
    margin-right: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }

  .upload-images {
    border-radius: 10px;
    height: 120px;
    width: 120px;
  }
}
</style>
