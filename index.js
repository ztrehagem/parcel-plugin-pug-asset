const path = require('path');
const PugAssetOrigin = require('parcel-bundler/lib/assets/PugAsset')
const pug = require('pug')

class PugAsset extends PugAssetOrigin {
  async generate() {
    const config =
      (await this.getConfig(['.pugrc', '.pugrc.js', 'pug.config.js'])) || {};
    const compiled = pug.compile(this.contents, {
      compileDebug: false,
      filename: this.name,
      basedir: this.options.rootDir,
      pretty: config.pretty || false,
      templateName: path.basename(this.basename, path.extname(this.basename)),
      filters: config.filters,
      filterOptions: config.filterOptions,
      filterAliases: config.filterAliases
    });

    if (compiled.dependencies) {
      for (let item of compiled.dependencies) {
        this.addDependency(item, {
          includedInParent: true
        });
      }
    }

    return compiled(config.locals);
  }
}

module.exports = PugAsset;
