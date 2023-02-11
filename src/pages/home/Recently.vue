<template>
  <div id="recently">
    <h3 class="recently-title">
      <span>{{ title }}</span>
      <div class="recently-all">
        <div class="controls">
          <button class="d-flex">
            <span>Tất cả</span>
            <i class="ic-go-right"></i>
          </button>
        </div>
      </div>
    </h3>
    <div class="recently-content">
      <Card
        v-for="(item, index) in items"
        :key="'item' + index"
        :detail="item"
        border
      />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
export default {
  name: 'recently',
  components: {
    Card
  },
  props: {
    title: { type: String },
    items: { 
      type: [Array, Object] 
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.recently-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap !important;
  scroll-behavior: smooth;
  overflow: hidden;
  margin: 0 -15px;
  & > :deep(div) {
    width: calc(100% / 5);
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
.recently-title {
  margin-top: 30px;
  display: flex;
  margin-bottom: 13px;
  font-weight: bold;
  font-size: 18px;
  color: #32323d;
  justify-content: space-between;
}

.controls {
    margin-left: auto;
    button {
      background: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      text-transform: uppercase;
      align-items: center;
      font-size: 12px;
      opacity: .6;
      font-weight: 600;
      &.disabled {
        opacity: .3;
      }
      i {
        font-size: 15px;
        margin-left: 7px;
      }
      &:last-child {
        margin-left: 12px;
      }
      &:hover {
        color: var(--text-primary);
      }
    }
  }
</style>