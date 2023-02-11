<template>
  <div
    class="queue"
    :class="{ active: isActive, playing: isPlaying && song.encodeId === currentSongId }"
    ref="ele"
  >
    <figure class="left">
      <img :src="song.thumbnail" alt="thumbnail" />
      <div class="overlay">
        <div class="center">
          <button class="btn" @click="playSong(song)">
            <i
              class="icon"
              :class="isPlaying && song.encodeId === currentSongId ? 'ic-gif-playing-white' : 'ic-play'"
            ></i>
          </button>
        </div>
      </div>
    </figure>
    <div class="right">
      <div class="name">{{ song.title }}</div>
      <div class="artists">
        <div
          v-for="(artist, index) in song.artists"
          :key="'artist' + index"
        >
          <a href="#">
            {{ artist.name }}<span v-if="index !== song.artists.length - 1">, </span>
          </a>
        </div>
      </div>
    </div>
    <div class="cover" v-if="overlay"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes'

export default {
  props: {
    song: {
      type: Object,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    playSong: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      ele: ''
    }
  },
  computed: {
    ...mapGetters({
      isPlaying: `song/player/${TYPE.GET_PLAYING}`,
      currentSongId: `song/player/${TYPE.GET_CURRENT_SONG_ID}`,
    })
  }
}
</script>

<style lang="scss" scoped>
.queue {
  padding: 8px;
  display: flex;
  border-radius: 4px;
  position: relative;
  user-select: none;
  &.active {
    background: var(--primary) !important;
    color: #fff;
    .artists > a {
      color: #ddd !important;
    }
  }
  &:not(.active) .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--background);
    opacity: 0.5;
  }
  &:hover,
  &.playing {
    background: var(--alpha-bg);
    .cover {
      opacity: 0 !important;
      z-index: -1;
    }
    .left .overlay {
      visibility: visible;
    }
  }
  .left {
    width: 40px;
    min-width: 40px;
    height: 40px;
    display: inline-flex;
    margin: 0;
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 10;
      display: flex;
      align-items: center;
      visibility: hidden;
      .center {
        flex: 1;
        text-align: center;
        .btn {
          color: #fff;
          font-size: 17px;
          & > i:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
  .right {
    padding-left: 10px;
    .name {
      font-weight: 600;
    }
    .artists {
      margin-top: 5px;
      font-size: 12px;
      > a {
        color: var(--text-secondary);
      }
    }
  }
}
</style>