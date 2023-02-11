const {
  defineConfig
} = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/variables/index.scss";
          @import "@/assets/styles/include-media.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@components', path.resolve(__dirname, 'src/components'))
      .set('@api', path.resolve(__dirname, 'src/api'))
      .set('@common', path.resolve(__dirname, 'src/common'))
    config.performance
      .maxEntrypointSize(700000)
      .maxAssetSize(700000)
  },
})