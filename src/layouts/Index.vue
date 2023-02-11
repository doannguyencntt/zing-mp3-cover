<template>
    <div class="default-layout">
    <SideBar />
    <section class="content">
      <perfect-scrollbar>
        <Header />
        <div class="wrapper">
          <router-view />
        </div>
      </perfect-scrollbar>
    </section>
    <QueuePlaylist />
    <Player />
    <Lyric />
    <Mv @hideMv="handleShowMv(false)"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from './default/Header'
import SideBar from './default/SideBar'
import Player from '@/components/song/Player'
import Lyric from '@/components/Lyric'
import Mv from '@/components/Mv'
import QueuePlaylist from '@/components/QueuePlaylist'
import * as TYPE from '@/actionTypes'
import { setTheme } from '@/helpers/dom'
import { getObject, saveObject } from '@/helpers/storage'
export default {
  name: 'default',
  components: {
    Header,
    SideBar,
    Player,
    Lyric,
    QueuePlaylist,
    Mv
  },
  data() {
    return {
      isShowMv: false
    }
  },
  mounted() {
    this.$nextTick(function() {
      const theme = getObject('settings')
      setTheme(theme.theme)
      // This place is not good but for the time being, let it be
      this.initSong()
    })
    
  },
  computed: {
    ...mapGetters({
      player: `song/player/${TYPE.GET_PLAYER}`,
      isPlaying: `song/player/${TYPE.GET_PLAYING}`,
      source: `song/player/${TYPE.GET_SOURCE}`
    })
  },
  watch: {
    player: {
      handler(val) {
        saveObject('Player', val)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      handleState: `song/player/${TYPE.HANDLE_STATE}`,
      loadHowl: `song/player/${TYPE.LOAD_HOWL}`,
      songPlaying: `song/player/${TYPE.SONG_PLAYING}`,
      fetchStreaming: `song/player/${TYPE.FETCH_STREAMING}`,
      handleShowMv: `song/player/${TYPE.IS_SHOW_MV}`,
    }),
    async initSong() {
      const localPlayer = getObject('Player')
      if (localPlayer) {
        this.handleState(localPlayer)
        const encodeId = localPlayer.currentSong.encodeId
        await this.fetchStreaming(encodeId)
        if(!this.source) return
        this.loadHowl(this.source[128])
        this.songPlaying(false)
      }
    }
  },
}
</script>
<style lang="scss" scoped>
$additional-width: $sidebar-width + $queue-playlist-width;
.default-layout {
  position: relative;
}
.content {
  margin-left: $sidebar-width;
  width: calc(100% - #{$additional-width});
  transition: width 0.3s;

  & > .ps {
    height: 100vh;
  }
  @include media('<large', '>medium') {
    width: calc(100% - #{$sidebar-width}) !important;
  }
  @include media('<medium') {
    margin-left: $sidebar-width-m !important;
    width: calc(100% - #{$sidebar-width-m}) !important;
  }

  min-width: 720px;
}
.wrapper {
  padding: 42px 45px 100px 58px;
  @include media('<large') {
    padding: 20px 38px 100px 38px !important;
  }
}
</style>