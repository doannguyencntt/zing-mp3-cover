import { Howl, Howler } from 'howler'
import { fetchPlaylist, fetchStreaming } from '@/api'
import { getObject } from '@/helpers/storage'
import * as TYPE from '@/actionTypes'
import { shuffle, find } from 'lodash'

const state = {
  player: {
    currentSong: {},
    volume: 50,
    playList: {},
    playListCurrent: {},
    isShuffle: false,
    recentItems: []
  },
  source: {},
  autoLoadNextSong: false,
  isPlaying: false,
  progress: null,
  currentTime: 0,
  duration: 0,
  howl: null,
  queuePlaylist: false,
  seek: null,
  isShowMv: false,
  isShowKaraoke: false
}

const getters = {
  [TYPE.GET_PLAYER]: state => state.player,
  [TYPE.GET_CURRENT_SONG]: state => state.player.currentSong,
  [TYPE.GET_CURRENT_SONG_ID]: state => state.player.currentSong.encodeId,
  [TYPE.GET_PLAYING]: state => state.isPlaying,
  [TYPE.GET_PROGRESS]: state => state.progress,
  [TYPE.GET_VOLUME]: state => state.player.volume,
  [TYPE.GET_SOURCE]: state => state.source,
  [TYPE.GET_PLAY_LIST]: state => state.player.playList,
  [TYPE.GET_LIST_SONG_CURRENT]: state => state.player.playListCurrent,
  [TYPE.GET_HOWL]: state => state.howl,
  [TYPE.GET_AUTO_LOAD_SONG]: state => state.autoLoadNextSong,
  [TYPE.GET_CURRENT_TIME]: state => state.currentTime,
  [TYPE.GET_SHUFFLE]: state => state.player.isShuffle,
  [TYPE.GET_QUEUE_PLAY_LIST]: state => state.queuePlaylist,
  [TYPE.GET_DURATION](state) {
    if(state.howl) return (state.duration / 100) * state.howl.duration() || 0
    return 0
  },
  [TYPE.GET_RECENT_ITEMS]: state => state.player.recentItems,
  [TYPE.GET_SEEK]: state => state.seek,
  [TYPE.GET_SHOW_MV]: state => state.isShowMv,
  [TYPE.GET_SHOW_KARAORE]: state => state.isShowKaraoke,
}

const mutations = {
  [TYPE.SET_CURRENT_SONG](state, payload) {
    if (typeof payload === 'string') {
      let currentSong = state.player.currentSong
      let items = state.player.playListCurrent
      if (state.player.isShuffle) items = shuffle(items)
      let index = items.findIndex(item => item.encodeId === currentSong.encodeId)
      state.player.currentSong = payload === 'next' ? items[++index] : items[--index]
      document.title = `${items[++index].title} - ${items[++index].artistsNames} | Zing MP3`
    } else {
      state.player.currentSong = payload
      document.title = `${payload.title} - ${payload.artistsNames} | Zing MP3`
    }
  },
  [TYPE.SET_PLAYING](state, payload) {
    state.isPlaying = payload
    if (state.howl) {
      if(!payload) {
        state.howl.pause()
      } else {
        if (state.howl)
          state.howl.play()
      }
    }
  },
  [TYPE.SET_PROGRESS](state, payload) {
    if (state.howl) {
      if (payload) {
        state.progress = state.howl.seek(payload / 100 * state.howl.duration())
        state.currentTime = state.howl.seek()
      } else {
        const current = state.howl.seek() || 0
        const total = state.howl.duration() || 0
        const progress = current > 0 && total ? (+current / total) * 100 : 0
        state.progress = progress
        state.currentTime = current
      }
    }
  },
  [TYPE.SET_SEEK](state) {
    if (state.howl) {
      state.seek = state.howl.seek() * 1000
    }
  },
  [TYPE.SET_VOLUME](state, payload) {
    if (state.howl) {
      state.howl.volume(payload / 100)
    }
    state.player.volume = payload
  },
  [TYPE.SET_STREAMING](state, payload) {
    state.source = payload
  },
  [TYPE.SET_PLAY_LIST](state, payload) {
    state.player.playList = payload
  },
  [TYPE.SET_HOWL](state, payload) {
    Howler.unload()
    const player = getObject('Player') || {}
    const volume = player.volume / 100 || state.player.volume / 100
    if (state.isPlaying && !state.isShowMv) {
      state.howl = new Howl({
        src: payload,
        html5: true,
        format: ["mp3"],
        volume: volume,
        onend: function() {
          state.isPlaying = false
          setTimeout(() => {
            state.autoLoadNextSong = true
            state.isPlaying = true
          }, 1000)
        }
      })
      state.howl.play()
    }
  },
  [TYPE.SET_DURATION](state, payload) {
    state.duration = payload
  },
  [TYPE.SET_AUTO_LOAD_SONG](state, payload) {
    state.autoLoadNextSong = payload
  },
  [TYPE.SET_STATE](state, payload) {
    state.player = payload
  },
  [TYPE.SET_SHUFFLE](state, payload) {
    state.player.isShuffle = payload
  },
  [TYPE.SET_QUEUE_PLAY_LIST](state, payload) {
    state.queuePlaylist = payload
  },
  [TYPE.SET_RECENT_ITEMS](state, payload) {
    const isExisted = find(state.player.recentItems, item => item.encodeId === payload.encodeId)
    if (!isExisted) state.player.recentItems.push(payload)
  },
  [TYPE.SET_LIST_SONG_CURRENT](state, payload) {
    state.player.playListCurrent = payload
  },
  [TYPE.SET_SHOW_MV](state, payload) {
    state.isShowMv = payload
  },
  [TYPE.SET_SHOW_KARAORE](state, payload) {
    state.isShowKaraoke = payload
  }
}

const actions = {
  async [TYPE.FETCH_STREAMING]({commit}, payload) {
    commit(TYPE.SET_PLAYING, false)
    try {
      const res = await fetchStreaming(payload)
      commit(TYPE.SET_STREAMING, res.data)
      commit(TYPE.SET_PLAYING, true)
    } catch (error) {
      console.log(error)
    }
  },
  async [TYPE.FETCH_PLAY_LIST]({commit}, payload) {
    try {
      const res = await fetchPlaylist(payload)
      commit(TYPE.SET_PLAY_LIST, res.data)
      commit(TYPE.SET_LIST_SONG_CURRENT, res.data.song.items)
    } catch (error) {
      console.log(error)
    }
  },
  [TYPE.VOLUME_SONG]({commit}, payload) {
    commit(TYPE.SET_VOLUME, payload)
  },
  [TYPE.SONG_PROGRESS]({commit}, payload) {
    commit(TYPE.SET_PROGRESS, payload)
    commit(TYPE.SET_SEEK)
  },
  [TYPE.SONG_PLAYING]({commit}, payload) {
    commit(TYPE.SET_PLAYING, payload)
  },
  [TYPE.ASSIGN_CURRENT_SONG]({commit}, payload) {
    commit(TYPE.SET_CURRENT_SONG, payload)
    commit(TYPE.SET_RECENT_ITEMS, payload)
  },
  [TYPE.LOAD_HOWL]({commit}, payload) {
    commit(TYPE.SET_HOWL, payload)
    commit(TYPE.SET_PROGRESS)
  },
  [TYPE.DURATION_SONG]({commit}, payload) {
    commit(TYPE.SET_DURATION, payload)
  },
  [TYPE.HANDLE_SONG]({commit}, payload) {
    commit(TYPE.SET_CURRENT_SONG, payload)
  },
  [TYPE.AUTO_LOAD_SONG]({commit}, payload) {
    commit(TYPE.SET_AUTO_LOAD_SONG, payload)
  },
  [TYPE.HANDLE_STATE]({commit}, payload) {
    commit(TYPE.SET_STATE, payload)
  },
  [TYPE.IS_SHUFFLE]({commit}, payload) {
    commit(TYPE.SET_SHUFFLE, payload)
  },
  [TYPE.QUEUE_PLAY_LIST]({commit}, payload) {
    commit(TYPE.SET_QUEUE_PLAY_LIST, payload)
  },
  [TYPE.RECENT_ITEMS]({commit}, payload) {
    commit(TYPE.SET_RECENT_ITEMS, payload)
  },
  [TYPE.IS_SHOW_MV]({commit}, payload) {
    commit(TYPE.SET_SHOW_MV, payload)
  },
  [TYPE.HANDLE_SHOW_KARAORE]({commit}, payload) {
    commit(TYPE.SET_SHOW_KARAORE, payload)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
