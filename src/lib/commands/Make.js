import * as print from '../io/print'
import Babel from '../BabelHelper'
import Compose from '../ComposeHelper'
import path from 'path'
import Project from '../Project'
import Shell from '../ShellHelper'

// include node_modules/.bin in path, just like 'npm run' scripts
process.env.PATH = path.join(path.join(__dirname, '..', '..', '..', './node_modules', '.bin') +
  path.delimiter +
  process.env.PATH)

const spawnopts = {
  env: process.env,
  stdio: 'inherit'
}

// TODO this isn't really a make file so much as a bunch of tasks to support make
export default class Make {

  init() {
    this.project = new Project()
    this.project.checkValidProject()
  }

  clean() {
    Shell.rm('-rf', './dist')
  }

  dist() {
    Shell.copyDir('src', 'dist', {
      recurse: true
    }, f => path.extname(f) != '.js')
  }

  babel() {
    Babel.transform('src', 'dist')
  }

  build() {
    Compose.build(spawnopts)
  }

  rebuild() {
    Compose.rebuild(spawnopts)
  }

  watchsrc() {
    Babel.watch('src', 'dist', {
      sourceMaps: true,
      interval: 1000
    })
  }

  watchdist() {
    print.ln('While monitoring, you can also enter "rs" in the console to manually restart')
    Shell.spawn('nodemon',
      ['--legacy-watch', '--watch', 'dist', '-e', 'js,json', '--exec', 'docker-compose up --force-recreate'],
      spawnopts)
  }
}
