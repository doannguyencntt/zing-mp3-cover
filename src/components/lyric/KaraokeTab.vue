<template>
  <div class="karaoke-content">
    <div class="content">
      <canvas id="canvas" width="1500" height="600" ref="canvasEle"></canvas>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { buildSentences, normalize } from '@/helpers/karaoke'
import * as TYPE from '@/actionTypes'
const fontSize = 50
const lineHeight = 1.5
const lines = 2
const fontFamily = '${fontFamily}'
export default {
  name: 'KaraokeTab',
  props: {
    lyricUrl: String,
    sentences: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      ctx: null,
      sections: null,
      Colors: {
        primary: '#fff',
        stroke: '#7200a1',
      }
    }
  },
  async mounted() {
    const canvasEle = this.$refs.canvasEle
    this.ctx = canvasEle.getContext('2d')
    this.width = canvasEle.width
    this.height = canvasEle.height
    this.sections = normalize(this.sentences, this.ctx)
    this.doKaraoke()
  },
  watch: {
    currentSongId(newVal, oldValue) {
      if(newVal !== oldValue) {
        this.sentences = normalize(this.sentences, this.ctx)
        this.doKaraoke()
      }
    }
  },
  computed: {
    ...mapGetters({
      currentSong: `song/player/${TYPE.GET_CURRENT_SONG}`,
      currentSongId: `song/player/${TYPE.GET_CURRENT_SONG_ID}`,
      isPlaying: `song/player/${TYPE.GET_PLAYING}`,
      seek: `song/player/${TYPE.GET_SEEK}`
    }),
    isKaraoke() {
      return Array.isArray(this.sentences) && this.sentences.length > 0
    }
  },
  methods: {
    ...mapActions({
      fetchKaraokeLyric: `song/lyric/${TYPE.FETCH_LYRIC_URL}`
    }),
    drawIntro() {
      const song = this.currentSong
      if (!song) return
      const fontsize = [60, 40]
      ;[song.title, song.artistsNames].forEach((text, index) => {
        const contentHeight =
          fontSize * lines + lineHeight * fontSize * (lines - 1)

        const positionY =
          (this.height - contentHeight) / 2 +
          (lineHeight * fontSize + fontSize) * (index % lines)
        const positionX = this.width / 2

        this.ctx.font = `bold ${fontsize[index]}px ${fontFamily}`
        this.ctx.fillText(text, positionX, positionY)
      })
    },
    draw(seek) {
      this.ctx.fillStyle = this.Colors.primary
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.textAlign = 'center'
      this.ctx.font = `bold ${fontSize}px ${fontFamily}`
      this.ctx.textBaseline = 'hanging'
      this.ctx.globalAlpha = 1
      const sentences = buildSentences(this.sections, seek)
      if (!sentences.length) {
        this.drawIntro()
        return
      }
      sentences.forEach(({ text, start, end, words, index, alpha }) => {
        const meaText = this.ctx.measureText(text)
        const gradient = this.ctx.createLinearGradient(
          (this.width - meaText.width) / 2,
          0,
          (this.width + meaText.width) / 2,
          0
        )

        this.ctx.globalAlpha = alpha

        if (seek > end) {
          gradient.addColorStop(1, this.Colors.stroke)
        } else if (seek < start) {
          gradient.addColorStop(1, this.Colors.primary)
        } else {
          this.ctx.globalAlpha = 1
          let percent = 0
          for (let i = 0; i < words.length; i++) {
            const word = words[i]
            if (seek > word.end) {
              continue
            }

            percent = word.startAt
            const deta = (seek - word.start) / word.duration || 0

            if (deta < 0) {
              break
            }

            percent = Math.min(percent + deta * word.perInSentence, 1)
            break
          }
          gradient.addColorStop(percent, this.Colors.stroke)
          gradient.addColorStop(percent, this.Colors.primary)
        }

        const contentHeight =
          fontSize * lines + lineHeight * fontSize * (lines - 1)

        const positionY =
          (this.height - contentHeight) / 2 +
          (lineHeight * fontSize + fontSize) * (index % lines)
        const positionX = this.width / 2

        this.ctx.fillStyle = gradient
        this.ctx.fillText(text, positionX, positionY)
      })
    },
    doKaraoke() {
      if (this.isPlaying && this.isKaraoke) {
        if (this.ctx) {
          this.draw(this.seek)
        }
        requestAnimationFrame(this.doKaraoke)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.karaoke-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .content {
    text-align: center;
    flex: 1;
    #canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>