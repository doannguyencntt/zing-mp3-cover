<template>
  <div class="wrapper-carousel">
    <h3 class="carousel-title">
      <span>{{ title }}</span>
      <div class="controls" :class="controls">
        <button @click="handlePrev()" :class="0 === current ? 'disabled' : null">
          <i class="ic-go-left"></i>
        </button>
        <button
          @click="handleNext()"
          :class="maxCount - 1 <= current ? 'disabled' : null"
        >
          <i class="ic-go-right"></i>
        </button>
      </div>
    </h3>
    <div class="carousel" ref="carousel">
      <slot />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
export default {
  name: 'carousel',
  components: {
    Card
  },
  props: {
    title: { type: String },
    lengthItems: { 
      type: Number 
    },
    itemShow: {
      type: Number,
      default: 5
    },
    controls: {
      type: String
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      carousel: null,
      current: 0,
      maxCount: Math.round(this.lengthItems / this.itemShow)
    }
  },
  watch: {
    current(val) {
      this.$refs.carousel.scrollLeft = val * this.$refs.carousel.offsetWidth
    }
  },
  mounted() {
    this.autoSlider(5000)
  },
  methods: {
    autoSlider(duration) {
      setTimeout(() => {
        if (this.auto) {
          this.handleNext()
        }
        this.autoSlider(duration)
      }, duration)
    },
    handleNext() {
      if (this.maxCount - 1 <= this.current) return
      if (this.maxCount > this.current + 1) {
        this.current++
      } else {
        this.current--
      }
    },
    handlePrev() {
      if(this.current === 0) return
      if(this.current > 0) {
        this.current--
      } else {
        this.current++
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-carousel {
  position: relative;
}
.carousel {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap !important;
  scroll-behavior: smooth;
  overflow: hidden;
  margin: 0 -15px;
  & > :deep(div) {
    // width: calc(100% / 7);
    transition: width 0.3s;
    @include media('<1350px', '>1226px') {
      width: calc(100% / 5) !important;
    }
    @include media('<1225px') {
      width: calc(100% / 4) !important;
    }
    flex-shrink: 0;
    padding: 0 15px;
  }
}
.carousel-title {
  margin-top: 30px;
  display: flex;
  margin-bottom: 13px;
  font-weight: bold;
  font-size: 18px;
  color: #32323D;
  .controls-center {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white !important;
      color: #32323D !important;
      i {
        line-height: 0;
      }
    }
  }
  .controls {
    margin-left: auto;
    z-index: 2;
    button {
      background: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      &.disabled {
        opacity: .3;
      }
      i {
        font-size: 17px;
      }
      &:last-child {
        margin-left: 12px;
      }
    }
  }
}
</style>