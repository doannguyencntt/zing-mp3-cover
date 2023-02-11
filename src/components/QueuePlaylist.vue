<template>
  <aside :class="{ fixed: isShowQueuePlaylist }">
    <PerfectScrollbar @ps-scroll-y="handleScroll" ref="scrollbar">
      <div class="header" :class="{ 'is-sticky': isSticky }">
        <div class="tab">
          <button
            @click="current = 'playing'"
            class="btn"
            :class="{ current: current === 'playing' }"
          >
            Danh sách phát
          </button>
          <button
            @click="current = 'listen_recently'"
            class="btn"
            :class="{ current: current === 'listen_recently' }"
          >
            Nghe gần đây
          </button>
        </div>
        <div class="others">
          <button class="rounded btn alarm " :class="showTimerModal && 'is-active'" @click="setTimeMusic()">
            <i class="ic-clock"></i>
          </button>
          <button class="rounded btn">
            <i class="ic-more"></i>
          </button>
        </div>
      </div>
      <div class="playlist">
        <div class="list" ref="recent" v-show="current === 'listen_recently'">
          <QueueSong
            v-for="item in recentItems"
            :key="item.encodeId"
            :is-active="item.encodeId === currentSongId"
            :song="item"
            :overlay="true"
            :play-song="playSong"
          ></QueueSong>
        </div>
        <div class="next-up" v-show="current === 'playing'">
          <div class="text-title">
            <span>Phát ngẫu nhiên bài hát</span>
            <input class="switch" type="checkbox" @click="toggleShuffle(!isShuffle)" :checked="isShuffle">
          </div>
          <div class="from" v-if="currentPlaylist">
            Từ danh sách phát
            <a href="#" class="text-primary">{{ currentPlaylist.title }}</a>
          </div>
          <div class="list">
            <QueueSong
              v-for="item in queues"
              :key="item.encodeId"
              :class="{ 'is-active': item.is_active }"
              :song="item"
              :play-song="playSong"
            ></QueueSong>
          </div>
        </div>
      </div>
    </PerfectScrollbar>
    <TimerModal :showTimerModal="showTimerModal" @modal:updateTimerModal="updateTimerModal($event)" />
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as TYPE from '@/actionTypes'
import mixinPlaying from '@/mixins/playing'
import QueueSong from '@/components/song/Queue'
import TimerModal from '@/components/ModalTimer'

export default {
  name: 'queue-playlist',
  components: {
    QueueSong,
    TimerModal
  },
  mixins: [mixinPlaying],
  data() {
    return {
      current: 'playing',
      scrollbar: '',
      recent: '',
      isSticky: false,
      showTimerModal: false
    }
  },
  computed: {
    ...mapGetters({
      isShowQueuePlaylist: `song/player/${TYPE.GET_QUEUE_PLAY_LIST}`,
      recentItems: `song/player/${TYPE.GET_RECENT_ITEMS}`,
      queues: `song/player/${TYPE.GET_LIST_SONG_CURRENT}`,
      currentSongId: `song/player/${TYPE.GET_CURRENT_SONG_ID}`,
      currentPlaylist: `song/player/${TYPE.GET_PLAY_LIST}`,
      isShuffle: `song/player/${TYPE.GET_SHUFFLE}`
    })
  },
  methods: {
    ...mapActions({
      toggleShuffle: `song/player/${TYPE.IS_SHUFFLE}`
    }),
    setTimeMusic() {
      this.showTimerModal = true
    },
    updateTimerModal(val) {
      this.showTimerModal = val
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
$border-radius: 999px;
aside {
  width: $queue-playlist-width;
  height: 100vh;
  right: 0;
  top: 0;
  position: fixed;
  border-left: 1px solid var(--border-color);
  background: var(--background);
  transition: right 0.3s;
  z-index: 150;
  & > .ps {
    height: 100vh;
  }
  // overflow-y: auto;
  @include media('<large') {
    right: -$queue-playlist-width !important;
  }
  &.fixed {
    right: 0 !important;
  }
  .header {
    width: 100%;
    height: $top-height;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background: var(--background);
    z-index: 1111;
    &.is-sticky {
      background: var(--background);
      box-shadow: 0 3px 5px var(--sticky-header-box-shadow);
      position: sticky;
      top: 0;
    }
    .tab {
      flex: 1 1;
      display: flex;
      background: var(--alpha-bg);
      padding: 3px;
      border-radius: $border-radius;
      & > button {
        border-radius: $border-radius;
        flex: 1;
        background: transparent;
        font-size: 12px;
        flex-grow: 1;
        padding: 8px 5px;
        font-weight: 500;
        &.current {
          color: var(--primary-text);
          background: var(--tab-active);
        }
      }
    }
    .others {
      button {
        margin-left: 4px;
        line-height: 1;
        padding: 6px 8px;
        i {
          display: inline-block;
          font-size: 16px;
          margin-top: 1.5px;
        }
      }
    }
  }
  .switch {
    --inactive-bg: #cfd8dc;
    --size: 13px;
    appearance: none;
    width: 24px;
    height: 15px;
    display: inline-block;
    border-radius: calc(var(--size) / 2);
    cursor: pointer;
    background-color: var(--inactive-bg);
    background-image: radial-gradient(
        circle calc(var(--size) / 2.1),
        #fff 100%,
        #0000 0
      ),
      radial-gradient(circle calc(var(--size) / 1.5), #0003 0%, #0000 100%);
    background-repeat: no-repeat;
    background-position: calc(var(--size) / -2.80) 0;
    transition: background 0.2s ease-out;
  }
  .switch:checked {
    background-color: var(--primary);
    background-position: calc(var(--size) / 2.80) 0;
  }
}
.playlist {
  padding: 8px 8px 100px 8px;
}
.next-up {
  // margin-top: 15px;
  .text-title {
    font-weight: bold;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      margin-right: 20px;
    }
  }
  .from {
    color: var(--text-secondary);
  }
  .list {
    margin-top: 10px;
  }
}
</style>