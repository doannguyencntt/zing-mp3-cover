<template>
  <div class="theming">
    <h3>Chủ đề</h3>
    <div class="themes">
      <div
        class="theme"
        v-for="(theme, index) in themesTopic"
        :key="'theme' + index"
      >
        <figure
          @click="handleChangeTheme(theme.code)"
          :class="{ active: current === theme.code }"
        >
          <img :src="theme.url" alt="image" />
        </figure>
        <div class="name">
          {{ theme.name }}
        </div>
      </div>
    </div>
    <h3>Nghệ Sĩ</h3>
    <div class="themes">
      <div
        class="theme"
        v-for="(theme, index) in themesArtist"
        :key="'theme' + index"
      >
        <figure
          @click="handleChangeTheme(theme.code)"
          :class="{ active: current === theme.code }"
        >
          <img :src="theme.url" alt="image" />
          <div class="themes__icon-check-active">
            <i class="icon ic-check"></i>
          </div>
        </figure>
        <div class="name">
          {{ theme.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTheme } from '@/helpers/dom'
import { getObject, saveObject } from '@/helpers/storage'
export default {
  name: 'theming',
  data() {
    return {
      themesTopic: [
        {
          name: 'Tối',
          code: 'dark',
          url:
            'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/dark.jpg',
        },
        {
          name: 'Sáng',
          code: 'light',
          url:
            'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/light.jpg',
        },
      ],
      themesArtist: [
        {
          name: 'Ji Chang Wook',
          code: 'ji-chang-wook',
          url:
            'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/ji-chang-wook.jpg',
        },
        {
          name: 'UI',
          code: 'ui',
          url:
            'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/iu.jpg',
        },
        {
          name: 'Lisa',
          code: 'lisa',
          url:
            'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/lisa.jpg',
        },
        {
          name: 'Jennie Kim',
          code: 'jennie',
          url:
            'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jennie.jpg',
        },
        {
          name: 'Jisoo',
          code: 'jisoo',
          url:
            'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jisoo.jpg',
        },
        {
          name: 'Jisoo',
          code: 'rose',
          url:
            'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/rose.jpg',
        },
      ],
    }
  },
  computed: {
    current() {
      const theme = getObject('settings') || {}
      return theme.theme
    }
  },
  methods: {
    handleChangeTheme(code) {
      const theme = {
        theme: code
      }
      saveObject('settings', theme)
      setTheme(code)
      this.$emit('update:modelValue', false)
    }
  },
}
</script>

<style lang="scss" scoped>
.theming {
  h3 {
    font-weight: bold;
    margin-bottom: 15px;
  }
  .themes {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    flex-wrap: wrap;
    .theme {
      margin-bottom: 15px;
      overflow: hidden;
      width: 16.66667%;
      padding: 0 7px;
      .name {
        margin-top: 5px;
        font-weight: 600;
      }
      figure {
        margin: 0;
        display: flex;
        border: 1px solid transparent;
        line-height: 0;
        border-radius: 5px;
        flex-shrink: 0;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        
        img {
          transition: all .5s;
          border-radius: 5px;
        }
        &.active {
          border-color: var(--text-primary);
          .themes__icon-check-active {
            width: 20px;
            height: 20px;
            background: var(--text-primary);
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: flex;
            justify-content: center;
            align-content: center;
            border-radius: 50%;
            .ic-check {
              color: #fff !important;
              justify-content: center;
              align-items: center;
            }
          }
        }
        &:hover {
          img {
            transform: scale(1.1);
            transition: all .5s;
          }
        }
      }
    }
  }
}
</style>