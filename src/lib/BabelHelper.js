import * as print from './io/print'
import es2015 from 'babel-preset-es2015'
import fs from 'fs'
import path from 'path'
import R from 'ramda'
import Shell from './ShellHelper'
import syntaxAsyncFunctions from 'babel-plugin-syntax-async-functions'
import { transformFileSync } from 'babel-core'
import transformRegenerator from 'babel-plugin-transform-regenerator'
import { watchTree } from 'watch'

const defaultOptions = {
  sourceMaps: true,
  presets: [es2015],
  plugins: [syntaxAsyncFunctions, transformRegenerator],
  babelrc: false
}

export default class BabelHelper {

  static transform(source, dest, options) {
    Shell.mkdir('-p', dest)
    let filter = f => path.extname(f) == '.js'
    let files = fs.readdirSync(source)
    files.forEach(f => {
      let srcpath = path.join(source, f)
      let stats = fs.statSync(srcpath)
      if (stats.isFile() && filter(f)) {
        let destpath = path.join(dest, f)
        let sourcemap = `${destpath}.map`
        let result = transformFileSync(srcpath, options || defaultOptions)
        let sourceMappingURL = '\n//# sourceMappingURL=' + path.basename(sourcemap);
        fs.writeFileSync(destpath, result.code + sourceMappingURL, 'utf8')
        fs.writeFileSync(sourcemap, JSON.stringify(result.map), 'utf8')
        print.ln(`${srcpath} -> ${destpath}`)
      } else if (stats.isDirectory()) {
        BabelHelper.transform(path.join(source, f), path.join(dest, f), options)
      }

    })
  }

  static watch(source, dest, options) {
    options = R.merge(defaultOptions, options)
    let watchOptions = {
      interval: options.interval,
      filter: f => {
        let filter = f => path.extname(f) == '.js'
        let stats = fs.statSync(f)
        if (stats.isFile() && filter(f) || stats.isDirectory()) {
          return true
        }
      }
    }

    // remove watch-specific option (babel fails on unrecognized options)
    delete options.interval

    watchTree(source, watchOptions, () => {
      BabelHelper.transform(source, dest, options)
    })
  }
}
