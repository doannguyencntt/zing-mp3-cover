import { mapGetters, mapActions } from 'vuex'
import * as TYPE from '@/actionTypes'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      currentSong: `song/player/${TYPE.GET_CURRENT_SONG}`,
      playList: `song/player/${TYPE.GET_PLAY_LIST}`,
      isPlaying: `song/player/${TYPE.GET_PLAYING}`,
      source: `song/player/${TYPE.GET_SOURCE}`
    })
  },
  methods: {
    ...mapActions({
      fetchStreaming: `song/player/${TYPE.FETCH_STREAMING}`,
      fetchPlaylist: `song/player/${TYPE.FETCH_PLAY_LIST}`,
      loadHowl: `song/player/${TYPE.LOAD_HOWL}`,
      songPlaying: `song/player/${TYPE.SONG_PLAYING}`,
      assignCurrentSong: `song/player/${TYPE.ASSIGN_CURRENT_SONG}`,
    }),
    async loadSong(autoPlay) {
      const _song = this.currentSong;
      await this.fetchStreaming(_song.encodeId);
      const source = this.source[128];
      if (source) {
        this.loadHowl(source)
        if (autoPlay) {
          this.songPlaying(true)
        }
      } else {
        alert('Oops! Sorry, the next song is only for VIP accounts.')
      }
    },
    async playSong(song) {
      this.assignCurrentSong(song)
      this.loadSong(true);
    },
    playPlaylist(playlist = {}) {
      if (playlist.song && Array.isArray(playlist.song.items)) {
        const firstSong = playlist.song.items[0];
        if (firstSong) {
          this.playSong(firstSong);
        }
      } else {
        this.loadPlaylist(playlist);
      }
    },
    async loadPlaylist(item) {
      await this.fetchPlaylist(item.encodeId)
      this.playPlaylist(this.playList)
    }
  },
}