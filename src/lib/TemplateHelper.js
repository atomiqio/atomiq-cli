import fs from 'fs'
import nunjucks from 'nunjucks'
import path from 'path'
import Shell from './ShellHelper'

export default class TemplateHelper {

  static generate(source, dest, context) {
    let appDir = context.name

    dest = path.join(dest, appDir)
    if (Shell.exists(dest)) {
      // TODO: investigate babel bug? explicit string assignment since not interpolated as Error parameter
      let message = `The target directory already exists (${path.basename(dest)}).`
      throw new Error(message)
    }

    TemplateHelper.render(source, dest, context)
  }

  static render(source, dest, context) {
    Shell.mkdir('-p', dest)
    let files = fs.readdirSync(source)
    files.forEach(f => {
      let srcpath = path.join(source, f)
      let stats = fs.statSync(srcpath)
      if (stats.isFile()) {
        // replace initial underscore (used to disable "special" file processing, .npmignore and .gitigore)
        f = f.replace(/^_(.*)$/, '.$1')
        let destpath = path.join(dest, f)
        let template = fs.readFileSync(srcpath, 'utf8')
        //let result = nunjucks.render(path.basename(srcpath), context)
        let result = nunjucks.renderString(template, context)
        fs.writeFileSync(destpath, result, 'utf8')
      } else if (stats.isDirectory()) {
        TemplateHelper.render(path.join(source, f), path.join(dest, f), context)
      }
    })
  }


}
