import Babel from '../BabelHelper';
import Compose from '../ComposeHelper';
import path from 'path';
import Project from '../Project';
import Shell from '../ShellHelper';

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
  }

  build() {
    Compose.build(spawnopts);
  }

  rebuild() {
    Compose.rebuild(spawnopts);
  }
}
