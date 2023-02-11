<template>
  <Modal title="Hẹn Giờ Dừng Phát Nhạc"
         :modelValue="showTimerModal"
         @update:modelValue="closeModal($event)">
    <div class="alarm-setting">
      <div class="time-picker d-flex">
        <div class="time-picker__input">
          <div class="control">
            <input type="text" class="hour">
          </div>
          <span>Giờ</span>
        </div>
        <div class="dot">:</div>
        <div class="time-picker__input">
          <div class="control">
            <input type="text" class="hour">
          </div>
          <span>Phút</span>
        </div>
      </div>
    </div>
    <div class="time">
      Chọn thời gian để dừng phát nhạc
    </div>
    <div class="action d-flex">
      <button class="btn btn-save">Lưu lại</button>
      <button class="btn btn-cancel">Hủy</button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/common/Modal'
export default {
  name: 'modal-timer',
  props: {
    showTimerModal: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Modal
  },
  data() {
    return {
      
    }
  },
  methods: {
    closeModal(val) {
      this.showTimerModal = val
      this.$emit('modal:updateTimerModal', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .alarm-setting {
    background: var(--alpha-bg);
    padding: 15px 0;
    border-radius: 7px;
    .time-picker {
      align-items: center;
      justify-content: center;
      .dot {
        font-size: 34px;
        padding: 0 15px;
      }
      &__input {
        display: flex;
        align-items: center;
        width: 100px;
        height: 51px;
        position: relative;
        span {
          text-transform: uppercase;
          color: hsla(0,0%,100%,0.5);
          font-weight: 600;
          position: absolute;
          right: 15px;
        }
      }
      .control {
        width: 100%;
        border-bottom: 2px solid #ccc;
        input {
          font-size: 34px !important;
          width: 100%;
          border: none;
          font-size: 34px;
          padding: 0;
          height: 40px;
          width: 50px;
          letter-spacing: 3px;
          font: inherit;
          color: inherit;
          background-color: transparent;
          word-break: normal;
          padding-left: 10px;
          &:focus-visible {
            outline: none;
            border: none;
            box-shadow: none;
          }
        }
      }
    }
  }
  .time {
    text-align: center;
    padding: 18px 0;
  }
  .action {
    align-items: center;
    flex-direction: column;
    .btn {
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 600;
    }
    .btn-save {
      width: 100%;
      height: 37px;
      border-radius: 999px;
    }
    .btn-cancel {
      border: 0;
      outline: none;
      background: unset;
      margin-top: 5px;
    }
  }
</style>