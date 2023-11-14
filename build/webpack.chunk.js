module.exports = {
  optimization: {
    chunkIds: "named",
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          reuseExistingChunk: true,
          // chunks:'async'
        },
        element: {
          name: 'chunk-element',
          test: /[\\/]node_modules[\\/]element(.*)/,
          priority: 20,
          reuseExistingChunk: true,
        },
        echarts: {
          name: 'chunk-echarts',
          test: /[\\/]node_modules[\\/]echarts|zrender(.*)/,
          priority: 20,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'chunk-commons',
          minChunks: 2, // 为了演示效果，只要引用了2次以上就会打包成单独的js
          priority: 5,
          minSize: 0, // 为了演示效果，设为0字节，实际情况根据自己的项目需要设定
          reuseExistingChunk: true,
        },
        lib: {
          test(module) { 
            // console.log(module.size())
            // console.log(module.nameForCondition())
            // console.log(module.context)
            // 如果模块大于160kb，并且模块名字中包含node_modules, 就会被单独打包到一个文件中
            return module.size() > 160000 && 
              module.nameForCondition() && module.nameForCondition().includes('node_modules')
          },
          name(module) { 
            const packageNameArr = module.context.match(/[\\/]node_modules[\\/]\.pnpm[\\/](.*?)(\/|$)/)
            const packageName = packageNameArr ? packageNameArr[1] : ''
            return `chunk-lib.${packageName.replace(/[@+]/g,"")}`;
          },
          priority: 20,
          minChunks: 1,
          reuseExistingChunk: true,
        },
        module: {
          test: /[\\/]node_modules[\\/]/,
          name(module) { 
            const packageNameArr = module.context.match(/[\\/]node_modules[\\/]\.pnpm[\\/](.*?)(\/|$)/)
            const packageName = packageNameArr ? packageNameArr[1] : ''
            return `chunk-module.${packageName.replace(/[@+]/g,"")}`;
          },
          priority: 15,
          minChunks: 1,
          reuseExistingChunk: true,
        }
      }
    }
  },
}
