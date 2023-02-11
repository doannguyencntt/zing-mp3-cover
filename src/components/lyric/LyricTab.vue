<template>
  <div class="lyric">
    <div class="lyric-1">
      <div class="content" v-if="currentSongId">
        <figure class="image">
          <img :src="songImage" alt="image" />
          <div class="playing-icon" v-if="isPlaying">
            <i class="icon ic-gif-playing-white"></i>
          </div>
        </figure>
        <div class="lyric-body">
          <div class="sentences" v-if="lyrics && lyrics.length">
            <template
              v-for="(sentence, index) in lyrics">
              <div
                class="sentence"
                @click="handleSeek(sentence.time)"
                :class="{ active: index === currentIndex }"
                :id="`s${index}entence`"
                :key="index"
              >
                {{ sentence.content }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="info">
        <h3 class="title">{{ currentSong.title }}</h3>
        <div class="artists">{{ currentSong.artistsNames }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes'

export default {
  name: 'LyricTab',
  props: {
    lyricUrl: String
  },
  data() {
    return {
      sentences: '',
      currentIndex: -1,
      isPlaying: false
    }
  },
  computed: {
    ...mapGetters({
      lyrics: `song/lyric/${TYPE.GET_LYRIC}`,
      currentSong: `song/player/${TYPE.GET_CURRENT_SONG}`,
      currentSongId: `song/player/${TYPE.GET_CURRENT_SONG_ID}`,
      currentTime: `song/player/${TYPE.GET_CURRENT_TIME}`
    }),
    songImage() {
      if (this.currentSong) {
        return this.currentSong.thumbnailM.replace(
          'w240_r1x1_jpeg',
          'w512_r1x1_jpeg'
        )
      }
      return ''
    }
  },
  watch: {
    async currentSongId() {
      await this.fetchLyric(this.lyricUrl)
    },
    currentIndex(val) {
      const el = document.getElementById(`s${val}entence`)
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    }
  },
  methods: {
    ...mapActions({
      fetchLyric: `song/lyric/${TYPE.FETCH_LYRIC}`
    }),
    doLyric() {
      if (this.currentSongId) {
        const seek = this.currentTime
        this.currentIndex = this.lyrics.findIndex((s, i) => {
          const _next = this.lyrics[i + 1]
          return seek >= s.time && (_next ? seek < _next.time : true)
        })
      }
      setTimeout(this.doLyric, 100)
    },
    handleSeek() {

    }
  },
  async created() {
    if (this.lyricUrl)
      await this.fetchLyric(this.lyricUrl)
      this.doLyric()
  }
}
</script>

<style lang="scss" scoped>
.lyric {
  width: 85%;
  height: 100%;
  min-width: 800px;
  max-width: 1000px;
  margin: auto;
  display: flex;
  align-items: center;
  .lyric-1 {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .content {
    display: flex;
    width: 100%;
    .image {
      position: relative;
      margin: 0;
      border-radius: 10px;
      overflow: hidden;
      width: 400px;
      max-width: 400px;
      img {
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
      .playing-icon {
        position: absolute;
        bottom: 25px;
        left: 20px;
        i.icon {
          background-size: 28px !important;
          width: 28px !important;
          height: 28px !important;
        }
      }
    }
    .lyric-body {
      flex: 1;
      padding: 0 20px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      .sentences {
        max-height: 400px;
        user-select: none;
        overflow-y: scroll;
        box-sizing: content-box;
        padding-right: 45px;
        width: 100%;
        height: 100%;
        .sentence {
          font-weight: bold;
          font-size: 23px;
          color: var(--text-secondary);
          background: transparent;
          padding: 10px;
          margin-bottom: 12px;
          border-radius: 10px;
          cursor: default;
          &:hover,
          &.active {
            background: var(--alpha-bg);
          }
          &.active {
            color: var(--primary);
          }
        }
      }
    }
  }

  .info {
    line-height: 1.7;
    width: 100%;
    margin-top: 10px;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
    .artists {
      color: var(--text-secondary);
    }
  }
}
</style>