<template>
  <div
    class="item-wrapper"
    :class="{
      hidden: hide,
      current: currentIndex === index,
      prev: checkCtrlClass('prev'),
      next: checkCtrlClass('next'),
    }"
  >
    <router-link class="card" :to="slider.link" :title="slider.title">
      <div class="image">
        <img :src="slider.banner" alt="banner" />
      </div>
      <div class="content"></div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'slider-item',
  props: {
    slider: {
      type: Object
    },
    hide: {
      type: Boolean,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
    },
  },
  data() {
    return {

    }
  },
  methods: {
    checkCtrlClass(action) {
      const { currentIndex, total, index } = this.$props
      let localIndex = 0
      if (action === 'prev') {
        localIndex = index + 1
        if (localIndex > Number(total) - 1) {
          localIndex = 0
        }
      } else if (action === 'next') {
        localIndex = index - 1
        if (localIndex < 0) {
          localIndex = Number(total) - 1
        }
      }
      return currentIndex === localIndex
    }
  }
}
</script>