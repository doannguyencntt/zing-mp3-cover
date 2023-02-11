<template>
  <div>
    <ul class="nav">
      <li
        v-for="(item, index) in items"
        :key="'item' + index"
      >
        <router-link :to="item.slug">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sideBarItem',
  props: {
    items: {
      type: [Array, Object]
    }
  }
}
</script>

<style lang="scss" scoped>
$font-size: 24px;
.nav {
  list-style: none;
  padding: 0;
  display: block;
  li {
    border-left: 3px solid transparent;
    font-weight: 500;
    cursor: pointer;
    &.is-active {
      border-left-color: var(--primary) !important;
      background-color: var(--alpha-bg);
    }
    &.is-active,
    &:hover {
      a {
        color: var(--text-primary);
      }
    }
    &:has(>a.router-link-exact-active.router-link-active) {
      border-left-color: var(--primary) !important;
      background-color: var(--alpha-bg);
    }
  }
  a {
    display: flex;
    align-items: center;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 10px 25px;
    i {
      font-size: $font-size;
      width: $font-size;
      height: $font-size;
      margin-right: 10px;
    }
    span {
      white-space: nowrap;
      line-height: normal;
      font-weight: 700;
    }
  }
}
</style>