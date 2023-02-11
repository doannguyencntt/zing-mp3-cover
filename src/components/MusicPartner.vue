<template>
  <div class="music-partner">
    <h3 class="title">ĐỐI TÁC ÂM NHẠC</h3>
    <div class="card">
      <div class="card__item" v-for="item in listMusicPartner" :key="item.id">
        <div class="card__item__image">
          <a href="">
            <figure class="image">
              <img :src="item.path">
            </figure>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-music-partner',
  props: {
    listMusicPartner: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .music-partner {
    margin: 30px 0;
    .title {
      text-align: center;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-primary);
      opacity: .5;
      margin-bottom: 30px;
    }
    .card {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      &__item {
        padding: 0 11px;
        margin-bottom: 30px;
        &__image {
          .image {
            margin: 0;
            padding: 0;
            overflow: hidden;
            line-height: 0;
            border-radius: 5px;
            background: white;
            width: 100px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 80%;
              max-height: 45px;
            }
          }
        }
      }
    }
  }
</style>