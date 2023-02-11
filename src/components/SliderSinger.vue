<template>
  <Slider :lengthItems="listSinger && listSinger.length" 
          :itemShow="7" 
          controls="controls-center"
          auto>
    <div class="singer" v-for="item in listSinger" 
         :key="item.id" 
         :style="{width: 100 / 7 + '%'}">
      <img :src="item.path" :alt="item.name">
    </div>
  </Slider>
</template>

<script>
import Slider from '@/components/common/Silder'
export default {
  name: 'slider-singer',
  components: {
    Slider
  },
  data() {
    return {
      listSinger: [
        {
          id: '1',
          name: 'onlyc',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/onlyc.png',
        },
        {
          id: '2',
          name: 'jack',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/jack.png',
        },
        {
          id: '3',
          name: 'justatee',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/justatee.png',
        },
        {
          id: '4',
          name: 'karik',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png',
        },
        {
          id: '5',
          name: 'hoa-minzy',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/hoa-minzy.png',
        },
        {
          id: '6',
          name: 'erik',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png',
        },
        {
          id: '7',
          name: 'trinh-thanh-binh',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/trinh-thanh-binh.png',
        },
        {
          id: '8',
          name: 'mr-siro',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/mr-siro.png',
        },
        {
          id: '9',
          name: 'duc-phuc',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/duc-phuc.png',
        },
        {
          id: '10',
          name: 'huong-ly',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/huong-ly.png',
        },
        {
          id: '11',
          name: 'chi-dan',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/chi-dan.png',
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .singer {
    cursor: pointer;
    &:hover {
      filter: brightness(0.7);
    }
  }
</style>