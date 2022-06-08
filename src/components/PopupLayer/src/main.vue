<template>
  <transition name="popup-layer-visible">
    <div v-show="visible" class="popup-layer-wrapper" @click.self="handleClickWrapper">
      <div class="popup-layer" :ref="popupKey" :style="style">
        <div class="popup-layer-header">
          <slot name="title" v-if="$slots.title"></slot>
          <span class="popup-layer-title" v-else>{{ title }}</span>
          <button
              type="button"
              class="popup-layer-header-btn"
              aria-label="Close"
              v-if="showClose"
              @click="handleClose">
            <i class="popup-layer-close el-icon el-icon-close"></i>
          </button>
        </div>

        <div class="popup-layer-body">
          <slot></slot>
        </div>
        <div class="popup-layer-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: "PopupLayer",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: String,
    height: String,
    title: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: true
    },
    top: {
      type: String,
      default: '15vh'
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    fullscreen: Boolean,
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      closed: false,
      popupKey: 'popup-layer-' + new Date().getTime()
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit('open');
        this.$nextTick(() => {
          this.$refs[this.popupKey].scrollTop = 0;
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        if (!this.closed) this.$emit('close');
      }
    }
  },
  computed: {
    style() {
      let style = {};
      if (!this.fullscreen) {
        style.marginTop = this.top;
        if (this.width) {
          style.width = this.width;
        }
        if (this.height) {
          style.height = this.height;
        }
      }
      return style;
    }
  },
  mounted() {
    if (this.visible) {
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  methods: {
    handleClose() {
      this.hide();
    },
    open() {
      this.$emit('update:visible', true);
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('close');
        this.closed = true;
      }
    },
    handleClickWrapper(e) {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    }
  }
}
</script>
<style lang="scss">
.popup-layer-visible-enter, .popup-layer-visible-leave-to {
  transform: translate3d(0, -20px, 0);
  opacity: 0
}

.popup-layer-visible-leave, .popup-layer-visible-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1
}

.popup-layer-visible-enter-active, .popup-layer-visible-leave-active {
  transition: all .3s
}
</style>
<style lang="scss" scoped>
.popup-layer-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: -20px;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.3);

  .popup-layer {
    z-index: 2002;
  }
}

.popup-layer {
  position: relative;
  margin: 0 auto 50px;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  background: #fff;
  z-index: 2001;

  @media (max-width: 768px) {
    width: 95%;
  }

  .popup-layer-title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .popup-layer-header {
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .popup-layer-header-btn {
    /*position: absolute;
    top: 10px;
    right: 20px;*/
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      color: #1E9FFF;
    }
  }

  .popup-layer-body {
    padding: 12px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }

  .popup-layer-footer {
    padding: 12px;
    box-sizing: border-box;
  }
}
</style>
