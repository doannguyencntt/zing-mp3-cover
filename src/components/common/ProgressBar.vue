<template>
  <div class="progress-bar" ref="ele" @mousedown="handler($event)" @click="handler($event)">
    <div class="progress-bg">
      <div class="progress" :style="{ width: percentage + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    percent: [Number, Object],
    busyWhileProgress: Boolean
  },
  data() {
    return {
      temp: 0,
      isBusy: false
    }
  },
  created() {
    document.addEventListener('mouseup', this.handleMouseup)
    document.addEventListener('mousemove', this.handleMousemove)
  },
  destroyed() {
      document.removeEventListener('mouseup', this.handleMouseup)
      document.removeEventListener('mousemove', this.handleMousemove)
  },
  computed: {
    percentage: {
      get() {
        return this.percent
      },
      set(val) {
        this.temp = val
        this.$emit('update:percent', val)
      }
    }
  },
  methods: {
    handler(ev) {
      if (ev.type === 'click' && ev.target) {
        this.percentage = (ev.offsetX / ev.target.offsetWidth) * 100
        this.$emit('change', this.temp)
        return
      }

      if (ev.type === 'mousedown') {
        this.isBusy = true
      }
    },
    handleMouseup() {
      if (this.isBusy) {
        this.$emit('change', this.temp)
      }
      this.isBusy = false
    },
    handleMousemove(ev) {
      if (this.isBusy) {
        const e = this.$el
        if (e) {
          const w = e.offsetWidth
          let x = ev.clientX - e.offsetLeft
          if (x < 0) x = 0
          if (x > w) x = w
          if (ev.target) {
            this.percentage = (x / w) * 100
          }
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  height: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    .progress::after {
      visibility: visible !important;
    }
    .progress-bg {
      height: 4px;
    }
  }
  & * {
    pointer-events: none;
  }
  .progress-bg {
    width: 100%;
    height: 3px;
    position: relative;
    background: var(--progress-bg);
  }
  .progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: var(--progress);
    &::after {
      content: '';
      position: absolute;
      right: -6px;
      top: -4px;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      z-index: 11111;
      background: var(--progress);
      box-shadow: 0px 0px 2px 1px #0008;
      visibility: hidden;
    }
  }
}
</style>