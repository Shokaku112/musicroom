const webpack=require('webpack')
module.exports = {
  "devServer": {
    "proxy": {
      "/": {
        "target": "http://172.23.193.13:3000",
        "ws": true,
        "changeOrigin": true
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack:{
    plugins: [

        new webpack.ProvidePlugin({
  
          $:"jquery",
  
          jQuery:"jquery",
  
          "windows.jQuery":"jquery"
  
        })
  
      ],
      
  },
  chainWebpack: config => {
    // 清空默认svg规则
    config.module
      .rule('svg')
      .uses.clear()
    config.module //针对svg文件添加svg-sprite-loader规则
      .rule('svg1')
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}