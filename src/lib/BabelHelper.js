import es2015 from 'babel-preset-es2015'
import fs from 'fs'
import path from 'path'
import Shell from './ShellHelper'
import syntaxAsyncFunctions from 'babel-plugin-syntax-async-functions'
import { transformFileSync } from 'babel-core'
import transformRegenerator from 'babel-plugin-transform-regenerator'

const defaultOptions = {
  sourceMaps: true,
  presets: [es2015],
  plugins: [syntaxAsyncFunctions, transformRegenerator]
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
        fs.writeFileSync(destpath, result.code, 'utf8')
        fs.writeFileSync(sourcemap, JSON.stringify(result.map), 'utf8')
      } else if (stats.isDirectory()) {
        BabelHelper.transform(path.join(source, f), path.join(dest, f), options)
      }

    })
  }
}
