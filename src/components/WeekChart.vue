<template>
  <div class="week-chart-section">
    <div class="card">
      <div class="card__item" v-for="img in listImg" :key="img.id" :title="img.name">
        <div class="card__item__image">
          <a :href="img.link">
            <figure class="image">
              <img :src="img.path" :alt="img.name">
            </figure>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'week-chart',
  props: {
    listImg: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .week-chart-section {
    margin: 30px 0;
    .card {
      display: flex;
      flex-wrap: wrap;
      margin: {
        right: -14px;
        left: -14px;
      }
      &__item {
        width: calc(100% / 3);
        padding: 0 14px;
        &__image {
          .image {
            margin: 0;
            padding: 0;
            overflow: hidden;
            line-height: 0;
            border-radius: 5px;
            img {
              transition: transform .7s;
            }
          }
        }
        &:hover {
          .image {
            img {
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
</style>