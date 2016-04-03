import Babel from '../BabelHelper';
import path from 'path';
import Project from '../Project';
import Shell from '../ShellHelper';

// include node_modules/.bin in path, just like 'npm run' scripts
process.env.PATH = path.join(path.resolve(path.join(__dirname, '../../../node_modules', '.bin')) +
  path.delimiter +
  process.env.PATH);

const spawnopts = {
  env: process.env,
  stdio: 'inherit'
};

export default class Make {

  init() {
    this.project = new Project();
    this.project.checkValidProject();
  }

  clean() {
    Shell.rm('-rf', './dist');
  }

  dist() {
    Shell.copyDir('src', 'dist', {
      recurse: true
    }, f => path.extname(f) != '.js');
  }

  babel() {
    Babel.transform('src', 'dist');
    /*
    if (!options.local) {
      spawnSync('docker-compose', ['build'], spawnopts);
    }
    */
  }

  image() {

  }

  build() {

  }
}
