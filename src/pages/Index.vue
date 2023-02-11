<template>
  <div>
    <div v-for="(section, index) in sections" :key="'section' + index">
      <SliderComponent v-if="section.sectionType === 'banner'" :sliders="section.items" />
      <Recently v-else-if="section.sectionType === 'recentPlaylist' && section.items"
                :title="section.title"
                :items="section.items"
                border />
      <Carousel v-else-if="section.sectionType === 'playlist'"
                :title="section.title"
                :items="section.items" />
    </div>
    <!-- <LineChart /> -->
    <WeekChart v-if="listImg && listImg.length" :listImg="listImg"/>
    <SliderSinger />
    <MusicPartner :listMusicPartner="listImgMusicPartner"/>
    
  </div>
</template>

<script>
import SliderComponent from '@/components/slider/Index'
import Carousel from '@/components/carousel/Index'
import Recently from './home/Recently'
import LineChart from '@/components/chart/LineChart'
import WeekChart from '@/components/WeekChart'
import MusicPartner from '@/components/MusicPartner'
import SliderSinger from '@/components/SliderSinger'
import { sliders } from '@/components/slider/data.js'
import { fetchHome } from '@/api'
import { shuffle } from 'lodash'


export default {
  name: 'discover',
  components: {
    SliderComponent,
    Carousel,
    Recently,
    LineChart,
    WeekChart,
    MusicPartner,
    SliderSinger
  },
  data() {
    return {
      sliders: sliders,
      sections: [],
      listImg: [
        {
          id: 1,
          link: '',
          name: 'Việt Nam',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/song-vn-2x.jpg'
        },
        {
          id: 2,
          link: '',
          name: 'US-UK',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/web_song_usuk.jpg'
        },
        {
          id: 3,
          link: '',
          name: 'K-POP',
          path: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/web_song_kpop.jpg'
        }
      ],
      listImgMusicPartner: [
        {
          id: 1,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/sony.png'
        },
        {
          id: 2,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png'
        },
        {
          id: 3,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/SM-Entertainment.png'
        },
        {
          id: 4,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png'
        },
        {
          id: 5,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/Kakao-M.png'
        },
        {
          id: 6,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png'
        },
        {
          id: 7,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/universal-1.png'
        },
        {
          id: 8,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png'
        },
        {
          id: 9,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png'
        },
        {
          id: 10,
          name: '',
          path: 'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/empire.png'
        }
      ]
    }
  },
  mounted() {
    this.listImgMusicPartner = shuffle(this.listImgMusicPartner)
  },
  methods: {
    async loadHome(page = 1) {
      const res = await fetchHome(page)
      if (res && res.data && Array.isArray(res.data.items)) {
        this.sections.push(...res.data.items)
      }
    }
  },
  async created() {
    try {
      await this.loadHome(1)
      await this.loadHome(2)
      await this.loadHome(3)
      await this.loadHome(4)
      await this.loadHome(5)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style>

</style>