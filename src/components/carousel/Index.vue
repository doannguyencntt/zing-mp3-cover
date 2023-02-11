<template>
  <Slider :title="title" :lengthItems="items && items.length">
    <Card
        v-for="(item, index) in items"
        :key="'item' + index"
        :detail="item"
        :style="{width: 100 / 5 + '%'}"
        heart
        more
      />
  </Slider>
</template>

<script>
import Slider from '@/components/common/Silder'
import Card from '@/components/Card'
export default {
  name: 'carousel',
  components: {
    Card,
    Slider
  },
  props: {
    title: { type: String },
    items: { type: [Array, Object] }
  },
  data() {
    return {
      
    }
  },
  
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
</style>