import { fetchKaraokeLyric, fetchLyric } from '@/api'
import { lyricParser } from '@/helpers/lyric'
import { normalize } from '@/helpers/karaoke'
import * as TYPE from '@/actionTypes'

const state = {
  lyric: {
    url: '',
    lyrics: null
  },
  sentences: [],
  mvUrl: ''
}

const getters = {
  [TYPE.GET_LYRIC_URL]: state => state.lyric.url,
  [TYPE.GET_LYRIC]: state => state.lyric.lyrics,
  [TYPE.GET_SENTENCES]: state => state.sentences,
  [TYPE.GET_MV_URL]: state => state.mvUrl
}

const mutations = {
  [TYPE.SET_LYRIC_URL](state, payload) {
    state.lyric.url = payload.file
  },
  [TYPE.SET_LYRIC](state, payload) {
    state.lyric.lyrics = lyricParser(payload)
  },
  [TYPE.SET_SENTENCES](state, payload) {
    state.sentences = payload
  },
  [TYPE.SET_MV_URL](state, payload) {
    state.mvUrl = payload
  }
}

const actions = {
  async [TYPE.FETCH_LYRIC_URL]({commit}, payload) {
    try {
      const res = await fetchKaraokeLyric(payload)
      commit(TYPE.SET_LYRIC_URL, res.data)
      commit(TYPE.SET_SENTENCES, res.data.sentences)
      commit(TYPE.SET_MV_URL, res.data.streamingUrl)
    } catch (error) {
      console.log(error)
    }
  },
  async [TYPE.FETCH_LYRIC]({commit}, payload) {
    try {
      const res = await fetchLyric(payload)
      commit(TYPE.SET_LYRIC, res)
    } catch (error) {
      console.log(error)
    }
  },
  [TYPE.HANDLE_URL_MV]({commit}, payload) {
    commit(TYPE.SET_MV_URL, payload)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
