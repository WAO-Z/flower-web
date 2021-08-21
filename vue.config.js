module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/_vw.scss";'
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      }

    }
  }
}