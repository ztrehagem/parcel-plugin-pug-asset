const path = require('path')
const Bundler = require('parcel-bundler')
const glob = require('glob')

;(async () => {
  try {
    const entries = glob.sync('src/**/*.pug', { cwd: path.resolve(__dirname), ignore: '**/@(_*)/**', realpath: true })

    const bundler = new Bundler(entries, {
      outDir: path.resolve(__dirname, 'dist'),
      cache: false,
    })

    require('../index')(bundler)

    const server = await bundler.serve()
  } catch (error) {
    console.error(error)
  }
})()
