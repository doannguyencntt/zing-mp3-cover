<template>
  <div v-if="modelValue">
    <div class="wrapper-modal" @click="handleClose">
      <div class="modal" :class="modalSize" @click.stop>
        <div class="top-right" v-if="showDismissButton">
          <button class="btn" @click="handleClose">
            <i class="icon ic-close"></i>
          </button>
        </div>
        <h2 v-if="title" class="title">{{ title }}</h2>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    modelValue: { 
      type: Boolean,
      default: false 
    },
    title: { 
      type: String 
    },
    showDismissButton: {
      type: Boolean,
      default: false 
    },
    modalSize: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleClose() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 111111;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0008;
  .modal.lg {
    width: 70vw;
  }
  .modal {
    max-width: 900px;
    background: var(--background);
    border-radius: 8px;
    position: relative;
    padding: 15px 30px;
    .top-right {
      position: absolute;
      top: 10px;
      right: 15px;
      .btn {
        background: transparent !important;
        i.icon {
          font-size: 25px;
        }
      }
    }
    h2.title {
      font-weight: bold;
      padding-bottom: 15px;
      font-size: 26px;
    }
    .content {
      padding-bottom: 15px;
    }
  }
}
</style>