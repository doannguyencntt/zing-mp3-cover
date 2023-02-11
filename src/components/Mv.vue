<template>
  <div class="wrapper-mv" :class="{ active: isShowMv }">
    <div class="wrapper">
      <div class="header">
        <div class="left"></div>
        <div class="right">
          <div class="actions">
            <!-- <button class="btn"><i class="icon ic-scale"></i></button> -->
            <button class="btn">
              <i class="icon ic-settings"></i>
            </button>
            <button class="btn" @click="hideMv()">
              <i class="icon ic-go-down"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="mv-current" >
          <video width="100%" height="100%" controls v-if="mvUrl && !reloadMv">
            <source :src="mvUrl" type="video/mp4">
          </video>
          <div class="lazy-loading" v-else>
            <Loader active />
          </div>
        </div>
        <div class="list-mv">
          <div class="title" :class="{ 'is-sticky': isSticky }">
            <span>Danh sách phát</span>
          </div>
          <PerfectScrollbar @ps-scroll-y="handleScroll" ref="scrollbar">
            <div>
              <div class="mv-item" v-for="queue in queues" :key="queue.encodeId">
                <div>
                  <figure @click="playMv(queue.encodeId)">
                    <img :src="queue.thumbnail" :alt="queue.title">
                  </figure>
                  <div class="mv-item__info">
                    <p class="name">{{ queue.title }}</p>
                    <p class="artist">{{ artists(queue.artists) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </PerfectScrollbar>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes'
import { fetchKaraokeLyric } from '@/api'
import Loader from '@/components/common/Loader'
export default {
  name: 'Mv',
  components: {
    Loader
  },
  data() {
    return {
      isShowing: true,
      isSticky: false,
      reloadMv: false
    }
  },
  watch: {
    
  },
  computed: {
    ...mapGetters({
      mvUrl: `song/lyric/${TYPE.GET_MV_URL}`,
      queues: `song/player/${TYPE.GET_LIST_SONG_CURRENT}`,
      isShowMv: `song/player/${TYPE.GET_SHOW_MV}`,
    })
  },
  watch: {
    mvUrl(val) {
      if (val) {
        this.reloadMv = true
        setTimeout(() => {
          this.reloadMv = false
        }, 2000)
      }
    }
  },
  methods: {
    ...mapActions({
      handleUrlMv: `song/lyric/${TYPE.HANDLE_URL_MV}`
    }),
    hideMv() {
      this.$emit('hideMv')
    },
    async playMv(id) {
      try {
        this.reloadMv = true
        const res  = await fetchKaraokeLyric(id)
        if (res.data.streamingUrl) {
          this.handleUrlMv(res.data.streamingUrl)
          this.reloadMv = false
        } else {
          alert('Mv này ko tồn tại')
          this.reloadMv = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    artists(artists) {
      if (artists && artists.length) {
        return artists.map(item => item.name).join(', ')
      }
      return ''
    },
    resizeImage(img) {
      if (img) {
        return img.replace(
          'w94_r1x1_jpeg',
          'w94_r2x1_jpeg'
        )
      }
      return ''
    },
    handleScroll(ev) {
      const target = ev.target
      if (target.scrollTop > 10) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.wrapper-mv {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background);
  z-index: 999;
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
  }
  .content {
    display: flex;
    .mv-current {
      width: 70%;
    }
    .list-mv {
      margin-left: 30px;
      padding-left: 20px;
      width: 30%;
      background-color: hsla(0,0%,100%,.05);
      border-radius: 5px;
      max-height: 510px;
      overflow: hidden;
      .ps {
        max-height: 510px;
      }
      .title {
        text-transform: uppercase;
        font-size: 17px;
        font-weight: 700;
        padding-bottom: 20px;
        padding-top: 20px;
        position: sticky;
        top: 0;
        display: block;
      }
      .title.is-sticky {
        box-shadow: 0 3px 5px var(--sticky-header-box-shadow);
      }
      .mv-item.active {
        background-color: hsla(0,0%,100%,.05);
      }
      .mv-item {
        cursor: pointer;
        padding: 5px 0;
        figure {
          width: 70px;
          min-width: 70px;
          display: inline-flex;
          margin: 0;
          cursor: pointer;
          position: relative;
          border-radius: 4px;
          overflow: hidden;
        }
        > div {
          display: flex;
          align-items: center;
        }
        &__info {
          .name {
            font-weight: 700;
            font-size: 15px;
            margin-bottom: 8px;
          }
          .artist {
            opacity: .8;
          }
          p {
            padding: 0 10px;
          }
        }
        
      }
    }
  }
  .lazy-loading {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }
}
</style>