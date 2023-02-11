<template>
  <div :class="['card', isPlaying && playList.encodeId === detail.encodeId && 'active' ]">
    <div class="image" :class="border && 'border-radius-50'">
      <img
        :src="detail.thumbnail"
        alt="thumbnail"
        :class="border && 'border-radius-50'"
      />
      <div class="controls">
        <div class="center">
          <button
            class="btn btn-heart"
            v-if="heart"
            v-tooltip.top="'Thêm vào thư viện'"
          >
            <i class="ic-like"></i>
          </button>
          <button class="btn play" @click="playPlaylist(detail)">
            <i
              class="icon"
              :class="isPlaying && playList.encodeId === detail.encodeId ? 'ic-gif-playing-white' : 'ic-play'"
            ></i>
          </button>
          <button class="btn btn-more" v-if="more" v-tooltip.top="'Khác'">
            <i class="ic-more"></i>
          </button>
        </div>
      </div>
    </div>
    <router-link :to="detail.link" class="title" :title="detail.title">{{
      detail.title
    }}</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as TYPE from '@/actionTypes'
import mixinPlaying from '@/mixins/playing'

export default {
  name: 'card',
  props: {
    detail: [Object, Array],
    border: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    },
    heart: {
      type: Boolean,
      default: false
    }
  },
  mixins: [mixinPlaying],
  data() {
    return {
      
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.looper()
    })
  },
  methods: {
    ...mapActions({
      songGrogress: `song/player/${TYPE.SONG_PROGRESS}`,
    }),
    looper() {
      this.songGrogress()
      setTimeout(() => {
        this.looper()
      }, 500)
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
  border-radius: 10px;
}
.btn-more,
.btn-heart {
  &:hover {
    border-radius: 50%;
    background: hsla(0, 0%, 100%, 0.3) !important;
  }
}
.title {
  color: var(--text-secondary);
  text-decoration: none;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  &:hover {
    color: var(--text-primary);
  }
}
.active {
  .image {
    &::after {
      content: "";
      display: block;
    }
    img[alt="thumbnail"] {
      transform: scale(1.05);
    }
    .controls {
      visibility: visible !important;
    }
  }
  .play {
    width: 36px !important;
    height: 36px !important;
  }
}
.image {
  overflow: hidden;
  position: relative;
  border-radius: 10px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: none;
  }
  &:hover,
  &.playing {
    &::after {
      display: block;
    }
    img[alt="thumbnail"] {
      transform: scale(1.05);
    }
    .controls {
      visibility: visible;
    }
  }
  img[alt="thumbnail"] {
    transition: transform 0.4s ease-out;
    width: 100%;
    border-radius: 10px;
  }
  .controls {
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 150;
    display: flex;
    align-items: center;
    .center {
      color: #fff;
      text-align: center;
      margin: auto;
      display: flex;
      align-items: center;
      button {
        color: #fff;
        background: transparent;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          vertical-align: middle;
          font-size: 20px;
        }

        &.play {
          border-radius: 999px;
          border: 1px solid #fff;
          padding: 8px;
          margin: 0 8px;
          i {
            font-size: 20px !important;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>