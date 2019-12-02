module.exports = (bundler) => {
  bundler.addAssetType('.pug', require.resolve('./lib/PugAsset'))
}
