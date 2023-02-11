<template>
  <div class="wrapper-lyric" :class="{ active: isShowKaraoke }">
    <div class="wrapper" v-show="isShowing">
      <div class="header">
        <div class="left"></div>
        <div class="center">
          <div class="tab">
            <button
              @click="tab = 'karaoke'"
              class="btn"
              :class="{ current: tab === 'karaoke' }"
            >
              Karaoke
            </button>
            <button
              @click="tab = 'lyric'"
              class="btn"
              :class="{ current: tab === 'lyric' }"
            >
              Lyric
            </button>
          </div>
        </div>
        <div class="right">
          <div class="actions">
            <!-- <button class="btn"><i class="icon ic-scale"></i></button> -->
            <button class="btn">
              <i class="icon ic-settings"></i>
            </button>
            <button class="btn" @click="hideKaraoke()">
              <i class="icon ic-go-down"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="content">
        <template v-if="isShowing || lastId === currentSongId">
          <KaraokeTab
            v-show="tab === 'karaoke'"
            :lyric-url="lyricUrl"
            :sentences="sentences"
            v-if="sentences && sentences.length"
          />
          <LyricTab
            v-if="lyricUrl"
            v-show="tab === 'lyric'"
            :lyric-url="lyricUrl"
          />
        </template>
      </div>
      <div class="bottom">
        <div class="song-info">
          <span class="song">
            {{ currentSong.title }}
          </span>
          <span class="artist"> - {{ currentSong.artistsNames }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes' 
import LyricTab from './lyric/LyricTab'
import KaraokeTab from './lyric/KaraokeTab'
export default {
  name: 'LyricIndex',
  components: {
    LyricTab,
    KaraokeTab
  },
  props: {
    
  },
  data() {
    return {
      isShowing: true,
      lastId: '',
      tab: 'lyric'
    }
  },
  watch: {
    isShowKaraoke(val) {
      if(val) {
        this.getLyric()
      }
    },
    currentSongId(newVal, oldValue) {
      if(newVal !== oldValue) {
        this.getLyric()
      }
    }
  },
  computed: {
    ...mapGetters({
      lyricUrl: `song/lyric/${TYPE.GET_LYRIC_URL}`,
      currentSong: `song/player/${TYPE.GET_CURRENT_SONG}`,
      currentSongId: `song/player/${TYPE.GET_CURRENT_SONG_ID}`,
      sentences: `song/lyric/${TYPE.GET_SENTENCES}`,
      isShowKaraoke: `song/player/${TYPE.GET_SHOW_KARAORE}`,
    })
  },
  methods: {
    ...mapActions({
      fetchKaraokeLyric: `song/lyric/${TYPE.FETCH_LYRIC_URL}`,
      handleShowKaraoke: `song/player/${TYPE.HANDLE_SHOW_KARAORE}`,
    }),
    getLyric() {
      if (this.currentSongId) {
        this.fetchKaraokeLyric(this.currentSongId)
      }
    },
    hideKaraoke() {
      this.handleShowKaraoke(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-lyric {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background);
  z-index: 201;
  transition: 0.5s;
  transform: translateY(100%);
  padding-bottom: $player-height - 5px;
  &.active {
    transform: translateY(0);
  }
  .wrapper {
    position: relative;
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .bottom {
      position: absolute;
      margin: auto;
      bottom: 0;
      left: 0;
      right: 0;
      .song-info {
        text-align: center;
        font-size: 13px;
        .song {
          font-weight: bold;
        }
        .artist {
          color: var(--text-secondary);
        }
      }
    }
  }
  .header {
    position: relative;
    align-items: center;
    height: 75px;
    min-height: 75px;
    margin-top: 15px;
    .right {
      position: absolute;
      right: 0;
      top: 0;
      .actions {
        .btn {
          border-radius: 999px;
          font-size: 20px;
          padding: 15px;
          margin-left: 20px;
        }
      }
    }
    .center {
      width: 25%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      .tab {
        display: flex;
        background: var(--alpha-bg);
        padding: 3px;
        border-radius: 999px;
        & > button {
          border-radius: 999px;
          flex: 1;
          background: transparent;
          font-size: 16px;
          flex-grow: 1;
          padding: 8px 5px;
          font-weight: 500;
          &.current {
            font-weight: bold;
            color: var(--primary-text);
            background: var(--tab-active);
          }
        }
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>