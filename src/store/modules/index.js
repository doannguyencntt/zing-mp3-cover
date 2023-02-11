import player from './player'
import lyric from './lyric'

export const initialStoreModules = {
  player,
  lyric
}

export default {
  song: {
    namespaced: true,
    modules: initialStoreModules
  }
}