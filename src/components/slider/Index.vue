<template>
  <div>
    <div class="wrapper" @mouseover="handlePause" @mouseleave="handlePause">
      <div class="prev" @click="handlePrev">
        <div class="carousel-ctrl">
          <button class="icon btn">
            <i class="ic-go-left"></i>
          </button>
        </div>
      </div>
      <SliderItem
        v-for="(slider, index) in sliders"
        :key="'slider' + index"
        :slider="slider"
        :current-index="currentIndex"
        :index="index"
        :total="sliders.length"
      />
      <SliderItem :slider="slider" hide />
      <div class="next" @click="handleNext">
        <div class="carousel-ctrl">
          <button class="icon btn">
            <i class="ic-go-right"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="carousel-nav">
      <div
        v-for="index in sliders.length"
        :key="'nav' + index"
        class="nav-item"
        :class="{ current: index - 1 === currentIndex }"
      ></div>
    </div>
  </div>
</template>

<script>
import SliderItem from './SliderItem'
export default {
  name: 'sliders',
  components: {
    SliderItem
  },
  props: {
    sliders: [Array, Object]
  },
  data() {
    return {
      currentIndex: 0,
      isPause: false,
      slider: this.sliders[0]
    }
  },
  mounted() {
    this.autoPlayCarousel(5000)
  },
  methods: {
    handleNext() {
      if (this.currentIndex < this.sliders.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
    },
    handlePrev() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.currentIndex = this.sliders.length - 1
      }
    },
    autoPlayCarousel(duration) {
      setTimeout(() => {
        if (!this.isPause) {
          this.handleNext()
        }
        this.autoPlayCarousel(duration)
      }, duration)
    },
    handlePause(e) {
      if (e.type === 'mouseover') {
        this.isPause = true
      }
      if (e.type === 'mouseleave') {
        this.isPause = false
      }
    }
  },
}
</script>
<style lang="scss" scoped>
$cover-width: 41.4%;
$cover-width-m: 70%;
$not-current-cover-scale: 0.85;
$left-cover-transform: translateX(-77%) scale($not-current-cover-scale);
$right-cover-transform: translateX(77%) scale($not-current-cover-scale);

$left-cover-transform-m: translateX(-25%) scale($not-current-cover-scale);
$right-cover-transform-m: translateX(25%) scale($not-current-cover-scale);
.wrapper {
  position: relative;
  user-select: none;
  .prev,
  .next {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: $cover-width;
    @include media('<medium') {
      width: $cover-width-m !important;
    }
    height: 100%;
    z-index: 7;
    cursor: pointer;
    &:hover {
      .carousel-ctrl .icon {
        opacity: 1 !important;
      }
    }
    .carousel-ctrl {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .icon {
        border-radius: 50%;
        padding: 13px 16px;
        background: #fff2;
        opacity: 0;
        margin: 13px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .15);
        &:hover {
          opacity: 0.8;
        }
        i {
          font-size: 30px;
          color: #fff;
        }
      }
    }
  }
  .next {
    @include media('<medium') {
      transform: $right-cover-transform-m !important;
    }
    transform: $right-cover-transform;
    .carousel-ctrl {
      flex-direction: row-reverse;
    }
  }
  .prev {
    transform: $left-cover-transform;
    @include media('<medium') {
      width: $cover-width-m !important;
    }
  }

  :deep(.item-wrapper) {
    width: $cover-width;
    @include media('<medium') {
      width: $cover-width-m !important;
    }
    transition: 0.7s;
    &:not(.hidden) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      transform: translateX(0);
    }
    &.hidden {
      visibility: hidden;
    }
    &.prev {
      @include media('<medium') {
        transform: $left-cover-transform-m !important;
      }
      transform: $left-cover-transform !important;
      z-index: 5;
    }
    &.next {
      @include media('<medium') {
        transform: $right-cover-transform-m !important;
      }
      transform: $right-cover-transform !important;
      z-index: 5;
    }
    &.current {
      z-index: 10;
    }
    &:not(.next):not(.prev):not(.current) {
      opacity: 0;
      transform: translateX(0) scale(0.4) !important;
    }
    transform: translateX(0);
    height: auto;
    .card {
      display: inline-block;
      .image > img {
        width: 100%;
        border-radius: 8px;
      }
    }
  }
}
.carousel-nav {
  text-align: center;
  margin-top: 14px;
  .nav-item {
    display: inline-block;
    margin: 5px;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    transition: all 0.5s ease-in-out 0.3s;
    background: var(--banner-home-dot);
    &.current {
      width: 24px;
      background: linear-gradient(104deg, #3023ae, #c86dd7 102%);
    }
  }
}
</style>